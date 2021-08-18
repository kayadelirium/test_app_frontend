import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { INode } from '../../types';

type Props = {
    type: 'Add' | 'Change' | 'Delete';
    submit: (valueNode: INode, activeNode: INode) => void;
    activeNode: INode;
    setShowModal?: any;
};

export const NodeForm = (props: Props) => {
    const { t } = useTranslation();
    const { submit, activeNode, type, setShowModal } = props;

    const [valueNode, setValueNode] = useState(
        type === 'Add'
            ? ({
                  name: '',
                  ipAddress: '',
                  port: 0,
                  parentId: activeNode.id,
                  isOpen: false,
              } as INode)
            : activeNode
    );

    useEffect(() => {
        if (type === 'Change') {
            setValueNode(activeNode);
        }
    }, [type, activeNode]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValueNode({
            ...valueNode,
            [e.currentTarget.id]: e.currentTarget.value,
        });
    };

    const onReset = (e: React.FormEvent) => {
        e.preventDefault();
        setValueNode(activeNode);
        if (setShowModal) setShowModal(false);
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submit(valueNode, activeNode);
    };
    let readOnly = true;
    let disabled = false;

    switch (type) {
        case 'Add':
            readOnly = false;
            break;
        case 'Change':
            readOnly = false;
            disabled = activeNode.name ? false : true;
            break;
        case 'Delete':
            readOnly = true;
            break;
    }
    return (
        <Form onSubmit={onSubmit} onReset={onReset} className={type}>
            <Form.Group as={Row} className="mb-3">
                <Form.Label>{t`Name`}:</Form.Label>
                <Form.Control
                    type="text"
                    id="name"
                    value={valueNode.name}
                    placeholder={t`Name`}
                    onChange={onChange}
                    required
                    readOnly={readOnly}
                />
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label>{t`IP address`}:</Form.Label>
                <Form.Control
                    type="text"
                    id="ipAddress"
                    placeholder={t`IP address`}
                    value={valueNode.ipAddress}
                    onChange={onChange}
                    required
                    pattern={
                        '^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'
                    }
                    readOnly={readOnly}
                />
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label>{t`Port`}:</Form.Label>
                <Form.Control
                    type="number"
                    id="port"
                    placeholder={t`Port`}
                    value={valueNode.port}
                    onChange={onChange}
                    required
                    min={0}
                    max={65535}
                    readOnly={readOnly}
                />
            </Form.Group>
            {type === 'Add' && (
                <Form.Group as={Row} className="mb-3">
                    <Form.Label>{t`Parent name`}:</Form.Label>

                    <Form.Control
                        type="text"
                        id="parentId"
                        placeholder={t`Parent name`}
                        value={
                            activeNode.name
                                ? `${activeNode.name}`
                                : `${t`no parent`}`
                        }
                        readOnly={true}
                    />
                </Form.Group>
            )}
            <Form.Group>
                <Col>
                    <Button
                        className="node__button"
                        variant="outline-primary"
                        type="submit"
                        disabled={disabled}
                    >
                        {t(type + ' button')}
                    </Button>

                    <Button
                        className="node__button"
                        variant="outline-secondary"
                        type="reset"
                        disabled={disabled}
                    >
                        {t`Cancel`}
                    </Button>
                </Col>
            </Form.Group>
        </Form>
    );
};
