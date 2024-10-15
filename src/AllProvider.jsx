/* eslint-disable react/prop-types */
import CurrentFolderProvider from "./context/CurrentFolderContext";
import FilesProvider from "./context/FilesContext";
import FoldersProvider from "./context/FoldersContext";

const AllProvider = ({ children }) => {
    return (
        <FilesProvider>

            <FoldersProvider>

                <CurrentFolderProvider>

                    {children}

                </CurrentFolderProvider>

            </FoldersProvider>

        </FilesProvider>
    );
}

export default AllProvider
