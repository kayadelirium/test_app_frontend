import React from 'react';
import { Toast, ToastBody, ToastHeader } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../redux/store';
import { deleteErrorMessageThunk } from '../../redux/thunks';

type Props = {
    message: string;
};
export const MessageAlert: React.FC<Props> = (props: Props) => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const { message } = props;

    const [isShow, setShow] = React.useState(true);

    setTimeout(() => {
        setShow(false);
        dispatch(deleteErrorMessageThunk(message));
    }, 5000);

    const decode = (message: string) => {
        if (message.includes('OK!')) {
            return {
                style: 'success',
                header: t`OK!`,
                message: t(message.slice(4)),
            };
        } else {
            let msg = '';
            if (message.endsWith('error')) {
                msg = t(message);
            } else {
                const foundCode = /\d+/g.exec(message);
                const code = foundCode !== null ? foundCode[0] : 500;
                switch (code) {
                    case '422':
                        msg = t`422`;
                        break;
                    case '401':
                        msg = t`401`;
                        break;
                    case '501':
                        msg = t`501`;
                        break;
                    default:
                        msg = t`default error`;
                        break;
                }
            }
            return {
                style: 'danger',
                header: t`ERROR!`,
                message: msg,
            };
        }
    };
    return (
        <Toast
            bg={decode(message).style}
            show={isShow}
            onClose={() => setShow(false)}
        >
            <ToastHeader>
                <div className="me-auto">{decode(message).header}</div>
            </ToastHeader>
            <ToastBody>{decode(message).message}</ToastBody>
        </Toast>
    );
};
