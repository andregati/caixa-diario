const express = require('express')
const cors = require('cors'); 
const saldo = require('./routes/saldo');


const app = express()
const port = 3002

app.use(express.json());

app.use(cors());

app.use('/saldo', saldo);

app.get('/', (req, res) => {
  res.send('Sucesso!')
})

app.listen(port, () => {
  console.log(`Server application Saldo on port ${port}`)
})