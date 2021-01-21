const Sequelize = require("sequelize");

const RegisterModel = require("./models/Register");

const db = new Sequelize("JTpTOqk7xe", "JTpTOqk7xe", "R8YMYFfQLF", {
    host: "www.remotemysql.com",
    dialect: "mysql",
    define: {
        freezeTableName: true
    }
});

const Register = RegisterModel(db, Sequelize);

db.sync()
    .then(res => {
        console.log(res, "Tables ok")
    })
    .catch(err => console.log(err))