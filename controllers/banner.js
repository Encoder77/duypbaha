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
            var newpath = (path.resolve(__dirname, '..', 'uploads', 'banners', pic+'.jpg'));
            fs.rename(oldpath, newpath, function (err) {
              if (err) throw err;
            });
      
                let sql = `INSERT INTO banners(img_name,   createdAt) VALUES ('${pic+'.jpg'}' ,now())`;
                await sequelize.query(sql)
                return res.redirect('/banners');
        
        })
        }





module.exports = post;