const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const statuses = await prisma.status.findMany();

    res.json(statuses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ka ndodhur një gabim gjatë marrjes së statuseve.' });
  }
});

module.exports = router;
