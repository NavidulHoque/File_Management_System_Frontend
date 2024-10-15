/* eslint-disable react/prop-types */
import { ColorRing } from 'react-loader-spinner';
import Items from './Items';

const RenderFoldersFiles = ({ loading, folders, files }) => {
    return (
        loading ? (
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
        )
            : (folders.length === 0 && files.length === 0) ? (
                <p className="text-center">This Folder is empty</p>
            )
                : (files.length === 0) ? (
                    <Items title="Folders" items={folders} />
                )
                    : (folders.length === 0) ? (
                        <Items title="Files" items={files} />
                    ) : (
                        <>
                            <Items title="Folders" items={folders} />
                            <Items title="Files" items={files} />
                        </>
                    )

    )
}

export default RenderFoldersFiles
