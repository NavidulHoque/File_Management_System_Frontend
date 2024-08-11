/* eslint-disable react/prop-types */
import Editor from "@monaco-editor/react";
import { useRef } from "react";
import { languages } from "../../../programmingLanguages/languages";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const CodeEditor = ({fileData, setFileData}) => {
    const {fileID} = useParams()
    const file = useSelector(state => state.Files.files.find(file => file.fileID === fileID))
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
  );
};

export default CodeEditor;
