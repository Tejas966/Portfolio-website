import { Link } from 'react-router-dom';
import { projects } from '../../data/content';

export default function NotFound() {
  return (
    <section className="cc-404" aria-labelledby="nf-title">
      <p className="cc-eyebrow">Error 404 · VETOED · TARGET</p>
      <h1 id="nf-title">This room doesn’t exist.</h1>
      <p>The page you asked for isn’t here. It may have moved, or the link is wrong.</p>
      <div className="cc-actions">
        <Link className="cc-btn" to="/">Back to the start</Link>
        {projects.map((p) => <Link key={p.slug} className="cc-btn cc-btn--ghost" to={`/work/${p.slug}`}>{p.name}</Link>)}
      </div>
    </section>
  );
}
