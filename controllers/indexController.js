const { Banner, Views, Posts, } = require('../models/models')
const db = require('../routes/db-config')
const sequelize = require('../config/db')
class indexController {
    

    
async index(req, res) {
    let lang = req.originalUrl.split("/")[1]
    let langs = ['ru', 'tm', 'en']
    if(!langs.includes(lang)){
        lang = 'ru'      
    }
    if(!lang){
        lang ='ru'
    }
    const banners = await Banner.findAll({ raw: true, attributes: [ 
        'id', 'img_name', [`head_text_${lang}`, 'head_text' ], [`desc_text_${lang}`, 'desc_text'], 
     ],
     order: [
        ['id', 'DESC']
    ]
    });
    try {
	const views = await Views.findAll();
    } catch (e) {
	console.log(e);
    }	
    // const views = await Views.findAll()

    try { 
	const view = await Views.findOne({where:{id:1}});
	await Views.update({homepage:view.homepage+1}, {where:{id:1}});
    } catch (e) { console.log(e)}
    
    let pagecount, limitt;
    let old = 0;
    let pagecounter = 1;
    let pageNum = req.query.page;
    let category = req.query.category;
    let filter = req.query.filter;
    let option = req.query.option;
    if(!pageNum){
        pageNum = 1;
    }
    let perPageItems=10;

        old = pageNum * 10 - perPageItems;

    let posts=[];


    if(option){
        if(category){
            if(filter){
                posts = await sequelize.query(`SELECT posts.id, view_count, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_${lang} as title, excerpt_${lang} as excerpt, description_${lang} as description, post_category, count(comments.post_id) as comment_count FROM posts left join comments ON comments.post_id = posts.id and comments.status = "approved" where posts.post_category = '${category}', posts.post_option = '${option}' group by posts.id ORDER BY posts.excerpt_tm ${filter} LIMIT ${old},${perPageItems}`)
            }
            else{
                posts = await sequelize.query(`SELECT posts.id, view_count, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_${lang} as title, excerpt_${lang} as excerpt, description_${lang} as description, post_category, count(comments.post_id) as comment_count FROM posts left join comments ON comments.post_id = posts.id and comments.status = "approved" where posts.post_category = '${category}', posts.post_option = '${option}' group by posts.id ORDER BY posts.id DESC LIMIT ${old},${perPageItems}`)
            }
        }
        else{
            if(filter){
                posts = await sequelize.query(`SELECT posts.id, view_count, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_${lang} as title, excerpt_${lang} as excerpt, description_${lang} as description, post_category, count(comments.post_id) as comment_count FROM posts left join comments ON comments.post_id = posts.id and comments.status = "approved" where posts.post_option = '${option}' group by posts.id ORDER BY posts.excerpt_tm ${filter} LIMIT ${old},${perPageItems}`)
            }
            else{
                posts = await sequelize.query(`SELECT posts.id, view_count, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_${lang} as title, excerpt_${lang} as excerpt, description_${lang} as description, post_category, count(comments.post_id) as comment_count FROM posts left join comments ON comments.post_id = posts.id and comments.status = "approved" where posts.post_option = '${option}' group by posts.id ORDER BY posts.id DESC LIMIT ${old},${perPageItems}`)
            }
        }
    }else{
        if(category){
            if(filter){
                posts = await sequelize.query(`SELECT posts.id, view_count, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_${lang} as title, excerpt_${lang} as excerpt, description_${lang} as description, post_category, count(comments.post_id) as comment_count FROM posts left join comments ON comments.post_id = posts.id and comments.status = "approved" where posts.post_category = '${category}' group by posts.id ORDER BY posts.excerpt_tm ${filter} LIMIT ${old},${perPageItems}`)
            }
            else{
                posts = await sequelize.query(`SELECT posts.id, view_count, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_${lang} as title, excerpt_${lang} as excerpt, description_${lang} as description, post_category, count(comments.post_id) as comment_count FROM posts left join comments ON comments.post_id = posts.id and comments.status = "approved" where posts.post_category = '${category}' group by posts.id ORDER BY posts.id DESC LIMIT ${old},${perPageItems}`)
            }
        }
        else{
            if(filter){
                posts = await sequelize.query(`SELECT posts.id, view_count, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_${lang} as title, excerpt_${lang} as excerpt, description_${lang} as description, post_category, count(comments.post_id) as comment_count FROM posts left join comments ON comments.post_id = posts.id and comments.status = "approved" group by posts.id ORDER BY posts.excerpt_tm ${filter} LIMIT ${old},${perPageItems}`)
            }
            else{
                posts = await sequelize.query(`SELECT posts.id, view_count, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_${lang} as title, excerpt_${lang} as excerpt, description_${lang} as description, post_category, count(comments.post_id) as comment_count FROM posts left join comments ON comments.post_id = posts.id and comments.status = "approved" group by posts.id ORDER BY posts.id DESC LIMIT ${old},${perPageItems}`)
            }
        }
    }
        const categories = await sequelize.query(`SELECT category_${lang} as category, optione, category_slug FROM categories ORDER BY id DESC`, {raw:true})
        const rows2 = await sequelize.query(`SELECT * FROM posts`, {raw:true}) 
        
        if(category){
        pagecount = posts[0].length;
       
        }
        else{
            pagecount = rows2[0].length;
        }
        for(let i=0; i < rows2[0].length; i++){
            if(pagecount <= perPageItems){  
            }
            else{
                pagecount = pagecount - perPageItems;
                pagecounter++;    
            }  
        }
      
        
      let url = req.query.category;
const view = await Views.findOne({where:{id:1}});

    await Views.update({blogpage:view.blogpage+1}, {where:{id:1}});

    res.render("index", { banners, categories, posts:posts[0], categories:categories[0], lang, limit: posts[0].length, pageNum, pagecounter, url, }); 

}
    
async blogPage(req, res) {
    let pagecount, limitt;
    let old = 0;
    let pagecounter = 1;
    let pageNum = req.query.page;
    let category = req.query.category;
    let filter = req.query.filter;
    let option = req.query.option;
    if(!pageNum){
        pageNum = 1;
    }
    let perPageItems=10;

        old = pageNum * 10 - perPageItems;


    let lang = req.originalUrl.split("/")[1]
    let langs = ['ru', 'tm', 'en']
    if(!langs.includes(lang)){
        lang = 'ru'      
    }
    if(!lang){
        lang ='ru'
    }

    let cat = req.originalUrl.split("=")[1]


    let posts=[];

    if(option){
        if(category){
            if(filter){
                posts = await sequelize.query(`SELECT posts.id, view_count, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_${lang} as title, excerpt_${lang} as excerpt, description_${lang} as description, post_category, count(comments.post_id) as comment_count FROM posts left join comments ON comments.post_id = posts.id and comments.status = "approved" where posts.post_category = '${category}', posts.post_option = '${option}' group by posts.id ORDER BY posts.excerpt_tm ${filter} LIMIT ${old},${perPageItems}`)
            }
            else{
                posts = await sequelize.query(`SELECT posts.id, view_count, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_${lang} as title, excerpt_${lang} as excerpt, description_${lang} as description, post_category, count(comments.post_id) as comment_count FROM posts left join comments ON comments.post_id = posts.id and comments.status = "approved" where posts.post_category = '${category}', posts.post_option = '${option}' group by posts.id ORDER BY posts.id DESC LIMIT ${old},${perPageItems}`)
            }
        }
        else{
            if(filter){
                posts = await sequelize.query(`SELECT posts.id, view_count, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_${lang} as title, excerpt_${lang} as excerpt, description_${lang} as description, post_category, count(comments.post_id) as comment_count FROM posts left join comments ON comments.post_id = posts.id and comments.status = "approved" where posts.post_option = '${option}' group by posts.id ORDER BY posts.excerpt_tm ${filter} LIMIT ${old},${perPageItems}`)
            }
            else{
                posts = await sequelize.query(`SELECT posts.id, view_count, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_${lang} as title, excerpt_${lang} as excerpt, description_${lang} as description, post_category, count(comments.post_id) as comment_count FROM posts left join comments ON comments.post_id = posts.id and comments.status = "approved" where posts.post_option = '${option}' group by posts.id ORDER BY posts.id DESC LIMIT ${old},${perPageItems}`)
            }
        }
    }else{
        if(category){
            if(filter){
                posts = await sequelize.query(`SELECT posts.id, view_count, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_${lang} as title, excerpt_${lang} as excerpt, description_${lang} as description, post_category, count(comments.post_id) as comment_count FROM posts left join comments ON comments.post_id = posts.id and comments.status = "approved" where posts.post_category = '${category}' group by posts.id ORDER BY posts.excerpt_tm ${filter} LIMIT ${old},${perPageItems}`)
            }
            else{
                posts = await sequelize.query(`SELECT posts.id, view_count, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_${lang} as title, excerpt_${lang} as excerpt, description_${lang} as description, post_category, count(comments.post_id) as comment_count FROM posts left join comments ON comments.post_id = posts.id and comments.status = "approved" where posts.post_category = '${category}' group by posts.id ORDER BY posts.id DESC LIMIT ${old},${perPageItems}`)
            }
        }
        else{
            if(filter){
                posts = await sequelize.query(`SELECT posts.id, view_count, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_${lang} as title, excerpt_${lang} as excerpt, description_${lang} as description, post_category, count(comments.post_id) as comment_count FROM posts left join comments ON comments.post_id = posts.id and comments.status = "approved" group by posts.id ORDER BY posts.excerpt_tm ${filter} LIMIT ${old},${perPageItems}`)
            }
            else{
                posts = await sequelize.query(`SELECT posts.id, view_count, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_${lang} as title, excerpt_${lang} as excerpt, description_${lang} as description, post_category, count(comments.post_id) as comment_count FROM posts left join comments ON comments.post_id = posts.id and comments.status = "approved" group by posts.id ORDER BY posts.id DESC LIMIT ${old},${perPageItems}`)
            }
        }
    }
        const categories = await sequelize.query(`SELECT category_${lang} as category, optione, category_slug FROM categories ORDER BY id DESC`, {raw:true})

        const rows2 = await sequelize.query(`SELECT * FROM posts`, {raw:true}) 
        
        if(category){
        pagecount = posts[0].length;
       
        }
        else{
            pagecount = rows2[0].length;
        }
        for(let i=0; i < rows2[0].length; i++){
            if(pagecount <= perPageItems){  
            }
            else{
                pagecount = pagecount - perPageItems;
                pagecounter++;    
            }  
        }
      
        
      let url = req.query.category;
      let urle = req.query.filter;
const view = await Views.findOne({where:{id:1}});

    await Views.update({blogpage:view.blogpage+1}, {where:{id:1}});

        res.render("blog", { posts:posts[0], urle, cat,  categories:categories[0], lang, limit: posts[0].length, pageNum, pagecounter, url, });  
 
}


async blogPageId(req, res) {
   
        var lang = req.originalUrl.split("/")[1]
    var langs = ['ru', 'tm', 'en']
    if(!langs.includes(lang)){
        lang = 'ru'      
    }
    if(!lang){
        lang ='ru'
    }
    let sql = `SELECT posts.id, view_count, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_${lang} as title, excerpt_${lang} as excerpt, description_${lang} as description, post_category, count(comments.post_id) as comment_count FROM posts left join comments ON comments.post_id = posts.id and comments.status = "approved" where posts.id=${req.params.id} group by posts.id`;
    let sql2 = `SELECT id, firstname, lastname, comment_text, commenter_mail, post_id, status, date_format(createdAt, '%d/%m/%Y') as createdAt from comments where post_id=${req.params.id} and status="approved" ORDER BY id DESC LIMIT 0, 5`;
    const post = await sequelize.query(sql)
    const comments = await sequelize.query(sql2)
    const categories = await sequelize.query(`SELECT category_${lang} as category, optione, category_slug FROM categories ORDER BY id DESC`)
   
	if(post[0].length == 0){
	res.status(404).render('404');
	}


        var view = Number(post[0][0].view_count)+0.5;
        await sequelize.query(`update posts set view_count=${view} where id=${req.params.id}`)
        view = 0;
        res.render('blog_detail', { post:post[0], categories:categories[0], lang, comments:comments[0]}); 


}

async aboutPage(req, res){
    var lang = req.originalUrl.split("/")[1]
    var langs = ['ru', 'tm', 'en']
    if(!langs.includes(lang)){
        lang = 'ru'      
    }
    if(!lang){
        lang ='ru'
    }
    

const view = await Views.findOne({where:{id:1}});
    await Views.update({aboutpage:view.aboutpage+1}, {where:{id:1}});

    res.render('about-us', {lang,} );

}


async contactPage(req, res){
    var lang = req.originalUrl.split("/")[1]
    var langs = ['ru', 'tm', 'en']
    if(!langs.includes(lang)){
        lang = 'ru'      
    }
    if(!lang){
        lang ='ru'
    }

const view = await Views.findOne({where:{id:1}});
    await Views.update({contactpage:view.contactpage+1}, {where:{id:1}});

        res.render("contact", {lang });
 
}

async cart(req, res){
    var lang = req.originalUrl.split("/")[1]
    var langs = ['ru', 'tm', 'en']
    if(!langs.includes(lang)){
        lang = 'ru'      
    }
    if(!lang){
        lang ='ru'
    }
    let sql = `SELECT * FROM posts`
       const cart_products = await sequelize.query(sql)
        res.render("cart", { lang, limit: cart_products[0].length, cart_products:cart_products[0] });
}


}
module.exports = new indexController()
