import React from "react";
import "./style.css";
import {useContextState} from "../../utils/MainContextProvider";

export default React.memo(() => {
    const {currentPost, items} = useContextState();

    return currentPost ? (
        <div className="component-post-wrapper">
            <PostHeader post={currentPost}/>
            <ItemList items={items.filter(it => it.postId === currentPost.id)}/>
        </div>
    ) : (
        <div><strong>SELECT THE POST PLZ</strong></div>
    );
});

// TODO : Input 로직 들어갈때 별도의 파일로 분리 및 패키지 리팩
const PostHeader = ({post}) => {
    return (
        <header className="component-post-header">
            <strong>{post.title}</strong>
        </header>
    );
};

const ItemList = ({items}) => {
    return (
        <div className="component-item-list">
            {items.map(item =>
                <div key={item.id} className="component-item" isdone={`${item.isDone}`}>{item.content}</div>)
            }
        </div>
    );
};
