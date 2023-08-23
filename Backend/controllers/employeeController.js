const employeeModel = require('../models/employee');

function add(req, res) {
    employeeModel.create({ ...req.body }, (err, userData) => {
        if (!err) return res.status(201).json(userData);
        res.status(500).json({ Error: "DB error" });
    })
}

function list(req, res) {
    let employees = []
    employeeModel.find({}, (err, data) => {
        employees = data
        if (!err) return res.status(201).json(authors);
        res.status(500).json({ Error: "DB error" });
    })
}


function getById(req, res) {
    const { id } = req.params
    employeeModel.findById(id, (err, data) => {
        employee = data
        if (!err) return res.status(200).json(employee)
        res.status(500).json({ Error: "DB_error" })
    })
}


function edit(req, res) {
    const { id } = req.params
    let { firstName } = req.body
    let { lastName } = req.body
    let { email } = req.body
    let { role } = req.body
    employeeModel.findByIdAndUpdate(id, { firstName, lastName, email, role }, (err) => {
        if (!err) {
            employeeModel.findById(id, (err, data) => {
                if (!err) return res.status(201).json(data)
                console.log(err)
                res.status(500).json({ Error: "DB_error" })
            })
        }
        else {
            console.log(err);
        }
    })

}

module.exports = { add, list, getById, edit }