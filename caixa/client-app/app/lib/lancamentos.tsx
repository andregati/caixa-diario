'use server'

import { dateToURLQuery } from "./data";

export interface Dados {
    id: number;
    data: Date;
    descricao: string;
    valor: number;
    movimento: string;
}

export async function getServerData(data: Date) {
   const url = "http://localhost:3001/lancamentos/"+(await dateToURLQuery(data));

   const res = await fetch(url,
                            {
                                headers: {'Content-Type': 'application/json'},
                                method:"GET"
                            });

   if (!res.ok) {
        throw new Error('Falha na busca dos dados: ' + res.status + ' ' + res.statusText)
   }

   return res.json();
};

export async function sendServerData(data: Dados) {

    const dataDTO = {id: data.id,
                     data:  data.data.toLocaleDateString(),
                     descricao: data.descricao,
                     valor: data.valor,
                     movimento: data.movimento
                    }
   const url = "http://localhost:3001/lancamentos/";


   const response = await fetch(url,
                            {
                                headers: {'Content-Type': 'application/json'},
                                method:"POST",
                                body:JSON.stringify(dataDTO)
                            });

   if (!response.ok) {
        throw new Error('Falha na busca dos dados: ' + response.status + ' ' + response.statusText)
   }

   return response.json();
};
