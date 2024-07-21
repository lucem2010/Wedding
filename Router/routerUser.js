const express = require('express');
const router = express.Router();

const userModel = require('../model/modelUser');
const mongoose = require('mongoose');

const uri = process.env.LINK;

router.get('/list', async (req, res) => {
    try {
        await mongoose.connect(process.env.LINK);
        let users = await userModel.find();
        console.log(users);
        res.send(users);
    } catch (error) {
        console.log(error);
    }
});

router.post('/add', async(req,res)=>{
    try {
        await mongoose.connect(uri);
        let user=req.body;
        const response= await userModel.create(user);

        if (response) {
            res.status(200).json(response);
        }else{
            res.status(401).json({
                mess:'Không thành công'
            })
        }
    } catch (error) {
        console.log(error);
    }
})

router.put('/update/:id', async(req,res)=>{
    try {
        await mongoose.connect(uri);
        let idUser=req.params.id;
        let updateData=req.body;

        let result=userModel.findByIdAndUpdate(idUser, updateData, {new:true})

        if (result) {
            res.status(200).send("Thành công");
        } else {
            res.status(404).send("Không tìm thấy người dùng")
        }
    } catch (error) {
        console.log(error);
    }
})
module.exports = router