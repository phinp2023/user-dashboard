import BootstrapSystem from 'pages/Bootstrap';
import './App.scss';
import { Provider } from 'react-redux';
import store from 'redux/store';
import MainRouter from 'router/MainRouter';

function App() {
    return (
        <Provider store={store}>
            <BootstrapSystem>
                <MainRouter />
            </BootstrapSystem>
        </Provider>
    );
}

export default App;
