import { useState } from 'react';
import App from './App';
import MexicoLive from './pages/MexicoLive';

function Router() {
  const [currentPage, setCurrentPage] = useState('iran');

  // Navigation buttons that will be shown in header
  window.navigateTo = (page) => setCurrentPage(page);

  return (
    <>
      {currentPage === 'iran' && <App navigateTo={setCurrentPage} />}
      {currentPage === 'mexico' && <MexicoLive />}
    </>
  );
}

export default Router;
