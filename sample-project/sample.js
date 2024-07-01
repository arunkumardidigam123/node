const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const Employee = require("./employee");

const app = express();
app.use(bodyParser.json());

const url = 'mongodb+srv://OpusSupervisor:el%40%40chi3699@opus-dev.rwisdom.mongodb.net/sample?retryWrites=true&w=majority&ssl=true';

mongoose.connect(url).then(() => {
    console.log('Connected db successfully');
})

app.get("/", function (req, res) {
    res.end("Sample project started");
});

app.get("/employees", async function (req, res) {
    const results = await Employee.find({});
    res.json(results);
});

app.get("/employees/:employeeId", async function (req, res) {
    const result = await Employee.findOne({ employeeId: parseInt(req.params.employeeId) });
    res.send(result);
});

app.post("/employees", async function (req, res) {
    const result = Employee.create(req.body);
    res.json(result);
});

app.put("/employees/:employeeId", async function (req, res) {
    const result = await Employee.findOneAndReplace({ employeeId: parseInt(req.params.employeeId) }, req.body);
    res.json(result);
});

app.delete("/employees/:employeeId", async function (req, res) {
    const result = await Employee.findOneAndDelete({ employeeId: parseInt(req.params.employeeId) });
    res.send(result);
});


const listerner = async function () {
    console.log("Server started....");
};

const server = app.listen(3000, listerner);