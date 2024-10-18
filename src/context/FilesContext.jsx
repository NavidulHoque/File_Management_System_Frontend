/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const FilesContext = createContext({})


export default function FilesProvider({ children }) {

    const [filesOfCurrentFolder, setFilesOfCurrentFolder] = useState([])

    return (
        <FilesContext.Provider value={{ filesOfCurrentFolder, setFilesOfCurrentFolder }}>
            {children}
        </FilesContext.Provider>
    )

}