import React from "react";
import "./style.css";

export default React.memo(() => {


    return (
        <div className="component-post-wrapper">

        </div>
    );
})

// TODO : Input 로직 들어갈때 별도의 파일로 분리 및 패키지 리팩
const PostHeader = ({ title }) => {
    return (
        <header>
            <h2>{title}</h2>
        </header>
    )
}
