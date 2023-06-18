"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../models/models'),
    Banner = _require.Banner,
    Views = _require.Views,
    Posts = _require.Posts;

var db = require('../routes/db-config');

var sequelize = require('../config/db');

var indexController =
/*#__PURE__*/
function () {
  function indexController() {
    _classCallCheck(this, indexController);
  }

  _createClass(indexController, [{
    key: "index",
    value: function index(req, res) {
      var _res$render;

      var lang, langs, banners, views, _view, pagecount, limitt, old, pagecounter, pageNum, category, filter, option, perPageItems, posts, categories, rows2, i, url, view;

      return regeneratorRuntime.async(function index$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              lang = req.originalUrl.split("/")[1];
              langs = ['ru', 'tm', 'en'];

              if (!langs.includes(lang)) {
                lang = 'ru';
              }

              if (!lang) {
                lang = 'ru';
              }

              _context.next = 6;
              return regeneratorRuntime.awrap(Banner.findAll({
                raw: true,
                attributes: ['id', 'img_name', ["head_text_".concat(lang), 'head_text'], ["desc_text_".concat(lang), 'desc_text']],
                order: [['id', 'DESC']]
              }));

            case 6:
              banners = _context.sent;
              _context.prev = 7;
              _context.next = 10;
              return regeneratorRuntime.awrap(Views.findAll());

            case 10:
              views = _context.sent;
              _context.next = 16;
              break;

            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](7);
              console.log(_context.t0);

            case 16:
              _context.prev = 16;
              _context.next = 19;
              return regeneratorRuntime.awrap(Views.findOne({
                where: {
                  id: 1
                }
              }));

            case 19:
              _view = _context.sent;
              _context.next = 22;
              return regeneratorRuntime.awrap(Views.update({
                homepage: _view.homepage + 1
              }, {
                where: {
                  id: 1
                }
              }));

            case 22:
              _context.next = 27;
              break;

            case 24:
              _context.prev = 24;
              _context.t1 = _context["catch"](16);
              console.log(_context.t1);

            case 27:
              old = 0;
              pagecounter = 1;
              pageNum = req.query.page;
              category = req.query.category;
              filter = req.query.filter;
              option = req.query.option;

              if (!pageNum) {
                pageNum = 1;
              }

              perPageItems = 10;
              old = pageNum * 10 - perPageItems;
              posts = [];

              if (!option) {
                _context.next = 61;
                break;
              }

              if (!category) {
                _context.next = 50;
                break;
              }

              if (!filter) {
                _context.next = 45;
                break;
              }

              _context.next = 42;
              return regeneratorRuntime.awrap(sequelize.query("SELECT posts.id, view_count, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_".concat(lang, " as title, excerpt_").concat(lang, " as excerpt, description_").concat(lang, " as description, post_category, count(comments.post_id) as comment_count FROM posts left join comments ON comments.post_id = posts.id and comments.status = \"approved\" where posts.post_category = '").concat(category, "', posts.post_option = '").concat(option, "' group by posts.id ORDER BY posts.excerpt_tm ").concat(filter, " LIMIT ").concat(old, ",").concat(perPageItems)));

            case 42:
              posts = _context.sent;
              _context.next = 48;
              break;

            case 45:
              _context.next = 47;
              return regeneratorRuntime.awrap(sequelize.query("SELECT posts.id, view_count, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_".concat(lang, " as title, excerpt_").concat(lang, " as excerpt, description_").concat(lang, " as description, post_category, count(comments.post_id) as comment_count FROM posts left join comments ON comments.post_id = posts.id and comments.status = \"approved\" where posts.post_category = '").concat(category, "', posts.post_option = '").concat(option, "' group by posts.id ORDER BY posts.id DESC LIMIT ").concat(old, ",").concat(perPageItems)));

            case 47:
              posts = _context.sent;

            case 48:
              _context.next = 59;
              break;

            case 50:
              if (!filter) {
                _context.next = 56;
                break;
              }

              _context.next = 53;
              return regeneratorRuntime.awrap(sequelize.query("SELECT posts.id, view_count, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_".concat(lang, " as title, excerpt_").concat(lang, " as excerpt, description_").concat(lang, " as description, post_category, count(comments.post_id) as comment_count FROM posts left join comments ON comments.post_id = posts.id and comments.status = \"approved\" where posts.post_option = '").concat(option, "' group by posts.id ORDER BY posts.excerpt_tm ").concat(filter, " LIMIT ").concat(old, ",").concat(perPageItems)));

            case 53:
              posts = _context.sent;
              _context.next = 59;
              break;

            case 56:
              _context.next = 58;
              return regeneratorRuntime.awrap(sequelize.query("SELECT posts.id, view_count, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_".concat(lang, " as title, excerpt_").concat(lang, " as excerpt, description_").concat(lang, " as description, post_category, count(comments.post_id) as comment_count FROM posts left join comments ON comments.post_id = posts.id and comments.status = \"approved\" where posts.post_option = '").concat(option, "' group by posts.id ORDER BY posts.id DESC LIMIT ").concat(old, ",").concat(perPageItems)));

            case 58:
              posts = _context.sent;

            case 59:
              _context.next = 82;
              break;

            case 61:
              if (!category) {
                _context.next = 73;
                break;
              }

              if (!filter) {
                _context.next = 68;
                break;
              }

              _context.next = 65;
              return regeneratorRuntime.awrap(sequelize.query("SELECT posts.id, view_count, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_".concat(lang, " as title, excerpt_").concat(lang, " as excerpt, description_").concat(lang, " as description, post_category, count(comments.post_id) as comment_count FROM posts left join comments ON comments.post_id = posts.id and comments.status = \"approved\" where posts.post_category = '").concat(category, "' group by posts.id ORDER BY posts.excerpt_tm ").concat(filter, " LIMIT ").concat(old, ",").concat(perPageItems)));

            case 65:
              posts = _context.sent;
              _context.next = 71;
              break;

            case 68:
              _context.next = 70;
              return regeneratorRuntime.awrap(sequelize.query("SELECT posts.id, view_count, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_".concat(lang, " as title, excerpt_").concat(lang, " as excerpt, description_").concat(lang, " as description, post_category, count(comments.post_id) as comment_count FROM posts left join comments ON comments.post_id = posts.id and comments.status = \"approved\" where posts.post_category = '").concat(category, "' group by posts.id ORDER BY posts.id DESC LIMIT ").concat(old, ",").concat(perPageItems)));

            case 70:
              posts = _context.sent;

            case 71:
              _context.next = 82;
              break;

            case 73:
              if (!filter) {
                _context.next = 79;
                break;
              }

              _context.next = 76;
              return regeneratorRuntime.awrap(sequelize.query("SELECT posts.id, view_count, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_".concat(lang, " as title, excerpt_").concat(lang, " as excerpt, description_").concat(lang, " as description, post_category, count(comments.post_id) as comment_count FROM posts left join comments ON comments.post_id = posts.id and comments.status = \"approved\" group by posts.id ORDER BY posts.excerpt_tm ").concat(filter, " LIMIT ").concat(old, ",").concat(perPageItems)));

            case 76:
              posts = _context.sent;
              _context.next = 82;
              break;

            case 79:
              _context.next = 81;
              return regeneratorRuntime.awrap(sequelize.query("SELECT posts.id, view_count, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_".concat(lang, " as title, excerpt_").concat(lang, " as excerpt, description_").concat(lang, " as description, post_category, count(comments.post_id) as comment_count FROM posts left join comments ON comments.post_id = posts.id and comments.status = \"approved\" group by posts.id ORDER BY posts.id DESC LIMIT ").concat(old, ",").concat(perPageItems)));

            case 81:
              posts = _context.sent;

            case 82:
              _context.next = 84;
              return regeneratorRuntime.awrap(sequelize.query("SELECT category_".concat(lang, " as category, optione, category_slug FROM categories ORDER BY id DESC"), {
                raw: true
              }));

            case 84:
              categories = _context.sent;
              _context.next = 87;
              return regeneratorRuntime.awrap(sequelize.query("SELECT * FROM posts", {
                raw: true
              }));

            case 87:
              rows2 = _context.sent;

              if (category) {
                pagecount = posts[0].length;
              } else {
                pagecount = rows2[0].length;
              }

              for (i = 0; i < rows2[0].length; i++) {
                if (pagecount <= perPageItems) {} else {
                  pagecount = pagecount - perPageItems;
                  pagecounter++;
                }
              }

              url = req.query.category;
              _context.next = 93;
              return regeneratorRuntime.awrap(Views.findOne({
                where: {
                  id: 1
                }
              }));

            case 93:
              view = _context.sent;
              _context.next = 96;
              return regeneratorRuntime.awrap(Views.update({
                blogpage: view.blogpage + 1
              }, {
                where: {
                  id: 1
                }
              }));

            case 96:
              res.render("index", (_res$render = {
                banners: banners,
                categories: categories,
                posts: posts[0]
              }, _defineProperty(_res$render, "categories", categories[0]), _defineProperty(_res$render, "lang", lang), _defineProperty(_res$render, "limit", posts[0].length), _defineProperty(_res$render, "pageNum", pageNum), _defineProperty(_res$render, "pagecounter", pagecounter), _defineProperty(_res$render, "url", url), _res$render));

            case 97:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[7, 13], [16, 24]]);
    }
  }, {
    key: "blogPage",
    value: function blogPage(req, res) {
      var pagecount, limitt, old, pagecounter, pageNum, category, filter, option, perPageItems, lang, langs, cat, posts, categories, rows2, i, url, urle, view;
      return regeneratorRuntime.async(function blogPage$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              old = 0;
              pagecounter = 1;
              pageNum = req.query.page;
              category = req.query.category;
              filter = req.query.filter;
              option = req.query.option;

              if (!pageNum) {
                pageNum = 1;
              }

              perPageItems = 10;
              old = pageNum * 10 - perPageItems;
              lang = req.originalUrl.split("/")[1];
              langs = ['ru', 'tm', 'en'];

              if (!langs.includes(lang)) {
                lang = 'ru';
              }

              if (!lang) {
                lang = 'ru';
              }

              cat = req.originalUrl.split("=")[1];
              posts = [];

              if (!option) {
                _context2.next = 39;
                break;
              }

              if (!category) {
                _context2.next = 28;
                break;
              }

              if (!filter) {
                _context2.next = 23;
                break;
              }

              _context2.next = 20;
              return regeneratorRuntime.awrap(sequelize.query("SELECT posts.id, view_count, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_".concat(lang, " as title, excerpt_").concat(lang, " as excerpt, description_").concat(lang, " as description, post_category, count(comments.post_id) as comment_count FROM posts left join comments ON comments.post_id = posts.id and comments.status = \"approved\" where posts.post_category = '").concat(category, "', posts.post_option = '").concat(option, "' group by posts.id ORDER BY posts.excerpt_tm ").concat(filter, " LIMIT ").concat(old, ",").concat(perPageItems)));

            case 20:
              posts = _context2.sent;
              _context2.next = 26;
              break;

            case 23:
              _context2.next = 25;
              return regeneratorRuntime.awrap(sequelize.query("SELECT posts.id, view_count, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_".concat(lang, " as title, excerpt_").concat(lang, " as excerpt, description_").concat(lang, " as description, post_category, count(comments.post_id) as comment_count FROM posts left join comments ON comments.post_id = posts.id and comments.status = \"approved\" where posts.post_category = '").concat(category, "', posts.post_option = '").concat(option, "' group by posts.id ORDER BY posts.id DESC LIMIT ").concat(old, ",").concat(perPageItems)));

            case 25:
              posts = _context2.sent;

            case 26:
              _context2.next = 37;
              break;

            case 28:
              if (!filter) {
                _context2.next = 34;
                break;
              }

              _context2.next = 31;
              return regeneratorRuntime.awrap(sequelize.query("SELECT posts.id, view_count, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_".concat(lang, " as title, excerpt_").concat(lang, " as excerpt, description_").concat(lang, " as description, post_category, count(comments.post_id) as comment_count FROM posts left join comments ON comments.post_id = posts.id and comments.status = \"approved\" where posts.post_option = '").concat(option, "' group by posts.id ORDER BY posts.excerpt_tm ").concat(filter, " LIMIT ").concat(old, ",").concat(perPageItems)));

            case 31:
              posts = _context2.sent;
              _context2.next = 37;
              break;

            case 34:
              _context2.next = 36;
              return regeneratorRuntime.awrap(sequelize.query("SELECT posts.id, view_count, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_".concat(lang, " as title, excerpt_").concat(lang, " as excerpt, description_").concat(lang, " as description, post_category, count(comments.post_id) as comment_count FROM posts left join comments ON comments.post_id = posts.id and comments.status = \"approved\" where posts.post_option = '").concat(option, "' group by posts.id ORDER BY posts.id DESC LIMIT ").concat(old, ",").concat(perPageItems)));

            case 36:
              posts = _context2.sent;

            case 37:
              _context2.next = 60;
              break;

            case 39:
              if (!category) {
                _context2.next = 51;
                break;
              }

              if (!filter) {
                _context2.next = 46;
                break;
              }

              _context2.next = 43;
              return regeneratorRuntime.awrap(sequelize.query("SELECT posts.id, view_count, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_".concat(lang, " as title, excerpt_").concat(lang, " as excerpt, description_").concat(lang, " as description, post_category, count(comments.post_id) as comment_count FROM posts left join comments ON comments.post_id = posts.id and comments.status = \"approved\" where posts.post_category = '").concat(category, "' group by posts.id ORDER BY posts.excerpt_tm ").concat(filter, " LIMIT ").concat(old, ",").concat(perPageItems)));

            case 43:
              posts = _context2.sent;
              _context2.next = 49;
              break;

            case 46:
              _context2.next = 48;
              return regeneratorRuntime.awrap(sequelize.query("SELECT posts.id, view_count, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_".concat(lang, " as title, excerpt_").concat(lang, " as excerpt, description_").concat(lang, " as description, post_category, count(comments.post_id) as comment_count FROM posts left join comments ON comments.post_id = posts.id and comments.status = \"approved\" where posts.post_category = '").concat(category, "' group by posts.id ORDER BY posts.id DESC LIMIT ").concat(old, ",").concat(perPageItems)));

            case 48:
              posts = _context2.sent;

            case 49:
              _context2.next = 60;
              break;

            case 51:
              if (!filter) {
                _context2.next = 57;
                break;
              }

              _context2.next = 54;
              return regeneratorRuntime.awrap(sequelize.query("SELECT posts.id, view_count, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_".concat(lang, " as title, excerpt_").concat(lang, " as excerpt, description_").concat(lang, " as description, post_category, count(comments.post_id) as comment_count FROM posts left join comments ON comments.post_id = posts.id and comments.status = \"approved\" group by posts.id ORDER BY posts.excerpt_tm ").concat(filter, " LIMIT ").concat(old, ",").concat(perPageItems)));

            case 54:
              posts = _context2.sent;
              _context2.next = 60;
              break;

            case 57:
              _context2.next = 59;
              return regeneratorRuntime.awrap(sequelize.query("SELECT posts.id, view_count, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_".concat(lang, " as title, excerpt_").concat(lang, " as excerpt, description_").concat(lang, " as description, post_category, count(comments.post_id) as comment_count FROM posts left join comments ON comments.post_id = posts.id and comments.status = \"approved\" group by posts.id ORDER BY posts.id DESC LIMIT ").concat(old, ",").concat(perPageItems)));

            case 59:
              posts = _context2.sent;

            case 60:
              _context2.next = 62;
              return regeneratorRuntime.awrap(sequelize.query("SELECT category_".concat(lang, " as category, optione, category_slug FROM categories ORDER BY id DESC"), {
                raw: true
              }));

            case 62:
              categories = _context2.sent;
              _context2.next = 65;
              return regeneratorRuntime.awrap(sequelize.query("SELECT * FROM posts", {
                raw: true
              }));

            case 65:
              rows2 = _context2.sent;

              if (category) {
                pagecount = posts[0].length;
              } else {
                pagecount = rows2[0].length;
              }

              for (i = 0; i < rows2[0].length; i++) {
                if (pagecount <= perPageItems) {} else {
                  pagecount = pagecount - perPageItems;
                  pagecounter++;
                }
              }

              url = req.query.category;
              urle = req.query.filter;
              _context2.next = 72;
              return regeneratorRuntime.awrap(Views.findOne({
                where: {
                  id: 1
                }
              }));

            case 72:
              view = _context2.sent;
              _context2.next = 75;
              return regeneratorRuntime.awrap(Views.update({
                blogpage: view.blogpage + 1
              }, {
                where: {
                  id: 1
                }
              }));

            case 75:
              res.render("blog", {
                posts: posts[0],
                urle: urle,
                cat: cat,
                categories: categories[0],
                lang: lang,
                limit: posts[0].length,
                pageNum: pageNum,
                pagecounter: pagecounter,
                url: url
              });

            case 76:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }, {
    key: "blogPageId",
    value: function blogPageId(req, res) {
      var lang, langs, sql, sql2, post, comments, categories, view;
      return regeneratorRuntime.async(function blogPageId$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              lang = req.originalUrl.split("/")[1];
              langs = ['ru', 'tm', 'en'];

              if (!langs.includes(lang)) {
                lang = 'ru';
              }

              if (!lang) {
                lang = 'ru';
              }

              sql = "SELECT posts.id, view_count, date_format(posts.createdAt, '%d/%m/%Y') as createdAt, post_img, title_".concat(lang, " as title, excerpt_").concat(lang, " as excerpt, description_").concat(lang, " as description, post_category, count(comments.post_id) as comment_count FROM posts left join comments ON comments.post_id = posts.id and comments.status = \"approved\" where posts.id=").concat(req.params.id, " group by posts.id");
              sql2 = "SELECT id, firstname, lastname, comment_text, commenter_mail, post_id, status, date_format(createdAt, '%d/%m/%Y') as createdAt from comments where post_id=".concat(req.params.id, " and status=\"approved\" ORDER BY id DESC LIMIT 0, 5");
              _context3.next = 8;
              return regeneratorRuntime.awrap(sequelize.query(sql));

            case 8:
              post = _context3.sent;
              _context3.next = 11;
              return regeneratorRuntime.awrap(sequelize.query(sql2));

            case 11:
              comments = _context3.sent;
              _context3.next = 14;
              return regeneratorRuntime.awrap(sequelize.query("SELECT category_".concat(lang, " as category, optione, category_slug FROM categories ORDER BY id DESC")));

            case 14:
              categories = _context3.sent;

              if (post[0].length == 0) {
                res.status(404).render('404');
              }

              view = Number(post[0][0].view_count) + 0.5;
              _context3.next = 19;
              return regeneratorRuntime.awrap(sequelize.query("update posts set view_count=".concat(view, " where id=").concat(req.params.id)));

            case 19:
              view = 0;
              res.render('blog_detail', {
                post: post[0],
                categories: categories[0],
                lang: lang,
                comments: comments[0]
              });

            case 21:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }, {
    key: "aboutPage",
    value: function aboutPage(req, res) {
      var lang, langs, view;
      return regeneratorRuntime.async(function aboutPage$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              lang = req.originalUrl.split("/")[1];
              langs = ['ru', 'tm', 'en'];

              if (!langs.includes(lang)) {
                lang = 'ru';
              }

              if (!lang) {
                lang = 'ru';
              }

              _context4.next = 6;
              return regeneratorRuntime.awrap(Views.findOne({
                where: {
                  id: 1
                }
              }));

            case 6:
              view = _context4.sent;
              _context4.next = 9;
              return regeneratorRuntime.awrap(Views.update({
                aboutpage: view.aboutpage + 1
              }, {
                where: {
                  id: 1
                }
              }));

            case 9:
              res.render('about-us', {
                lang: lang
              });

            case 10:
            case "end":
              return _context4.stop();
          }
        }
      });
    }
  }, {
    key: "contactPage",
    value: function contactPage(req, res) {
      var lang, langs, view;
      return regeneratorRuntime.async(function contactPage$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              lang = req.originalUrl.split("/")[1];
              langs = ['ru', 'tm', 'en'];

              if (!langs.includes(lang)) {
                lang = 'ru';
              }

              if (!lang) {
                lang = 'ru';
              }

              _context5.next = 6;
              return regeneratorRuntime.awrap(Views.findOne({
                where: {
                  id: 1
                }
              }));

            case 6:
              view = _context5.sent;
              _context5.next = 9;
              return regeneratorRuntime.awrap(Views.update({
                contactpage: view.contactpage + 1
              }, {
                where: {
                  id: 1
                }
              }));

            case 9:
              res.render("contact", {
                lang: lang
              });

            case 10:
            case "end":
              return _context5.stop();
          }
        }
      });
    }
  }, {
    key: "cart",
    value: function cart(req, res) {
      var lang, langs, sql, cart_products;
      return regeneratorRuntime.async(function cart$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              lang = req.originalUrl.split("/")[1];
              langs = ['ru', 'tm', 'en'];

              if (!langs.includes(lang)) {
                lang = 'ru';
              }

              if (!lang) {
                lang = 'ru';
              }

              sql = "SELECT * FROM posts";
              _context6.next = 7;
              return regeneratorRuntime.awrap(sequelize.query(sql));

            case 7:
              cart_products = _context6.sent;
              res.render("cart", {
                lang: lang,
                limit: cart_products[0].length,
                cart_products: cart_products[0]
              });

            case 9:
            case "end":
              return _context6.stop();
          }
        }
      });
    }
  }]);

  return indexController;
}();

module.exports = new indexController();