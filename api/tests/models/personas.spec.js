const { Personas, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Personas model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Personas.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Personas.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Personas.create({ name: "Juan" });
      });
      it('should throw an error if surname is null', (done) =>{
        Personas.create({
          name: "Matias",
          birthDate: "1997-05-22",
          email: "matias@gmail.com"
        })
          .then(() => done(new Error('surname is require')))
          .catch(() => done()); 
      })
      it('should throw an error if email is not a valid email', (done) =>{
        Personas.create({
          name: "Matias",
          surname: "Perez",
          birthDate: "1997-05-22",
          email: "matias.com"
        })
          .then(() => done(new Error('email invalid')))
          .catch(() => done()); 
      })
      it('should throw an error if name is not a string', (done) =>{
        Personas.create({
          name: 25,
          surname: "Perez",
          birthDate: "1997-05-22",
          email: "matias@gmail.com"
        })
          .then(() => done(new Error('name invalid')))
          .catch(() => done()); 
      })
    });
  });
});
