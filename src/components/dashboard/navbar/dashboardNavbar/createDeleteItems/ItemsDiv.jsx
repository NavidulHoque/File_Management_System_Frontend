/* eslint-disable react/prop-types */

const ItemsDiv = ({children}) => {
    return (
        <div className="flex flex-col gap-y-3">
            {children}
        </div>
    )
}

export default ItemsDiv
