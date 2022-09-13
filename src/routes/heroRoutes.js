const { response } = require('express');
const express = require('express');
const router = express.Router();
const controller = require('../controllers/heroController')

router.get('/', (require, response) => {
  response.json(controller.listAll())
})

router.get('/:id', (require, response) => {
  const id = require.params.id;
  response.json(controller.listOneHero())
})

router.post('/', (require, response) => {
  const hero = require.body;
  response.json(controller.createHero(hero))
})

router.put('/:id', (require, response) => {
  const id = require.params.id;
  const hero = require.body;
  response.json(controller.editHero(id, hero))
})

router.delete('/:id', (require, response) => {
  response.json(controller.deleteHero(require.params.id))
})






module.exports = router