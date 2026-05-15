export default function Avatar({ iniciais, size = 'md' }) {
  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-14 w-14 text-base',
    xl: 'h-20 w-20 text-xl',
  };
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-coral-500 font-semibold text-white ${sizes[size]}`}
    >
      {iniciais}
    </span>
  );
}
