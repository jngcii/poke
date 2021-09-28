import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectPost} from "../../redux/slices/postSlice";
import {MuuriComponent, useDraggable} from "muuri-react";
import "./style.css";

export default React.memo(() => {
    const { posts } = useSelector(state => state.post);

    return (
        <MuuriComponent {...girdProps}>
            {posts.map(post => <PostListItem key={post.id} post={post}/>)}
        </MuuriComponent>
    );
});

const PostListItem = React.memo(({post}) => {
    return (
        <div className="post-list-item-outer">
            <div className="post-list-item-inner">
                <PostListItemTitle post={post}/>
                <PostListItemDragger/>
            </div>
        </div>
    );
});

const PostListItemTitle = React.memo(({post}) => {
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(selectPost({post}));
    }

    return (
        <div className="post-list-item-title" onClick={onClick}>
            <strong>{post.title}</strong>
        </div>
    );
});

const PostListItemDragger = React.memo(() => {
    const draggable = useDraggable();

    useEffect(() => {
        draggable(false);
    }, [])

    const enableDrag = () => draggable(true);
    const disableDrag = () => draggable(false);

    return (
        <div className="post-list-item-dragger" onMouseOver={enableDrag} onMouseLeave={disableDrag}/>
    );
});

const girdProps = {
    dragEnabled: true,
    dragFixed: true,
    dragSortHeuristics: {
        sortInterval: 0
    },
    dragContainer: document.body,
    dragAxis: 'y',

    // ClassNames
    containerClass: "post-list-container",
    itemClass: "post-list-item-outer",
    itemVisibleClass: "post-list-item-outer-shown",
    itemHiddenClass: "post-list-item-outer-hidden",
    itemPositioningClass: "post-list-item-outer-positioning",
    itemDraggingClass: "post-list-item-outer-dragging",
    itemReleasingClass: "post-list-item-outer-releasing",
    itemPlaceholderClass: "post-list-item-outer-placeholder"
};
