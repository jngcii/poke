import React from "react";
import MainHeader from "../../components/MainHeader";
import PostList from "../../components/PostList";
import Post from "../../components/Post";
import "./style.css";

export default React.memo(() => (
    <div>
        <header className={"screen-main-header"}>
            <MainHeader/>
        </header>

        <section className="screen-main-section">
            <div className="screen-main-column-list">
                <PostList/>
            </div>
            <div className="screen-main-column-detail">
                <Post/>
            </div>
        </section>
    </div>
))
