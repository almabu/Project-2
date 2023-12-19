const express = require('express');
const createRouter = require('../Tasks/create');
const updateRouter = require('../Tasks/update');
const deleteRouter = require('../Tasks/delete');
const getRouter = require('../Tasks/get');
const tasksRouter = express.Router();

tasksRouter.use('/create', createRouter);
tasksRouter.use('/update', updateRouter);
tasksRouter.use('/delete', deleteRouter);
tasksRouter.use('/get', getRouter);


module.exports = tasksRouter;
