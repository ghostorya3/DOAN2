import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from '@codemirror/lang-javascript';

function App() {
    const [value, setValue] = React.useState("console.log('hello world!');");
    const onChange = React.useCallback((val, viewUpdate) => {
        console.log('val:', val);
        setValue(val);
    }, []);
    return (
        <CodeMirror
            value={value}
            height="500px"
            width="100%"
            theme={vscodeDark}
            extensions={[javascript({ jsx: true })]}
            onChange={onChange}
        />
    );
}
export default App;