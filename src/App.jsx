import { BrowserRouter as Router } from 'react-router-dom';

import ProductList from './Components/ProductList/ProductList';

function App() {
  return (
    <Router>
      <div className="App">
        <ProductList />
        {/* El resto de tu contenido */}
      </div>
    </Router>
  );
}

export default App;
