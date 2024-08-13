const connection = require('./db');

const getAllLancamentos = async () => {
    try {
        const [query] = await connection.execute(
            "SELECT * FROM caixa.lancamentos");

        return query;
    } catch (error) {
        return error;
    }
}

const getLancamentosById = async (id) => {
    try {
        const [query] = await connection.execute(
            "SELECT * FROM caixa.lancamentos WHERE id = ?", [id]);

        return query;
    } catch (error) {
        return error;
    }
}

const getLancamentosByData = async (data) => {
    console.log("queries.getLancamentosByData.data: ", [data]);
    try {    
        const [query] = await connection.execute(
            "SELECT * FROM caixa.lancamentos WHERE data = STR_TO_DATE(?,'%Y%m%d')", [data]);

        return query;
    } catch (error) {
        return error;
    }
}

const createLancamentos = async (req) => {
    
    const { data, descricao, valor, movimento} = req.body;

    console.log("data:" + data);
    try {
        const [query] = await connection.execute(
            "INSERT INTO caixa.lancamentos (data, descricao, valor, movimento ) VALUES (STR_TO_DATE(?,'%d/%m/%Y'),?,?,?)"
            , [data, descricao, valor, movimento]);
        return query;
    } catch (error) {
        return error;
    }
}

module.exports = {getAllLancamentos, getLancamentosById, getLancamentosByData, createLancamentos }