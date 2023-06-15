const {  Banner, Views, Posts, Categories, Comments } = require('../../models/models')
const sequelize = require('../../config/db')

class adminRouteControllers {
    
    async adminIndex(req, res) {
            if(req.user){
                
                const countPosts = await Posts.count()
                const countCategories = await Categories.count()
                const countComments = await Comments.count()
                const countBanners = await Banner.count()
		const view = await Views.findOne({where:{id:1}});

                // countViews = await Views.count()   
        

                    res.render("admin/dashboard", {status:"ok", user:req.user,  countp:countPosts, countk:countCategories, countkom:countComments, countban:countBanners, view});
            }
            else{
                res.render("admin/login", {status:"no", user:"nothing"});
            }
        }


    async postsPage(req, res){

        const rows = await sequelize.query(`SELECT posts.id as id, view_count, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_ru as title, excerpt_ru as excerpt, title_en as title, excerpt_en as excerpt, description_ru as description, post_category, count(comments.post_id) as comment_count FROM posts left join comments ON comments.post_id = posts.id and comments.status = "approved" group by posts.id ORDER BY posts.id DESC`)
            if(req.user){
                res.render("admin/posts", {status:"ok", posts:rows[0] });
            }
            else{
                res.render("admin/login", {status:"no", user:"nothing"});
            }
            
        }


    async postsPageId(req, res){
        let sql = `SELECT posts.id as id, view_count, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_ru, title_tm, title_en, excerpt_ru, excerpt_en, excerpt_tm, description_ru, description_tm, post_category, count(comments.post_id) as comment_count FROM posts left join comments ON comments.post_id = posts.id and comments.status = "approved" where posts.id=${req.params.id} group by posts.id`;
        let sql2 = `SELECT * from comments where post_id=${req.params.id} and status="approved" ORDER BY id DESC LIMIT 0, 5`;
        const adminposts = await sequelize.query(sql)
        const comments = await sequelize.query(sql2)

     if(req.user){
        res.render("admin/post", { post:adminposts[0], comments:comments[0] });
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
    let sql = `SELECT posts.id as id, view_count, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_ru, title_tm, title_en, excerpt_ru, excerpt_tm, excerpt_en, description_ru, description_tm, description_en, post_category, post_option, count(comments.post_id) as comment_count FROM posts left join comments ON comments.post_id = posts.id and comments.status = "approved" where posts.id=${req.params.id} group by posts.id`;
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


async categoriesPage(req, res){
    const rows = await sequelize.query(`SELECT id, category_ru as category, date_format(createdAt, '%d/%m/%Y') as createdAt FROM categories ORDER BY id DESC`)
        if(req.user){
            res.render("admin/categories", {status:"ok", categories:rows[0] });
        }
        else{
            res.render("admin/login", {status:"no", user:"nothing"});
        }
    }


async categoriesPageId(req, res){
    let sql = `SELECT id,  category_ru, category_tm, category_en, date_format(createdAt, '%d/%m/%Y') as createdAt from categories where id=${req.params.id}`;
    const result = await sequelize.query(sql)
    if(req.user){
        res.render('admin/category_detail', { status:"ok", categories:result[0] });
    }
    else{
        res.render("admin/login", {status:"no", user:"nothing"});
    }
}

async editCategory(req, res){
    let sql = `SELECT id, optione, category_ru, category_tm, category_en, date_format(createdAt, '%d/%m/%Y') as createdAt from categories where id=${req.params.id}`;
    const admincategories = await sequelize.query(sql)
if(req.user){

        res.render("admin/category/edit", { id:req.params.id, categories:admincategories[0][0]});

}
else{
    res.render("admin/login", {status:"no", user:"nothing"});
}
}


async commentsPage(req, res){
    const rows = await sequelize.query(`SELECT *, date_format(createdAt, '%d/%m/%Y') as createdAt FROM comments ORDER BY id DESC`)
        if(req.user){
            res.render("admin/comments", {status:"ok", comments:rows[0] });
        }
        else{
            res.render("admin/login", {status:"no", user:"nothing"});
        }
}

async commentsPageId(req, res){
    let sql = `SELECT *, date_format(createdAt, '%d/%m/%Y') as createdAt from comments where id=${req.params.id}`;
    const admincomment = await sequelize.query(sql)

    let sql2 = `SELECT *,  date_format(createdAt, '%d/%m/%Y') as createdAt from posts where id=${admincomment[0][0].post_id}`;
    const adminpost = await sequelize.query(sql2)

    

    if(req.user){
        res.render("admin/comment_detail", { id:req.params.id, comment:admincomment[0], post:adminpost[0]});
    }
    else{
    res.render("admin/login", {status:"no", user:"nothing"});
    }
}

async editComment(req, res){
    let sql = `SELECT *, date_format(createdAt, '%d/%m/%Y') as createdAt from comments where id=${req.params.id}`;
    const admincomment = await sequelize.query(sql)
if(req.user){
        res.render("admin/comment/edit", { id:req.params.id, comment:admincomment[0][0]});

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
