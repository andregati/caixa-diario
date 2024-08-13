
'use client'
import React, { useEffect, useState, useContext } from "react";
import {getServerData, Dados} from '../../lib/lancamentos';
import { DataContext, DataContextType } from '../../caixa/context_data';

const ListarLancamentos = () => {

    const [mensagem, setMensagem] = useState(null);

    const [list, setList] = useState<Dados[]>([]);
    const useDataContext = useContext(DataContext);
    
    useEffect(() => {
        const loadLancamentos = async () => {
          try {
            const data = await getServerData(useDataContext!.dataContext);

            if (typeof data.message != 'undefined') {
              setMensagem(data.message);
              setList({} as Dados[]);
            }
            else {
              setMensagem(null);
              setList(data as Dados[]);
            }
          } catch (error) {
            console.error("Error loading lançamentos:", error);
          }
        };
        loadLancamentos();
    }, [useDataContext!.dataContext]);
    var result = [list];    
    
    return (
      <>
          <div className="flex min-h-screen items-start justify-center">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-xl">
                <thead>
                  <tr className="bg-blue-gray-100 text-gray-700">
                    <th className="py-3 px-4 text-left">Data</th>
                    <th className="py-3 px-4 text-left">Descrição</th>
                    <th className="py-3 px-4 text-left">Movimento</th>
                    <th className="py-3 px-4 text-right">Valor</th>
                    {/* <th className="py-3 px-4 text-left">Action</th> */}
                  </tr>
                </thead>
                <tbody className="text-blue-gray-900">
                {mensagem != null 
                      ? <tr><td>Sem lançamentos</td></tr> : 
                      result.map((item: Dados[], index) => (
                    item.map((subitem: Dados, subindex) => (
                    // <tr className="border-b border-blue-gray-200"
                      <tr
                        key={subindex}>
                        <td className="py-3 px-4">{new Date(subitem.data).toLocaleDateString()}</td>
                        <td className="py-3 px-4">{subitem.descricao}</td>
                        <td className="py-3 px-4">{subitem.movimento == "C" ? "Crédito" : "Débito"}</td>
                        <td className="py-3 px-4">{new Intl.NumberFormat('pt-br', {minimumFractionDigits: 2}).format(subitem.valor)}</td>
                        {/* <td className="py-3 px-4">{subitem.id}</td> */}
                    </tr>
                    )))
                  )} 
                </tbody>
              </table>
            </div>
          </div>
        </>
      );
 
};

export default ListarLancamentos;

