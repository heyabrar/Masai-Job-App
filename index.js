const express = require('express');

const app = express();

const { connection } = require('./config/db')

app.listen(8080, async () => {
    try {
        await connection;
        console.log({ "message": "Connected To Masai Job App DataBase" })
    } catch (error) {
        console.log(error);
        console.log({ "message": "Failed To Connect Masai Job App DataBase" })
    }
});