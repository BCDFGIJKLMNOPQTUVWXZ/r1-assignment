import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Dashboard />
    </>
  );
}

export default App;
