import React from "react";
import {useContextState} from "../../utils/MainContextProvider";
import PostHeader from "../PostHeader";
import PostContent from "../PostContent";
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
