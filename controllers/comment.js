const db = require("../routes/db-config");
const sequelize = require('../config/db')


const comment = async (req,res) => {
    const {email, firstname, lastname, content, id} = req.body;
    if(!email || !firstname || !lastname || !content || !id) return res.json({ status: "error", error: "Maglumatlary dolduryň"});

        let sql = `INSERT INTO comments(firstname, lastname, comment_text, commenter_mail, post_id, status, createdAt ) VALUES ('${firstname}', '${lastname}', '${content}', '${email}', '${id}', 'pending', now())`;
        await sequelize.query(sql)
        return res.json({status:"success", success:"Комментарий отправлен"});
    
    
}



module.exports = comment;