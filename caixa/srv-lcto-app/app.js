const express = require('express');
const cors = require('cors');
const lancamentos = require('./routes/lancamentos');


const app = express()
const port = 3001

app.use(express.json());

app.use(cors());

app.use('/lancamentos', lancamentos);

app.get('/', (req, res) => {
  res.send('Sucesso!')
})

app.listen(port, () => {
  console.log(`Server application Lancamento on port ${port}`)
})