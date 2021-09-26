import React from "react";
import {createCheckItemAction, useContextDispatch} from "../../utils/MainContextProvider";
import "./style.css";

export default React.memo(({item}) => {
    const dispatch = useContextDispatch();

    const onCheck = () => dispatch(createCheckItemAction(item.id));

    return <div className="component-item-checkbox" isdone={`${item.isDone}`} onClick={onCheck}/>;
});
