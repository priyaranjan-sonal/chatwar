function UsersLoadingSkeleton() {
  return (
    <div className="-mx-4 lg:mx-0 lg:space-y-1">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="w-full px-4 py-2.5 border-b border-slate-700/30 bg-slate-800/20 animate-pulse lg:rounded-lg lg:border-b-0"
        >
          <div className="flex items-center gap-3">
            <div className="size-12 shrink-0 rounded-full bg-slate-700" />
            <div className="h-4 flex-1 rounded bg-slate-700 max-w-[60%]" />
          </div>
        </div>
      ))}
    </div>
  );
}
export default UsersLoadingSkeleton;