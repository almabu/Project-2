const express = require('express');
const assignRouter = require('../Assignment/assignTask');
const assignedRouter = require('../Assignment/assignedTask')

const assignmentRouter = express.Router();

assignmentRouter.use('/assignTask', assignRouter);
assignmentRouter.use('/assignedTask', assignedRouter);

module.exports = assignmentRouter;
