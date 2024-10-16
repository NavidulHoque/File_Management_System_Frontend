/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import sortFilesAndFolders from "../../../../../functions/sortFilesAndFolders";
import { ColorRing } from 'react-loader-spinner';


const DeleteFolders = ({ setOpenDeleteFolders }) => {
    const { foldersOfCurrentFolder, setFoldersOfCurrentFolder } = useFolders()
    const { currentFolder } = useCurrentFolder()
    const [loading, setLoading] = useState(true)
    const [loadingFolders, setLoadingFolders] = useState({})
    const user = useSelector(state => state.UserLogin.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {

        getFolders({
            path: `/folder/foldersOfCurrentFolder/${currentFolder}/${user.id}`,
            setLoading,
            setFoldersOfCurrentFolder,
            dispatch,
            navigate
        })

    }, [user, currentFolder, dispatch, navigate, setFoldersOfCurrentFolder])


    const handleDeleteFolder = useCallback(async (folder) => {

        try {
            setLoadingFolders(prev => ({ ...prev, [folder.id]: true }))

            const response = await axios.delete(url + `/folder/${folder.id}`, { withCredentials: true })

            if (response.data.status) {

                setFoldersOfCurrentFolder(prevFolders => prevFolders.filter(
                    prevFolder => prevFolder.id !== response.data.folder.id
                ))

                setLoadingFolders(prev => ({ ...prev, [folder.id]: false }));
                
                successToast(response.data.message)
            }

            else {
                throw new Error(response.data.message)
            }
        }

        catch (error) {

            setLoadingFolders(prev => ({ ...prev, [folder.id]: false }));
            handleError({ error, dispatch, navigate })
        }

    }, [dispatch, navigate, setFoldersOfCurrentFolder])

    return (
        <Portal>

            <ParentDiv extraStyle="h-[650px] overflow-y-auto">

                <CrossIcon handleClick={() => setOpenDeleteFolders(false)} />

                <Heading label="Delete Folders" />

                {loading ? (

                    <div className='w-full flex justify-center items-center'>

                        <ColorRing
                            visible={true}
                            height="100"
                            width="100"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperClass="color-ring-wrapper"
                            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                        />

                    </div>

                ) : (

                    foldersOfCurrentFolder.length > 0 ? (

                        <ItemsDiv>

                            {sortFilesAndFolders(foldersOfCurrentFolder).map(folder => (

                                <ItemDiv key={folder.id}>

                                    <p>{folder.name}</p>

                                    <Button
                                        loading={loadingFolders[folder.id]}
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
                    )

                )}

            </ParentDiv>

        </Portal>
    );
}

export default DeleteFolders
