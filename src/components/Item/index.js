import React from "react";
import ItemCheckbox from "../ItemCheckbox";
import ItemContent from "../ItemContent";
import ItemDragger from "../ItemDragger";
import "./style.css";

export default React.memo((props) => {
    return (
        <div className="component-item">
            <ItemCheckbox {...props}/>
            <ItemContent {...props}/>
            <ItemDragger {...props}/>
        </div>
    );
});
