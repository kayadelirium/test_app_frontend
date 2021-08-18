import { Col, Container } from 'react-bootstrap';
import Nodelist from './Nodelist';
import NodelistChanger from './NodelistChanger';

const NodeInteractive: React.FC = () => {
    return (
        <Container fluid className="d-flex justify-content-center">
            <Col className="col-lg-5 mx-5">
                <Nodelist />
            </Col>
            <Col className="col-lg-3 mx-5">
                <NodelistChanger />
            </Col>
        </Container>
    );
};

export default NodeInteractive;
