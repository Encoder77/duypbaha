const db = require("../routes/db-config");
const sequelize = require('../config/db')
const path = require('path')
var md5 = require('md5');
var http = require('http');
var formidable = require('formidable');
var fs = require('fs');


const post = async (req,res) => {


    let createdAt1 = new Date().toLocaleDateString();
    let createdAt2 = new Date().toLocaleTimeString();
    let createdAt = createdAt1+createdAt2

        var form = new formidable.IncomingForm();   
        form.parse(req, async function (err, fields, files) {

            var oldpath = files.mypic.filepath;
            var pic = md5(files.mypic.originalFilename+createdAt);
            var newpath = (path.resolve(__dirname, '..', 'uploads', 'banners', pic+'.mp4'));
            fs.rename(oldpath, newpath, function (err) {
              if (err) throw err;
            });
            var oldpath = files.picname.filepath;
            var picn = md5(files.picname.originalFilename+createdAt);
            var newpath = (path.resolve(__dirname, '..', 'uploads', 'banners', picn+'.jpg'));
            fs.rename(oldpath, newpath, function (err) {
              if (err) throw err;
            });
            

    const {titleru, exru, titletm, extm} = fields;
    if(!titleru || !titletm) return res.json({ status: "error", error: "Maglumatlary dolduryň"});
    else if(!req.cookies.isAdmin){
        res.render("admin/login", {status:"no", user:"nothing"});
    }
    else{
        let sql = `INSERT INTO banners(img_name, head_text_ru, desc_text_ru, head_text_tm, desc_text_tm, createdAt, pic_name ) VALUES ('${pic+'.mp4'}','${titleru}', '${exru}','${titletm}', '${extm}', now(), '${picn+'.jpg'}' )`;
        await sequelize.query(sql)
        return res.redirect('/banners');

    }
})
}





module.exports = post;