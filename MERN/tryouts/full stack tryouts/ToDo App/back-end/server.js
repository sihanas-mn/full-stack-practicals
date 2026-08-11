const express = require('express');
const cors = require('cors')
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/todos', require('./routes/todoRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server executing on port ${PORT}`));