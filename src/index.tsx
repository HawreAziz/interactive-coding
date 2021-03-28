import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './state';
import CellList from './components/CellList';


export const App = () => {
    return <div className="app">
          <CellList />
        </div>
}

ReactDOM.render(<Provider store={store}>
                  <App/>
                </Provider>, document.querySelector('#root'));