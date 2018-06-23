'use strict';

const server = require('../lib/server');
const superagent = require('superagent');
const cowsay = require('cowsay');

const apiUrl = 'http://localhost:5000/api';

beforeAll(() => server.start(5000));
afterAll(() => server.stop());

describe('VALID request to the API', () => {
  describe('GET api/time', () => {
    it('should response with a status 200', (done) => {
      superagent.get(`${apiUrl}/time`)
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.body).toHaveProperty('date');
          done();
        });
    });
  });

  describe('GET /cowsayPage', () => {
    const mockCow = cowsay.say({ text: 'Hello World' });
    const mockHtml = `<section><h3><a href="api/time">Click here for current time</a></h3><pre>${mockCow}</pre></section>`;
    it('should respond with status 200 and return cow HTML', () => {
      return superagent.get(`${apiUrl}/cowsayPage`)
        .query({ text: 'Hello World' })
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.text).toEqual(mockHtml);
        });
    });
  });

  describe('GET localhost:3000/cowsay return html style of cowsay', () => {
    const mockCow = cowsay.say({ text: 'Hello World' });
    const mockHTML = `<!DOCTYPE html>
          <html>
            <head>
              <title> cowsay </title>
            </head>
            <body>
              <h1> Welcome to Cowsay! </h1>
              <pre>
                ${mockCow}
              </pre>
            </body>
          </html>`;
    it('should respond with status 200 and return cow HTML', () => {
      return superagent.get('localhost:3000/cowsay')
        .query({ text: 'Hello World' })
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.text).toEqual(mockHTML);
        });
    });
  });

  describe('POST /api/cowsay a body', () => {
    const mockCow = cowsay.say({ text: 'Hello World' });
    const mockJSON = JSON.stringify({ content: mockCow });
    it('should respond with status 200 and return cow JSON', () => {
      return superagent.post(`${apiUrl}/cowsay`)
        .send({ text: 'Hello World' })
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.text).toEqual(mockJSON);
        });
    }); 
  });

  describe('POST /echo', () => {
    it('should return status 200 for successful post', () => {
      return superagent.post(`${apiUrl}/echo`)
        .send({ name: 'Kevin' })
        .then((res) => {
          expect(res.body.name).toEqual('Kevin');
          expect(res.status).toEqual(200);
        })
        .catch((err) => {
          console.log(err); //eslint-disable-line
        });
    });
  });
});

describe('INVALID request to the API', () => {
  describe('GET /cowsayPage', () => {
    it('should err out with 400 status code for not sending text in query', () => {
      return superagent.get(`${apiUrl}/cowsayPage`)
        .query({})
        .then(() => {})
        .catch((err) => {
          expect(err.status).toEqual(400);
          expect(err).toBeTruthy();
        });
    });
  });

  describe('POST /api/cowsay', () => {
    const mockJSON = JSON.stringify({ error: 'invalid, text query required' });
    it('should have 200 status with return of html cow', () => {
      return superagent.post(`${apiUrl}/cowsay`)
        .send({ message: 'error' })
        .then(() => {})
        .catch((err) => {
          expect(err.status).toEqual(400);
          expect(err.response.res.text).toEqual(mockJSON);
        });
    });
  });
});
