import React from "react";
import "./style.css";

export default React.memo(({item}) => {
    return (
        <div key={item.id} className="component-item" isdone={`${item.isDone}`}>{item.content}</div>
    );
});
