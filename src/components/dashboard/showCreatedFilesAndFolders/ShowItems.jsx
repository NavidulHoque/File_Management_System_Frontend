import sortFilesAndFolders from "../../../functions/sortFilesAndFolders"
import ShowItem from "./ShowItem"
/* eslint-disable react/prop-types */

const ShowItems = ({ title, items }) => {
    return (
        <div className="flex flex-col gap-y-2 pb-[20px]">

            <h1 className="text-[22px] text-center">{title}</h1>
            <hr />

            <div className="flex justify-center md:justify-start flex-wrap gap-5 px-8">
                {sortFilesAndFolders(items).map((item, i) => (
                    <ShowItem key={i} item={item} title={title} />
                ))}
            </div>
        </div>
    )
}

export default ShowItems
