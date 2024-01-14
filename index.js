const express = require("express");
const morgan = require("morgan");

require("dotenv").config(); // read environment variable from .env file

// create instance of express
const app = express();

// create logger instance
const logger = morgan("dev");
app.use(logger);

// incoming request parser
app.use(express.json());

// get port from environment variable, if not exist then use default port 5000
const port = process.env.PORT || 5000;

// get router
const router = require("./src/routes");
// create router group
app.use("/api/v1/", router);

// run server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


/* migration database

1. npm install sequelize
2. npm install sequelize-cli
3. npm install mysql2
4. npx sequelize init -> create config.json in folder config & index.js in folder models 
5. npx sequelize-cli migration:generate --name apa_saja -> edit new file in migrations
6. npx sequelize db:migrate

// how to view username & password mysql: xampp -> phpmyadmin -> config.inc.php
// how to view port in mysql: SQL -> create SHOW VARIABLES WHERE Variable_name = 'port';

*/