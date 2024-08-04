import React, { useEffect, useState, useRef } from 'react';
import MonacoEditor, { loader } from '@monaco-editor/react';
import './CodeEditor.css';

const CodeEditor = ({ code, onVariableClick, disabled }) => {
  const [displayedCode, setDisplayedCode] = useState('');
  const isAnimatingRef = useRef(false);
  const editorRef = useRef(null);

  useEffect(() => {
    loader.init().then((monaco) => {
      window.monaco = monaco;
    });
  }, []);

  useEffect(() => {
    if (code !== displayedCode && !isAnimatingRef.current) {
      isAnimatingRef.current = true;
      let index = 0;
      setDisplayedCode('');
      const interval = setInterval(() => {
        setDisplayedCode((prev) => prev + code[index]);
        index++;
        if (index >= code.length) {
          clearInterval(interval);
          isAnimatingRef.current = false;
        }
      }, 10); // Adjust timing as needed

      return () => {
        clearInterval(interval);
        isAnimatingRef.current = false;
      };
    }
  }, [code]);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;

    editor.onMouseDown((e) => {
      if (disabled || isAnimatingRef.current) return;

      const position = e.target.position;
      if (!position) {
        onVariableClick(null);
        return;
      }

      const word = editor.getModel().getWordAtPosition(position);
      if (word) {
        const variableName = editor.getModel().getValueInRange({
          startLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endLineNumber: position.lineNumber,
          endColumn: word.endColumn,
        });
        onVariableClick(variableName);
      }
    });

    editor.onDidChangeCursorSelection((e) => {
      if (disabled && monaco) {
        editor.setSelection(new monaco.Selection(1, 1, 1, 1));
      }
    });
  };

  const options = {
    readOnly: true,
    renderLineHighlight: 'none',
    selectOnLineNumbers: false,
    cursorStyle: 'line',
  };

  return (
    <div className={`code-editor ${disabled ? 'disabled' : ''}`}>
      <MonacoEditor
        theme="vs-dark"
        height="90vh"
        language="python"
        value={displayedCode}
        options={options}
        onMount={handleEditorDidMount}
      />
    </div>
  );
};

export default CodeEditor;