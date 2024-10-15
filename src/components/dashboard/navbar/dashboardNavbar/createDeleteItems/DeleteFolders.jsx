/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import successToast from "../../../../../functions/successToast";
import { url } from "../../../../../url";
import useFolders from "../../../../../hooks/useFolders";
import getFolders from "../../../../../functions/getFolders";
import useCurrentFolder from "../../../../../hooks/useCurrentFolder";
import Portal from './Portal';
import ParentDiv from "./ParentDiv";
import Button from "./Button";
import CrossIcon from "./CrossIcon";
import Heading from "./Heading";
import ItemsDiv from "./ItemsDiv";
import ItemDiv from "./ItemDiv";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import handleError from "../../../../../functions/handleError";


const DeleteFolders = ({ setOpenDeleteFolders }) => {
    const { folders, setFolders } = useFolders()
    const { currentFolder } = useCurrentFolder()
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {

        getFolders({
            path: `/folder/foldersOfCurrentFolder/${currentFolder}`,
            setLoading,
            setFolders,
            dispatch,
            navigate
        })

    }, [currentFolder])


    async function handleDeleteFolder(folder) {

        try {
            setLoading(true)

            const response = await axios.delete(url + `/folder/${folder.id}`, { withCredentials: true })

            if (response.data.status) {

                setLoading(false)

                setFolders(prevFolders => prevFolders.filter(
                    prevFolder => prevFolder.id !== response.data.folder.id
                ))

                successToast(response.data.message)
            }

            else {
                throw new Error(response.data.message)
            }
        }

        catch (error) {

            handleError({ setLoading, error, dispatch, navigate })
        }
    }

    return (
        <Portal>

            <ParentDiv extraStyle="h-[650px] overflow-y-auto">

                <CrossIcon handleClick={() => setOpenDeleteFolders(false)} />

                <Heading label="Delete Folders" />

                {folders.length > 0 ? (

                    <ItemsDiv>

                        {folders.map(folder => (

                            <ItemDiv key={folder.id}>

                                <p>{folder.name}</p>

                                <Button
                                    loading={loading}
                                    label="delete"
                                    handleClick={() => handleDeleteFolder(folder)}
                                    bgColor="bg-red-500"
                                    bgColorHover="hover:bg-red-600"
                                    bgColorDisabled="disabled:bg-red-300"
                                />

                            </ItemDiv>

                        ))}

                    </ItemsDiv>
                ) : (
                    <h1 className="text-center text-[15px]">No Folders to show</h1>
                )}

            </ParentDiv>

        </Portal>
    );
}

export default DeleteFolders
