import React, {createContext, useContext, useReducer} from "react";
import {createPost, createItem} from "./ObjectCreator";

const CLICK_POST_LIST_ITEM = "CLICK_POST_LIST_ITEM";
const CHECK_ITEM = "CHECK_ITEM";

export const createClickPostListItemAction = (post) => {
    return {type: CLICK_POST_LIST_ITEM,post};
};

export const createCheckItemAction = (itemId) => {
    return {type: CHECK_ITEM, itemId};
};

const initialState = {
    currentPost: null,

    posts: [
        createPost(1, "first"),
        createPost(2, "second"),
        createPost(3, "third"),
        createPost(4, "fourth"),
        createPost(5, "fifth")
    ],
    items: [
        createItem(1, 1, "work", true),
        createItem(2, 1, "fitness", false),
        createItem(3, 1, "read book", false),

        createItem(4, 2, "work", true),
        createItem(5, 2, "shopping", true),
        createItem(6, 2, "fitness", true),
        createItem(7, 2, "read book", false),

        createItem(8, 5, "egg", false),
        createItem(9, 5, "milk", false),
        createItem(10, 5, "yogurt", false),
        createItem(11, 5, "cereal", false),
        createItem(12, 5, "salmon", false)
    ]
};

function reducer(state, action) {
    switch (action.type) {
        case CLICK_POST_LIST_ITEM:
            if (!action.post) {
                console.error('Cannot find DispatchContext');
                return state;
            }

            if (state.currentPost && state.currentPost.id === action.post.id) {
                return {...state, currentPost: null};
            }

            return {...state, currentPost: action.post};

        case CHECK_ITEM:
            const {itemId} = action;

            if (!itemId) {
                console.error('Cannot find DispatchContext');
                return state;
            }

            let checkedItem = state.items.find(it => it.id === itemId);

            if (!checkedItem) {
                console.error(`Cannot find Item(id=${itemId})`);
            }

            checkedItem = { ... checkedItem, isDone: !checkedItem.isDone };

            return {
                ...state,
                items: state.items.map(origin => origin.id === itemId ? checkedItem : origin)
            };

        default:
            return state;
    }
}

const StateContext = createContext();
const DispatchContext = createContext();

export default ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                {children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    );
};

export function useContextState() {
    const context = useContext(StateContext);
    if (!context) throw new Error('Cannot find StateContext');
    return context;
}

export function useContextDispatch() {
    const context = useContext(DispatchContext);
    if (!context) throw new Error('Cannot find DispatchContext');
    return context;
}
