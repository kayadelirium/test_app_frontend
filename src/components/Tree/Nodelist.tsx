import * as React from 'react';

import { INode, INodeTree } from '../../types';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import { Card } from 'react-bootstrap';
import { useAppDispatch } from '../../redux/store';
import {
    addNodeChildrenThunk,
    addRootChildrenThunk,
    deleteAllThunk,
    deleteChildrenThunk,
    setNodeActiveThunk,
} from '../../redux/thunks';
import { nodesListToTreeSelector } from '../../redux/selectors';
import { AddModal } from '../Modals&Forms/AddModal';
import { NodeTree } from './NodeTree';

const Nodelist: React.FC = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(deleteAllThunk());
        dispatch(addRootChildrenThunk());
    }, [dispatch]);

    const nodes: INodeTree[] = useSelector(nodesListToTreeSelector);

    const show = (activeNode: INodeTree) => {
        dispatch(addNodeChildrenThunk(activeNode as INode));
    };
    const hide = (activeNode: INodeTree) => {
        activeNode.children.forEach((node: INodeTree) => hide(node));
        dispatch(deleteChildrenThunk(activeNode as INode));
    };

    const setActiveNode = (node: INode) => dispatch(setNodeActiveThunk(node));

    const touchNode = (activeNode: INodeTree) => {
        activeNode.isOpen ? hide(activeNode) : show(activeNode);
        setActiveNode(activeNode);
    };

    return (
        <Card style={{ border: 'none' }}>
            <Card.Title></Card.Title>
            <Card.Body>
                <AddModal activeNode={{} as INode} />
                <NodeTree nodes={nodes} touchNode={touchNode} />
            </Card.Body>
        </Card>
    );
};

export default Nodelist;
