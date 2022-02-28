import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from 'react-router-dom';

import Header from './components/Header';
import APIContextProvider from './context';
import Garage from './pages/Garage';
import Winners from './pages/Winners';

const App: React.FC = () => (
  <Router>
    <APIContextProvider>
      <main className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/garage" />} />
          <Route path="/garage" element={<Garage />} />
          <Route path="/winners" element={<Winners />} />
        </Routes>
      </main>
    </APIContextProvider>
  </Router>
);

export default App;
