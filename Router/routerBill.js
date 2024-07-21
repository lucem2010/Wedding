const express = require('express');
const modelBill = require('../model/modelBill');
const router = express.Router();
const mongoose = require('mongoose');
const uri = process.env.LINK;

router.get('/list', async (req, res) => {
    try {
        await mongoose.connect(uri);
        let bill = await modelBill.find(); // Chờ cho truy vấn hoàn thành
        res.status(200).json(bill); // Trả về dữ liệu từ kết quả của truy vấn
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' }); // Xử lý lỗi
    }
});
router.post('/add',async(req,res)=>{
    try {
        await mongoose.connect(uri);
        let bill=req.body;
        let result=await modelBill.create(bill);
        
        if (result) {
            res.status(200).send(result);
        }else{
            res.status(401).json({
                mess:'Không thành công'
            })
        }
    } catch (error) {
        console.log(error);
    }
})

router.put('/put/:id', async(req,res)=>{
    try {
        await mongoose.connect(uri);
        let idService=req.params.id;
        let updatedData = req.body;
        let updatedJob = await modelBill.findByIdAndUpdate(idService, updatedData, { new: true });

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

module.exports=router