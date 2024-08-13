 'use server'

import { dateToURLQuery } from "./data";

 export interface Dados {
     data: Date;
     valor: number;
 }

 export const getServerData = async(data: Date) => {

    const url = "http://localhost:3002/saldo/"+(await dateToURLQuery(data));

    const res = await fetch(url,
                            {
                                headers: {'Content-Type': 'application/json'},
                                method:"GET"
                            });
    if (!res.ok) {
        
        throw new Error('Falha na busca dos dados: ' + res.status + ' ' + res.statusText)
    }

    return await res.json();

};

// export default async function DadosSaldo(data: Date) {
  
//    const resultado =  getServerData(data);

//     return resultado;
// }
