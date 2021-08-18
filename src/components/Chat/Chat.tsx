import { useState } from 'react';
import { ChatField } from './ChatField';
import { Login } from './Login';

export const Chat: React.FC = () => {
    const [username, setUsername] = useState('');
    const [isChatVisible, setChatVisible] = useState(false);

    return (
        <div>
            {isChatVisible ? (
                <ChatField username={username}></ChatField>
            ) : (
                <Login
                    username={username}
                    setUsername={setUsername}
                    setChatVisible={setChatVisible}
                ></Login>
            )}
        </div>
    );
};
