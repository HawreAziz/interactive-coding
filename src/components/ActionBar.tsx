import "./ActionBar.css";
import React from 'react'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import DeleteIcon from '@material-ui/icons/Delete';
import { useAction } from '../hooks';

interface ActionBarProps {
    id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({id}) => {
    const { moveCell, deleteCell } = useAction();
    return (
        <div className="action-bar">
            <button onClick={() => moveCell(id, "up")} 
                    className="button is-primary is-small"
            >
                <ArrowUpwardIcon />
            </button>
            <button onClick={() => moveCell(id, 'down')}
                    className="button is-primary is-small"
            >
                <ArrowDownwardIcon />
            </button>
            <button onClick={() => deleteCell(id)}
                    className="button is-primary is-small"
            >
                <DeleteIcon />
            </button>
        </div>
    )
}

export default ActionBar;
