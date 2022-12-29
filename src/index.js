import './styles/index.css';
import {Excel} from './components/excel/Excel';
import {Formula} from './components/formula/Formula';
import {Header} from './components/header/Header';
import {Table} from './components/table/Table';
import {Toolbar} from './components/toolbar/Toolbar';
import {createStore, storage} from './core/createStore';
import {rootReducer} from './store/rootReducer';
import {initialState} from './store/initialState';

const store = createStore(rootReducer, initialState);

store.subscribe((state) => {
  console.log(state);
  storage('excel-state', state);
});

const excelApp = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
});

excelApp.render();
