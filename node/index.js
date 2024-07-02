const express = require('express')
const axios = require('axios').default;
const app = express()

const port = 3000

const config = {
    host: 'mysql',
    user: 'root',
    password: 'root',
    database: 'basenode'
};

const mysql = require('mysql');
const connection = mysql.createConnection(config);
const sql_getall = `SELECT id, name FROM people`;



app.get('/', (_req, res) => {
   insertName()
   getAll(res)
})

app.listen(port, () => {
    console.log('Rodando na porta' + port)
})

async function insertName(){
  const name = await getName();
  const sql_insert = `INSERT INTO people(name) values('${name}')`;
  connection.query(sql_insert);
}

async function getName() {
  const RANDOM = Math.floor(Math.random() * 10);
  const response = await axios.get('https://swapi.dev/api/people');
  return response.data.results[RANDOM].name;
}


async function getAll(res) {

  await connection.query(sql_getall, (error, results) => {
    if (error) {
      console.log(`Error getting people: ${error}`);
      res.status(500).send('Error getting people');
      return;
    }

    const tableRows = results
      .map(
        (person) => `
        <tr>
          <td>${person.id}</td>
          <td>${person.name}</td>
        </tr>
      `
      )
      .join('');
    const table = `
      <table>
        <tr>
          <th>ID</th>
          <th>Name</th>
        </tr>${tableRows}
      </table>`;

    res.send(`
      <h1>Full Cycle Rocks!</h1>
      ${table}
    `);
  });
}