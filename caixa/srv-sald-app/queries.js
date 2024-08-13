const connection = require('./db');

const getSaldoByData = async (paramData) => {
    console.log("getSaldoByData.paramData: ", [paramData]);
    try {
        const [query] = await connection.execute(
            "SELECT * FROM relatorio.saldo WHERE data = STR_TO_DATE(?,'%d/%m/%Y')",[paramData]);

        return query;
    } catch (error) {
        return error;
    }
}

const createSaldo = async (data, valor) => {
    console.log("createSaldo.data, valor: ", [data, valor]);
    try {
        const [query] = await connection.execute(
            "INSERT INTO relatorio.saldo (data, valor ) VALUES (STR_TO_DATE(?,'%d/%m/%Y'),?) ON DUPLICATE KEY UPDATE valor = valor + ?"
            , [data, valor, valor]);
        
        return query;
    } catch (error) {
        return error;
    }

}


const updateSaldo = async (data, valor) => {
    console.log("updateSaldo.data, valor", [data, valor]);

    try {
        const [query] = await connection.execute(
            "UPDATE relatorio.saldo SET valor = valor + ? where data=STR_TO_DATE(?,'%d/%m/%Y')",[valor, data]);
            
        return query;
    } catch (error) {
        return error;
    }

}

const getUltimoSaldoByData = async (data) => {
    console.log("ultimoSaldoByData.data ", [data]);
    
    try {
        const [query] = await connection.execute(
            "select valor from relatorio.saldo where data < STR_TO_DATE(?,'%d/%m/%Y') order by data desc LIMIT 1",[data]);
            
        return query;
    } catch (error) {
        return error;
    }

}

const getUltimoSaldo = async () => {
    console.log("ultimoSaldo ");
    
    try {
        const [query] = await connection.execute(
            "select data from relatorio.saldo where data < STR_TO_DATE(?,'%d/%m/%Y') order by data desc LIMIT 1");
            
        return query;
    } catch (error) {
        return error;
    }

}

module.exports =  {getSaldoByData, createSaldo, updateSaldo, getUltimoSaldoByData }