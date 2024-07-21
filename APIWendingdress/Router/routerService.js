const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Service = require('../model/modelService')
const uri = process.env.LINK
router.get('/list', async (req, res) => {
    try {
        await mongoose.connect(process.env.LINK);
        console.log("connect")
        let data = await Service.find();
        console.log("connect")
        console.log(data);
        res.send(data);
    } catch (error) {
        console.log(error);
    }
})
router.post('/add', async (req, res) => {
    try {
        const con = await mongoose.connect(uri)
        if (con.connection.readyState == 1) console.log("DB connect succesFully")
        else console.log("DB connecting")

        // const { nameService, statusService, descriptionService, priceService ,img} = req.body
        // if (!nameService||!statusService||!descriptionService||!priceService||!img)
        //     return res.status(400).json({
        //         sucess:false,
        //         mes: "fail"
        //     })
          
        const response = await Service.create(req.body)
        console.log("connect")
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
   

})

router.put('/put/:id', async(req,res)=>{
    try {
        await mongoose.connect(uri);
        let idService=req.params.id;
        let updatedData = req.body;
        let updatedJob = await Service.findByIdAndUpdate(idService, updatedData, { new: true });

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
router.delete('/delete', async(req,res)=>{
    try {
        let idService=req.params.id;
        let deleteService=await Service.findByIdAndDelete(idService);
        if (!deleteService) {
            return res.status(404).json({ message: 'Không tìm thấy job' });
        }
        
        res.json({ message: 'Đã xóa thành công', deleteService });
    } catch (error) {
        console.log(error);
        res.status(500).send('Lỗi');
    }
})

module.exports = router