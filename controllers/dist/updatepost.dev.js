"use strict";

var db = require("../routes/db-config");

var sequelize = require('../config/db');

var post = function post(req, res) {
  var _req$body, secret, titleru, descru, titleen, descen, category, titletm, extm, desctm, sql;

  return regeneratorRuntime.async(function post$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, secret = _req$body.secret, titleru = _req$body.titleru, descru = _req$body.descru, titleen = _req$body.titleen, descen = _req$body.descen, category = _req$body.category, titletm = _req$body.titletm, extm = _req$body.extm, desctm = _req$body.desctm;

          if (req.cookies.isAdmin) {
            _context.next = 5;
            break;
          }

          res.render("admin/login", {
            status: "no",
            user: "nothing"
          });
          _context.next = 9;
          break;

        case 5:
          sql = "UPDATE posts SET title_ru = '".concat(titleru, "', description_ru = '").concat(descru, "', excerpt_ru = '").concat(extm, "',title_ru = '").concat(titleen, "', description_ru = '").concat(descen, "', excerpt_ru = '").concat(extm, "', title_tm = '").concat(titletm, "', description_tm = '").concat(desctm, "', excerpt_tm = '").concat(extm, "', post_category = '").concat(category, "', updatedAt = now() WHERE id= '").concat(secret, "'");
          _context.next = 8;
          return regeneratorRuntime.awrap(sequelize.query(sql));

        case 8:
          return _context.abrupt("return", res.json({
            status: "success",
            success: "Post uytgedildi"
          }));

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = post;