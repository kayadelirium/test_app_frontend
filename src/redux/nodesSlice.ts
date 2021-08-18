import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { INode } from '../types';
import {
    addNodeChildrenThunk,
    addNodeThunk,
    addRootChildrenThunk,
    changeNodeThunk,
    deleteAllThunk,
    deleteChildrenThunk,
    deleteNodeThunk,
    fetchAllNodesThunk,
    sortNodesDirectThunk,
    sortNodesReverseThunk,
} from './thunks';

export const nodesAdapter = createEntityAdapter<INode>({});
const nodesSlice = createSlice({
    name: 'nodes',
    initialState: nodesAdapter.getInitialState({
        nodes: [] as INode[],
    }),
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(
                addNodeThunk.fulfilled,
                (state, action: PayloadAction<INode>) => {
                    const parent: INode | undefined = nodesAdapter
                        .getSelectors()
                        .selectById(state, action.payload.parentId);
                    if (parent) {
                        const newParent = {
                            ...parent,
                            hasChildren: true,
                        };
                        nodesAdapter.upsertOne(state, newParent);
                    }
                    nodesAdapter.upsertOne(state, action.payload);
                }
            )
            .addCase(
                deleteNodeThunk.fulfilled,
                (state, action: PayloadAction<INode>) => {
                    const parent: INode | undefined = nodesAdapter
                        .getSelectors()
                        .selectById(state, action.payload.parentId);
                    nodesAdapter.removeOne(state, action.payload.id);
                    if (parent) {
                        const nodes = nodesAdapter
                            .getSelectors()
                            .selectAll(state);
                        const children = nodes.filter(
                            (child: INode) => child.parentId === parent.id
                        );
                        const newParent = {
                            ...parent,
                            hasChildren: children.length ? true : false,
                        };
                        nodesAdapter.upsertOne(state, newParent);
                    }
                }
            )
            .addCase(
                changeNodeThunk.fulfilled,
                (state, action: PayloadAction<INode>) => {
                    const newNode = {
                        ...action.payload,
                        isOpen: !action.payload.isOpen,
                    };
                    nodesAdapter.upsertOne(state, newNode);
                }
            )
            .addCase(
                addRootChildrenThunk.fulfilled,
                (state, action: PayloadAction<INode[]>) => {
                    nodesAdapter.upsertMany(state, action.payload);
                }
            )
            .addCase(
                addNodeChildrenThunk.fulfilled,
                (state, action: PayloadAction<INode[]>) => {
                    nodesAdapter.upsertMany(state, action.payload);
                }
            )
            .addCase(
                deleteChildrenThunk.fulfilled,
                (state, action: PayloadAction<INode>) => {
                    const nodes = nodesAdapter.getSelectors().selectAll(state);
                    nodes.forEach((node: INode) => {
                        if (node.parentId === action.payload.id) {
                            nodesAdapter.removeOne(state, node.id);
                        }
                    });
                    nodesAdapter.upsertOne(state, action.payload);
                }
            )
            .addCase(
                fetchAllNodesThunk.fulfilled,
                (state, action: PayloadAction<INode[]>) => {
                    nodesAdapter.upsertMany(state, action.payload);
                }
            )
            .addCase(
                deleteAllThunk.fulfilled,
                (state, action: PayloadAction<void>) => {
                    nodesAdapter.removeAll(state);
                }
            )
            .addCase(
                sortNodesDirectThunk.fulfilled,
                (state, action: PayloadAction<string>) => {
                    const sortedBy = action.payload as keyof INode;
                    const nodes = nodesAdapter
                        .getSelectors()
                        .selectAll(state)
                        .sort(function (a: INode, b: INode) {
                            if (a[sortedBy] > b[sortedBy]) return 1;
                            if (a[sortedBy] < b[sortedBy]) return -1;
                            return 0;
                        });
                    nodesAdapter.removeAll(state);
                    nodesAdapter.setMany(state, nodes);
                }
            )
            .addCase(
                sortNodesReverseThunk.fulfilled,
                (state, action: PayloadAction<string>) => {
                    const sortedBy = action.payload as keyof INode;
                    const nodes = nodesAdapter
                        .getSelectors()
                        .selectAll(state)
                        .sort(function (a: INode, b: INode) {
                            if (a[sortedBy] > b[sortedBy]) return 1;
                            if (a[sortedBy] < b[sortedBy]) return -1;
                            return 0;
                        })
                        .reverse();
                    nodesAdapter.removeAll(state);
                    nodesAdapter.setMany(state, nodes);
                }
            ),
});

export const nodesSliceReducer = nodesSlice.reducer;
