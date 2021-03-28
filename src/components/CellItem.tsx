import "./CellItem.css";
import React from 'react';
import { Cell } from '../state';
import CodeCell from './CodeCell';
import MarkdownEditor from './MarkdownEditor';
import ActionBar from './ActionBar';

interface CellItemProps {
    cell: Cell;
}

const CellItem: React.FC<CellItemProps> = ({ cell }) => {
    let child: JSX.Element;
    if(cell.type === 'code'){
        child = <>
          <div className="cell-item-wrapper">
            <ActionBar />
          </div>
          <CodeCell />
        </>
    }else{
        child = <>
          <MarkdownEditor />
          <ActionBar />
        </>
    }
    return <div className="cell-item">{child}</div>
}

export default CellItem;