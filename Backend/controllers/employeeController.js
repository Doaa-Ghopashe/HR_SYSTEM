const employeeModel = require('../models/employee'),

    add = async (req, res) => {
        try {

            const employeeData = await employeeModel.create({ ...req.body });

            res.status(200).json({
                status: "success",
                data: {
                    employeeData,
                },
            });
        } catch (error) {
            res.status(404).json({
                status: "failed",
                err: error.message,
            });
        }
    },

    list = async (req, res) => {
        try {
            let employees = await employeeModel.find();
            res.status(200).json({
                status: "success",
                data: {
                    employees,
                },
            });
        } catch {
            res.status(404).json({
                status: "failed",
                err: error.message,
            });
        }
    },

    getById = async (req, res) => {
        try {
            const { id } = req.params
            const employeeData = await employeeModel.findById({ _id: id });

            res.status(200).json({
                status: "success",
                data: {
                    employeeData,
                },
            });
        } catch (error) {
            res.status(404).json({
                status: "failed",
                err: error.message,
            });
        }

    },

    edit = async (req, res) => {
        try {
            const { id } = req.params;
            const data = {
                firstName: req.body.firstname,
                lastName: req.body.lastname,
                email: req.body.email,
                role: req.body.role,
            };
            await employeeModel.findOneAndUpdate({ _id: id }, data);
            res.status(200).json({
                status: "success",
                data: "Updated employee info successfully",
            });
        } catch (error) {
            res.status(401).json({
                status: "failed",
                err: error.message,
            });
        }
    };


module.exports = { add, list, getById, edit }