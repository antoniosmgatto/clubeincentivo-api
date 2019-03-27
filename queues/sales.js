const Queue = require('bee-queue');
const CPF = require('@fnando/cpf/dist/node');
const firebase = require('firebase');

const {
  Company, Customer, Sale, SaleItem,
} = require('../models');

const queue = new Queue('sales', {
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

const findSale = id => Sale.findByPk(id, {
  include: [
    {
      model: SaleItem,
      as: 'items',
    },
    {
      model: Company,
      as: 'company',
    },
    {
      model: Customer,
      as: 'customer',
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

const firebaseCompanyPath = (customerUid, companyUid) => `users/${customerUid}/companies/${companyUid}`;

const sendCompanyInfoToFirebase = (customer, company) => {
  firebase
    .database()
    .ref(firebaseCompanyPath(customer.uid, company.uid))
    .update({
      companyName: company.name,
      urlLogo: company.urlLogo,
      balance: 0.0,
    });
};

const sendSaleToFirebase = (sale) => {
  firebase
    .database()
    .ref(
      `${firebaseCompanyPath(sale.customer.uid, sale.company.uid)}/sales/${
        sale.cfeId
      }`,
    )
    .update({
      cfeId: sale.cfeId,
      items: sale.items.map(item => ({
        code: item.code,
        description: item.description,
        price: parseFloat(item.price),
        quantity: parseFloat(item.quantity),
      })),
      purchaseDate: sale.purchaseDate.getTime(),
      total: parseFloat(sale.total),
      cashback: parseFloat(sale.cashback),
      cashbackDate:
        sale.cashbackDate != null ? sale.cashbackDate.getTime() : null,
      onBalance: sale.onBalance,
    });
};

queue.process(async (job) => {
  const document = parseClientDocument(job.data);
  findCustomer(document).then((customer) => {
    const userRefFirebase = firebase
      .database()
      .ref(firebaseCompanyPath(customer.uid));

    userRefFirebase.once('value', (snapshot) => {
      if (!snapshot.exists()) {
        Company.findByPk(job.data.companyId).then((company) => {
          sendCompanyInfoToFirebase(customer, company);
        });
      }
      const saleJson = {
        ...job.data,
        ...{ clientDocument: document, customerId: customer && customer.id },
      };
      createSale(saleJson)
        .then((record) => {
          if (record.customerId != null) {
            findSale(record.id).then((sale) => {
              sendSaleToFirebase(sale);
            });
          }
        })
        .catch(exception => console.log(exception));
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
