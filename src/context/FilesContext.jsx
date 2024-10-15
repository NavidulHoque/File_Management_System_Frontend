/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const FilesContext = createContext({})


export default function FilesProvider({ children }) {

    const [files, setFiles] = useState([])

    return (
        <FilesContext.Provider value={{ files, setFiles }}>
            {children}
        </FilesContext.Provider>
    )

}