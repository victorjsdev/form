const express = require("express");
const server = express();

server.use(express.static("public"));
server.use(express.urlencoded({ extended: true }));

server.get("/", (req, res) => {
  res.render("index.html");
});

server.post("/", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const query = `INSERT INTO users ("name", "email", "password") 
  VALUES ($1, $2, $3)`;
  const values = [name, email, password];

  db.query(query, values, err => {
    if (err) {
      return res.send("Erro no banco de dados");
    }
    return res.redirect("/");
  });
});

//Configuração banco
const Pool = require("pg").Pool;
const db = new Pool({
  user: "postgres",
  password: "admin",
  host: "localhost",
  port: 5432,
  database: "donation"
});
//Configuração nunjucks
const nunjucks = require("nunjucks");
nunjucks.configure("./", {
  express: server,
  noCache: true
});
// configuração servidor
server.listen(3000, () => {
  console.log("Ligou o servidor");
});
