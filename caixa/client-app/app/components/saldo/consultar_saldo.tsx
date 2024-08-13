
'use client'
import React, { useEffect, useState, useContext } from "react";
import {getServerData, Dados} from '../../lib/saldo';
import { DataContext } from '../../caixa/context_data';

const ConsultarSaldo = () => {

    let saldo :string = "";
    const [mensagem, setMensagem] = useState(null);
    const [list, setList] = useState({});
    const useDataContext = useContext(DataContext);

    useEffect(() => {
        const loadSaldo = async () => {
          try {
            const data = await getServerData(useDataContext!.dataContext);

            (typeof data.message != 'undefined') ? setList({value: null}) : setList(data);
            
            setMensagem(data.message);

          } catch (error) {
            console.error("Error loading saldo:", error);
          }
        };
        loadSaldo();
    }, [useDataContext!.dataContext]);
    
    if (list != null) {
      for (const [key, value] of Object.entries(list)) {
        if (value != null)
          for (const [key1, value1] of Object.entries(value)) {
            saldo = Number(value1).toFixed(2);
          }
      }
    }
    return ( 
      <div className="basis-3/5">
          <h2>Saldo: {mensagem != null ? `Saldo inexistente` : `${saldo}`}</h2>
      </div>
    );
 
};

export default ConsultarSaldo;