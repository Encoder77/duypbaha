const db = require("../routes/db-config");
const sequelize = require('../config/db')
const createdAt1 = new Date().toLocaleDateString();
const createdAt2 = new Date().toLocaleTimeString();
const createdAt = createdAt1+createdAt2
const post = async (req,res) => {



    const {secretapp} = req.body;
    if(!req.cookies.isAdmin){
        res.render("admin/login", {status:"no", user:"nothing"});
    }
    else{
        let sql = `UPDATE comments SET status="approved" , updatedAt=now() WHERE id='${secretapp}'`;
        await sequelize.query(sql)

        return res.json({status:"success", success:"Comment approve boldy"});
    }
}



module.exports = post;