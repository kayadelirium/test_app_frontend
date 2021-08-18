import { INode } from '../types';

export const listOrdered = (
    nodes: INode[],
    parentId: number | null
): INode[] => {
    const tree: INode[] = [];
    const children: INode[] = (nodes as INode[]).filter(
        (node: INode) => node.parentId === parentId
    );

    children.forEach((child: INode) => {
        tree.push(child);
        const childtree = listOrdered(nodes, child.id);
        childtree.forEach((node) => {
            tree.push(node);
        });
    });

    return tree;
};
