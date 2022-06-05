/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Personas, conn } = require('../../src/db.js');

const agent = session(app);
const persona = {
  name: 'Marta',
};

describe('Personas routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Personas.sync({ force: true })
    .then(() => Personas.create(persona)));
  describe('GET /personas', () => {
    xit('should get 200', () =>
      agent.get('/personas').expect(200)
    );
  });
});
