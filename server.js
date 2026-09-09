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
    if (result.rows.length === 0) {
      return response.sendStatus(404);
    }

    response.json(result.rows[0]);
    });
});



app.post('/produtos', (req, response) => {
  const nome = req.body.nome;
  const preco = req.body.preco;
  const descricao = req.body.descricao;
  const sql = 'INSERT INTO produtos (nome, preco, descricao) VALUES ($1, $2, $3) RETURNING *';
  pool.query(sql, [nome, preco, descricao], (err, result) => {
    response.status(201).json(result.rows[0]);
  });
});

app.delete('/produtos/:id', (req, response) => {
  const id = req.params.id;
  const sql = 'DELETE FROM produtos WHERE id = $1 RETURNING *';

  pool.query(sql, [id], (err, result) => {
    if (result.rows.length === 0) {
      return response.sendStatus(404);
    }

    response.json(result.rows[0]);
  });
});












app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
