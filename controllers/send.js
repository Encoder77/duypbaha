const nodemailer = require("nodemailer");
// async..await is not allowed in global scope, must use a wrapper
const mail = async (req,res) => {
    const {firstname, lastname, email, phone, content} = req.body;
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "mail.vipseos.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "", // generated ethereal user
      pass: "" // generated ethereal password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'admin@vipseos.com', // sender address
    to: "rahatgurbangulyev@gmail.com", // list of receivers
    subject: firstname + ' ' + lastname, // Subject line
    html: email + '<br>' + phone + '<br>' +content, // plain text body
    //html: "<b>Hello world?</b>" // html body
  });

  console.log("Message sent: %s", info.messageId);
  return res.json({status:"success", success:"Ugradyldy"});
}


module.exports = mail