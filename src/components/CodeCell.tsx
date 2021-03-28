import 'bulmaswatch/superhero/bulmaswatch.min.css';
import './CodeCell.css';
import { useState, useEffect } from 'react';
import { Editor } from './monaco-editor';
import { Preview } from './';
import bundle from '../bundler';
import Resizable from '../components/Resizable';


const CodeCell = () => {
    const [input, setInput ] = useState('');
    const [code, setCode] = useState('');


    useEffect(() => {
        const time = setTimeout(async() => {
            setCode(await bundle(input))
        }, 600);

        return () => {
            clearTimeout(time);
        }
    }, [input]);


    return <Resizable direction="vertical">
        <div className="code-cell">
            <Resizable direction="horizontal">
                <Editor 
                setCode={(input) => setInput(input)} 
                initialValue="const a = 1;" />
            </Resizable>
            <Preview code={code} />
        </div>
    </Resizable>
}

export default CodeCell;