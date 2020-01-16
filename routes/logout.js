const express = require('express')
const router = express.Router()
const LocalStorage = require('node-localstorage').LocalStorage
const localStorage = new LocalStorage('./scratch')

router.get('/', async (req, res) => {
  const a = localStorage.removeItem('token')
  console.log('a : ', a)
})

module.exports = router
