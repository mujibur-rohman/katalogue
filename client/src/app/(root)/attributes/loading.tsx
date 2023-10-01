import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="grid grid-cols-1 p-5 md:grid-cols-2 2xl:grid-cols-3 gap-5">
      <div className="rounded-lg flex flex-col gap-2">
        <Skeleton className="h-[2rem]" />
        <Skeleton className="h-[3rem]" />
        <Skeleton className="h-[6rem]" />
      </div>
      <div className="rounded-lg flex flex-col gap-2">
        <Skeleton className="h-[2rem]" />
        <Skeleton className="h-[3rem]" />
        <Skeleton className="h-[6rem]" />
      </div>
      <div className="rounded-lg flex flex-col gap-2">
        <Skeleton className="h-[2rem]" />
        <Skeleton className="h-[3rem]" />
        <Skeleton className="h-[6rem]" />
      </div>
      <div className="rounded-lg flex flex-col gap-2">
        <Skeleton className="h-[2rem]" />
        <Skeleton className="h-[3rem]" />
        <Skeleton className="h-[6rem]" />
      </div>
      <div className="rounded-lg flex flex-col gap-2">
        <Skeleton className="h-[2rem]" />
        <Skeleton className="h-[3rem]" />
        <Skeleton className="h-[6rem]" />
      </div>
      <div className="rounded-lg flex flex-col gap-2">
        <Skeleton className="h-[2rem]" />
        <Skeleton className="h-[3rem]" />
        <Skeleton className="h-[6rem]" />
      </div>
    </div>
  );
}
