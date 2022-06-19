import { BrowserRouter as Router } from 'react-router-dom';
import { FoodProvider } from './hooks/useFoods';

import Routes from './routes';

import GlobalStyle from './styles/global';

export function App() {

  return (
    <>
      <FoodProvider>
        <GlobalStyle />
        <Router>
          <Routes />
        </Router>
      </FoodProvider>
    </>
  );
}

export default App;
