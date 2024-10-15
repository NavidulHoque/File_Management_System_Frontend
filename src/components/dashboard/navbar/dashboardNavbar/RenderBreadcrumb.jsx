/* eslint-disable react/prop-types */
import { ColorRing } from 'react-loader-spinner'
import RedirectButton from './RedirectButton'

const RenderBreadcrumb = ({loading, currentFolder, folderLists}) => {
  return (
    loading ? (
        <ColorRing
          visible={true}
          height="50"
          width="50"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      ) : (
        <>
          <li>

            {currentFolder !== "root" ? (
              <>
                <RedirectButton
                  path="/dashboard"
                  label="Root"
                />

                <span className="mx-2 text-gray-500">/</span>
              </>
            ) : (
              <span className="text-gray-500">Root</span>
            )}

          </li>

          {folderLists.map((list, index) => (

            <li key={list?.id}>

              {folderLists.length - 1 !== index ? (
                <>
                  <RedirectButton
                    path={`/dashboard/folder/${list?.id}`}
                    label={list?.name}
                  />

                  <span className="mx-2 text-gray-500">/</span>
                </>
              ) : (
                <span className="text-gray-500">{list?.name}</span>
              )}

            </li>

          ))}
        </>
      )
  )
}

export default RenderBreadcrumb
