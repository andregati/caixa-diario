const { Router } = require('express');
const queries  = require('../queries');

const router = Router();

router.get('/:paramData', async (req, res) => {
    
    const data = [req.params.paramData.substring(6,8),
                  req.params.paramData.substring(4,6),
                  req.params.paramData.substring(0,4)].join("/");

    const query = await queries.getSaldoByData(data);
    
    if (query.length === 0) {

        return res.status(200).json({ message: `saldo inexistente para a data ${data}` });

    }
    return res.status(200).json(query);
})

router.post('/', async (req,res) => {

    const { data, valor, movimento} = req.body;
    let valor_movimento = (movimento == "C") ? Number(valor) : Number(-valor);
    console.log("movimento: "+valor_movimento);

    try {
        const querySaldo = await queries.getUltimoSaldoByData(data);
        const ultimoSaldo = Number(querySaldo[0].valor);

        console.log(ultimoSaldo);
        const query = await queries.getSaldoByData(data);
        if (query.length === 0) {
            console.log(`Saldo inexistente para a data ${data}. Criando`);
            const query = await queries.createSaldo(data, (ultimoSaldo + valor_movimento));
    
            return res.status(200).json(query);
        }
        else {
            console.log(`Saldo existente para a data ${data}. Atualizando`);

            const query = await queries.updateSaldo(data, valor_movimento);

            return res.status(200).json(query);
        }
        
            
    } catch (error) {
        return res.status(500).json(error);
    }
})

router.put('/', async (req,res) => {

    const { data, valor, movimento} = req.body;

    let novo_valor = valor;
    if (movimento === "D")
        novo_valor = valor*-1;

    try {
        const query = await queries.updateSaldo(data, novo_valor);
        
        return res.status(200).json(query);
            
    } catch (error) {
        return res.status(500).json(error);
    }
})

module.exports = router;


