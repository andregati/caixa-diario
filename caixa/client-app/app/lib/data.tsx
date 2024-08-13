'use server'

export async function dateToURLQuery(data: Date) {
    return data.getUTCFullYear().toString() + 
          (data.getUTCMonth()+1).toString().padStart(2,"0") +
           data.getUTCDate().toString().padStart(2,"0");
}