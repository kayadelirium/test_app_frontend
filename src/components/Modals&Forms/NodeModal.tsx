import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { INode } from '../../types';
import { NodeForm } from './NodeForm';

type Props = {
    type: 'Add' | 'Delete';
    activeNode: INode;
    isModal: boolean;
    setModal: any;
    action: any;
};

export const NodeModal = (props: Props) => {
    const { type, activeNode, isModal, setModal, action } = props;
    const { t } = useTranslation();

    return (
        <Modal show={isModal} onHide={() => setModal(false)}>
            <Modal.Header className="d-flex justify-content-center">
                <Modal.Title>{t(type)}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="mx-3">
                <NodeForm
                    type={type}
                    submit={action}
                    activeNode={activeNode}
                    setShowModal={setModal}
                ></NodeForm>
            </Modal.Body>
        </Modal>
    );
};
