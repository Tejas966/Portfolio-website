import { lazy, Suspense } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import '@fontsource-variable/bricolage-grotesque/standard.css';
import '@fontsource-variable/geist';
import './site/styles/site.css';
import { MotionProvider } from './site/motion';
import Layout from './site/Layout';
import Home from './site/pages/Home';
import CaseStudy from './site/pages/CaseStudy';
import NotFound from './site/pages/NotFound';

// Design-exploration previews from Phase 3. Only routed in development; tree-shaken from production builds.
const Previews = import.meta.env.DEV ? lazy(() => import('./previews/PreviewRoutes')) : null;

function Shell() {
  return (
    <MotionProvider>
      <Layout><Outlet /></Layout>
    </MotionProvider>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route index element={<Home />} />
        <Route path="work/:slug" element={<CaseStudy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      {Previews && <Route path="previews/*" element={<Suspense fallback={null}><Previews /></Suspense>} />}
    </Routes>
  );
}
