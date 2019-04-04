const Queue = require('bee-queue');
const CPF = require('@fnando/cpf/dist/node');
const firebase = require('firebase');
const salesFirebase = require('./sales-firebase');

const {
  Company, Customer, Sale, SaleItem,
} = require('../models');

const queue = new Queue('create-sales', {
  redis: {
    url: process.env.REDIS_URL,
  },
  removeOnSuccess: true,
});

const createSale = json => Sale.create(json, {
  include: [
    {
      model: SaleItem,
      as: 'items',
    },
  ],
});

const parseClientDocument = (json) => {
  let document = json.clientDocument;
  document = CPF.strip(document);
  return CPF.format(document);
};

// eslint-disable-next-line object-shorthand
const findCustomer = document => Customer.findOne({ where: { document } });

const firebaseCompanyPath = (customerGuid, companyGuid) =>
  `users/${customerGuid}/companies/${companyGuid}`;

const sendCompanyInfoToFirebase = (customer, company) => {
  firebase
    .database()
    .ref(firebaseCompanyPath(customer.guid, company.guid))
    .update({
      companyName: company.name,
      urlLogo: company.urlLogo,
      balance: 0.0,
    });
};

queue.process(async (job) => {
  const document = parseClientDocument(job.data);
  findCustomer(document).then((customer) => {
    const saleJson = {
      ...job.data,
      ...{ clientDocument: document, customerId: customer && customer.id },
    };

    createSale(saleJson)
      .then((sale) => {
        if (customer != null) {
          // get firebase reference
          const userRefFirebase = firebase
            .database()
            .ref(firebaseCompanyPath(customer.guid));

          userRefFirebase.once('value', (snapshot) => {
            // check if user exists in firebase
            if (!snapshot.exists()) {
              Company.findByPk(job.data.companyId).then((company) => {
                sendCompanyInfoToFirebase(customer, company);
              });
            }
          });

          // schedule a job to send sale data
          salesFirebase.createJob({ saleId: sale.id });
        }
        return true;
      });
  });
});

module.exports = {
  createJob: (json) => {
    const job = queue.createJob(json).retries(10).backoff('exponential', (6000));
    return job.save();
  },
};
