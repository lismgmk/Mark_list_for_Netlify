import React from 'react';
import {Switch, Route} from "react-router-dom";
import Main from "../v1-Main/Main";


function App() {
    return (
        <>
            <Switch>
                <Route exact path={"/"} render={() => <Main/>}/>
                <Route exact path={"/main"} render={() => <Main/>}/>
                <Route path={"*"} render={() => <h1>404: PAGE NOT FOUND</h1>}/>
            </Switch>
        </>
    )
}

export default App

