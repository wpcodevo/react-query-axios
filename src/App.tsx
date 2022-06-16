import { CssBaseline } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import routes from './router';

function App() {
  const content = useRoutes(routes);
  return (
    <>
      <CssBaseline />
      <ToastContainer />
      {content}
    </>
  );
}

export default App;
