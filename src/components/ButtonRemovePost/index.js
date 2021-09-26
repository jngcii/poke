import React from "react";
import "./style.css";
import {createRemovePostAction, useContextDispatch} from "../../utils/MainContextProvider";

export default React.memo(({post}) => {
    const dispatch = useContextDispatch();

    const onRemove = () => dispatch(createRemovePostAction(post.id));

    return <strong className="component-button-remove-post" onClick={onRemove}>TRASH</strong>;
});
