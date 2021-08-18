import React from 'react';
import { Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { activeNodeSelector } from '../../redux/selectors';
import { useAppDispatch } from '../../redux/store';
import { changeNodeThunk } from '../../redux/thunks';
import { INode } from '../../types';
import { NodeForm } from '../Modals&Forms/NodeForm';

const NodelistChanger: React.FC = () => {
    const dispatch = useAppDispatch();
    const activeNode: INode = useSelector(activeNodeSelector);
    const changeNode = (valueNode: INode, activeNode: INode) => {
        dispatch(changeNodeThunk(valueNode));
    };

    const { t } = useTranslation();
    return (
        <Card style={{ border: 'none' }}>
            <Card.Body className="mx-3">
                <Card.Title className="d-flex justify-content-center">
                    {t`Change`}
                </Card.Title>
                <NodeForm
                    type="Change"
                    submit={changeNode}
                    activeNode={activeNode}
                ></NodeForm>
            </Card.Body>
        </Card>
    );
};
export default NodelistChanger;
