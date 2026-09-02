const express = require('express');
pool = require('./db'); 
const app = express();
const port = 3000;
app.use(express.json());

app.get('/produtos', (req, res) => {
  const sql = 'SELECT * FROM produtos';
    pool.query(sql, (err, result) => {
  
        res.json(result.rows);
    });

});

app.get('/produtos/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM produtos WHERE id = $1';
    pool.query(sql, [id], (err, result) => {
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Produto não encontrado' });
        }
    });
});

app.post('/produtos', (req, res) => {
  const { nome, preco } = req.body;
  const sql = 'INSERT INTO produtos (nome, preco) VALUES ($1, $2) RETURNING *';
    pool.query(sql, [nome, preco], (err, result) => {
        res.status(201).json(result.rows[0]);
    });
});












app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});