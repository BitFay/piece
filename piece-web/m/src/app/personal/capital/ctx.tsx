//@ts-nocheck
import React from 'react';

const defaultState = {
  value: 0,
}
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'Change': {
      return { ...state, value: new Date().getTime() }
    }
    default:
      return state;
  }
}

// const Contxt = React.createContext<[string, React.Dispatch<React.SetStateAction<string>>]>();
export const Contxt = React.createContext(null);
export const ContxtProvider = (props: any) => {
  const [state, dispatch] = React.useReducer(reducer, defaultState);
  return (
    <Contxt.Provider value={{state, dispatch}}>
      {props.children}
    </Contxt.Provider>
  )
}
