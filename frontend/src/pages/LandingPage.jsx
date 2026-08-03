import { Link } from "react-router"
import {
  MessageCircleIcon,
  ShieldCheckIcon,
  ZapIcon,
  LockIcon,
  HeartIcon,
  UsersIcon,
  ArrowRightIcon,
  SparklesIcon,
  GlobeIcon,
  SunIcon,
  MoonIcon,
} from 'lucide-react'
import { useAppTheme } from "../library/useAppTheme.js"

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Get Started", href: "#start" },
]

const FEATURES = [
  {
    icon: ZapIcon,
    title: "Realtime Messaging",
    text: "Messages arrive the moment they are sent. No refresh, no delay, just instant conversations.",
    badge: "Fast",
  },
  {
    icon: ShieldCheckIcon,
    title: "Secure by Default",
    text: "Your account is protected with secure sessions and safe data handling at every step.",
    badge: "Secure",
  },
  {
    icon: GlobeIcon,
    title: "Always Available",
    text: "Stay connected anytime, anywhere — on mobile or desktop, across any device.",
    badge: "Reliable",
  },
  {
    icon: LockIcon,
    title: "Private Conversations",
    text: "Chat privately with the people you choose. Your conversations stay between you and them.",
    badge: "Private",
  },
  {
    icon: UsersIcon,
    title: "Effortless Setup",
    text: "Create an account in seconds and start chatting. No complicated configuration needed.",
    badge: "Easy",
  },
  {
    icon: HeartIcon,
    title: "Free Forever",
    text: "Every core feature is free to use. Build your network without spending a dime.",
    badge: "Free",
  },
]

const STATS = [
  { value: "100%", label: "Realtime" },
  { value: "24/7", label: "Available" },
  { value: "Free", label: "Forever" },
  { value: "Secure", label: "By Default" },
]

function LandingPage() {
  const [isLightMode, setIsLightMode] = useAppTheme()

  const scrollToSection = (e, href) => {
    e.preventDefault()
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="h-full w-full" data-auth-theme={isLightMode ? "light" : "dark"}>
      <div className="app-shell-bg relative flex h-dvh w-full flex-col overflow-hidden">
        <div className='absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:14px_24px]' />
        <div className='absolute top-0 -left-4 size-96 bg-prsBlue opacity-15 blur-[100px]' />
        <div className='absolute bottom-0 right-4 size-96 bg-prsSky opacity-10 blur-[100px]' />

        <div className='relative z-10 flex h-full min-h-0 w-full flex-col overflow-y-auto app-gradient-bg'>
        {/* NAV */}
        <header className="sticky top-0 z-40 w-full border-b border-prsBorder bg-prsBlack">
          <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
            <Link to="/" className="landing-brand flex items-center gap-2.5">
              <MessageCircleIcon className="size-7 text-prsBlue" />
              <span className="text-2xl font-bold tracking-tight">
                <span className="text-prsWhite">Chat</span>
                <span className="text-prsRed">War</span>
              </span>
            </Link>

            <div className="hidden items-center gap-6 md:flex">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-sm font-medium text-prsGray transition-colors hover:text-prsSnow"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2.5">
              <Link
                to="/login"
                className="hidden rounded-lg border border-prsBlue bg-transparent px-4 py-2 text-sm font-medium text-prsSky transition-colors hover:bg-prsBlue/10 sm:inline-block"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="inline-block rounded-lg bg-prsBlue px-4 py-2 text-sm font-medium text-prsWhite transition-colors hover:bg-prsNavy focus:ring-2 focus:ring-prsBlue"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </header>

        {/* HERO */}
        <section id="home" className="relative mx-auto flex w-full max-w-7xl scroll-mt-20 flex-col items-center justify-center gap-10 px-4 py-12 sm:px-6 lg:flex-row lg:gap-16 lg:py-16">
          <div className="w-full max-w-xl text-center lg:text-left">
            <span className="auth-badge mb-5 inline-flex gap-1.5 px-4 py-1.5 text-sm font-semibold">
              <SparklesIcon className="size-4 text-prsYellow" />
              Realtime Chat Platform
            </span>

            <h1 className="landing-hero-title text-4xl font-bold leading-tight tracking-tight text-prsSnow sm:text-5xl lg:text-[56px]">
              Connect Anytime, Anywhere{" "}
              <span className="text-prsYellow">through</span>{" "}
              <span className="text-prsWhite">Chat</span>
              <span className="text-prsRed">War</span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-prsSilver sm:text-lg lg:mx-0 mx-auto">
              A fast, secure, and reliable messaging platform built for
              conversations that never stop. Start chatting in seconds — no
              installation, no hassle.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 rounded-lg bg-prsBlue px-6 py-3 text-sm font-semibold text-prsWhite transition-colors hover:bg-prsNavy focus:ring-2 focus:ring-prsBlue"
              >
                Get Started Free
                <ArrowRightIcon className="size-4" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-lg border border-prsBorder bg-prsCharcoal/60 px-6 py-3 text-sm font-semibold text-prsSnow transition-colors hover:border-prsSky hover:text-prsSky"
              >
                Log In
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 lg:justify-start">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <p className="text-2xl font-bold text-prsBlue sm:text-3xl">{stat.value}</p>
                  <p className="mt-0.5 text-xs font-medium tracking-wide text-prsGray uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex w-full max-w-md items-center justify-center lg:max-w-lg">
            <div className="absolute inset-0 -z-10 rounded-full bg-prsBlue/20 blur-[90px]" />
            <img
              src="/signup.png"
              alt="People using ChatWar on mobile devices"
              className="w-full max-w-[360px] object-contain lg:max-w-[440px]"
            />
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="mx-auto w-full max-w-7xl scroll-mt-20 px-4 py-14 sm:px-6">
          <div className="mb-10 text-center">
            <span className="auth-badge px-4 py-1.5 text-sm font-semibold">Why ChatWar</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-prsSnow sm:text-4xl">
              Everything you need to{" "}
              <span className="text-prsBlue">stay connected</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-prsSilver sm:text-base">
              Built with the same speed, security, and reliability you already
              love — now on a dedicated home for the ChatWar community.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, text, badge }) => (
              <div
                key={title}
                className="group rounded-xl border border-prsBorder bg-prsCharcoal p-5 transition-all hover:border-prsBlue/60 hover:bg-prsGraphite"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-lg bg-prsBlue/10 text-prsBlue transition-colors group-hover:bg-prsBlue group-hover:text-prsWhite">
                    <Icon className="size-5" />
                  </span>
                  <span className="auth-badge">{badge}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-prsSnow">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-prsSilver">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section id="start" className="mx-auto w-full max-w-7xl scroll-mt-20 px-4 py-14 sm:px-6">
          <div className="relative overflow-hidden rounded-2xl border border-prsBorder bg-prsCharcoal p-8 text-center sm:p-12">
            <div className="absolute -top-16 left-1/2 size-64 -translate-x-1/2 rounded-full bg-prsBlue opacity-20 blur-[80px]" />
            <div className="relative">
              <h2 className="text-3xl font-bold tracking-tight text-prsSnow sm:text-4xl">
                Ready to join the battle?
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-prsSilver sm:text-base">
                Create your free account and start realtime conversations with
                friends, family, and colleagues today.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 rounded-lg bg-prsBlue px-6 py-3 text-sm font-semibold text-prsWhite transition-colors hover:bg-prsNavy focus:ring-2 focus:ring-prsBlue"
                >
                  Create a Free Account
                  <ArrowRightIcon className="size-4" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-lg border border-prsBlue bg-transparent px-6 py-3 text-sm font-semibold text-prsSky transition-colors hover:bg-prsBlue/10"
                >
                  I already have an account
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="w-full border-t border-prsBorder bg-prsBlack/60">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6">
            <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="landing-brand flex items-center gap-2.5">
                <MessageCircleIcon className="size-6 text-prsBlue" />
                <span className="text-lg font-bold tracking-tight">
                  <span className="text-prsWhite">Chat</span>
                  <span className="text-prsRed">War</span>
                </span>
              </div>

              <div className="flex items-center gap-6">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-sm text-prsGray transition-colors hover:text-prsSnow"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setIsLightMode((prev) => !prev)}
                className={`flex items-center gap-2.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${isLightMode ? "border-prsRed bg-prsRed/10 text-prsGray hover:bg-prsRed/20" : "border-prsBlue bg-prsBlue/10 text-prsSilver hover:bg-prsBlue/20"}`}
                aria-label={isLightMode ? "Switch to dark mode" : "Switch to light mode"}
              >
                <span className={`${isLightMode ? "text-prsRed" : "text-prsSnow"}`}>Light</span>
                <div className={`relative h-5 w-9 rounded-full ${isLightMode ? "bg-prsRed/20" : "bg-prsBlue/20"}`}>
                  <div
                    className={`absolute top-0.5 flex size-4 items-center justify-center rounded-full shadow transition-transform ${isLightMode ? "left-0.5 bg-white" : "left-[18px] bg-prsSilver"}`}
                  >
                    {isLightMode ? <SunIcon className="size-3 text-prsRed" /> : <MoonIcon className="size-3 text-prsBlue" />}
                  </div>
                </div>
                <span className={`${!isLightMode ? "text-prsBlue" : "text-prsSlate"}`}>Dark</span>
              </button>
            </div>

            <p className="w-full text-right text-xs text-prsGray">
              © {new Date().getFullYear()} ChatWar. All rights reserved.
            </p>
          </div>
        </footer>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
