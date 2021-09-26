import React from "react";
import "./style.css";
import {useContextState} from "../../utils/MainContextProvider";

export default React.memo(() => {
    const {currentPost} = useContextState();

    return (
        <div className="component-post-wrapper">
            {currentPost ? currentPost.id : "Nothing"}
        </div>
    );
});

// TODO : Input 로직 들어갈때 별도의 파일로 분리 및 패키지 리팩
const PostHeader = ({ title }) => {
    return (
        <header>
            <h2>{title}</h2>
        </header>
    )
};
