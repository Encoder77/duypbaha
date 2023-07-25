const {  Banner, Views, Posts, Categories } = require('../../models/models')
const sequelize = require('../../config/db')

class adminRouteControllers {
    
    async adminIndex(req, res) {
            if(req.user){
                
                const countPosts = await Posts.count()
                const countBanners = await Banner.count()
		const view = await Views.findOne({where:{id:1}});

                // countViews = await Views.count()   
        

                    res.render("admin/dashboard", {status:"ok", user:req.user,  countp:countPosts,  countban:countBanners, view});
            }
            else{
                res.render("admin/login", {status:"no", user:"nothing"});
            }
        }


    async postsPage(req, res){

        const rows = await sequelize.query(`SELECT posts.id as id, view_count, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_ru as title, excerpt_ru as excerpt, title_en as title, excerpt_en as excerpt, description_ru as description, post_category FROM posts group by posts.id ORDER BY posts.id DESC`)
            if(req.user){
                res.render("admin/posts", {status:"ok", posts:rows[0] });
            }
            else{
                res.render("admin/login", {status:"no", user:"nothing"});
            }
            
        }


    async postsPageId(req, res){
        let sql = `SELECT posts.id as id, view_count, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_ru, title_tm, title_en, excerpt_ru, excerpt_en, excerpt_tm, description_ru, description_tm, post_category FROM posts where posts.id=${req.params.id} group by posts.id`;
        const adminposts = await sequelize.query(sql)

     if(req.user){
        res.render("admin/post", { post:adminposts[0] });
    }
    else{
        res.render("admin/login", {status:"no", user:"nothing"});
    }
    }

async createPost(req, res){
    let sql = `SELECT category_ru as category, category_slug, optione FROM categories ORDER BY id DESC`;
    const categories = await sequelize.query(sql)
    if(req.user){
        res.render('admin/post/create', { status:"ok", categories:categories[0] });
    }
    else{
        res.render("admin/login", {status:"no", user:"nothing"});
    }
}

async editPost(req, res){
    let sql = `SELECT posts.id as id, view_count, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_ru, title_tm, title_en, excerpt_ru, excerpt_tm, excerpt_en, description_ru, description_tm, description_en, post_category, post_option where posts.id=${req.params.id} group by posts.id`;
    let sql2 = `SELECT category_ru as category, category_slug, optione FROM categories ORDER BY id DESC`;
    const adminposts = await sequelize.query(sql)
    const categories = await sequelize.query(sql2)

if(req.user){
        res.render("admin/post/edit", { id:req.params.id, post:adminposts[0][0], categories:categories[0] });    
}
else{
    res.render("admin/login", {status:"no", user:"nothing"});
}
}


async bannersPage(req, res){
    const rows = await sequelize.query(`SELECT *, date_format(createdAt, '%d/%m/%Y') as createdAt FROM banners ORDER BY id DESC`)
        if(req.user){
            res.render("admin/banners", {status:"ok", banners:rows[0] });
        }
        else{
            res.render("admin/login", {status:"no", user:"nothing"});
        }
}

async bannersPageId(req, res){
    let sql = `SELECT *, date_format(createdAt, '%d/%m/%Y') as createdAt from banners where id=${req.params.id}`;
    const result = await sequelize.query(sql)
    if(req.user){
        res.render('admin/banner_detail', { status:"ok", banner:result[0] });
    }
    else{
        res.render("admin/login", {status:"no", user:"nothing"});
    }
}

async editBanner(req, res){
    let sql = `SELECT *, date_format(createdAt, '%d/%m/%Y') as createdAt from banners where id=${req.params.id}`;
    const adminbanner = await sequelize.query(sql)
if(req.user){

        res.render("admin/banner/edit", { id:req.params.id, banner:adminbanner[0][0]});
  
}
else{
    res.render("admin/login", {status:"no", user:"nothing"});
}
}

async editProfile(req, res){
    const rows = await sequelize.query(`SELECT * FROM users WHERE email = '${req.user.email}'`)
        if(req.user){
            res.render("admin/profile", {status:"ok", data:rows[0], user:req.user.email });
        }
        else{
            res.render("admin/login", {status:"no", user:"nothing"});
        }

}
}
module.exports = new adminRouteControllers()
