import './styles/index.css';
import {Excel} from './components/excel/Excel';
import {Formula} from './components/formula/Formula';
import {Header} from './components/header/Header';
import {Table} from './components/table/Table';
import {Toolbar} from './components/toolbar/Toolbar';
import {createStore} from './core/createStore';
import {rootReducer} from './store/rootReducer';
import {initialState} from './store/initialState';
import {debounce, storage} from './core/utils';

const store = createStore(rootReducer, initialState);

const stateListener = debounce((state) => {
  console.log(state);
  storage('excel-state', state);
}, 300);

store.subscribe(stateListener);

const excelApp = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
});

excelApp.render();
