const {Router} = require('express');
const bcrypt = require('bcrypt');

const Orders = require('../persistence/orders');

const sessionMiddleware = require('../middleware/session-middleware');

const router = new Router();

router.post('/', async (request, response) => {
  try {
    const {name, score} = request.body;
    await Orders.create(name, score);
    //request.session.id = sessionId;
    response.status(201).json();
  } catch (error) {
    console.error(
      `POST leaderboard ({ offerer:  }) >> ${error.stack})`
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

module.exports = router;
