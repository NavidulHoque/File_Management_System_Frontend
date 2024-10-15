/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from 'axios';
import { url } from "../../../../../url"; 
import Portal from './Portal';
import CrossIcon from "./CrossIcon";
import useCurrentFolder from "../../../../../hooks/useCurrentFolder";
import getFiles from "./../../../../../functions/getFiles";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFiles from "../../../../../hooks/useFiles";
import successToast from './../../../../../functions/successToast';
import Heading from './Heading';
import ParentDiv from "./ParentDiv";
import Button from "./Button";
import ItemsDiv from "./ItemsDiv";
import ItemDiv from "./ItemDiv";
import handleError from "../../../../../functions/handleError";


const DeleteFiles = ({ setOpenDeleteFiles }) => {

    const [loading, setLoading] = useState(false)
    const { currentFolder } = useCurrentFolder()
    const {files, setFiles} = useFiles()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {

        getFiles({ path: `/file/files/${currentFolder}`, setLoading, setFiles, dispatch, navigate })

    }, [currentFolder])


    async function handleDeleteFile(file) {

        try {
            setLoading(true)

            const response = await axios.delete(url + `/file/${file.id}`, { withCredentials: true })

            if (response.data.status) {

                setLoading(false)
                setFiles(prevFiles => prevFiles.filter(prevFile => prevFile.id !== response.data.file.id))
                successToast(response.data.message)
            }

            else {
                throw new Error(response.data.message);
            }
        }

        catch (error) {

            handleError({setLoading, error, dispatch, navigate})
        }
    }

    return (
        <>
            <Portal>

                <ParentDiv extraStyle="h-[650px] overflow-y-auto">

                    <CrossIcon handleClick={() => setOpenDeleteFiles(false)} />

                    <Heading label="Delete Files" />

                    {files.length > 0 ? (

                        <ItemsDiv>

                            {files.map(file => (

                                <ItemDiv key={file.id}>

                                    <p>{file.name}</p>

                                    <Button
                                        loading={loading}
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
                    )}

                </ParentDiv>

            </Portal>
        </>
    );
}

export default DeleteFiles
