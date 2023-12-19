const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

router.put('/:id', async (req, res) => {
  const taskId = parseInt(req.params.id);

  try {
    
    const existingTask = await prisma.task.findUnique({
      where: { id: taskId },
      include: { status: true },
    });

    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        title: req.body.title || existingTask.title,
        status: {
          update: {
            name: req.body.status || existingTask.status.name,
          },
        },
        assignedTo: req.body.assignedTo || existingTask.assignedTo,
      },
    });

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
});

module.exports = router;
