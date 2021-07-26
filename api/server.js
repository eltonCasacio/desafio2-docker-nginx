const app = require("express")();
const mysql = require("mysql");
const port = 3000;
const dbConfig = {
  host: "db",
  password: "desafio",
  user: "root",
  database: "desafiodb",
};

const selectNames = async (req, res) => {
  const connection = mysql.createConnection(dbConfig);
  const sql = `SELECT name FROM people;`;

  connection.query(sql, (error, results, fields) => {
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

const insertName = async (name) => {
  const connection = mysql.createConnection(dbConfig);
  const sql = `insert into people(name) values('${name}');`;

  connection.query(sql);
  connection.end();
};

app.get("/", async (req, res, next) => {
  await insertName('Elton Casacio');
  await selectNames(req, res);
});

app.get("/:name", async (req, res) => {
  const { name } = req.params;
  await insertName(name);
  await selectNames(req, res);
});

app.listen(port, () => console.log(`Servidor ouvindo na porta ${port}`));
