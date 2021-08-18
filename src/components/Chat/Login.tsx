import React from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

type Props = {
    username: string;
    setUsername: (username: string) => any;
    setChatVisible: (visibility: boolean) => any;
};
export const Login: React.FC<Props> = (props: Props) => {
    const { username, setUsername, setChatVisible } = props;
    const { t } = useTranslation();

    return (
        <Container fluid className="d-flex justify-content-center">
            <Card className="my-5">
                <Card.Header className="d-flex justify-content-center">
                    <Card.Title> {t`name enter`} </Card.Title>
                </Card.Header>
                <Card.Body>
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            setChatVisible(true);
                            console.log(username);
                        }}
                    >
                        <Form.Group className="mb-3">
                            <Form.Control
                                value={username}
                                required
                                onChange={(e) => {
                                    e.preventDefault();
                                    setUsername(e.currentTarget.value);
                                }}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Button type="submit"> {t`save button`} </Button>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};
