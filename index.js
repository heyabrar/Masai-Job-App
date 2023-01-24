const express = require('express');
const cors = require('cors');

const app = express();

const { connection } = require('./config/db');
const { UserRouter } = require('./Routes/User.routes');
const { AdminRouter } = require('./Routes/Admin.routes')

app.use(express.json());
app.use(cors());
app.use('/user', UserRouter);

app.use('/admin', AdminRouter);

app.listen(8080, async () => {
    try {
        await connection;
        console.log({ "message": "Connected To Masai Job App DataBase" })
    } catch (error) {
        console.log(error);
        console.log({ "message": "Failed To Connect Masai Job App DataBase" })
    }
});