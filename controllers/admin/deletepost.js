const db = require("../routes/db-config");
const sequelize = require('../../config/db')

const deletepost = async (req,res) => {



    const {id} = req.body;
    if(!req.cookies.isAdmin){
        res.render("admin/login", {status:"no", user:"nothing"});
    }
    else{
        let sql = `DELETE FROM posts where id=${id}`;
        await sequelize.query(sql)
        return res.json({status:"success", success:"Post pozuldy"});
    
    }
}



module.exports = deletepost;