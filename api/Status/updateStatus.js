const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

router.put('/:taskId', async (req, res) => {
  const taskId = parseInt(req.params.taskId, 10);
  const { status } = req.body;

  try {
    // Kontrolloni nëse task-u ekziston
    const existingTask = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!existingTask) {
      return res.status(404).json({ error: 'Task-i nuk u gjet.' });
    }

    // Përditësoni statusin e task-ut
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { status: { connect: { id: status } } },
    });

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ka ndodhur një gabim gjatë përditësimit të statusit të task-ut.' });
  }
});

module.exports = router;
