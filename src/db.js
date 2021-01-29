const Sequelize = require("sequelize");

const RegisterModel = require("./models/Register");
const CategoryModel = require("./models/Category");

const db = new Sequelize("JTpTOqk7xe", "JTpTOqk7xe", "R8YMYFfQLF", {
    host: "www.remotemysql.com",
    dialect: "mysql",
    define: {
        freezeTableName: true
    }
});

const Register = RegisterModel(db, Sequelize);
const Category = CategoryModel(db, Sequelize);

Register.belongsTo(Category);
Category.hasMany(Register);

db.sync()
    .then(res => {
        console.log("Synch!")
    })
    .catch(err => console.log(err))

module.exports = {
    Register,
    Category
}