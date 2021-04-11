import "./CellList.css";
import { Fragment } from 'react';
import React from 'react'
import { useTypedSelector } from '../hooks';
import CellItem from './CellItem';
import AddCell from './AddCell';

const CellList: React.FC = ()  => {
    const cells = useTypedSelector(state => {
        const { data, order } = state.cellData;
        return order.map(id => data[id]);
    });


    const renderedCells  = cells.map(cell => {
      return <Fragment key={cell.id}>
        <CellItem cell={cell} />
        <AddCell prevCellId={cell.id} />
      </Fragment>
    })
    return (
        <div className="cell-list">
            { renderedCells.length === 0
              ?  <AddCell prevCellId={null} forceVisible={true} />
              : renderedCells
            }
        </div>
    )
}

export default CellList
