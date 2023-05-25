const db = require("../routes/db-config");
const sequelize = require('../config/db')

const post = async (req,res) => {


    const {secret, titleru, exru, titletm, extm} = req.body;
    if(!req.cookies.isAdmin){
        res.render("admin/login", {status:"no", user:"nothing"});
    }
    else{
        let sql = `UPDATE banners SET head_text_ru = '${titleru}', desc_text_ru = '${exru}', head_text_tm = '${titletm}', desc_text_tm = '${extm}', updatedAt = now() WHERE id= '${secret}'`;
        await sequelize.query(sql)
     

        return res.json({status:"success", success:"Banner uytgedildi"});
    
    }
}



module.exports = post;