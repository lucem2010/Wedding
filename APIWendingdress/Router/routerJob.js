const express = require('express');
const jobModel = require('../model/modeJob');

const router = express.Router();
const mongoose = require('mongoose');

const env = require('dotenv').config();
const uri = process.env.LINK;

router.get('/list', async (req, res) => {
    try {
        await mongoose.connect(process.env.LINK);
        let result = await jobModel.find();
        if (result) {
            res.status(200).send(result);
        } else {
            res.json({
                mess: "Không thành công"
            })
        }
    } catch (error) {
        console.log(error);
    }
})

router.post('/add', async (req, res) => {
    try {
        await mongoose.connect(uri);
        let job = req.body;
        let result = await jobModel.create(job);
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(401).json({
                mess: 'không thành công'
            })
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi');
    }
});

router.put('/update_job/:id', async (req, res) => {
    try {
        await mongoose.connect(uri);
        let idJob = req.params.id;
        let updatedData = req.body;
        let updatedJob = await jobModel.findByIdAndUpdate(idJob, updatedData, { new: true });

        if (updatedJob) {
            res.status(200).send("Thành công");
        } else {
            res.status(404).send("Không tìm thấy công việc");
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('Lỗi');
    }
})



module.exports = router;


