const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require('mongodb');

const app = express();
app.use(bodyParser.json());

const url = 'mongodb+srv://OpusSupervisor:el%40%40chi3699@opus-dev.rwisdom.mongodb.net';
const client = new MongoClient(url);
const db = client.db("sample");

app.get("/", function (req, res) {
    res.end("Sample project started");
});

app.get("/employees", async function (req, res) {
    const results = await db.collection('employee').find().toArray();
    res.send(results);
});

app.get("/employees/:employeeId", async function (req, res) {
    const result = await db.collection('employee').findOne({ employeeId: parseInt(req.params.employeeId) });
    res.send(result);
});

app.post("/employees", async function (req, res) {
    const result = await db.collection('employee').insertOne(req.body);
    res.send(result);
});

app.put("/employees/:employeeId", async function (req, res) {
    const result = await db.collection('employee').findOneAndReplace({ employeeId: parseInt(req.params.employeeId) }, req.body);
    res.send(result);
});

app.delete("/employees/:employeeId", async function (req, res) {
    const result = await db.collection('employee').findOneAndDelete({ employeeId: parseInt(req.params.employeeId) });
    res.send(result);
});


const listerner = async function () {
    console.log("Server started....");

    await client.connect();
    console.log('Connected db successfully');
};

const server = app.listen(3000, listerner);
