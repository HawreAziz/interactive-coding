import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './state';
import CellList from './components/CellList';


export const App = () => {
    return <Provider store={store}>
        <div className="app">
          <CellList />
        </div>
      </Provider>
}

ReactDOM.render(<App/>, document.querySelector('#root'));
