const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  const { title, statusId, assignedToId } = req.body;

  try {
    // Check if the User with the specified assignedToId exists
    const userExists = await prisma.user.findUnique({
      where: { id: assignedToId },
    });

    if (!userExists) {
      return res.status(400).json({ error: 'Specified User does not exist.' });
    }

    // Create the task
    const createdTask = await prisma.task.create({
      data: {
        title,
        status: { connect: { id: statusId } },
        assignedTo: { connect: { id: assignedToId } },
      },
    });

    res.status(201).json(createdTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'An error occurred while creating the task.', details: error.message });
  }
});

module.exports = router;
