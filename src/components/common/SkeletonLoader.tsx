import "./SkeletonLoader.css";

// Skeleton loading component for page content while data is fetching
const SkeletonLoader: React.FC<{
  type?:
    | "task"
    | "form"
    | "page"
    | "addtask"
    | "createtask"
    | "home"
    | "notfound";
}> = ({ type = "page" }) => {
  if (type === "task") {
    // Skeleton for task card
    return (
      <div className="px-5 pb-4">
        <div className="flex items-center gap-4 p-4 bg-secondary/20 rounded-lg skeleton-pulse">
          <div className="w-12 h-12 bg-secondary/30 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-secondary/30 rounded w-3/4" />
            <div className="h-3 bg-secondary/30 rounded w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (type === "form") {
    // Skeleton for form fields
    return (
      <div className="px-5 pb-10 space-y-4 skeleton-pulse">
        <div className="space-y-2">
          <div className="h-4 bg-secondary/30 rounded w-1/4" />
          <div className="h-12 bg-secondary/30 rounded-lg" />
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-secondary/30 rounded w-1/4" />
          <div className="h-12 bg-secondary/30 rounded-lg" />
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-secondary/30 rounded w-1/4" />
          <div className="h-32 bg-secondary/30 rounded-lg" />
        </div>
        <div className="h-12 bg-secondary/30 rounded-lg mt-6" />
      </div>
    );
  }

  if (type === "addtask") {
    // Skeleton for AddTask page - header, calendar, category card, form
    return (
      <div className="w-full min-h-screen bg-primary flex flex-col overflow-x-hidden pb-8 skeleton-pulse">
        {/* Header skeleton */}
        <div className="px-5 py-6">
          <div className="h-8 bg-secondary/30 rounded w-1/3" />
        </div>

        {/* Calendar skeleton */}
        <div className="px-5 py-4 space-y-4">
          <div className="h-6 bg-secondary/30 rounded w-1/4" />
          <div className="grid grid-cols-7 gap-2">
            {[...Array(35)].map((_, i) => (
              <div key={i} className="h-8 bg-secondary/30 rounded" />
            ))}
          </div>
        </div>

        {/* Category card skeleton */}
        <div className="px-5 py-4">
          <div className="flex items-center gap-4 p-4 bg-secondary/20 rounded-lg">
            <div className="w-12 h-12 bg-secondary/30 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-secondary/30 rounded w-1/3" />
              <div className="h-3 bg-secondary/30 rounded w-1/4" />
            </div>
          </div>
        </div>

        {/* Form skeleton */}
        <div className="px-5 pb-10 space-y-4">
          <div className="space-y-2">
            <div className="h-4 bg-secondary/30 rounded w-1/4" />
            <div className="h-12 bg-secondary/30 rounded-lg" />
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-secondary/30 rounded w-1/4" />
            <div className="h-12 bg-secondary/30 rounded-lg" />
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-secondary/30 rounded w-1/4" />
            <div className="h-24 bg-secondary/30 rounded-lg" />
          </div>
          <div className="h-12 bg-secondary/30 rounded-lg mt-6" />
        </div>
      </div>
    );
  }

  if (type === "createtask") {
    // Skeleton for CreateTask page - header, date picker, category cards
    return (
      <div className="w-full min-h-screen bg-primary flex flex-col overflow-x-hidden pb-8 skeleton-pulse">
        {/* Header skeleton */}
        <div className="px-5 py-6">
          <div className="h-8 bg-secondary/30 rounded w-1/2" />
        </div>

        {/* Back button skeleton */}
        <div className="px-5 py-2">
          <div className="h-6 bg-secondary/30 rounded w-16" />
        </div>

        {/* Date scheduler skeleton */}
        <div className="px-5 py-4 space-y-3">
          <div className="h-6 bg-secondary/30 rounded w-1/4" />
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-20 w-16 bg-secondary/30 rounded-lg flex-shrink-0"
              />
            ))}
          </div>
        </div>

        {/* Category cards skeleton */}
        <div className="px-5 pb-10 space-y-3">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 bg-secondary/20 rounded-lg"
            >
              <div className="w-12 h-12 bg-secondary/30 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-secondary/30 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "home") {
    // Skeleton for Home page - title, logo, button
    return (
      <div className="w-full min-h-screen bg-primary flex flex-col overflow-x-hidden skeleton-pulse">
        {/* Title skeleton */}
        <div className="flex-1 flex items-center justify-center">
          <div className="h-16 bg-secondary/30 rounded w-1/2 max-w-xs" />
        </div>

        {/* Logo skeleton */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-32 h-32 bg-secondary/30 rounded-full mb-8" />
        </div>

        {/* Button skeleton */}
        <div className="flex-1 flex flex-col items-center justify-center pb-20">
          <div className="h-12 bg-secondary/30 rounded-lg w-48" />
        </div>
      </div>
    );
  }

  if (type === "notfound") {
    // Skeleton for NotFound page - icon, message, button
    return (
      <div className="w-full min-h-screen bg-primary flex flex-col items-center justify-center overflow-x-hidden skeleton-pulse">
        {/* Icon skeleton */}
        <div className="w-24 h-24 bg-secondary/30 rounded-full mb-8" />

        {/* Message skeleton */}
        <div className="space-y-3 text-center max-w-sm">
          <div className="h-8 bg-secondary/30 rounded w-full" />
          <div className="h-4 bg-secondary/30 rounded w-4/5 mx-auto" />
          <div className="h-4 bg-secondary/30 rounded w-3/5 mx-auto" />
        </div>

        {/* Button skeleton */}
        <div className="mt-8 h-12 bg-secondary/30 rounded-lg w-48" />
      </div>
    );
  }

  // Skeleton for full page (default)
  return (
    <div className="w-full min-h-screen bg-primary flex flex-col overflow-x-hidden pb-8 skeleton-pulse">
      {/* Header skeleton */}
      <div className="px-5 py-6 space-y-3">
        <div className="h-8 bg-secondary/30 rounded w-1/3" />
      </div>

      {/* Calendar skeleton */}
      <div className="px-5 py-4 space-y-4">
        <div className="h-6 bg-secondary/30 rounded w-1/4" />
        <div className="grid grid-cols-7 gap-2">
          {[...Array(35)].map((_, i) => (
            <div key={i} className="h-10 bg-secondary/30 rounded" />
          ))}
        </div>
      </div>

      {/* Card skeleton */}
      <div className="px-5 py-4">
        <div className="flex items-center gap-4 p-4 bg-secondary/20 rounded-lg">
          <div className="w-12 h-12 bg-secondary/30 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-secondary/30 rounded w-3/4" />
            <div className="h-3 bg-secondary/30 rounded w-1/2" />
          </div>
        </div>
      </div>

      {/* Form skeleton */}
      <div className="px-5 pb-10 space-y-4">
        <div className="space-y-2">
          <div className="h-4 bg-secondary/30 rounded w-1/4" />
          <div className="h-12 bg-secondary/30 rounded-lg" />
        </div>
        <div className="h-12 bg-secondary/30 rounded-lg" />
      </div>
    </div>
  );
};

export default SkeletonLoader;
