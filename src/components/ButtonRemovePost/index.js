import React from "react";
import {useDispatch} from "react-redux";
import {removePost} from "../../redux/slices/postSlice";
import "./style.css";

export default React.memo(({post}) => {
    const dispatch = useDispatch();

    const onRemove = () => dispatch(removePost({postId: post.id}));

    return <strong className="component-button-remove-post" onClick={onRemove}>TRASH</strong>;
});
