import './styles/index.css';
import {Excel} from './components/excel/Excel';
import {Formula} from './components/formula/Formula';
import {Header} from './components/header/Header';
import {Table} from './components/table/Table';
import {Toolbar} from './components/toolbar/Toolbar';
import {createStore} from './core/createStore';
import {rootReducer} from './store/rootReducer';

const store = createStore(rootReducer);

const excelApp = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
});

excelApp.render();
