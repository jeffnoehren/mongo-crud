const test = require('tape')
const request = require('supertest')
const express = require('express')

const Users = require('../models/Users')
const app = require('../index')
let userId

before(done => {
  app.on( 'APP_STARTED', () => {
    done()
  })
})

describe('API Integration Test', () => {
  it('Runs all tests', done => {
    test('/api/users', assert => {
      request(app)
        .post('/api/users')
        .send(new Users('test user', 'test pass', 'test firstName', 'test lastName', 'test dob'))
        .expect(200)
        .end((err, res) => {
          if (err) return assert.fail(JSON.stringify(res))
          assert.pass('Created a new User successfully, test passed!')
          assert.end()
        })
    })

    test('/api/users', assert => {
      request(app)
        .get('/api/users')
        .expect(200)
        .end((err, res) => {
          if (err) return assert.fail(JSON.stringify(res))
          userId = res.body[0]._id
          assert.pass('Got all users successfully, test passed!')
          assert.end()
        })
    })

    test('/api/users/:id', assert => {
      request(app)
        .get(`/api/users/${userId}`)
        .expect(200)
        .end((err, res) => {
          if (err) return assert.fail(JSON.stringify(res))
          assert.pass('Got a specific user successfully, test passed!')
          assert.end()
        })
    })

    test('/api/users/:id', assert => {
      request(app)
        .put(`/api/users/${userId}`)
        .send(new Users('test title edit', 'test user edit', 'test body edit'))
        .expect(200)
        .end((err, res) => {
          if (err) return assert.fail(JSON.stringify(res))
          assert.pass('Edited a users successfully, test passed!')
          assert.end()
        })
    })

    test('/api/users/:id', assert => {
      request(app)
        .delete(`/api/users/${userId}`)
        .expect(200)
        .end((err, res) => {
          if (err) return assert.fail(JSON.stringify(res))
          assert.pass('Deleted a specific users successfully, test passed!')
          assert.end()
          done()
        })
    })
  })
})