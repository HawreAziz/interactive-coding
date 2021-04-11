import { useTypedSelector } from './'

export const useCumulative = (id: string) => {
  return useTypedSelector(state => {
    const { data, order } = state.cellData;
    const orderedCells = order.map(id => data[id]);
    const cumulativeCode = [];
    const showNoOp = `var show = () => {}`
    const showOp = `
          import _React from 'react';
          import _ReactDOM from 'react-dom';
          var show = (value) => {
            if(typeof value === 'object'){
              if(value.$$typeof && value.props){
                _ReactDOM.render(value, document.querySelector('#root'));
              }else{
                document.querySelector('#root').innerHTML = JSON.stringify(value);
              }
            }else{
              document.querySelector('#root').innerHTML = value;
            }
          }
        `
    for (let c of orderedCells) {
      if (c.type === "code") {
        if (c.id === id) {
          cumulativeCode.push(showOp);
        } else {
          cumulativeCode.push(showNoOp);
        }
        cumulativeCode.push(c.content);
      }
      if (id === c.id) {
        break;
      }
    }
    return cumulativeCode.join('\n');
  });
}
