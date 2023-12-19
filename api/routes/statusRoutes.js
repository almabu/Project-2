const express = require('express');
const updateStatusRouter = require('../Status/updateStatus');
const getStatusRouter = require('../Status/getStatus');
const createStatus = require('../Status/createStatus')
const statusRouter = express.Router();

statusRouter.use('/updateStatus', updateStatusRouter);
statusRouter.use('/getTasksByStatus', getStatusRouter);
statusRouter.use('/create',createStatus );
module.exports = statusRouter;
