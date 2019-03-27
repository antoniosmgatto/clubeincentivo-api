const Queue = require('bee-queue');
const firebase = require('firebase');

const {
  Company, Customer, Sale, SaleItem,
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

const firebaseCompanyPath = sale => `users/${sale.customer.uid}/companies/${sale.company.uid}/sales/${sale.cfeId}`;

const payload = sale => ({
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

const sendSaleToFirebase = (sale) => {
  firebase
    .database()
    .ref(`${firebaseCompanyPath(sale)}`)
    .update(payload(sale));
};

queue.process(async (job) => {
  findSale(job.data.saleId).then(sale => sendSaleToFirebase(sale));
});

module.exports = {
  createJob: (json) => {
    const job = queue.createJob(json).retries(10).backoff('exponential', (6000));
    return job.save();
  },
};
