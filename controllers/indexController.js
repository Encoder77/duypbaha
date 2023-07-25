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
    if(!pageNum){
        pageNum = 1;
    }
    let perPageItems=10;

        old = pageNum * 10 - perPageItems;

    let posts=[];


                posts = await sequelize.query(`SELECT posts.id, view_count, post_option, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_${lang} as title, excerpt_${lang} as excerpt, description_${lang} as description, post_category FROM posts group by posts.id ORDER BY posts.id DESC`)

        const rows2 = await sequelize.query(`SELECT * FROM posts`, {raw:true}) 

            pagecount = rows2[0].length;
        for(let i=0; i < rows2[0].length; i++){
            if(pagecount <= perPageItems){  
            }
            else{
                pagecount = pagecount - perPageItems;
                pagecounter++;    
            }  
        }
      
const view = await Views.findOne({where:{id:1}});

    await Views.update({blogpage:view.blogpage+1}, {where:{id:1}});

    res.render("index", { banners, posts:posts[0],  lang, limit: posts[0].length, pageNum, pagecounter, }); 

}
    
async blogPage(req, res) {
    let pagecount, limitt;
    let old = 0;
    let pagecounter = 1;
    let pageNum = req.query.page;
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


    let posts=[];

                posts = await sequelize.query(`SELECT posts.id, view_count, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_${lang} as title, excerpt_${lang} as excerpt, description_${lang} as description, post_category FROM posts group by posts.id ORDER BY posts.id DESC LIMIT ${old},${perPageItems}`)

        const rows2 = await sequelize.query(`SELECT * FROM posts`, {raw:true}) 
        
            pagecount = rows2[0].length;
        for(let i=0; i < rows2[0].length; i++){
            if(pagecount <= perPageItems){  
            }
            else{
                pagecount = pagecount - perPageItems;
                pagecounter++;    
            }  
        }
const view = await Views.findOne({where:{id:1}});

    await Views.update({blogpage:view.blogpage+1}, {where:{id:1}});

        res.render("services", { posts:posts[0], lang, limit: posts[0].length, pageNum, pagecounter,});  
 
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
    let sql = `SELECT posts.id, view_count, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_${lang} as title, excerpt_${lang} as excerpt, description_${lang} as description, post_category where posts.id=${req.params.id} group by posts.id`;
    const post = await sequelize.query(sql)
	if(post[0].length == 0){
	res.status(404).render('404');
	}


        var view = Number(post[0][0].view_count)+0.5;
        await sequelize.query(`update posts set view_count=${view} where id=${req.params.id}`)
        view = 0;
        res.render('blog_detail', { post:post[0],   lang, }); 


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

    res.render('about', {lang,} );

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

}
module.exports = new indexController()
