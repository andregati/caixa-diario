'use client'

import SelectedData from '../components/data';
import { Suspense, useState } from "react";
import ListarLancamentos from '../components/lancamentos/listar_lancamentos';
import Saldo from '../components/saldo/consultar_saldo';

//import Saldo from './saldo';
//import {ChangeEvent, useState} from 'react';

import { useContext } from 'react';
import { DataContext } from './context_data';
import CadastrarLancamentos from '../components/lancamentos/cadastrar_lancamentos';

export default function Home() {
        const [dataContext, setDataContext] = useState<Date>(new Date());
        //const {dataContext, setDataContext} = useContext(DataContext);

    return (<div>
                <div id="main" className=''>
                    <DataContext.Provider value={{dataContext, setDataContext} }>
                    <div className="flex min-h-28 min-w-80 items-start justify-center">
                        <div className="flex flex-row">
                                <SelectedData />
                                <Saldo />
                        </div>
                    </div>
                    <div>
                        <CadastrarLancamentos />
                    </div>
                    <div>
                        <ListarLancamentos />
                    </div>
                    </DataContext.Provider>
                </div>
            </div>
            );
}