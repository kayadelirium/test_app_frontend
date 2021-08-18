import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMessage } from '../types';
import { deleteAllChatMessagesThunk, sendChatMessageThunk } from './thunks';

const chatSlice = createSlice({
    name: 'chat',
    initialState: [] as IMessage[],
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(
                sendChatMessageThunk.fulfilled,
                (state, action: PayloadAction<IMessage>) => {
                    state.push(action.payload);
                    return state;
                }
            )
            .addCase(
                deleteAllChatMessagesThunk.fulfilled,
                (state, action: PayloadAction<void>) => {
                    state = [];
                    return state;
                }
            ),
});

export const chatSliceReducer = chatSlice.reducer;
