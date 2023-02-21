import { createContext, useContext, useReducer } from 'react';
import data from './data';
import slugify from './slugify';

let usersInfoContext;
let { Provider } = (usersInfoContext = createContext())

const initialState = {
  usersInfo: data.users,
  selectedUser: {},
  
};
function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { ...state, usersInfo: action.payload }
    case 'SET_SELECTED_USER':
      return { ...state, selectedUser: {...action.payload} }
    case 'CLEAR_SELECTED_USER':
      return { ...state, selectedUser: {} }
    default:
      return state;
  }
}

export const useUserInfoContext = () => useContext(usersInfoContext);
export default function UsersProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Provider value={value}>{props.children} </Provider>;
}
