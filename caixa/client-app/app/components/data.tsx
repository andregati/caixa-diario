'use client'
import { useContext } from 'react';
import { DataContext } from '../caixa/context_data';

function dateToInputDate(data: Date) {
    console.log("dateToInputDate: " + data);
    return [data.getUTCFullYear().toString(), 
            (data.getUTCMonth()+1).toString().padStart(2,"0"),
            (data.getUTCDate().toString().padStart(2,"0"))].join("-");
}

export default function Data() {
    const useDataContext = useContext(DataContext);

    const handleDataChange = (e: any) => {
        console.log("handleDataChange: " + e.target.value);
        let novaData = new Date(e.target.value);
        novaData = new Date(novaData.getUTCFullYear(), novaData.getUTCMonth(), novaData.getUTCDate(),0,0,0,0)
        console.log("novaData: " + novaData);
        useDataContext!.setDataContext(novaData);
    };

    return ( 
        // <div className='basis-2/5'>
        <div>
            <input id="data_selected" 
                type="date" 
                value={dateToInputDate(useDataContext!.dataContext)} 
                onChange= {handleDataChange}>
            </input>
        </div>
    );
  }