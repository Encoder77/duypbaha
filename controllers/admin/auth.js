const express = require("express");
const login = require("./login");
const post = require("../post");
const banner = require("../banner");
const category = require("../category");
const profile = require("../profile");
const approvecomment = require("../approvecomment");
const rejectcomment = require("../rejectcomment");
const send = require("../send");
const deletepost = require("../deletepost");
const deletebanner = require("../deletebanner");
const deletecategory = require("../deletecategory");
const updatepost = require("../updatepost");
const updatebanner = require("../updatebanner");
const updatecategory = require("../updatecategory");
const comment = require("../comment");
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
router.post("/createcategory", category);
router.post("/approvecomment", approvecomment);
router.post("/rejectcomment", rejectcomment);
router.post("/deletepost", deletepost);
router.post("/deletebanner", deletebanner);
router.post("/deletecategory", deletecategory);
router.post("/updatepost", updatepost);
router.post("/updatebanner", updatebanner);
router.post("/updatecategory", updatecategory);
router.post("/send", send);
router.post("/createcomment", comment);







module.exports = router;