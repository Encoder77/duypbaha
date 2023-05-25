const db = require("../routes/db-config");
const path = require('path')
const fs = require('fs')
const sequelize = require('../config/db')
const deletecategory = async (req,res) => {

    const {id} = req.body;
    if(!req.cookies.isAdmin){
        res.render("admin/login", {status:"no", user:"nothing"});
    }
    else{



        let sql = `SELECT category_slug FROM categories where id=${id}`;
        const result = await sequelize.query(sql)

        let sql1 = `SELECT post_img FROM posts where post_category='${result[0][0].category_slug}'`;
        const result3 = await sequelize.query(sql1)
        console.log(result3)
        for(let i=0; i < result3[0].length; i++){
            var filePath = (path.resolve(__dirname, '..', 'uploads', 'posts', result3[0][i].post_img));
        if(fs.existsSync(filePath)){
        fs.unlinkSync(filePath);
        }
        }

            let sql2 = `DELETE FROM posts where post_category='${result[0][0].category_slug}'`;
            await sequelize.query(sql2)

            
       
        let sql3 = `DELETE FROM categories where id=${id}`;
        await sequelize.query(sql3)

            return res.json({status:"success", success:"Category pozuldy"});
 
    }

}



module.exports = deletecategory;