const db = require("../routes/db-config");
const sequelize = require('../config/db')

const post = async (req,res) => {



    const {secret, titleru, exru, descru, titletm, extm, desctm} = req.body;
    if(!req.cookies.isAdmin){
        res.render("admin/login", {status:"no", user:"nothing"});
    }
    else{
        let sql = `UPDATE services SET service_name_ru = '${titleru}', service_description_ru = '${descru}', service_excerpt_ru = '${exru}', service_name_tm = '${titletm}', service_description_tm = '${desctm}', service_excerpt_tm = '${extm}', updatedAt = now() WHERE id= '${secret}'`;
        await sequelize.query(sql)
     

        return res.json({status:"success", success:"Serwis uytgedildi"});
    
    }
}



module.exports = post;