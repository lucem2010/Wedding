const express = require("express");
const userModel = require("../model/modelUser");
const bcrypt = require("bcrypt"); // Import bcrypt

const router = express.Router();
const mongoose = require("mongoose");

const uri = process.env.LINK;

router.post("/login", async (req, res) => {
    await mongoose.connect(uri);
    console.log("db connect");
    try {
      let user = await userModel.findOne({ email: req.body.email });
      if (user) {
        console.log(user);
        const checkLogin = await bcrypt.compare(req.body.password, user.password);
  
        if (!checkLogin) {
          return res.status(401).send({ msg: "Mật khẩu không đúng" });
        } else {
            user.password=null
          res.status(200).send({user});
        }
      } else {
        console.log(user);
        console.log("lỗi");
        res.status(401).send({ msg: "không tồn tại user" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      mongoose.connection.close();
      console.log("DB connection closed");
    }
  });

router.post("/change-pass", async (req, res) => {
  await mongoose.connect(uri);
  console.log("db connect");

  const { email, newPass, oldPass } = req.body;

  console.log("req.body (backend):", req.body);

  if (typeof newPass !== "string") {
    console.log("error: newPass is not a string");
    return res.status(400).send({ msg: "Mật khẩu mới phải là một chuỗi" });
  }

  try {
    let user = await userModel.findOne({ email: email });
    console.log(user);
    if (user===null) {
      console.log("tk");
      return res.status(401).send({ msg: "Tài khoản không tồn tại" });
    } else {
      const isCheckPass = await bcrypt.compare(oldPass, user.password);
      if (!isCheckPass) {
        console.log("sai pass old");
        return res.status(401).send({ msg: "Mật khẩu cũ không đúng" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashNewPass = await bcrypt.hash(newPass, salt);
      user.password = hashNewPass;
      await user.save();

      res.status(200).send({ msg: "Đổi mật khẩu thành công" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Lỗi hệ thống" });
  }
});

module.exports = router;
