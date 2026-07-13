export default function SkeletonCard({ className = '' }) {
  return (
    <div className={`glass p-6 ${className}`}>
      <div className="skeleton h-44 rounded-xl mb-4" />
      <div className="skeleton h-5 rounded-lg w-3/4 mb-3" />
      <div className="skeleton h-4 rounded-lg w-full mb-2" />
      <div className="skeleton h-4 rounded-lg w-5/6 mb-5" />
      <div className="flex gap-2">
        <div className="skeleton h-6 rounded-full w-16" />
        <div className="skeleton h-6 rounded-full w-20" />
      </div>
    </div>
  );
}
