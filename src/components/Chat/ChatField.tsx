import { useRef } from 'react';
import { useEffect, useState } from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { chatMessagesSelector } from '../../redux/selectors';
import { useAppDispatch } from '../../redux/store';
import {
    deleteAllChatMessagesThunk,
    sendChatMessageThunk,
} from '../../redux/thunks';
import { IMessage } from '../../types';
import { Message } from './Message';

const WebSocketPath = process.env.REACT_APP_WS_CHAT || '';
let client: WebSocket;

type Props = {
    username: string;
};
export const ChatField: React.FC<Props> = (props: Props) => {
    const { username } = props;
    const [messageText, setMessageText] = useState('');

    const dispatch = useAppDispatch();
    const chatMessages = useSelector(chatMessagesSelector);

    const { t } = useTranslation();

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        client = new WebSocket(WebSocketPath);
        client.onopen = () => {
            console.log('connected');
        };
        client.onmessage = (event: MessageEvent) => {
            const message: IMessage = JSON.parse(event.data);
            dispatch(sendChatMessageThunk(message));
        };
        client.onclose = () => {
            console.log('disconnected');
            dispatch(deleteAllChatMessagesThunk());
        };
        return () => client.close();
    }, [dispatch]);

    useEffect(() => {
        const scrollWindow = scrollRef.current;
        if (scrollWindow) scrollWindow.scrollTop = scrollWindow.scrollHeight;
    }, [chatMessages]);
    return (
        <div>
            <Container>
                <div
                    ref={scrollRef}
                    className="overflow-auto mb-5"
                    style={{ height: '500px' }}
                >
                    {chatMessages.map((message: IMessage) => (
                        <div key={message.sentAt}>
                            <Message
                                message={message}
                                username={username}
                            ></Message>
                        </div>
                    ))}
                </div>

                <Form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const newMessage: IMessage = {
                            message: messageText,
                            user: username,
                            sentAt: Date.now(),
                        };
                        if (messageText) {
                            client.send(JSON.stringify(newMessage));
                        }
                        setMessageText('');
                    }}
                >
                    <Row>
                        <Form.Group className="d-flex justify-content-center">
                            <Form.Control
                                value={messageText}
                                onChange={(e) => {
                                    e.preventDefault();
                                    setMessageText(e.currentTarget.value);
                                }}
                            ></Form.Control>
                            <Button type="submit">{t`send button`}</Button>
                        </Form.Group>
                    </Row>
                </Form>
            </Container>
        </div>
    );
};
