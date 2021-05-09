import React, {useReducer} from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {GlobalAction, GlobalReducer, IGlobalState} from "./services/GlobalReducer";
import {routes} from "./routes";
import Header from "./components/Header";


export interface GlobalContextType {
    globalState: IGlobalState,
    globalDispatch: React.Dispatch<GlobalAction>
}

export const GlobalContext = React.createContext({} as GlobalContextType);

const initialGlobalState: IGlobalState = {
    currentMember: {},
    allMembers: [],
    loading: false,
    error: {}
}

function App() {
    const [globalState, globalDispatch] = useReducer(GlobalReducer, initialGlobalState)
  return (
        <GlobalContext.Provider value={{globalState, globalDispatch}}>
            <BrowserRouter>
                <Header/>
                <Switch>
                    {routes.map((route, index) => {
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                component={route.component}
                            />
                        )
                    })}
                </Switch>
            </BrowserRouter>
        </GlobalContext.Provider>
  );
}

export default App;
