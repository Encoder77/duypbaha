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
        var newpath = (path.resolve(__dirname, '..', 'uploads', 'services', pic+'.jpg'));
        fs.rename(oldpath, newpath, function (err) {
          if (err) throw err;
        });
    
const {titleru, exru, descru, titletm, extm, desctm,} = fields;

    if(!titleru || !descru || !titletm || !desctm) return res.json({ status: "error", error: "Maglumatlary dolduryň"});
    else if(!req.cookies.isAdmin){
        res.render("admin/login", {status:"no", user:"nothing"});
    }
    else{
        let sql = `INSERT INTO services(service_pic, service_name_ru, service_description_ru, service_excerpt_ru, service_name_tm, service_description_tm, service_excerpt_tm, view_count, createdAt ) VALUES ('${pic+'.jpg'}','${titleru}', '${descru}', '${exru}','${titletm}', '${desctm}', '${extm}', '0', now())`;
        await sequelize.query(sql)

        return res.redirect('/service');
    
    
    }
})
}



module.exports = post;