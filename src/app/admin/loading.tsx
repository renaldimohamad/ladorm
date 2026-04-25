import { ArrowUpRight } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-card/40 backdrop-blur-sm p-8 rounded-[2rem] border border-white/5 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 bg-muted/20 rounded-2xl animate-pulse" />
              <div className="w-8 h-8 rounded-full bg-muted/20 animate-pulse" />
            </div>
            <div className="space-y-3">
              <div className="w-32 h-3 bg-muted/20 rounded-lg animate-pulse" />
              <div className="w-16 h-8 bg-muted/20 rounded-lg animate-pulse" />
              <div className="w-24 h-2 bg-muted/20 rounded-lg animate-pulse mt-4" />
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-card/30 backdrop-blur-sm p-10 rounded-[2.5rem] border border-white/5 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <div className="space-y-2">
                <div className="w-48 h-6 bg-muted/20 rounded-lg animate-pulse" />
                <div className="w-64 h-3 bg-muted/20 rounded-lg animate-pulse" />
              </div>
              <div className="w-10 h-10 rounded-full bg-muted/20 animate-pulse" />
            </div>
            <div className="h-48 bg-muted/5 border-2 border-dashed border-white/5 rounded-[2rem] animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
