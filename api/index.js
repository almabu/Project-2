const express = require('express');
const bodyParser = require('body-parser');
const assignmentRoutes = require('./routes/assignmentRoutes');
const tasksRoutes = require('./routes/tasksRoutes');
const statusRoutes = require('./routes/statusRoutes');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/assignment', assignmentRoutes);
app.use('/tasks', tasksRoutes);
app.use('/status', statusRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
