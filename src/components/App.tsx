import * as React from 'react';
import { ButtonGroup, Nav, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { LinkContainer } from 'react-router-bootstrap';
import { Redirect } from 'react-router';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ChangeTable } from './Table/ChangeTable';
import { MessageList } from './Messages/MessageList';
import NodeInteractive from './Tree/NodeInteractive';
import { MySlider } from './Slider/Slider';
import { Chat } from './Chat/Chat';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

const App: React.FC = () => {
    const { t, i18n } = useTranslation();
    return (
        <div>
            <Router>
                <Navbar className="px-5">
                    <Nav className="d-flex justify-content-between w-100">
                        <div className="d-flex">
                            <LinkContainer to="/tree">
                                <Nav.Link>{t`tree`}</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to="/table">
                                <Nav.Link>{t`table`}</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to="/slider">
                                <Nav.Link>{t`slider`}</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to="/chat">
                                <Nav.Link>{t`chat`}</Nav.Link>
                            </LinkContainer>
                        </div>
                        <ButtonGroup>
                            <Nav.Link onClick={() => i18n.changeLanguage('en')}>
                                English
                            </Nav.Link>
                            <Nav.Link onClick={() => i18n.changeLanguage('ru')}>
                                Русский
                            </Nav.Link>
                        </ButtonGroup>
                    </Nav>
                </Navbar>
                <Route path="/">
                    <Redirect to="/tree" />
                </Route>
                <Route path="/tree">
                    <NodeInteractive />
                </Route>
                <Route path="/table">
                    <ChangeTable />
                </Route>
                <Route path="/slider">
                    <MySlider />
                </Route>
                <Route path="/chat">
                    <Chat />
                </Route>
            </Router>
            <MessageList />
        </div>
    );
};

export default App;
