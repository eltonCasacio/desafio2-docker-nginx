const app = require("express")();
const mysql = require("mysql");
const port = 3000;
const dbConfig = {
  host: "db",
  password: "desafio",
  user: "root",
  database: "desafiodb",
};

const init = async (req, res) => {
  const {name} = req.params
  const connection = mysql.createConnection(dbConfig);
  
  const sqlInsert = `INSERT INTO people(name) VALUES('${name || "Default name"}');`;
  connection.query(sqlInsert)


  const sqlSelect = `SELECT name FROM people;`;

  connection.query(sqlSelect, (error, results, fields) => {
    if (error) throw error;

    let listLi = results.map((item) => `<li>${item.name}<\li>`);

    res.send(`
    <h1>Full Cycle Rocks!</h1>
    <ul style="list-style:none">
    ${listLi?.reduce((ac, value) => ac + value)}
    </ul>
    `);
  });
  connection.end();
};

app.get("/", (req, res, next) => {
  init(req, res);
});

app.get("/:name", (req, res) => {
  init(req, res);
});

app.listen(port, () => console.log(`Servidor ouvindo na porta ${port}`));
