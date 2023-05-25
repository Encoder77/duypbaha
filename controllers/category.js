const db = require("../routes/db-config");
const sequelize = require('../config/db')

const post = async (req,res) => {



    const {titleru, titletm, option} = req.body;
    if(!titleru || !titletm || !option) return res.json({ status: "error", error: "Maglumatlary dolduryň"});
    else if(!req.cookies.isAdmin){
        res.render("admin/login", {status:"no", user:"nothing"});
    }
    else{
        let slug1step = titletm.trim();
        let slug2step = slug1step.replace(" ", "_");
        let slug3step = slug2step.replace("ü", "u");
        let slug4step = slug3step.replace("ö", "o");
        let slug5step = slug4step.replace("ý", "y");
        let slug6step = slug5step.replace("ç", "ch");
        let slug7step = slug6step.replace("ä", "a");
        let slug8step = slug7step.replace("ň", "n");
        let slug9step = slug8step.replace("ş", "s");
        let slug10step = slug9step.replace("ž", "z");
        let sql = `INSERT INTO categories (category_ru, category_tm, category_slug, createdAt, optione) VALUES ('${titleru}', '${titletm}', '${slug10step}', now(), '${option}')`;
        await sequelize.query(sql)
        return res.json({status:"success", success:"Category gosuldy"});
    }
}



module.exports = post;
