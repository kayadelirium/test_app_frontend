import { listOrdered } from '../helpers/listOrdered';
import { listToTree } from '../helpers/listToTree';
import { nodesAdapter } from './nodesSlice';
import { RootState } from './store';

const nodesSelector = nodesAdapter.getSelectors(
    (state: RootState) => state.nodes
);

export const nodesIdsSelector = (state: RootState) => {
    const ids = nodesSelector.selectIds(state);
    return ids;
};
export const nodesDisorderedListSelector = (state: RootState) => {
    const nodes = nodesSelector.selectAll(state);
    return nodes;
};
export const nodesOrderedListSelector = (state: RootState) => {
    const nodes = nodesSelector.selectAll(state);
    const list = listOrdered(nodes, null);
    return list;
};
export const nodesListToTreeSelector = (state: RootState) => {
    const nodes = nodesSelector.selectAll(state);
    const tree = listToTree(
        nodes.filter((rootChildren) => rootChildren.parentId === null),
        nodes
    );
    return tree;
};

export const parentNamesSelector = (state: RootState) => {
    const nodes = nodesSelector.selectAll(state);
    const names: Map<number, string | null> = new Map();
    nodes.forEach((node) => {
        const parent = nodes.find((parent) => node.parentId === parent.id);
        names.set(node.parentId, parent ? parent.name : null);
    });
    return names;
};
export const activeNodeSelector = (state: RootState) => state.activeNode;
export const errorMessageSelector = (state: RootState) => state.messages;
export const chatMessagesSelector = (state: RootState) => state.chat;
