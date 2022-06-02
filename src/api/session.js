const {Router} = require('express');
const bcrypt = require('bcrypt');

const Orders = require('../persistence/orders');

const sessionMiddleware = require('../middleware/session-middleware');

const router = new Router();

router.post('/', async (request, response) => {
  try {
    const {data, type} = request.body;
    console.log(data)
    console.log(data.actions.parameters)
    await Orders.create(data.actions.parameters.offerer, data, type);
    //request.session.id = sessionId;
    response.status(201).json();
  } catch (error) {
    console.error(
      `POST orders ({ offerer:  }) >> ${error.stack})`
    );
    response.status(500).json();
  }
});

router.get('/getAll', async (request, response) => {
  try {
    const all = await Orders.getAll();
    response.json(all);
  } catch (error) {
    console.error(
      `getAll failed`
    );
    response.status(500).json();
  }
});

router.get('/getAll/:type', async (request, response) => {
  try {
    console.log(request.params.type)
    const all = await Orders.findByType(request.params.type);
    response.json(all);
  } catch (error) {
    console.error(
      `getByAddress failed`
    );
    response.status(500).json();
  }
});

router.get('/', (request, response) => {
  response.json({data: request.data});
});

router.delete('/deleteAll', async (request, response) => {
  try {
    const { offerer } = request.body;
    await Orders.deleteByOfferer(offerer);

    request.session.id = null;
    response.status(200).json();
  } catch (error) {
    console.error(`DELETE session >> ${error.stack}`);
    response.status(500).json();
  }
});

router.get('/getByOfferer/:offerer', async (request, response) => {
  try {
    console.log(request.params.offerer)
    const all = await Orders.findByOfferer(request.params.offerer);
    response.json(all);
  } catch (error) {
    console.error(
      `getByAddress failed`
    );
    response.status(500).json();
  }
});

router.delete('/', async (request, response) => {
  try {
    const { ids } = request.body;
    console.log(request.body)
    ids.forEach(async id => await Orders.delete(id))

    request.session.id = null;
    response.status(200).json();
  } catch (error) {
    console.error(`DELETE session >> ${error.stack}`);
    response.status(500).json();
  }
});

/*
router.delete('/', async (request, response) => {
  try {
    const { ids } = request.body;
    ids.forEach(async id => await Orders.delete(id))

    request.session.id = null;
    response.status(200).json();
  } catch (error) {
    console.error(`DELETE session >> ${error.stack}`);
    response.status(500).json();
  }
});*/

module.exports = router;
