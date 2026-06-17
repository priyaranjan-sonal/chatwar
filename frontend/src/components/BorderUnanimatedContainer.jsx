function BorderUnanimatedContainer({ children }) {
  return (
    <div className="flex h-full min-h-0 w-full flex-row overflow-hidden rounded-2xl border border-cyan-500/50 bg-gradient-to-br from-[#172033] via-slate-800 to-[#172033]">
      {children}
    </div>
  )
}

export default BorderUnanimatedContainer
