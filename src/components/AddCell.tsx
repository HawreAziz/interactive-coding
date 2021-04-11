import "bulmaswatch/superhero/bulmaswatch.min.css";
import "./AddCell.css";
import AddIcon from '@material-ui/icons/Add';
import { useAction } from "../hooks";

interface AddCellProps {
  prevCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ prevCellId, forceVisible }) => {
  const { insertCellAfter } = useAction();

  return <div className={`add-cell ${forceVisible && 'add-cell-visible'}`}>
    <div className="add-button">
      <button
         className="button  is-primary is-small is-rounded"
         onClick={() => insertCellAfter(prevCellId, "code")}
      >
        <AddIcon />
        Code
      </button>
      <button
        className="button  is-primary is-small is-rounded"
        onClick={() => insertCellAfter(prevCellId, "text")}
      >
        <AddIcon />
        Text
      </button>
    </div>
   <div className="divider" />
  </div>
}

export default AddCell;
