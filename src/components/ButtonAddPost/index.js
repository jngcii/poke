import React from "react";
import {createAddPostAction, useContextDispatch} from "../../utils/MainContextProvider";
import "./style.css";

export default React.memo(() => {
    const dispatch = useContextDispatch();

    const onAdd = () => dispatch(createAddPostAction());

    return (
        <div className="component-button-add-post-wrapper">
            <span className="component-button-add-post-btn" onClick={onAdd}>NEW</span>
        </div>
    );
});
