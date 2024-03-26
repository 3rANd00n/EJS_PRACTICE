const connectDB = require('./db/connect');
const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
require('dotenv').config();

const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to my Task Manager Project');
});

app.use('/api/v1/tasks', tasks);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`app is listening on port ${port}...`));
    }
    catch (error) {
        console.log(error);
    }
}

start();