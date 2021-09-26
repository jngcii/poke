import React from "react";
import {useContextState} from "../../utils/MainContextProvider";
import ItemList from "../ItemList";
import ButtonRemovePost from "../ButtonRemovePost";
import "./style.css";

export default React.memo(() => {
    const {currentPost, items} = useContextState();

    return currentPost ? (
        <div className="component-post-wrapper">
            <PostHeader>
                <PostHeaderTitle post={currentPost}/>
                <PostHeaderOptions>
                    <ButtonRemovePost post={currentPost} />
                </PostHeaderOptions>
            </PostHeader>

            <PostContent>
                <ItemList items={items.filter(it => it.postId === currentPost.id)}/>
            </PostContent>
        </div>
    ) : (
        <div><strong>SELECT THE POST PLZ</strong></div>
    );
});

const PostHeader = React.memo(({children}) => {
    return (
        <header className="component-post-header">
            {children}
        </header>
    );
});

const PostHeaderTitle = React.memo(({post}) => {
    return (
        <div className="component-post-header-title">
            <strong>{post.title}</strong>
        </div>
    );
});

const PostHeaderOptions = React.memo(({children}) => {
    return (
        <div className="component-post-header-options">
            {children}
        </div>
    );
});

const PostContent = React.memo(({children}) => (
    <React.Fragment>
        {children}
    </React.Fragment>
));
