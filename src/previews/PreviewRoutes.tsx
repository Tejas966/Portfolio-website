import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import ConceptIndex from './ConceptIndex';

const ConceptA = lazy(() => import('./a/ConceptA'));
const ConceptB = lazy(() => import('./b/ConceptB'));
const ConceptC = lazy(() => import('./c/ConceptC'));

/** Dev-only: the three Phase 3 design previews, kept for reference. */
export default function PreviewRoutes() {
  return (
    <Routes>
      <Route index element={<ConceptIndex />} />
      <Route path="a" element={<ConceptA />} />
      <Route path="b" element={<ConceptB />} />
      <Route path="c" element={<ConceptC />} />
    </Routes>
  );
}
