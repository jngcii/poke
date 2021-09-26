import React from "react";
import "./style.css";

export default React.memo(({item}) => {
    return (
        <div className="component-item-content">
            {item.content}
        </div>
    );
});
