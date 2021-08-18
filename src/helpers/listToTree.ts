import { INode, INodeTree } from '../types';

export const listToTree = (parents: INode[], nodes: INode[]): INodeTree[] => {
    parents.sort((a: INode, b: INode) => a.name.localeCompare(b.name));
    return parents.map((node: INode) => {
        return {
            ...node,
            children: listToTree(
                nodes.filter((child: INode) => child.parentId === node.id),
                nodes
            ),
        } as INodeTree;
    });
};
