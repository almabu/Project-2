const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

router.put('/:taskId', async (req, res) => {
  const taskId = parseInt(req.params.taskId, 10);
  const { status } = req.body;

  try {
    const existingTask = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found' });
    }


    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { status: { connect: { id: status } } },
    });

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server errors' });
  }
});

module.exports = router;
