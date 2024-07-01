const mongoose = require("mongoose");

const employee = new mongoose.Schema({
    name: String,
    employeeId: Number,
    joiningDate: Date
});
const Employee = mongoose.model("employee", employee);

module.exports = Employee;