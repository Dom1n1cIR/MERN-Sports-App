const express = require('express');
const multer = require('multer');

const UserController = require('./controllers/UserController');
const EventController = require('./controllers/EventControler');
const uploadConfig= require('./config/upload');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.get('/', (req, res) => {
    res.send({ status: 200 });
})

//Event
routes.get('/event/:eventId', EventController.getEventById)
routes.post('/event', upload.single("thumbnail"), EventController.createEvent)


//User
routes.post('/user/register', UserController.createUser);
routes.get('/user/:userId', UserController.getUserById);

module.exports = routes;