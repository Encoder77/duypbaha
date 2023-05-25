const express = require('express');
const app = express();
const cookie = require('cookie-parser');
const sequelize = require('./config/db')
const dotenv = require("dotenv").config();
const PORT = process.env.PORT;
app.use('/js', express.static(__dirname + '/public/js'))
app.use('/css', express.static(__dirname + '/public/css'))
app.use('/images', express.static(__dirname + '/public/images'))
app.use('/fonts', express.static(__dirname + '/public/fonts'))
app.use('/revolution', express.static(__dirname + '/public/revolution'))

app.use('/admin', express.static(__dirname + '/public/admin'))
app.use('/uploads', express.static(__dirname + '/uploads'))

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(cookie());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use('/', require("./routes/pages"));
app.use('/ru', require("./routes/pages"))
app.use('/tm', require("./routes/pages"))

app.get('*', function(req, res){
    res.status(404).render('404');
  });

app.use("/api", require("./controllers/admin/auth"));

const start = async () => {
  try {
      await sequelize.authenticate()
      await sequelize.sync()
	.then(e => console.log(e))
	.catch(e => console.log(e));
      app.listen(PORT, () => console.log(`Server started on port------- ${PORT}`));  
  } catch (error) {
      console.log(error)
  }
}

start()
