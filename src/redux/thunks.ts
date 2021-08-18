import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
//import { SERVER_URL } from '../constants';
import { IMessage, INode } from '../types';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const sendChatMessageThunk = createAsyncThunk(
    'sendMessage',
    (message: IMessage) => message
);

export const deleteAllChatMessagesThunk = createAsyncThunk(
    'deleteMessages',
    async () => {}
);

export const setErrorMessageThunk = createAsyncThunk(
    'setErrorMessage',
    async (errorMessage: string) => {
        return errorMessage;
    }
);

export const deleteErrorMessageThunk = createAsyncThunk(
    'deleteErrorMessage',
    async (errorMessage: string) => {
        return errorMessage;
    }
);

export const setNodeActiveThunk = createAsyncThunk(
    'setNodeActive',
    async (node: INode) => {
        return node;
    }
);

export const addNodeThunk = createAsyncThunk('addNode', async (node: INode) => {
    const newNode: INode = await (
        await axios.post(`${SERVER_URL}/nodes`, node)
    ).data;
    return newNode;
});

export const deleteNodeThunk = createAsyncThunk(
    'deleteNode',
    async (node: INode) => {
        await axios.delete(`${SERVER_URL}/nodes/${node.id}`);
        return node;
    }
);

export const changeNodeThunk = createAsyncThunk(
    'changeNode',
    async (node: INode) => {
        await axios.put(`${SERVER_URL}/nodes/${node.id}`, node);
        return node;
    }
);

export const addRootChildrenThunk = createAsyncThunk(
    'addRootChildren',
    async () => {
        const children: INode[] = await (
            await axios.get(`${SERVER_URL}/nodes/children`)
        ).data;
        children.forEach((node) => {
            node.isOpen = false;
        });
        return children;
    }
);

export const addNodeChildrenThunk = createAsyncThunk(
    'addNodeChildren',
    async (node: INode) => {
        const children: INode[] = await (
            await axios.get(`${SERVER_URL}/nodes/${node.id}/children`)
        ).data;
        children.forEach((child) => {
            child.isOpen = false;
        });
        const newNode = { ...node, isOpen: true };
        return [newNode, ...children];
    }
);

export const fetchAllNodesThunk = createAsyncThunk('fetchAll', async () => {
    const nodes = await (await axios.get(`${SERVER_URL}/nodes`)).data;
    return nodes;
});

export const sortNodesDirectThunk = createAsyncThunk(
    'sortNodesDirect',
    async (sortedBy: string) => {
        return sortedBy;
    }
);
export const sortNodesReverseThunk = createAsyncThunk(
    'sortNodesReverse',
    async (sortedBy: string) => {
        return sortedBy;
    }
);
export const deleteChildrenThunk = createAsyncThunk(
    'deleteChildren',
    async (node: INode) => {
        const newNode = { ...node, isOpen: false };
        return newNode;
    }
);

export const deleteAllThunk = createAsyncThunk('deleteAll', async () => {});
