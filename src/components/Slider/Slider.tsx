import { Slider } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';

const WebSocketPath = process.env.REACT_APP_WS_SLIDER || '';
let client: WebSocket;
export const MySlider: React.FC = () => {
    const [value, setValue] = useState(50);
    useEffect(() => {
        client = new WebSocket(WebSocketPath);
        client.onopen = () => {
            console.log('connected');
        };
        client.onmessage = (event: MessageEvent) => {
            setValue(event.data);
        };
        client.onclose = () => {
            console.log('disconnected');
        };
        return () => client.close();
    }, []);

    return (
        <div className="d-flex justify-content-center">
            <Col className="col-lg-5 my-5">
                <Slider
                    value={Number(value)}
                    step={1}
                    onChange={(e, newValue) => {
                        setValue(Number(newValue));
                        client.send(`${newValue}`);
                    }}
                    valueLabelDisplay="auto"
                />
            </Col>
        </div>
    );
};
