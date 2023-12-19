const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();


router.post('/', async (req, res) => {
  const { taskId, assignedToId } = req.body;

  try {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    const user = await prisma.user.findUnique({
      where: { id: assignedToId },
    });

    if (!task || !user) {
      return res.status(404).json({ error: 'Task or User not found' });
    }

    const assignedTask = await prisma.task.update({
      where: { id: taskId },
      data: { assignedToId },
    });

    res.json(assignedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
