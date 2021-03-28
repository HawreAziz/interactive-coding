import { Fragment } from 'react';
import React from 'react'
import { useTypedSelector } from '../hooks';
import CellItem from './CellItem';

const CellList: React.FC = ()  => {
    const cells = useTypedSelector(({cellData}) => {
        const { data, order } = cellData;
        return order.map(id => data[id]);
    });


    const renderedCells  = cells.map(cell => {
      return <Fragment key={cell.id}>
        <CellItem cell={cell} />
      </Fragment>
    })
    return (
        <div>
            {renderedCells}
        </div>
    )
}

export default CellList
