function BorderAnimatedContainer({ children }) {
  return (
    <div
      className="w-full h-auto md:h-full min-h-0 rounded-2xl border border-transparent animate-border flex flex-col overflow-hidden [background:linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,theme(colors.cyan.500)_86%,theme(colors.cyan.300)_90%,theme(colors.cyan.500)_94%,theme(colors.slate.600/.48))_border-box]"
    >
      {children}
    </div>
  )
}

export default BorderAnimatedContainer
