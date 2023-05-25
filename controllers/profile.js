const db = require("../routes/db-config");
const bcrypt = require("bcrypt");
const sequelize = require('../config/db')
const profile = async (req,res) => {



    const {mail, pass, secret} = req.body;
    if(!req.cookies.isAdmin){
        res.render("admin/login", {status:"no", user:"nothing"});
    }
    else{
        const password = await bcrypt.hash(pass, 8);
        let sql = `UPDATE users SET email = '${mail}', password = '${password}' WHERE email= '${secret}'`;
        await sequelize.query(sql)

        return res.json({status:"success", success:"Profil uytgedildi"});
    
    
    }
}



module.exports = profile;