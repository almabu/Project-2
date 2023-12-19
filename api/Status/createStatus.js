const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  try {
    const { name } = req.body;

    
    if (!name) {
      return res.status(400).json({ error: 'Please fill the name' });
    }

    const createdStatus = await prisma.status.create({
      data: { name },
    });

   
    res.status(201).json(createdStatus);
  } catch (error) {
    console.error(error);
  
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
