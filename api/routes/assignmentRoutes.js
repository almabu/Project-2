const express = require('express');
const assignRouter = require('../Assignment/assignTask');

const assignmentRouter = express.Router();

assignmentRouter.use('/assignTask', assignRouter);


module.exports = assignmentRouter;
