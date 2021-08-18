export interface INode {
    id: number;
    name: string;
    ipAddress: string;
    port: number;
    parentId: number;

    isOpen: boolean;
    hasChildren: boolean;
}

export interface INodeTree extends INode {
    children: INodeTree[];
}

export interface IMessage {
    user: string;
    message: string;
    sentAt: number;
}
