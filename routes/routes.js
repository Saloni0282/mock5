const express = require('express');
const router = express.Router();
const { UserModel } = require("../model/model");

router.get('/retrieve', async (req, res) => { 
    try {
        const users = await UserModel.find(); 
        res.send(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/submit', async (req, res) => {
    try {
        const { name, email, destination, travelers, budget } = req.body;
        const isUserPresent = await UserModel.findOne({ email });
        if (isUserPresent) {
            return res.status(400).json({ msg: "User already exists" });
        } else {
            const addUser = new UserModel({ name, email, destination, travelers, budget });
            await addUser.save();
            res.status(201).json({ msg: "User added successfully" }); 
        }
    } catch (error) {
        res.status(500).json({ msg: "Could not add user", error: error });
    }
});

router.get("/user/desc", async (req, res) => {
    try {
        const users = await UserModel.find().sort({ budget: -1 });

        res.status(201).json(users);
    } catch (error) {

        console.log(error);
        res.status(500).json({ error: "Failed to sorted" });
    }
});


router.get("/user/destination/:destination", async (req, res) => {
    const { destination } = req.params;
    try {
        const users = await UserModel.find({ destination: destination });
        res.status(201).json(users);
    } catch (error) {

        console.log(error);
        res.status(500).json({ error: "Failed to filtered" });
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await UserModel.findByIdAndDelete({ _id: id });
        res.json({ msg: "User deleted" }); 
    } catch (error) {
        res.status(500).json({ msg: "Could not delete user", error: error.message });
    }
});

module.exports = {router};
