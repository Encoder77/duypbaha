const db = require("../routes/db-config");
var fs = require('fs');
const path = require('path')
const sequelize = require('../config/db')
const deleteservice = async (req,res) => {



    const {id} = req.body;
    if(!req.cookies.isAdmin){
        res.render("admin/login", {status:"no", user:"nothing"});
    }
    else{
        let sql1 = `SELECT service_pic FROM services where id=${id}`;
        const result = await sequelize.query(sql1)
        var filePath = (path.resolve(__dirname, '..', 'uploads', 'services', result[0][0].service_pic));
        if(fs.existsSync(filePath)){
        fs.unlinkSync(filePath);
        }
        

        let sql = `DELETE FROM services where id=${id}`;
        await sequelize.query(sql)

        return res.json({status:"success", success:"Serwis pozuldy"});
    
    }
}



module.exports = deleteservice;