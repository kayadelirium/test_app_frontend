import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INode } from '../types';
import { setNodeActiveThunk } from './thunks';

const activeNodeSlice = createSlice({
    name: 'activeNode',
    initialState: { name: '', ipAddress: '', port: 0 } as INode,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            setNodeActiveThunk.fulfilled,
            (state, action: PayloadAction<INode>) => {
                state = action.payload;
                return state;
            }
        );
    },
});

export const activeNodeSliceReducer = activeNodeSlice.reducer;
