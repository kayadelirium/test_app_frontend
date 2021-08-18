import { Alert } from 'react-bootstrap';
import { IMessage } from '../../types';

type Props = {
    message: IMessage;
    username: string;
};

export const Message: React.FC<Props> = (props: Props) => {
    const { message, username } = props;

    const userMessagePlace =
        message.user !== username
            ? 'd-flex flex-row'
            : 'd-flex flex-row-reverse';
    return (
        <div className={userMessagePlace + ' mb-3'}>
            <Alert variant="primary">
                <strong
                    className={userMessagePlace}
                >{`${message.user}`}</strong>
                <div>{`${message.message}`}</div>
            </Alert>
        </div>
    );
};
