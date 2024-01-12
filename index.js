const express = require("express");
const router = require('./src/routes')

const app = express()
const port = 5000;

app.use(express.json())

// Add endpoint grouping and router
app.use('/api/v1/', router)
app.listen(port, () => console.log(`Listening on port ${port}!`))

// npx sequelize init
// npx sequelize-cli migration:generate --name create_user
// npx sequelize db:migrate