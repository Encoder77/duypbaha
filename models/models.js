const sequelize = require('../config/db')
const { DataTypes } = require('sequelize')
const { Sequelize } = require('../config/db')

const User = sequelize.define( 'user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, allowNull: false  },
    password: { type: DataTypes.STRING, allowNull: false  },
}, { timestamps: false })

const Banner = sequelize.define( 'banners', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    img_name: { type: DataTypes.STRING, allowNull: true  },
    createdAt:{type: DataTypes.DATE,allowNull: true},
    updatedAt:{type: DataTypes.DATE, allowNull: true},
}, { timestamps:false })

const Posts = sequelize.define( 'posts', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    post_img: { type: DataTypes.STRING, allowNull: true },
    title_ru: { type: DataTypes.STRING, allowNull: true },
    title_tm: { type: DataTypes.STRING, allowNull: true },
    description_ru: { type: DataTypes.STRING, allowNull: false },
    title_en: { type: DataTypes.STRING, allowNull: true },
    description_en: { type: DataTypes.STRING, allowNull: false },
    description_tm: { type: DataTypes.STRING, allowNull: false },
    post_category: { type: DataTypes.STRING, allowNull: true },
    view_count: { type: DataTypes.STRING, allowNull: false, defaultValue: '0' },
    createdAt:{type: DataTypes.DATE,allowNull: true},
    updatedAt:{type: DataTypes.DATE, allowNull: true},
}, { timestamps:false })


const Views = sequelize.define( 'views', {
    id: { type: DataTypes.INTEGER, primaryKey: true, defaultValue: '0', autoIncrement: true },
    homepage: { type: DataTypes.INTEGER, allowNull: false, defaultValue: '0' },
    blogpage:{ type: DataTypes.INTEGER, allowNull: false, defaultValue: '0' },
    aboutpage:{ type: DataTypes.INTEGER, allowNull: false, defaultValue: '0' },
}, { timestamps:false })




module.exports = {
    User,
    Banner,
    Posts,
    Views
}
