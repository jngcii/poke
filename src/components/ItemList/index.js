import React from "react";
import Item from "../Item";
import "./style.css";

export default React.memo(({items}) => {
    const children = items.map(item => <Item key={item.id} item={item}/>);

    return <div className="component-item-list">{children}</div>;
});
