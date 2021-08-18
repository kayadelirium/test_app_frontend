import React from 'react';
import { ToastContainer } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { errorMessageSelector } from '../../redux/selectors';
import { MessageAlert } from './MessageAlert';

export const MessageList: React.FC = () => {
    const messages: string[] = useSelector(errorMessageSelector);
    return (
        <ToastContainer
            className="position-fixed"
            position="bottom-end"
            style={{ marginBottom: '50px', marginRight: '50px' }}
        >
            {messages.map((message, index) => (
                <div key={index + '_' + message}>
                    <MessageAlert message={message} />
                </div>
            ))}
        </ToastContainer>
    );
};
