import * as React from 'react';
import { INodeTree } from '../../types';
import '../../index.css';
import { Col, Form, Row } from 'react-bootstrap';
import { AddModal } from '../Modals&Forms/AddModal';
import { DeleteModal } from '../Modals&Forms/DeleteModal';
import { useSelector } from 'react-redux';
import { activeNodeSelector } from '../../redux/selectors';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
    node: INodeTree;
    touchNode: (node: INodeTree) => void;
};

export const Node: React.FC<Props> = (props: Props) => {
    const { node, touchNode } = props;

    const activeNode = useSelector(activeNodeSelector);
    const active_id = node.id === activeNode.id ? 'active' : 'inactive';
    return (
        <Row className="node" id={active_id}>
            <Form.Label column sm="1" onClick={(e) => touchNode(node)}>
                {node.hasChildren ? (
                    node.isOpen ? (
                        <FontAwesomeIcon icon={'caret-down'} />
                    ) : (
                        <FontAwesomeIcon icon={'caret-right'} />
                    )
                ) : (
                    <div />
                )}
            </Form.Label>
            <Form.Label
                column
                xs="auto"
                onClick={(e) => touchNode(node)}
                className="node__name"
            >
                {node.name}
            </Form.Label>

            <Col>
                <AddModal activeNode={node} />
                <DeleteModal activeNode={node} />
            </Col>
        </Row>
    );
};
