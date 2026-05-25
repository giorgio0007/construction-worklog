import { Skeleton } from '@shared/ui/skeleton';

const SKELETON_ROWS = 5;

export const WorkLogsTableSkeleton = () => {
  return (
    <>
      {/* Desktop table skeleton */}
      <div
        aria-hidden
        className="hidden overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm md:block"
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              {Array.from({ length: 6 }).map((_, i) => (
                <th key={i} className="px-4 py-4">
                  <Skeleton className="h-4 w-20" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: SKELETON_ROWS }).map((_, rowIndex) => (
              <tr key={rowIndex} className="border-b border-slate-100 last:border-0">
                {Array.from({ length: 6 }).map((_, colIndex) => (
                  <td key={colIndex} className="px-4 py-4">
                    <Skeleton
                      className={`h-4 ${colIndex === 5 ? 'w-16' : 'w-full max-w-[120px]'}`}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card skeleton */}
      <div aria-hidden className="space-y-3 md:hidden">
        {Array.from({ length: SKELETON_ROWS }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <Skeleton className="h-5 w-24" />
              <div className="flex gap-2">
                <Skeleton className="size-9 rounded-lg" />
                <Skeleton className="size-9 rounded-lg" />
              </div>
            </div>
            <div className="mt-4 space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
