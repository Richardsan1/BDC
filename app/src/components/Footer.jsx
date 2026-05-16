import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="border-t border-cream-300/60 bg-cream-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 text-sm text-ink-500">
        <Logo />
        <span>© 2026 — Universidade Presbiteriana Mackenzie</span>
      </div>
    </footer>
  );
}
