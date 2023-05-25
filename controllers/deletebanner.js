const db = require("../routes/db-config");
const sequelize = require('../config/db')
var fs = require('fs');
const path = require('path')
const deletepost = async (req,res) => {



    const {id} = req.body;
    if(!req.cookies.isAdmin){
        res.render("admin/login", {status:"no", user:"nothing"});
    }
    else{
        let sql1 = `SELECT img_name FROM banners where id=${id}`;
        const result = await sequelize.query(sql1)
        var filePath = (path.resolve(__dirname, '..', 'uploads', 'banners', result[0][0].img_name));
        if(fs.existsSync(filePath)){
        fs.unlinkSync(filePath);
        }
        
        let sql = `DELETE FROM banners where id=${id}`;
        await sequelize.query(sql)

        return res.json({status:"success", success:"Banner pozuldy"});
    
    }
}



module.exports = deletepost;