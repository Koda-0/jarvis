import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FullPage } from './components/common/Spinner';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';

const Home         = lazy(() => import('./pages/Home'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const BlogsPage    = lazy(() => import('./pages/BlogsPage'));
const BlogDetail   = lazy(() => import('./pages/BlogDetail'));
const Login        = lazy(() => import('./pages/Login'));

const DashOverview  = lazy(() => import('./pages/dashboard/DashboardOverview'));
const DashProjects  = lazy(() => import('./pages/dashboard/DashboardProjects'));
const DashBlogs     = lazy(() => import('./pages/dashboard/DashboardBlogs'));
const DashSkills    = lazy(() => import('./pages/dashboard/DashboardSkills'));
const DashServices  = lazy(() => import('./pages/dashboard/DashboardServices'));
const DashMessages  = lazy(() => import('./pages/dashboard/DashboardMessages'));
const DashProfile   = lazy(() => import('./pages/dashboard/DashboardProfile'));
const DashSettings  = lazy(() => import('./pages/dashboard/DashboardSettings'));

export default function App() {
  return (
    <>
      <Suspense fallback={<FullPage />}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/"              element={<Home />} />
            <Route path="/projects"      element={<ProjectsPage />} />
            <Route path="/blogs"         element={<BlogsPage />} />
            <Route path="/blogs/:slug"   element={<BlogDetail />} />
          </Route>

          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={
            <ProtectedRoute><DashboardLayout /></ProtectedRoute>
          }>
            <Route index               element={<DashOverview />} />
            <Route path="projects"     element={<DashProjects />} />
            <Route path="blogs"        element={<DashBlogs />} />
            <Route path="skills"       element={<DashSkills />} />
            <Route path="services"     element={<DashServices />} />
            <Route path="messages"     element={<DashMessages />} />
            <Route path="profile"      element={<DashProfile />} />
            <Route path="settings"     element={<DashSettings />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>

      <ToastContainer position="bottom-right" autoClose={4000}
        hideProgressBar={false} newestOnTop closeOnClick pauseOnHover theme="dark" />
    </>
  );
}
