const express = require("express");
const loggedIn = require("../controllers/admin/loggedIn");
const logout = require("../controllers/admin/logout");
const indexController = require('../controllers/indexController')
const adminRouteControllers = require('../controllers/admin/adminRouteControllers')
const db = require("./db-config");
const router = express.Router();
let services = [];
let banners = [];
let most_viewed = [];
let service = [];
let posts = [];
let categories = [];
let post = [];
let comments = [];
let adminposts = [];
let adminservices = [];
let admincategories = [];
let adminpost = [];
let admincomment = [];
let adminbanner = [];
let countservices = [];
let countposts = [];
let countcategories = [];
let countcomments = [];
let countbanners = [];
let countview = [];
let countpageview = [];

router.get("/", loggedIn, indexController.index) 

router.get("/admin", loggedIn, adminRouteControllers.adminIndex)

router.get('/blog', indexController.blogPage)

router.get('/blog/:id', indexController.blogPageId)


router.get('/about-us', indexController.aboutPage)

router.get('/services', indexController.servicesPage) 
router.get('/services/:id', indexController.servicesPageId) 

router.get('/contact', indexController.contactPage) 



router.get("/posts", loggedIn, adminRouteControllers.postsPage) 

router.get("/posts/:id", loggedIn, adminRouteControllers.postsPageId) 

router.get('/createpost', loggedIn, adminRouteControllers.createPost) 

router.get('/postedit/:id', loggedIn, adminRouteControllers.editPost) 

router.get("/service", loggedIn, adminRouteControllers.servicePage) 
router.get("/createservice", loggedIn, adminRouteControllers.createServicePage) 
router.get("/service/:id", loggedIn, adminRouteControllers.servicePageId) 
router.get('/serviceedit/:id', loggedIn, adminRouteControllers.editService) 

router.get("/categories", loggedIn, adminRouteControllers.categoriesPage) 

router.get("/categories/:id", loggedIn, adminRouteControllers.categoriesPageId) 

router.get('/categoryedit/:id', loggedIn, adminRouteControllers.editCategory) 

router.get('/createcategory', loggedIn, (req, res) => {

    if(req.user){
        res.render('admin/category/create', { status:"ok"});
    }
    else{
        res.render("admin/login", {status:"no", user:"nothing"});
    }
})


router.get("/comments", loggedIn, adminRouteControllers.commentsPage) 

router.get("/comments/:id", loggedIn, adminRouteControllers.commentsPageId) 


router.get('/commentedit/:id', loggedIn, adminRouteControllers.editComment) 

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