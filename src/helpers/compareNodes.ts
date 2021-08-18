import { INode } from '../types';

export const compareNodes = (o1: INode, o2: INode) => {
    return (
        o1.id === o2.id &&
        o1.name === o2.name &&
        o1.ipAddress === o2.ipAddress &&
        o1.port === o2.port &&
        o1.parentId === o2.parentId
    );
};
