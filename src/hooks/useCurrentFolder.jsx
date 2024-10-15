import { useContext } from "react"
import { CurrentFolderContext } from "../context/CurrentFolderContext"

const useCurrentFolder = () => {
  return useContext(CurrentFolderContext)
}

export default useCurrentFolder
