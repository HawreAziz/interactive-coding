import './MarkdownEditor.css';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import React, { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Cell } from '../state';
import { useAction } from '../hooks';

interface MarkdownEditorProps {
    cell: Cell;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ cell }) => {
    const [editing, setEditing ] = useState(false);
    const editorRef = useRef<HTMLDivElement>(null);
    const { updateCell } = useAction();

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
              value={cell.content}
              onChange={(value) => updateCell(cell.id, value || "# Edit markdown")}
            />
        </div>)
    }
    return (<div className="text-editor card" onClick={() => setEditing(true)}>
        <div className="card-content">
           <MDEditor.Markdown source={cell.content ? cell.content : "Edit markdown"} />
        </div>
    </div>)
}

export default MarkdownEditor;
