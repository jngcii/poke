import React, {createContext, useContext, useReducer} from "react";
import {createPlan, createItem} from "./ObjectCreator";

const CLICK_POST_LIST_ITEM = "CLICK_POST_LIST_ITEM"

export const createClickPostListItemAction = (post) => {
    return {
        type: CLICK_POST_LIST_ITEM,
        post
    };
};

const initialState = {
    currentPost: null,

    plans: [
        createPlan(1, "first"),
        createPlan(2, "second"),
        createPlan(3, "third"),
        createPlan(4, "fourth"),
        createPlan(5, "fifth")
    ],
    items: [
        createItem(1, "work", true),
        createItem(1, "fitness", false),
        createItem(1, "read book", false),

        createItem(2, "work", true),
        createItem(2, "shopping", true),
        createItem(2, "fitness", true),
        createItem(2, "read book", false),

        createItem(5, "egg", false),
        createItem(5, "milk", false),
        createItem(5, "yogurt", false),
        createItem(5, "cereal", false),
        createItem(5, "salmon", false)
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
