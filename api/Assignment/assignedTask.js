
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();


app.post('/', async (req, res) => {
  const { taskId, userId } = req.params;

  try {

    const task = await prisma.task.findUnique({
      where: {
        id: parseInt(taskId)  
      }
    });

    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

  
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId)  
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

 
    const updatedTask = await prisma.task.update({
      where: {
        id: task.id
      },
      data: {
        assignedToId: user.id
      }
    });

    res.json(updatedTask);
  } catch (error) {
    console.error('Error handling assignedTask:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
