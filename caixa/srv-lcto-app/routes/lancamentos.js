const { Router } = require('express');
const queries = require('../queries');

const router = Router();

router.get('/', async (req,res) => {
    console.log("buscar todos os lançamentos");
    const query = await queries.getAllLancamentos();
    return res.status(200).json(query);
})

router.get('/:data', async (req, res) => {
    const { data } = req.params;

    const query = await queries.getLancamentosByData(data);
    if (query.length === 0) {
        return res.status(200).json({ message: 'lançamento não encontrado' });

    }
    return res.status(200).json(query);
})

router.post('/', async (req,res) => {
    console.log("lancamentos.post");

    try {
        const query = await queries.createLancamentos(req);
        
        comunicaLancamento(req);

        return res.status(200).json(query);
            
    } catch (error) {
        return res.status(500).json(error);
    }
})

const comunicaLancamento = async (req) => {

    const dataDTO = {"data": req.body.data, 
                     "valor": req.body.valor,
                     "movimento": req.body.movimento};

    const response = await fetch('http://localhost:3002/saldo/', {
        method: 'post',
        body: JSON.stringify(dataDTO),
        headers: {'Content-Type': 'application/json'}
    });
    const retorno = await response.json();
    
    console.log(retorno);    

}

module.exports = router;


