const express = require("express");
const Task = require("../model/task"); // Task model
const Employee = require("../model/employee"); // Employee model
const {verify_token} = require('../jwt') ;

const router = express.Router();

// ✅ 1. Get all tasks
router.get("/",verify_token  ,async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error });
    }
});

// ✅ 2. Get all tasks of one employee by Employee ID
router.get("/:employeeId",verify_token  ,async (req, res) => {
    try {
        const { employeeId } = req.params;
        const employee = await Employee.findById(employeeId);

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json(employee.tasks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error });
    }
});

// ✅ 3. Create a new task for an employee
router.post("/:employeeId",verify_token  ,async (req, res) => {
    try {
        const { employeeId } = req.params;
        const { title, description, date, category, active, newTask, completed, failed } = req.body;

        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        const newTaskObj = {
            title,
            description,
            date,
            category,
            active: active || false,
            newTask: newTask || true,
            completed: completed || false,
            failed: failed || false,
        };

        employee.tasks.push(newTaskObj);
        await employee.save();

        res.status(201).json({ message: "Task added successfully", task: newTaskObj });
    } catch (error) {
        res.status(500).json({ message: "Error creating task", error });
    }
});

// ✅ 4. Update a task of an employee
router.put("/:employeeId/:taskId",verify_token  ,async (req, res) => {
    try {
        console.log("fjedhd" , req.body) ;
        const { employeeId, taskId } = req.params;
        const updateData = req.body;

        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        const task = employee.tasks.id(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" , task : task ,employee : employee});
        }

        Object.assign(task, updateData); // Update task fields
        await employee.save();

        res.status(200).json({ message: "Task updated successfully", task });
    } catch (error) {
        res.status(500).json({ message: "Error updating task", error });
    }
});

module.exports = router;
