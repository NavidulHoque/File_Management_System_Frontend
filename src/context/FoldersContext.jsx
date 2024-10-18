/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const FoldersContext = createContext({})


export default function FoldersProvider({ children }) {

    const [foldersOfCurrentFolder, setFoldersOfCurrentFolder] = useState([])

    return (
        <FoldersContext.Provider value={{ foldersOfCurrentFolder, setFoldersOfCurrentFolder }}>
            {children}
        </FoldersContext.Provider>
    )

}