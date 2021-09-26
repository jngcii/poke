import React from "react";
import MainContextProvider from "../../utils/MainContextProvider";
import MainHeader from "../../components/MainHeader";
import PostList from "../../components/PostList";
import ButtonAddPost from "../../components/ButtonAddPost";
import Post from "../../components/Post";
import "./style.css";

export default React.memo(() => (
    <MainContextProvider>
        <header className={"screen-main-header"}>
            <MainHeader/>
        </header>

        <section className="screen-main-section">
            <div className="screen-main-column-list">
                <ButtonAddPost/>
                <PostList/>
            </div>
            <div className="screen-main-column-detail">
                <Post/>
            </div>
        </section>
    </MainContextProvider>
))
