const express = require("express");
const login = require("./login");
const post = require("../post");
const banner = require("../banner");
const profile = require("../profile");
const deletepost = require("../deletepost");
const deletebanner = require("../deletebanner");
const updatepost = require("../updatepost");
const register = require("./register");
const router = express.Router();

// const multer = require("multer");



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


router.post("/login", login);
router.post("/registration", register);
router.post("/createpost", post);
router.post("/profile", profile);
router.post("/createbanner", banner);
router.post("/deletepost", deletepost);
router.post("/deletebanner", deletebanner);
router.post("/updatepost", updatepost);






module.exports = router;