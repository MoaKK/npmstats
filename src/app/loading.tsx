import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <div className="flex flex-col items-center gap-2">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>
      <div className="flex w-full max-w-xl flex-col gap-3">
        <Skeleton className="h-9 w-36" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}

export default Loading;
