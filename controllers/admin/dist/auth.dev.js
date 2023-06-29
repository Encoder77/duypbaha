"use strict";

var express = require("express");

var login = require("./login");

var post = require("../post");

var banner = require("../banner");

var category = require("../category");

var profile = require("../profile");

var approvecomment = require("../approvecomment");

var rejectcomment = require("../rejectcomment");

var deletepost = require("../deletepost");

var deletebanner = require("../deletebanner");

var deletecategory = require("../deletecategory");

var updatepost = require("../updatepost");

var updatebanner = require("../updatebanner");

var updatecategory = require("../updatecategory");

var comment = require("../comment");

var register = require("./register");

var router = express.Router(); // const multer = require("multer");

var app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
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
router.post("/createcomment", comment);
module.exports = router;