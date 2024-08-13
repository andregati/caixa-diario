import { createContext } from 'react';

export interface DataContextType {
    dataContext: Date;
    setDataContext: React.Dispatch<React.SetStateAction<Date>>;
}

export const DataContext = createContext<DataContextType | null>(null);


// export const DataContext = createContext<{DataContextType: any} | undefined>(undefined);

// export const DataContext = createContext<{
//     dataContext: Date;
//     setDataContext: React.Dispatch<React.SetStateAction<Date>>;
// } | undefined>(undefined);