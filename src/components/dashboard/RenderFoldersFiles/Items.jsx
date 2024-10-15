/* eslint-disable react/prop-types */
import sortFilesAndFolders from "../../../functions/sortFilesAndFolders"
import Item from "./Item"

const Items = ({ title, items }) => {
    return (
        <div className="flex flex-col gap-y-2 pb-[20px]">

            <h1 className="text-[22px] pl-8">{title}</h1>

            <hr />

            <div className="flex justify-center md:justify-start flex-wrap gap-5 px-8">

                {sortFilesAndFolders(items).map((item) => (
                    <Item key={item.id} item={item} title={title} />
                ))}
                
            </div>

        </div>
    )
}

export default Items
