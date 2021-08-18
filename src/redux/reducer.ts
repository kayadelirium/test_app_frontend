import { combineReducers } from '@reduxjs/toolkit';
import { activeNodeSliceReducer } from './activeNodeSlice';
import { chatSliceReducer } from './chatSlice';
import { messagesSliceReducer } from './messagesSlice';
import { nodesSliceReducer } from './nodesSlice';

const reducer = combineReducers({
    nodes: nodesSliceReducer,
    activeNode: activeNodeSliceReducer,
    messages: messagesSliceReducer,
    chat: chatSliceReducer,
});

export default reducer;
