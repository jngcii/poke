import React from "react";
import "./style.css";

export default React.memo(({post}) => {
    return (
        <header className="component-post-header">
            <strong>{post.title}</strong>
        </header>
    );
});
