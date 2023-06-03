const db = require("../routes/db-config");
var fs = require('fs');
const path = require('path')
const sequelize = require('../config/db')
const deletepost = async (req,res) => {

    const {id} = req.body;
    if(!req.cookies.isAdmin){
        res.render("admin/login", {status:"no", user:"nothing"});
    }
    else{ 
        let sql1 = `SELECT id, post_img FROM posts where id=${id}`;
        const result = await sequelize.query(sql1)
        let sql2 = `DELETE FROM comments where post_id=${result[0][0].id}`;
        await sequelize.query(sql2)
        var filePath = (path.resolve(__dirname, '..', 'uploads', 'posts', result[0][0].post_img));
        if(fs.existsSync(filePath)){
        fs.unlinkSync(filePath);   
        }
        

        let sql3 = `DELETE FROM posts where id=${id}`;
        await sequelize.query(sql3)

            return res.json({status:"success", success:"Haryt pozuldy"});  
    }
}

module.exports = deletepost;