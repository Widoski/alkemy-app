const express = require("express");
const app = express();

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", require("./router/api/registers"));
app.use("/api", require("./router/api/categories"));

//db
require("./db");

//port
const PORT = process.env.PORT || 5000;

//server
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
});



