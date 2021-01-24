const express = require("express");
const app = express();

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", require("./router/api/registers"));

//db
require("./db");

//port
const PORT = process.env.PORT || 5001;

//server
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
});



