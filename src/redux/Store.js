import {createStore} from 'redux';
import reduce from './redusers';

export const store = createStore(reduce);

store.subscribe(()=>{
  sessionStorage.setItem("user",JSON.stringify(store.getState().user));
});