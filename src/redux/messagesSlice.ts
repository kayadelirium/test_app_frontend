import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INode } from '../types';
import {
    addNodeThunk,
    changeNodeThunk,
    deleteErrorMessageThunk,
    deleteNodeThunk,
    setErrorMessageThunk,
} from './thunks';

const messagesSlice = createSlice({
    name: 'messages',
    initialState: [] as string[],
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(
                setErrorMessageThunk.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.push(action.payload + ' error');
                    return state;
                }
            )
            .addCase(
                deleteErrorMessageThunk.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.filter(
                        (message: string) => message !== action.payload
                    );
                    return state;
                }
            )
            .addCase(
                addNodeThunk.fulfilled,
                (state, action: PayloadAction<INode>) => {
                    state.push(`OK! message add`);
                    return state;
                }
            )
            .addCase(
                changeNodeThunk.fulfilled,
                (state, action: PayloadAction<INode>) => {
                    state.push(`OK! message change`);
                    return state;
                }
            )
            .addCase(
                deleteNodeThunk.fulfilled,
                (state, action: PayloadAction<INode>) => {
                    state.push(`OK! message delete`);
                    return state;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action) => {
                    state.push(action.error.message);
                    return state;
                }
            ),
});
export const messagesSliceReducer = messagesSlice.reducer;
