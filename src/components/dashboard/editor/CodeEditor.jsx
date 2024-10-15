/* eslint-disable react/prop-types */
import Editor from "@monaco-editor/react";
import { useRef } from "react";
import { languages } from "../../../programmingLanguages/languages";

const CodeEditor = ({ fileData, setFileData, file }) => {
  const editorRef = useRef()

  function onMount(editor) {
    editorRef.current = editor
    editorRef.current.focus()
  }

  return (
    <div>

      <Editor
        height="78vh"
        language={languages[file?.extension]}
        value={fileData}
        onChange={(value) => setFileData(value)}
        onMount={onMount}
      />

    </div>
  )
}

export default CodeEditor;
