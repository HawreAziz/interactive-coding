import './monaco-editor.css';
import 'bulmaswatch/superhero/bulmaswatch.min.css'
import React, { useRef } from 'react';
import MonacoEditor, { OnMount } from '@monaco-editor/react'
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import {parse} from '@babel/parser';
import traverse from '@babel/traverse';
import MonacoJSXHighlighter from 'monaco-jsx-highlighter';


interface EditorProps {
    initialValue: string;
    setCode(code: string): void;
}

export const Editor: React.FC<EditorProps> = ({ setCode, initialValue }) => {
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();

    const onDidMount: OnMount = (editor) => {
        editorRef.current = editor;
        const babelParser = (code: string) => parse(code, {
            sourceType: "module",
            plugins: ['jsx']
        });

        const monacoJSXHighlighter = new MonacoJSXHighlighter(
            // @ts-ignore
            window.monaco,
            babelParser,
            traverse,
            editor
        );

        monacoJSXHighlighter.highLightOnDidChangeModelContent(100); 
    }

    const onFormatClick = () => {
        if(!editorRef.current){ return }
        const unformatted = editorRef.current.getModel()?.getValue() || "";
        const formattedCode = prettier.format(unformatted, {
            semi: true,
            useTabs: false,
            parser: 'babel',
            plugins: [parser]
        });
        editorRef.current.getModel()?.setValue(formattedCode);

    }

    return <div className="editor_wrapper">
            <button onClick={onFormatClick} className="button button-format is-primary">Format</button>
            <MonacoEditor
                height="100%"
                theme="vs-dark"
                language="javascript"
                options={{
                    fontSize: 24,
                    minimap: { enabled: false },
                    wordWrap: 'on',
                    showUnused: true,
                    renderWhitespace: 'trailing',
                    folding: false,
                    lineNumbersMinChars: 3,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                }}
                onChange={(code) => setCode(code || initialValue)}
                value={initialValue}
                onMount={onDidMount}
            />
        </div>
}