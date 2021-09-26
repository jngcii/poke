import React from "react";
import {createCheckItemAction, useContextDispatch} from "../../utils/MainContextProvider";
import "./style.css";

export default React.memo(({items}) => {
    const children = items.map(item => <Item key={item.id} item={item}/>);

    return <div className="component-item-list">{children}</div>;
});

const Item = React.memo((props) => {
    return (
        <div className="component-item">
            <ItemCheckbox {...props}/>
            <ItemContent {...props}/>
            <ItemDragger {...props}/>
        </div>
    );
});

const ItemCheckbox = React.memo(({item}) => {
    const dispatch = useContextDispatch();

    const onCheck = () => dispatch(createCheckItemAction(item.id));

    return <div className="component-item-checkbox" isdone={`${item.isDone}`} onClick={onCheck}/>;
});

const ItemContent = React.memo(({item}) => {
    return (
        <div className="component-item-content">
            {item.content}
        </div>
    );
});

const ItemDragger = React.memo(() => {
    return <div className="component-item-dragger"/>;
});
