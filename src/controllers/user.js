// Import db connection
const db = require("../database/connection")

exports.getUsers = async (req, res) => {
  try {
      res.send({
          status: 'success',
          data: {
              todos
          }
      })
  } catch (error) {
      console.log(error)
      res.send({
          status: 'failed',
          message: 'Server Error'
      })
  }
}

exports.getUser = async (req, res) => {
  try {
      const id = req.params.id
      const index = id - 1    
      res.send({
          status: 'success',
          data: {
              todo: todos[index]
          }
      })
  } catch (error) {
      console.log(error)
      res.send({
          status: 'failed',
          message: 'Server Error'
      })
  }
}

exports.addUsers = async (req, res) => {
  try {
    const { email, password, name, status } = req.body;

    const query = `INSERT INTO users (email,password,name,status) VALUES ('${email}','${password}','${name}','${status}')`;

    await db.sequelize.query(query);

    res.send({
      status: "success",
      message: "Add user finished",
      query,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};