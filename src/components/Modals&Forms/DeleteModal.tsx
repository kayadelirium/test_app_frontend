import React from 'react';
import { useAppDispatch } from '../../redux/store';
import { deleteNodeThunk, setErrorMessageThunk } from '../../redux/thunks';
import { INode } from '../../types';
import { NodeModalWithButton } from './NodeModalWithButton';

type Props = {
    activeNode: INode;
};

export const DeleteModal = (props: Props) => {
    const { activeNode } = props;
    const [isDeleteModal, setDeleteModal] = React.useState(false);

    const dispatch = useAppDispatch();

    const saveNode = (valueNode: INode, activeNode: INode) => {
        if (activeNode.id) dispatch(deleteNodeThunk(activeNode));
        else dispatch(setErrorMessageThunk('delete empty'));
        setDeleteModal(false);
    };

    return (
        <NodeModalWithButton
            type="Delete"
            activeNode={activeNode}
            isModal={isDeleteModal}
            setModal={setDeleteModal}
            action={saveNode}
        />
    );
};
