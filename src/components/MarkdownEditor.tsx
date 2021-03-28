import './MarkdownEditor.css';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import React, { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';


const MarkdownEditor: React.FC = () => {
    const [editing, setEditing ] = useState(false);
    const [text, setText] = useState('# Header');
    const editorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if(event.target && editorRef.current && editorRef.current.contains(event.target as Node)){
                return;
            }
            setEditing(false);
        }
        document.addEventListener('click', listener, { capture: true});
        return () => {
            window.removeEventListener('click', listener, { capture: true});
        }
    }, [])


    if(editing){
        return (<div className="text-editor" ref={editorRef}>
            <MDEditor 
            value={text}
            onChange={(value) => setText(value || "")}
            />
        </div>)
    }
    return (<div className="text-editor card" onClick={() => setEditing(true)}>
        <div className="card-content">
           <MDEditor.Markdown source={text} />
        </div>
    </div>)
}

export default MarkdownEditor;