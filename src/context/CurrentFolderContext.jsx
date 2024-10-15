/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const CurrentFolderContext = createContext({})


export default function CurrentFolderProvider({ children }) {

    const [currentFolder, setCurrentFolder] = useState("root")

    return (
        <CurrentFolderContext.Provider value={{ currentFolder, setCurrentFolder }}>
            {children}
        </CurrentFolderContext.Provider>
    )

}

