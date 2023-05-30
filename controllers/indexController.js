const { Banner, Views, Posts, } = require('../models/models')
const db = require('../routes/db-config')
const sequelize = require('../config/db')


class indexController {
    

    
async index(req, res) {
    let lang = req.originalUrl.split("/")[1]
    let langs = ['ru', 'tm']
    if(!langs.includes(lang)){
        lang = 'ru'      
    }
    if(!lang){
        lang ='ru'
    }
    const banners = await Banner.findAll({ raw: true, attributes: [ 
        'id', 'img_name', [`head_text_${lang}`, 'head_text' ], [`desc_text_${lang}`, 'desc_text'], 'pic_name'
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
    if(!pageNum){
        pageNum = 1;
    }
    let perPageItems=10;

        old = pageNum * 10 - perPageItems;


    if(!langs.includes(lang)){
        lang = 'ru'      
    }
    if(!lang){
        lang ='ru'
    }


    let posts=[];

    let filter = req.originalUrl.split("/")[2]
    let filters = ['DESC', 'ASC']
    if(!filters.includes(filter)){
        filter = 'DESC'      
    }
    if(!filter){
        filter ='DESC'
    }

    if(category){
        posts = await sequelize.query(`SELECT posts.id, view_count, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_${lang} as title, excerpt_${lang} as excerpt, description_${lang} as description, post_category, count(comments.post_id) as comment_count FROM posts left join comments ON comments.post_id = posts.id and comments.status = "approved" where posts.post_category = '${category}' group by posts.id ORDER BY posts.excerpt_tm ${filter} LIMIT ${old},${perPageItems}`)
    }
    else{
        posts = await sequelize.query(`SELECT posts.id, view_count, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_${lang} as title, excerpt_${lang} as excerpt, description_${lang} as description, post_category, count(comments.post_id) as comment_count FROM posts left join comments ON comments.post_id = posts.id and comments.status = "approved" group by posts.id ORDER BY posts.excerpt_tm ${filter} LIMIT ${old},${perPageItems}`)
    }
        const categories = await sequelize.query(`SELECT category_${lang} as category, optione, category_slug FROM categories ORDER BY id DESC`, {raw:true})
        const services = await sequelize.query(`SELECT id, service_pic, service_name_${lang} as service_name, service_excerpt_${lang} as service_excerpt, service_description_${lang} as service_description FROM services ORDER BY id DESC`, {raw:true})
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

    res.render("index", { banners,  lang, filter,  categories, posts:posts[0], categories:categories[0], lang, limit: posts[0].length, pageNum, pagecounter, url, services:services[0]}); 

}
    
async blogPage(req, res) {
    let pagecount, limitt;
    let old = 0;
    let pagecounter = 1;
    let pageNum = req.query.page;
    let category = req.query.category;
    if(!pageNum){
        pageNum = 1;
    }
    let perPageItems=10;

        old = pageNum * 10 - perPageItems;


    let lang = req.originalUrl.split("/")[1]
    let langs = ['ru', 'tm']
    if(!langs.includes(lang)){
        lang = 'ru'      
    }
    if(!lang){
        lang ='ru'
    }


    let posts=[];



    let filter = req.originalUrl.split("/")[3]
    let filters = ['DESC', 'ASC']
    if(!filters.includes(filter)){
        filter = 'DESC'      
    }
    if(!filter){
        filter ='DESC'
    }

    if(category){
        posts = await sequelize.query(`SELECT posts.id, view_count, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_${lang} as title, excerpt_${lang} as excerpt, description_${lang} as description, post_category, count(comments.post_id) as comment_count FROM posts left join comments ON comments.post_id = posts.id and comments.status = "approved" where posts.post_category = '${category}' group by posts.id ORDER BY posts.excerpt_tm ${filter} LIMIT ${old},${perPageItems}`)
    }
    else{
        posts = await sequelize.query(`SELECT posts.id, view_count, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_${lang} as title, excerpt_${lang} as excerpt, description_${lang} as description, post_category, count(comments.post_id) as comment_count FROM posts left join comments ON comments.post_id = posts.id and comments.status = "approved" group by posts.id ORDER BY posts.excerpt_tm ${filter} LIMIT ${old},${perPageItems}`)
    }
        const categories = await sequelize.query(`SELECT category_${lang} as category, optione, category_slug FROM categories ORDER BY id DESC`, {raw:true})

        const services = await sequelize.query(`SELECT id, service_pic, service_name_${lang} as service_name, service_excerpt_${lang} as service_excerpt, service_description_${lang} as service_description FROM services ORDER BY id DESC`, {raw:true})
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

        res.render("blog", { posts:posts[0], filter, categories:categories[0], lang, limit: posts[0].length, pageNum, pagecounter, url, services:services[0]});  
 
}


async blogPageId(req, res) {
   
        var lang = req.originalUrl.split("/")[1]
    var langs = ['ru', 'tm']
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
    const services = await sequelize.query(`SELECT id, service_pic, service_name_${lang} as service_name, service_excerpt_${lang} as service_excerpt, service_description_${lang} as service_description FROM services ORDER BY id DESC`)
   
	if(post[0].length == 0){
	res.status(404).render('404');
	}


        var view = Number(post[0][0].view_count)+0.5;
        await sequelize.query(`update posts set view_count=${view} where id=${req.params.id}`)
        view = 0;
        res.render('blog_detail', { post:post[0], categories:categories[0], lang, comments:comments[0], services:services[0]}); 


}

async aboutPage(req, res){
    var lang = req.originalUrl.split("/")[1]
    var langs = ['ru', 'tm']
    if(!langs.includes(lang)){
        lang = 'ru'      
    }
    if(!lang){
        lang ='ru'
    }
    const services = await sequelize.query(`SELECT id, service_pic, service_name_${lang} as service_name, service_excerpt_${lang} as service_excerpt, service_description_${lang} as service_description FROM services ORDER BY id DESC`)

const view = await Views.findOne({where:{id:1}});
    await Views.update({aboutpage:view.aboutpage+1}, {where:{id:1}});

    res.render('about-us', {lang, services:services[0]} );

}

async servicesPage(req, res){
    var lang = req.originalUrl.split("/")[1]
    var langs = ['ru', 'tm']
    if(!langs.includes(lang)){
        lang = 'ru'      
    }
    if(!lang){
        lang ='ru'
    }
    const services = await sequelize.query(`SELECT id, service_pic, service_name_${lang} as service_name, service_excerpt_${lang} as service_excerpt, service_description_${lang} as service_description FROM services ORDER BY id DESC`)

const view = await Views.findOne({where:{id:1}});
    await Views.update({servicepage:view.servicepage+1}, {where:{id:1}});

        res.render("services", { services:services[0], lang }); 
}

async servicesPageId(req, res){
    var san = 1.5;
    var lang = req.originalUrl.split("/")[1]
    var langs = ['ru', 'tm']
    if(!langs.includes(lang)){
        lang = 'ru'      
    }
    if(!lang){
        lang ='ru'
    }
    let sql = `SELECT id, service_pic, service_name_${lang} as service_name, service_excerpt_${lang} as service_excerpt, service_description_${lang} as service_description, view_count FROM services WHERE id=${req.params.id} ORDER BY id DESC`;
    let sql2 = `SELECT id, service_pic, service_name_${lang} as service_name, service_excerpt_${lang} as service_excerpt, service_description_${lang} as service_description, view_count FROM services ORDER BY view_count DESC LIMIT 0,2`;
          

    const service = await sequelize.query(sql)
    const most_viewed = await sequelize.query(sql2)
 
    const services = await sequelize.query(`SELECT id, service_pic, service_name_${lang} as service_name, service_excerpt_${lang} as service_excerpt, service_description_${lang} as service_description FROM services ORDER BY id DESC`)
	if(service[0].length == 0){
	res.status(404).render('404');
}
        var viewses = Number(service[0][0].view_count)
        var viewser = 0.5 + viewses;
        await sequelize.query(`update services set view_count=${viewser} where id=${req.params.id}`)
        viewser = 0;
        viewses = 0;
        res.render('detail', { service:service[0],most_viewed:most_viewed[0], services:services[0], lang}); 

}

async contactPage(req, res){
    var lang = req.originalUrl.split("/")[1]
    var langs = ['ru', 'tm']
    if(!langs.includes(lang)){
        lang = 'ru'      
    }
    if(!lang){
        lang ='ru'
    }
    const services = await sequelize.query(`SELECT id, service_pic, service_name_${lang} as service_name, service_excerpt_${lang} as service_excerpt, service_description_${lang} as service_description FROM services ORDER BY id DESC`)

const view = await Views.findOne({where:{id:1}});
    await Views.update({contactpage:view.contactpage+1}, {where:{id:1}});

        res.render("contact", { services:services[0], lang });
 
}



}
module.exports = new indexController()
