import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Main from './Pages/Main';
import Projects from './Pages/Projects/Projects';
import Resume from './Pages/Resume/Resume';
import Sitemap from './Pages/Sitemap/Sitemap';
import Login from './Pages/Login/Login';
import Admin from './Pages/Admin/Admin';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/sitemap" element={<Sitemap />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
