const db = require("../routes/db-config");
const sequelize = require('../config/db')

const post = async (req,res) => {
    


    const {secret, titleru, descru,titleen, descen, category, titletm, extm, desctm} = req.body;
    if(!req.cookies.isAdmin){
        res.render("admin/login", {status:"no", user:"nothing"});
    }
    else{
        let sql = `UPDATE posts SET title_ru = '${titleru}', description_ru = '${descru}', excerpt_ru = '${extm}',title_ru = '${titleen}', description_ru = '${descen}', excerpt_ru = '${extm}', title_tm = '${titletm}', description_tm = '${desctm}', excerpt_tm = '${extm}', post_category = '${category}', updatedAt = now() WHERE id= '${secret}'`;
        await sequelize.query(sql)
     

        return res.json({status:"success", success:"Post uytgedildi"});
    
    }
}



module.exports = post;