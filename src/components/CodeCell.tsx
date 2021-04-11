import 'bulmaswatch/superhero/bulmaswatch.min.css';
import './CodeCell.css';
import { useEffect } from 'react';
import { Editor } from './monaco-editor';
import { Preview } from './';
import Resizable from '../components/Resizable';
import { Cell } from '../state';
import { useAction, useTypedSelector, useCumulative } from '../hooks';

interface CodeCellProps {
    cell: Cell;
}
const CodeCell: React.FC<CodeCellProps> = ({cell}) => {
    const { updateCell, createBundle } = useAction();
    const bundle = useTypedSelector(state => {
      return state.bundles[cell.id]
    });

    const cumulativeCode = useCumulative(cell.id);

    useEffect(() => {
      if(!bundle){
        createBundle(cell.id, cumulativeCode);
        return;
      }

      const time = setTimeout(async() => {
          console.log("running bundle");
          createBundle(cell.id, cumulativeCode);
      }, 750);

      return () => {
          clearTimeout(time);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cumulativeCode, cell.content, cell.id, createBundle]);

    return (
        <Resizable direction="vertical">
        <div className="code-cell">
            <Resizable direction="horizontal">
                  <Editor
                  setCode={(input) => updateCell(cell.id, input)}
                  initialValue={cell.content} />
            </Resizable>
            <div className="code-cell-preview-wrapper" >
              {
                  bundle && !bundle.loading
                  ? <Preview code={bundle.code} error={bundle.error} />
                  : (<div className="code-cell-progress">
                      <progress max="100%">
                        Loading
                      </progress>
                    </div>)
              }
            </div>
        </div>
    </Resizable>)
}

export default CodeCell;
