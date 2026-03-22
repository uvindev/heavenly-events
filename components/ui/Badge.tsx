type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  label: string;
  category?: string;
  size?: BadgeSize;
  className?: string;
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  wedding: { bg: 'bg-pink-500/15', text: 'text-pink-400' },
  corporate: { bg: 'bg-blue-500/15', text: 'text-blue-400' },
  exhibition: { bg: 'bg-amber-500/15', text: 'text-amber-400' },
  concert: { bg: 'bg-purple-500/15', text: 'text-purple-400' },
  education: { bg: 'bg-green-500/15', text: 'text-green-400' },
  fashion: { bg: 'bg-rose-500/15', text: 'text-rose-400' },
  food: { bg: 'bg-orange-500/15', text: 'text-orange-400' },
  automotive: { bg: 'bg-cyan-500/15', text: 'text-cyan-400' },
  default: { bg: 'bg-(--color-crimson)/15', text: 'text-(--color-crimson)' },
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
};

export default function Badge({ label, category, size = 'sm', className = '' }: BadgeProps) {
  const key = category?.toLowerCase() || 'default';
  const defaultColors = { bg: 'bg-(--color-crimson)/15', text: 'text-(--color-crimson)' };
  const colors = categoryColors[key] ?? defaultColors;

  return (
    <span
      className={`inline-flex items-center rounded-full font-ui font-semibold ${colors.bg} ${colors.text} ${sizeClasses[size]} ${className}`}
    >
      {label}
    </span>
  );
}
