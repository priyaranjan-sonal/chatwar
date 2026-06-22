function UsersLoadingSkeleton() {
  return (
    <div className="-mx-4 lg:mx-0 lg:space-y-1">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="w-full px-4 py-2.5 border-b border-prsSlate/50 bg-prsCharcoal/50 animate-pulse lg:rounded-lg lg:border-b-0"
        >
          <div className="flex items-center gap-3">
            <div className="size-12 shrink-0 rounded-full bg-prsGraphite" />
            <div className="h-4 flex-1 rounded bg-prsGraphite max-w-[60%]" />
          </div>
        </div>
      ))}
    </div>
  );
}
export default UsersLoadingSkeleton;