/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const FoldersContext = createContext({})


export default function FoldersProvider({ children }) {

    const [folders, setFolders] = useState([])

    return (
        <FoldersContext.Provider value={{ folders, setFolders }}>
            {children}
        </FoldersContext.Provider>
    )

}