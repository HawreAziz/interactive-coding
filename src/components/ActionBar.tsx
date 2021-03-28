import "./ActionBar.css";
import React from 'react'

const ActionBar = () => {
    return (
        <div className="action-bar">
            <button className="button is-primary is-small">Upp</button>
            <button className="button is-primary is-small">Down</button>
            <button className="button is-primary is-small">Delete</button>
        </div>
    )
}

export default ActionBar;
