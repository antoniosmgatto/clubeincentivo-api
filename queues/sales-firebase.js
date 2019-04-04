const Queue = require('bee-queue');
const firebase = require('firebase');

const {
  Company, Customer, Sale, SaleItem, Transaction,
} = require('../models');

const queue = new Queue('sales-firebase', {
  redis: {
    url: process.env.REDIS_URL,
  },
  removeOnSuccess: true,
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

const salesPath = sale => `users/${sale.customer.guid}/companies/${sale.company.guid}/sales/${
  sale.guid
}`;

const salePayload = sale => ({
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

const companyPath = (customerGuid, companyGuid) => `users/${customerGuid}/companies/${companyGuid}`;

const companyPayload = (company, balance) => ({
  companyName: company.name,
  urlLogo: company.urlLogo,
  balance,
});

const saveOnFirebase = (path, json) => {
  firebase
    .database()
    .ref(path)
    .update(json);
};

const customerBalance = (customerId, companyId) => {
  Transaction.sum('value', { where: { customer_id: customerId, company_id: companyId } });
};

queue.process(async (job) => {
  const sale = await findSale(job.data.saleId);
  const path = salesPath(sale);
  const payload = await salePayload(sale);
  saveOnFirebase(path, payload);
});

module.exports = {
  createJob: (json) => {
    const job = queue
      .createJob(json)
      .retries(10)
      .backoff('exponential', 6000);
    return job.save();
  },
  salesPath,
  salePayload,
  statementPayload: transaction => ({
    created_at: transaction.created_at.getTime(),
    tag: transaction.tag,
    value: parseFloat(transaction.value),
  }),
  statementPath: transaction => `users/${transaction.customer.guid}/companies/${
    transaction.company.guid
  }/transactions/${transaction.guid}`,
  saveOnFirebase,
  companyPath,
  companyPayload,
  customerBalance,
};
