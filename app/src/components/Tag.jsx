export default function Tag({ children, variant = 'default' }) {
  const variants = {
    default: 'bg-coral-50 text-coral-700',
    inclusive: 'bg-cyan-50 text-cyan-700',
    success: 'bg-mint-100 text-mint-600',
    warning: 'bg-amber-50 text-amber-700',
    neutral: 'bg-cream-200 text-ink-700',
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs ${variants[variant]}`}>
      {children}
    </span>
  );
}
