const db = require("../routes/db-config");
const path = require('path')
var md5 = require('md5');
var http = require('http');
var formidable = require('formidable');
const sequelize = require('../config/db')
var fs = require('fs');


const post = async (req,res) => {

    let createdAt1 = new Date().toLocaleDateString();
    let createdAt2 = new Date().toLocaleTimeString();
    let createdAt = createdAt1+createdAt2
  
    

        var form = new formidable.IncomingForm();   
        form.parse(req, async function (err, fields, files) {

            var oldpath = files.mypic.filepath;
            var pic = md5(files.mypic.originalFilename+createdAt);
            var newpath = (path.resolve(__dirname, '..', 'uploads', 'posts', pic+'.jpg'));
            fs.rename(oldpath, newpath, function (err) {
              if (err) throw err;
            });

    const {titleru, descru, category, titletm, titleen, extm, desctm,  descen} = fields;
    if(!titleru || !descru || !titletm || !desctm || !titleen || !descen || !category) return res.json({ status: "error", error: "Maglumatlary dolduryň"});
    else if(!req.cookies.isAdmin){
        res.render("admin/login", {status:"no", user:"nothing"});
    }
    else{
        let sql = `INSERT INTO posts(post_img, title_ru, description_ru, excerpt_ru, title_en, description_en, excerpt_en, title_tm, description_tm, excerpt_tm, post_category, view_count, createdAt ) VALUES ('${pic+'.jpg'}','${titleru}', '${descru}', '${extm}','${titleen}', '${descen}', '${extm}','${titletm}', '${desctm}', '${extm}', '${category}', '0', now())`;
        await sequelize.query(sql)
        return res.redirect('/posts');
  
    }

     });




    
}





module.exports = post;