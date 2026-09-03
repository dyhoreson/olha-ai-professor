const express = require('express');
pool = require('./db'); 
const app = express();
const port = 3000;
app.use(express.json());

const cors = require('cors');
app.use(cors());

app.get('/produtos', (req, response) => {
  const sql = 'SELECT * FROM produtos';
    pool.query(sql, (err, result) => {
        response.json(result.rows);
    });

});

app.get('/produtos/:id', (req, response) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM produtos WHERE id = $1';
    pool.query(sql, [id], (err, result) => {
    response.json(result.rows);
    });
});



app.post('/produtos', (req, response) => {
  const nome = req.body.nome;
  const preco = req.body.preco;
  const sql = 'INSERT INTO produtos (nome, preco) VALUES ($1, $2) RETURNING *';
    pool.query(sql, [nome, preco], (err, result) => {
        response.status(201).json(result.rows[0]);
    });
});












app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});