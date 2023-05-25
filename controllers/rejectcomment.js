const db = require("../routes/db-config");
const sequelize = require('../config/db')

const post = async (req,res) => {



    const {secretrej} = req.body;
    if(!req.cookies.isAdmin){
        res.render("admin/login", {status:"no", user:"nothing"});
    }
    else{
        let sql = `UPDATE comments SET status="rejected" , updatedAt=now() WHERE id='${secretrej}'`;
        await sequelize.query(sql)
     

        return res.json({status:"error", error:"Comment reject edildi"});
    
    }
}



module.exports = post;