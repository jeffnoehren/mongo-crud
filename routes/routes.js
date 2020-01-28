const express = require('express')

const Users = require('../models/Users')
const router = express.Router()

router.get('/users', (req, res, next) => {
  req.app.locals.db.collection('users').find({}).toArray((err, result) => {
    if (err) {
      res.status(400).send({'error': err})
    }
    if (result === undefined || result.length === 0) {
      res.status(400).send({'error':'No users in database'})
    } else {
      res.status(200).send(result)
    }
  })
})

router.get('/users/:id', (req, res, next) => {
  req.app.locals.db.collection('users').findOne({
    '_id': req.params.id
  }, (err, result) => {
    if (err) {
      res.status(400).send({'error': err})
    }
    if (result === undefined) {
      res.status(400).send({'error':'No users matching that id was found'})
    } else {
      res.status(200).send(result)
    }
  })
})

router.post('/users', (req, res, next) => {
  const newUsers = new Users(
    req.body.username, 
    req.body.password,
    req.body.firstName,
    req.body.lastName, 
    req.body.dob,
    Date.now(),
    Date.now()
  )

  req.app.locals.db.collection('user').insertOne({
    newUsers
  }, (err, result) => {
    if (err) {
      res.status(400).send({'error': err})
    }
    res.status(200).send(result)
  })
})

router.delete('/users/:id', (req, res, next) => {
  req.app.locals.db.collection('users').deleteOne({
    '_id': req.params.id
  }, (err, result) => {
    if (err) {
      res.status(400).send({'error': err})
    }
    res.status(200).send(result)
  })
})

router.put('/user/:id', (req, res, next) => {
  req.app.locals.db.collection('user').updateOne({
    '_id': req.params.id
  }, 
  {$set:
    {
      username: req.body.username, 
      password: req.body.password,
      req.body.firstName,
      lastName: req.body.lastName, 
      dob: req.body.dob,
      updatedAtAt: Date.now()   
    }
  }, (err, result) => {
    if (err) {
      res.status(400).send({'error': err})
    }
    res.status(200).send(result)
  })
})

module.exports = router