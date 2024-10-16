/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
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
import sortFilesAndFolders from "../../../../../functions/sortFilesAndFolders";
import { ColorRing } from 'react-loader-spinner';
import { useIsMounted } from "../../../../../hooks/useIsMounted";


const DeleteFolders = ({ setOpenDeleteFolders }) => {
    const { folders, setFolders } = useFolders()
    const { currentFolder } = useCurrentFolder()
    const isMountedRef = useIsMounted()
    const [loading, setLoading] = useState(true)
    const [loadingFolders, setLoadingFolders] = useState({})
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

    }, [currentFolder, dispatch, navigate, setFolders])


    const handleDeleteFolder = useCallback(async (folder) => {

        try {
            setLoadingFolders(prev => ({ ...prev, [folder.id]: true }))

            const response = await axios.delete(url + `/folder/${folder.id}`, { withCredentials: true })

            if (response.data.status) {

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

            handleError({ error, dispatch, navigate })
        }

        finally {
            if (isMountedRef.current) {
                setLoadingFolders(prev => ({ ...prev, [folder.id]: false }));
            }
        }
    }, [dispatch, isMountedRef, navigate, setFolders])

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

                    folders.length > 0 ? (

                        <ItemsDiv>

                            {sortFilesAndFolders(folders).map(folder => (

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
