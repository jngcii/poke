import React from "react";
import {useContextState} from "../../utils/MainContextProvider";
import ItemList from "../ItemList";
import "./style.css";

export default React.memo(() => {
    const {currentPost, items} = useContextState();

    return currentPost ? (
        <div className="component-post-wrapper">
            <PostHeader post={currentPost}/>

            <PostContent>
                <ItemList items={items.filter(it => it.postId === currentPost.id)}/>
            </PostContent>
        </div>
    ) : (
        <div><strong>SELECT THE POST PLZ</strong></div>
    );
});

const PostHeader = React.memo(({post}) => {
    return (
        <header className="component-post-header">
            <strong>{post.title}</strong>
        </header>
    );
});

const PostContent = React.memo(({children}) => (
    <React.Fragment>
        {children}
    </React.Fragment>
));
