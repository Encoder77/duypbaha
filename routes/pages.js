const express = require("express");
const loggedIn = require("../controllers/admin/loggedIn");
const logout = require("../controllers/admin/logout");
const indexController = require('../controllers/indexController')
const adminRouteControllers = require('../controllers/admin/adminRouteControllers')
const db = require("./db-config");
const router = express.Router();
let banners = [];
let posts = [];
let post = [];
let adminposts = [];
let adminpost = [];
let adminbanner = [];
let countposts = [];
let countbanners = [];
let countview = [];
let countpageview = [];

router.get("/", loggedIn, indexController.index) 
router.get("/services", loggedIn, indexController.blogPage) 
router.get('/about-us', indexController.aboutPage)

router.get('/contact', indexController.contactPage) 
router.get("/admin", loggedIn, adminRouteControllers.adminIndex)

router.get("/posts", loggedIn, adminRouteControllers.postsPage) 

router.get("/posts/:id", loggedIn, adminRouteControllers.postsPageId) 

router.get('/createpost', loggedIn, adminRouteControllers.createPost) 

router.get('/postedit/:id', loggedIn, adminRouteControllers.editPost) 


router.get("/banners", loggedIn, adminRouteControllers.bannersPage) 
router.get("/banners/:id", loggedIn, adminRouteControllers.bannersPageId) 
router.get('/banneredit/:id', loggedIn, adminRouteControllers.editBanner) 

router.get('/createbanner', loggedIn, (req, res) => {

    if(req.user){
        res.render('admin/banner/create', { status:"ok"});
    }
    else{
        res.render("admin/login", {status:"no", user:"nothing"});
    }
})

router.get("/profile", loggedIn, adminRouteControllers.editProfile) 


router.get('/logout', logout)

module.exports = router;