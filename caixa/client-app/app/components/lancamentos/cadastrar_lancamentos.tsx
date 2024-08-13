
'use client'
import React, { useEffect, useState, useContext, FormEvent, ChangeEvent } from "react";
import {sendServerData, Dados} from '../../lib/lancamentos';
import { DataContext, DataContextType } from '../../caixa/context_data';

const CadastrarLancamentos = () => {
      const [isLoading, setIsLoading] = useState<boolean>(false)
      const [error, setError] = useState<string[] | null>([])
      const [valor, setValor] = useState<number>();
      const useDataContext = useContext(DataContext);

      let newErrors: string[] = [];


      function validateForm(data: Dados) {
            let dataAtual = new Date();
            dataAtual.setHours(0,0,0,0);
            useDataContext!.dataContext.setHours(0,0,0,0);
            console.log("dataContext:"+useDataContext!.dataContext.toDateString());
            console.log("dataAtual:"+dataAtual.toDateString());    
            console.log("dataContext:"+new Date(useDataContext!.dataContext.toUTCString()));

            if (useDataContext!.dataContext > dataAtual) {
                  const dataMsg = dataAtual.toLocaleDateString();
                  const msg = `Data deve ser igual ou menor do que a data atual (${dataMsg})`;
                  newErrors!.push(msg)
            }

            if (!data.descricao.trim()) {
                  const msg = 'Descrição é obrigatória';
                  newErrors!.push(msg)
            } else if (data.descricao.length < 3) {
                  const msg = 'Descrição deve ter no mínimo 3 caracteres';
                  newErrors!.push(msg)
            }

            if (["C","D"].indexOf(data.movimento) == -1) {
                  const msg = 'Movimento Crédito ou Débito não informado';
                  newErrors!.push(msg)
            }

            if (data.valor.valueOf()<=0) {
                  const msg = 'Valor deve ser maior do que zero';
                  newErrors!.push(msg)
            }
            console.log(newErrors);
            return newErrors;

      };

      const handleSubmit = async (formData: FormEvent<HTMLFormElement>) => {
            formData.preventDefault()
            setIsLoading(true)
            setError((error as []).splice(0,error?.length)) // Clear previous errors when a new request starts
            console.log(formData.currentTarget);

            //const dadosLancamento = new FormData(formData.currentTarget);
            
            const dadosLancamento = new FormData(formData.currentTarget);
            
            // var object = {};
            // dadosLancamento.forEach((value, key) => object[key] = value);
            // var json = JSON.stringify(object);
            console.log("valueOf:" + parseFloat(dadosLancamento.get("valor")!.toString().substring(3,dadosLancamento.get("valor")!.toString().length).replace(".","").replace(",",".")).toString());

            const data: Dados = {id: 0,
                              data:  useDataContext!.dataContext,
                              descricao: dadosLancamento.get("descricao")!.toString(),
                              valor: parseFloat(dadosLancamento.get("valor")!.toString().substring(3,dadosLancamento.get("valor")!.toString().length).replace(".","").replace(",",".")),
                              movimento: dadosLancamento.get("movimento")!.toString(),
                              }
            
      
            // Handle response if necessary
            //const data = await response.json();
            //const errorCount = validateForm(data); 
            //console.log("validacao: "+ errorCount);
            setError(validateForm(data));
            console.log("error:" + error);
            if (newErrors!.length === 0) {
                  console.log("enviou ao servidor");
                  console.log(await sendServerData(data));
            }
            else {
                  console.log("não enviou");
                  console.log(newErrors);
            }
      }
 
      function handleValorChange(e: any) {
            console.log("OnChange");
            console.log("digitado:" + e.nativeEvent?.data);
            if (Number(e.target.value)) {
                  console.log(Number(e.target.value));
                  setValor(Number(e.currentTarget.value))
            }
            else {
                  e.currentTarget.value = null
            }
      }

      function handleValorFocus(e: React.FocusEvent<HTMLInputElement>) {
            console.log("focus");
            if (e.target.value!='') {            
                  var strValue = e.target.value
                  e.target.value = parseFloat(strValue.substring(3,strValue.length).replace(".","").replace(",",".")).toString();
                  e.target.select()
            }
      }
    
      function handleValorBlur (e: React.FocusEvent<HTMLInputElement>) {
            console.log("OnBlur");
            if (Number(e.target.value)) {
                  const newValor = new Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL', minimumFractionDigits: 2}).format(Number(e.target.value))
                  e.target.value = newValor
            }
      };
      
      return (
      <>
            <div className="flex min-h-28 items-start justify-center">
                  <div className="overflow-x-auto">
                        <form onSubmit={handleSubmit}>
                              <input type="text"
                                    name="descricao"
                                    placeholder="Histórico de lançamento..."
                                    className="py-2 px-2" />
                              <input type="text" 
                                    name="valor" 
                                    step="any"
                                    min="0.00"
                                    placeholder="Valor movimentado" 
                                    onFocus={handleValorFocus}
                                    onBlur={handleValorBlur}
                                    onChange={handleValorChange}
                                    className="py-2 px-2"/>
                              <input type="radio"
                                    name="movimento" 
                                    value="C" 
                                    defaultChecked 
                                    className="py-2 px-2"/> Crédito
                              <input type="radio" 
                                    name="movimento"
                                    value="D" 
                                    className="py-2 px-2"/> Débito
                              <button type="submit"
                                    className="p-4 text-sm font-semibold leading-6 text-gray-900">Lançar</button>
                        </form>
                  </div>
            </div>
            <div>
                  {error != null 
                  ?  <ul>
                        {error.map((erro_msg) => (
                        <li key={erro_msg}>{erro_msg}</li>
                        ))}
                    </ul> 
                  : "Sem erros"}
            </div>
      </>
      );
 
};

export default CadastrarLancamentos;

