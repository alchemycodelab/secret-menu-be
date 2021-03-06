const { getAgent } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('auth routes', () => {
  it('signs up a user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'Danny',
        lastName: 'Cairns',
        email: 'spotty@dogs.com',
        role: 'User',
        password: 'spotWasHere'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          firstName: 'Danny',
          lastName: 'Cairns',
          email: 'spotty@dogs.com',
          role: 'User'
        });
      });
  });

  it('logs in a user', async() => {
    return request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'spot@dogs.com',
        password: 'spotWasHere'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          firstName: 'Danny',
          lastName: 'Cairns',
          email: 'spot@dogs.com',
          role: 'User'
        });
      });
  });

  // it('logs in a restaurant', async() => {
  //   return request(app)
  //     .post('/api/v1/auth/login')
  //     .send({
  //       email: 'test4@secretmenu.com',
  //       password: 'admin'
  //     })
  //     .then(res => {
  //       expect(res.body).toEqual({
  //         _id: expect.any(String),
  //         firstName: 'Josh',
  //         lastName: 'Ford',
  //         email: 'test4@secretmenu.com',
  //         role: 'Restaurant',
  //         favoriteRestaurants: [],
  //         restaurant: expect.any(Array)
  //       });
  //     });
  // });

  it('verifies a logged in user', () => {
    return getAgent()
      .get('/api/v1/auth/verify')
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          firstName: 'Danny',
          lastName: 'Cairns',
          email: 'spot@dogs.com',
          role: 'User'
        });
      });
  });
});
