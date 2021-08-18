import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import { INode } from '../../types';
import { NodeModal } from './NodeModal';

type Props = {
    type: 'Add' | 'Delete';
    activeNode: INode;
    isModal: boolean;
    setModal: any;
    action: any;
};

export const NodeModalWithButton = (props: Props) => {
    const { type, activeNode, isModal, setModal, action } = props;
    return (
        <>
            <Button
                className="node__button"
                variant="outline-primary"
                type="submit"
                onClick={(e: React.FormEvent) => {
                    e.preventDefault();
                    setModal(true);
                }}
            >
                {type === 'Add' ? (
                    <FontAwesomeIcon icon={'plus'} size={'xs'} />
                ) : (
                    <FontAwesomeIcon icon={'minus'} size={'xs'} />
                )}
            </Button>
            <NodeModal
                type={type}
                activeNode={activeNode}
                isModal={isModal}
                setModal={setModal}
                action={action}
            />
        </>
    );
};
