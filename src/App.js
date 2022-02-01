import './App.css';
import CommonContextProvider from './context/common-context';
import Router from './components/router/Router';

function App() {
  return (
    <CommonContextProvider>
        <Router />
    </CommonContextProvider>
  );
}

export default App;
