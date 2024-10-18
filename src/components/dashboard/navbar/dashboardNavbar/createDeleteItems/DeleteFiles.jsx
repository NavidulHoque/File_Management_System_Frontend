/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import axios from 'axios';
import { url } from "../../../../../url";
import Portal from './Portal';
import CrossIcon from "./CrossIcon";
import useCurrentFolder from "../../../../../hooks/useCurrentFolder";
import getFiles from "./../../../../../functions/getFiles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFiles from "../../../../../hooks/useFiles";
import successToast from './../../../../../functions/successToast';
import Heading from './Heading';
import ParentDiv from "./ParentDiv";
import Button from "./Button";
import ItemsDiv from "./ItemsDiv";
import ItemDiv from "./ItemDiv";
import handleError from "../../../../../functions/handleError";
import { ColorRing } from "react-loader-spinner";
import sortFilesAndFolders from "../../../../../functions/sortFilesAndFolders";


const DeleteFiles = ({ setOpenDeleteFiles }) => {

    const { currentFolder } = useCurrentFolder()
    const { filesOfCurrentFolder, setFilesOfCurrentFolder } = useFiles()
    const [loading, setLoading] = useState(true)
    const [loadingFiles, setLoadingFiles] = useState({})
    const user = useSelector(state => state.UserLogin.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {

        getFiles({ path: `/file/files/${currentFolder}/${user.id}`, setLoading, setFilesOfCurrentFolder, dispatch, navigate })

    }, [user, currentFolder, dispatch, navigate, setFilesOfCurrentFolder])


    const handleDeleteFile = useCallback(async (file) => {

        try {
            setLoadingFiles(prev => ({ ...prev, [file.id]: true }))

            const response = await axios.delete(url + `/file/${file.id}`, { withCredentials: true })

            if (response.data.status) {

                setFilesOfCurrentFolder(prevFiles => prevFiles.filter(
                    prevFile => prevFile.id !== response.data.file.id
                ))

                setLoadingFiles(prev => ({ ...prev, [file.id]: false }))

                successToast(response.data.message)
            }

            else {
                throw new Error(response.data.message)
            }
        }

        catch (error) {

            setLoadingFiles(prev => ({ ...prev, [file.id]: false }))
            handleError({ error, dispatch, navigate })
        }

    }, [dispatch, navigate, setFilesOfCurrentFolder])

    return (
        <>
            <Portal>

                <ParentDiv extraStyle="h-[650px] overflow-y-auto">

                    <CrossIcon handleClick={() => setOpenDeleteFiles(false)} />

                    <Heading label="Delete Files" />

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
                        filesOfCurrentFolder.length > 0 ? (

                            <ItemsDiv>

                                {sortFilesAndFolders(filesOfCurrentFolder).map(file => (

                                    <ItemDiv key={file.id}>

                                        <p>{file.name}</p>

                                        <Button
                                            loading={loadingFiles[file.id]}
                                            label="delete"
                                            handleClick={() => handleDeleteFile(file)}
                                            bgColor="bg-red-500"
                                            bgColorHover="hover:bg-red-600"
                                            bgColorDisabled="disabled:bg-red-300"
                                        />

                                    </ItemDiv>

                                ))}

                            </ItemsDiv>
                        ) : (
                            <h1 className="text-center text-[15px]">No Files to show</h1>
                        )
                    )}

                </ParentDiv>

            </Portal>
        </>
    );
}

export default DeleteFiles
