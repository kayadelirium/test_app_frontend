import React from 'react';
import { useAppDispatch } from '../../redux/store';
import { addNodeChildrenThunk, addNodeThunk } from '../../redux/thunks';
import { INode } from '../../types';
import { NodeModalWithButton } from './NodeModalWithButton';

type Props = {
    activeNode: INode;
};

export const AddModal = (props: Props) => {
    const { activeNode } = props;
    const dispatch = useAppDispatch();

    const [isAddModal, setAddModal] = React.useState(false);

    const addNode = (valueNode: INode, activeNode: INode) => {
        if (!!activeNode.id) dispatch(addNodeChildrenThunk(activeNode));
        dispatch(addNodeThunk(valueNode));
        setAddModal(false);
    };

    return (
        <NodeModalWithButton
            type="Add"
            activeNode={activeNode}
            isModal={isAddModal}
            setModal={setAddModal}
            action={addNode}
        />
    );
};
