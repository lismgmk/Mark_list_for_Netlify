import React from 'react';
import {Switch, Route} from "react-router-dom";
import Main from "../v1-Main/Main";


function App() {
    return (
        <>
            <Switch>
                <Route exact path={"/Mark_list"} render={() => <Main/>}/>
                <Route exact path={"/Mark_list/main"} render={() => <Main/>}/>
                <Route path={"*"} render={() => <h1>404: PAGE NOT FOUND</h1>}/>
            </Switch>
        </>
    )
}

export default App

