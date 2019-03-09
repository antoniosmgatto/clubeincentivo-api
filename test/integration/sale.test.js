/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */

const chai = require('chai');
const chainHttp = require('chai-http');

// eslint-disable-next-line prefer-destructuring
const expect = chai.expect;
const app = require('../../app');
const { Sale, SaleItem } = require('../../models');

chai.use(chainHttp);

const sale = {
  cfeId: '001',
  clientDocument: '21511945079',
  purchaseDate: '2019-01-31',
  total: 10,
  items: [
    {
      code: '001',
      description: 'Item 1',
      quantity: 1,
      price: 1.99,
    },
  ],
};

describe('/pdv/sales', () => {
  beforeEach(() => {
    // return require('../../models').sequelize.sync();
    Sale.destroy({ where: {}, force: true });
  });

  describe('/GET sales', () => {
    it('should GET all sales', (done) => {
      chai
        .request(app)
        .get('/pdv/sales')
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res).to.have.header(
            'content-type',
            'application/json; charset=utf-8',
          );
          // eslint-disable-next-line no-unused-expressions
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body.length).to.be.eq(0);
          done();
        });
    });
  });

  describe('/POST sale', () => {
    it('should create a new sale', (done) => {
      chai
        .request(app)
        .post('/pdv/sales')
        .send(sale)
        .then((res) => {
          expect(res).to.have.status(201);
          // eslint-disable-next-line no-unused-expressions
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('cfeId');
          expect(res.body.cfeId).to.be.eq('001');
          expect(res.body).to.have.property('clientDocument');
          expect(res.body.clientDocument).to.be.eq('21511945079');
          expect(res.body).to.have.property('purchaseDate');
          expect(res.body.purchaseDate).to.be.eq(
            '2019-01-31T00:00:00.000Z',
          );
          expect(res.body).to.have.property('total');
          expect(res.body.total).to.be.eq('10');
          expect(res.body).to.have.property('version');
          expect(res.body).to.have.property('createdAt');
          expect(res.body).to.have.property('updatedAt');
          expect(res.body).to.have.property('items');
          expect(res.body.items.length).to.be.eq(1);
          expect(res.body.items[0].code).to.be.eq('001');
          expect(res.body.items[0].description).to.be.eq('Item 1');
          expect(res.body.items[0].quantity).to.be.eq(1);
          expect(res.body.items[0].price).to.be.eq('1.99');
          done();
        });
    });
  });

  describe('/GET/:id sale', () => {
    it('should get a sale', (done) => {
      Sale.create(sale, {
        include: [
          {
            model: SaleItem,
            as: 'items',
          },
        ],
      }).then((saleSaved) => {
        chai
          .request(app)
          .get(`/pdv/sales/${saleSaved.id}`)
          .then((res) => {
            expect(res).to.have.status(200);
            // eslint-disable-next-line no-unused-expressions
            expect(res).to.be.json;
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('cfeId');
            expect(res.body.cfeId).to.be.eq('001');
            expect(res.body).to.have.property('clientDocument');
            expect(res.body.clientDocument).to.be.eq('21511945079');
            expect(res.body).to.have.property('purchaseDate');
            expect(res.body.purchaseDate).to.be.eq(
              '2019-01-31T00:00:00.000Z',
            );
            expect(res.body).to.have.property('total');
            expect(res.body.total).to.be.eq('10');
            expect(res.body).to.have.property('version');
            expect(res.body).to.have.property('createdAt');
            expect(res.body).to.have.property('updatedAt');
            expect(res.body).to.have.property('items');
            expect(res.body.items.length).to.be.eq(1);
            expect(res.body.items[0].code).to.be.eq('001');
            expect(res.body.items[0].description).to.be.eq('Item 1');
            expect(res.body.items[0].quantity).to.be.eq(1);
            expect(res.body.items[0].price).to.be.eq('1.99');
            done();
          });
      });
    });
  });

  describe('/PUT/:id sale', () => {
    it('should create a new sale', (done) => {
      Sale.create(sale, {
        include: [
          {
            model: SaleItem,
            as: 'items',
          },
        ],
      }).then((saleSaved) => {
        chai
          .request(app)
          .put(`/pdv/sales/${saleSaved.id}`)
          .send({
            cfeId: '002',
            clientDocument: '88600967074',
            purchaseDate: '2019-01-30',
            total: 11,
            items: [
              {
                code: '002',
                description: 'Item 2',
                quantity: 2,
                price: 5.99,
              },
            ],
          })
          .then((res) => {
            expect(res).to.have.status(200);
            // eslint-disable-next-line no-unused-expressions
            expect(res).to.be.json;
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('cfeId');
            expect(res.body.cfeId).to.be.eq('002');
            expect(res.body).to.have.property('clientDocument');
            expect(res.body.clientDocument).to.be.eq('88600967074');
            expect(res.body).to.have.property('purchaseDate');
            expect(res.body.purchaseDate).to.be.eq(
              '2019-01-30T00:00:00.000Z',
            );
            expect(res.body).to.have.property('total');
            expect(res.body.total).to.be.eq(11);
            expect(res.body).to.have.property('version');
            expect(res.body).to.have.property('createdAt');
            expect(res.body).to.have.property('updatedAt');
            expect(res.body).to.have.property('items');
            expect(res.body.items.length).to.be.eq(1);
            expect(res.body.items[0].code).to.be.eq('002');
            expect(res.body.items[0].description).to.be.eq('Item 2');
            expect(res.body.items[0].quantity).to.be.eq(2);
            expect(res.body.items[0].price).to.be.eq(5.99);
            done();
          });
      });
    });
  });

  describe('/DELETE/:id sale', () => {
    it('should delete a sale', (done) => {
      Sale.create(sale, {
        include: [
          {
            model: SaleItem,
            as: 'items',
          },
        ],
      }).then((saleSaved) => {
        chai
          .request(app)
          .delete(`/pdv/sales/${saleSaved.id}`)
          .then((res) => {
            expect(res).to.have.status(204);
            done();
          });
      });
    });
  });
});
