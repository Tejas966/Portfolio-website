import type { CSSProperties } from 'react';
import { Link, useLocation } from 'react-router-dom';

const items = [
  { to: '/previews/a', label: 'A · Pipeline' },
  { to: '/previews/b', label: 'B · Notes' },
  { to: '/previews/c', label: 'C · Watcher' },
];

/** Fixed preview-only switcher. Uses neutral inline styles so it never inherits a concept's tokens. */
export default function ConceptSwitcher() {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Design concepts" style={{ position: 'fixed', bottom: 12, left: '50%', transform: 'translateX(-50%)', zIndex: 9999, display: 'flex', gap: 4, padding: 4, borderRadius: 999, background: 'rgba(20,20,20,.88)', backdropFilter: 'blur(8px)', font: '500 12px/1 system-ui, sans-serif', boxShadow: '0 4px 20px rgba(0,0,0,.25)', maxWidth: 'calc(100vw - 24px)', overflowX: 'auto' }}>
      <Link to="/previews" style={pill(pathname === '/previews')}>All</Link>
      {items.map((i) => (
        <Link key={i.to} to={i.to} aria-current={pathname === i.to ? 'page' : undefined} style={pill(pathname === i.to)}>{i.label}</Link>
      ))}
    </nav>
  );
}

function pill(active: boolean): CSSProperties {
  return { padding: '8px 12px', borderRadius: 999, textDecoration: 'none', whiteSpace: 'nowrap', color: active ? '#111' : '#eee', background: active ? '#fff' : 'transparent' };
}
