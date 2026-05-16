export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-coral-500 text-white hover:bg-coral-600',
    secondary: 'bg-white text-ink-900 border border-ink-200 hover:border-ink-300',
    ghost: 'text-ink-700 hover:bg-cream-200',
    danger: 'bg-white text-ink-700 border border-ink-200 hover:border-ink-300',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  };
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}
