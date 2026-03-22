type SkeletonVariant = 'text' | 'circle' | 'card' | 'image';

interface SkeletonProps {
  variant?: SkeletonVariant;
  className?: string;
}

const variantClasses: Record<SkeletonVariant, string> = {
  text: 'h-4 w-full rounded-md',
  circle: 'h-12 w-12 rounded-full',
  card: 'h-48 w-full rounded-xl',
  image: 'aspect-video w-full rounded-lg',
};

export default function Skeleton({ variant = 'text', className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-(--border-primary) ${variantClasses[variant]} ${className}`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
