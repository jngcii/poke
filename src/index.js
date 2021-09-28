import React from 'react';
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {store} from "./redux/store";
import Main from "./pages/Main";

ReactDOM.render((
    <Provider store={store}>
        <Main/>
    </Provider>
), document.getElementById('root'));
