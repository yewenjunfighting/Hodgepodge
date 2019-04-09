import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import React, {Suspense} from "react";
import Pics from '../components/Pic/Pics'
import PicDetail from '../components/Pic/PicDetail'
import Home from '../views/home'

const AppRouter = () => (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path="/pic"  component={Pics} />
                    <Route exact path="/pic/picDetail" component={PicDetail}/>
                    <Route component={() => (<div>404</div>)}/>
                </Switch>
            </Suspense>
        </Router>
)

export default AppRouter;
