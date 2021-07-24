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

app.get("/", async (req, res) => {
  await selectNames(req, res);
});

app.listen(port, () => console.log(`Servidor ouvindo na porta ${port}`));
