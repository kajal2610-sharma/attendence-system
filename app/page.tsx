import Link from "next/link";

export default function Home() {
  const features = [
    {
      icon: "🎓",
      title: "Student Attendance",
      description:
        "Students can easily track daily, monthly and subject-wise attendance from their personal dashboard.",
      color: "blue",
    },
    {
      icon: "👨‍🏫",
      title: "Teacher Management",
      description:
        "Teachers can mark attendance, manage classes and keep student attendance records organized.",
      color: "emerald",
    },
    {
      icon: "📅",
      title: "Smart Timetable",
      description:
        "View daily and weekly class schedules with an easy-to-use timetable designed for everyone.",
      color: "violet",
    },
    {
      icon: "📊",
      title: "Detailed Reports",
      description:
        "Generate useful attendance reports and monitor student performance with clear insights.",
      color: "orange",
    },
    {
      icon: "⚙️",
      title: "Admin Control",
      description:
        "Administrators can manage students, teachers, subjects, classes and the complete system.",
      color: "cyan",
    },
    {
      icon: "🔐",
      title: "Secure Access",
      description:
        "Separate and secure login access for administrators, teachers and students.",
      color: "indigo",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">

      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="h-20 flex items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-blue-200 group-hover:scale-105 transition">
                  A
                </div>

                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
              </div>

              <div>
                <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
                  Attend<span className="text-blue-600">Ease</span>
                </h1>

                <p className="text-[9px] text-slate-400 uppercase tracking-[0.2em] font-semibold">
                  Smart Attendance
                </p>
              </div>
            </Link>

            {/* Menu */}
            <div className="hidden lg:flex items-center gap-1">
              <a
                href="#home"
                className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition"
              >
                Home
              </a>

              <a
                href="#features"
                className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition"
              >
                Features
              </a>

              <a
                href="#how-it-works"
                className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition"
              >
                How It Works
              </a>

              <a
                href="#about"
                className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition"
              >
                About
              </a>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">

              <div className="hidden xl:flex items-center gap-2 px-3 py-2 rounded-xl bg-green-50 border border-green-100">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-green-700">
                  System Online
                </span>
              </div>

              <Link
                href="/login"
                className="hidden sm:inline-flex px-5 py-2.5 rounded-xl text-sm font-bold text-slate-700 border border-slate-200 bg-white hover:bg-slate-50 transition"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 sm:px-6 py-3 rounded-xl text-sm font-bold shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-0.5 transition"
              >
                Register
              </Link>

              <button
                className="lg:hidden w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-700"
                aria-label="Open menu"
              >
                ☰
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section
        id="home"
        className="relative overflow-hidden bg-gradient-to-b from-white to-blue-50/40"
      >
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl" />
        <div className="absolute top-80 -left-40 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Left */}
          <div>

            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
              Smart Education Management Platform
            </div>

            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-slate-900">
              Attendance
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Made Simple.
              </span>
            </h2>

            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl mt-7">
              Manage student and teacher attendance, timetables,
              academic records and reports — all from one powerful,
              simple and secure platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-9">

              <Link
                href="/login"
                className="group inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-7 py-4 rounded-xl font-bold shadow-xl shadow-blue-200 transition"
              >
                Get Started
                <span className="ml-2 group-hover:translate-x-1 transition">
                  →
                </span>
              </Link>

              <a
                href="#features"
                className="inline-flex items-center justify-center bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 px-7 py-4 rounded-xl font-bold transition"
              >
                Explore Features
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-5 mt-12 pt-8 border-t border-slate-200 max-w-lg">

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  500+
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Students
                </p>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  30+
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Teachers
                </p>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  99%
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Easy Management
                </p>
              </div>

            </div>
          </div>

          {/* Dashboard */}
          <div className="relative">

            <div className="absolute -top-6 -left-3 z-10 bg-white rounded-2xl shadow-xl border border-slate-100 px-5 py-4 hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600 font-bold">
                  ✓
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Attendance
                  </p>

                  <p className="font-bold text-green-600">
                    92% Present
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-2xl shadow-slate-300/50 p-5 sm:p-7">

              <div className="flex justify-between items-start mb-7">

                <div>
                  <p className="text-xs uppercase tracking-wider text-blue-600 font-bold">
                    Overview
                  </p>

                  <h3 className="text-2xl font-bold mt-1 text-slate-900">
                    Dashboard
                  </h3>

                  <p className="text-sm text-slate-400 mt-1">
                    Today&apos;s academic overview
                  </p>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl">
                  📊
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">

                <div className="rounded-2xl bg-blue-50 p-5 border border-blue-100">
                  <p className="text-sm text-slate-500">
                    Students
                  </p>

                  <div className="flex items-end justify-between mt-2">
                    <h4 className="text-3xl font-bold">500</h4>
                    <span className="text-xs text-blue-600 font-bold">
                      +12%
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl bg-emerald-50 p-5 border border-emerald-100">
                  <p className="text-sm text-slate-500">
                    Teachers
                  </p>

                  <div className="flex items-end justify-between mt-2">
                    <h4 className="text-3xl font-bold">30</h4>
                    <span className="text-xs text-emerald-600 font-bold">
                      Active
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl bg-violet-50 p-5 border border-violet-100">
                  <p className="text-sm text-slate-500">
                    Attendance
                  </p>

                  <div className="flex items-end justify-between mt-2">
                    <h4 className="text-3xl font-bold">92%</h4>
                    <span className="text-xs text-violet-600 font-bold">
                      Today
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl bg-orange-50 p-5 border border-orange-100">
                  <p className="text-sm text-slate-500">
                    Classes
                  </p>

                  <div className="flex items-end justify-between mt-2">
                    <h4 className="text-3xl font-bold">24</h4>
                    <span className="text-xs text-orange-600 font-bold">
                      Today
                    </span>
                  </div>
                </div>

              </div>

              <div className="mt-7 bg-slate-50 rounded-2xl p-5">

                <div className="flex justify-between items-center mb-3">
                  <div>
                    <p className="font-bold">
                      Today&apos;s Attendance
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      Overall student attendance
                    </p>
                  </div>

                  <span className="text-blue-600 font-bold">
                    92%
                  </span>
                </div>

                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                    style={{ width: "92%" }}
                  />
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-slate-500">
                    Attendance updated
                  </span>
                </div>

                <span className="text-slate-400">
                  Just now
                </span>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section
        id="features"
        className="py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-6">

          <div className="max-w-2xl mx-auto text-center mb-16">

            <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-bold">
              <span className="w-2 h-2 bg-blue-600 rounded-full" />
              POWERFUL FEATURES
            </span>

            <h2 className="text-4xl md:text-5xl font-extrabold mt-5 text-slate-900">
              Everything You Need
            </h2>

            <p className="text-slate-500 text-lg mt-5 leading-relaxed">
              Powerful tools designed to make attendance management
              simple, fast and efficient.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">

            {features.map((feature) => (
              <div
                key={feature.title}
                className="group relative overflow-hidden p-8 rounded-3xl border border-slate-200 bg-white hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-100 transition-all duration-300"
              >

                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-[60px] group-hover:bg-blue-100 transition" />

                <div className="relative">

                  <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-slate-500 leading-relaxed">
                    {feature.description}
                  </p>

                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section
        id="how-it-works"
        className="py-24 bg-slate-50"
      >
        <div className="max-w-7xl mx-auto px-6">

          <div className="max-w-2xl mx-auto text-center mb-16">

            <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-bold">
              <span className="w-2 h-2 bg-blue-600 rounded-full" />
              HOW IT WORKS
            </span>

            <h2 className="text-4xl md:text-5xl font-extrabold mt-5 text-slate-900">
              Simple. Smart. Efficient.
            </h2>

            <p className="text-slate-500 text-lg mt-5 leading-relaxed">
              Manage your complete attendance system in just three
              simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:-translate-y-2 hover:shadow-xl transition">
              <div className="flex items-center justify-between mb-7">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-3xl">
                  🔐
                </div>

                <span className="text-5xl font-extrabold text-blue-100">
                  01
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900">
                Login
              </h3>

              <p className="text-slate-500 leading-relaxed mt-4">
                Students, teachers and administrators can securely
                login to their respective accounts.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:-translate-y-2 hover:shadow-xl transition">
              <div className="flex items-center justify-between mb-7">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-3xl">
                  📋
                </div>

                <span className="text-5xl font-extrabold text-indigo-100">
                  02
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900">
                Manage Attendance
              </h3>

              <p className="text-slate-500 leading-relaxed mt-4">
                Teachers can mark attendance while students can
                easily view their attendance records.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:-translate-y-2 hover:shadow-xl transition">
              <div className="flex items-center justify-between mb-7">
                <div className="w-16 h-16 rounded-2xl bg-violet-50 flex items-center justify-center text-3xl">
                  📊
                </div>

                <span className="text-5xl font-extrabold text-violet-100">
                  03
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900">
                Track & Report
              </h3>

              <p className="text-slate-500 leading-relaxed mt-4">
                Track attendance percentage and view detailed
                reports to understand academic performance.
              </p>
            </div>

          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 bg-white border border-slate-200 px-5 py-3 rounded-full shadow-sm">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-slate-600">
                Everything managed from one platform
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section
        id="about"
        className="py-24 bg-white"
      >
        <div className="max-w-6xl mx-auto px-6">

          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 p-10 md:p-16 text-white shadow-2xl shadow-blue-200">

            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-indigo-400/20 blur-2xl" />

            <div className="relative text-center">

              <span className="text-blue-100 font-bold text-sm tracking-wider">
                ABOUT ATTENDEASE
              </span>

              <h2 className="text-4xl md:text-5xl font-extrabold mt-4">
                One Platform.
                <br />
                Complete Control.
              </h2>

              <p className="max-w-2xl mx-auto text-blue-100 text-lg leading-relaxed mt-6">
                AttendEase simplifies attendance management for
                educational institutions. Teachers can mark attendance,
                students can track their progress, and administrators
                can manage the complete system from one place.
              </p>

              <div className="flex flex-wrap justify-center gap-3 mt-8">
                <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm">
                  Secure
                </span>

                <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm">
                  Easy to Use
                </span>

                <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm">
                  Smart Management
                </span>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">

          <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-100 flex items-center justify-center text-3xl mb-6">
            🚀
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
            Ready to simplify attendance?
          </h2>

          <p className="text-lg text-slate-500 mt-5 mb-8">
            Start using AttendEase and make attendance management
            faster, smarter and easier.
          </p>

          <Link
            href="/login"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-bold shadow-xl shadow-blue-200 transition"
          >
            Login to System
            <span>→</span>
          </Link>

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-slate-950 text-white">

        <div className="max-w-7xl mx-auto px-6 py-12">

          <div className="grid md:grid-cols-3 gap-10">

            <div>
              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center font-bold">
                  A
                </div>

                <h3 className="text-xl font-bold">
                  Attend<span className="text-blue-500">Ease</span>
                </h3>
              </div>

              <p className="text-slate-400 mt-4 max-w-sm leading-relaxed">
                Smart attendance and academic management
                for modern educational institutions.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">
                Quick Links
              </h4>

              <div className="flex flex-col gap-3 text-slate-400">

                <a href="#home" className="hover:text-white transition">
                  Home
                </a>

                <a href="#features" className="hover:text-white transition">
                  Features
                </a>

                <a href="#how-it-works" className="hover:text-white transition">
                  How It Works
                </a>

                <a href="#about" className="hover:text-white transition">
                  About
                </a>

              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">
                System
              </h4>

              <div className="flex flex-col gap-3 text-slate-400">

                <Link href="/login" className="hover:text-white transition">
                  Login
                </Link>

                <Link href="/register" className="hover:text-white transition">
                  Register
                </Link>

                <span>
                  Student Management
                </span>

                <span>
                  Teacher Management
                </span>

              </div>
            </div>

          </div>

          <div className="border-t border-slate-800 mt-10 pt-6 text-center text-sm text-slate-500">
            © 2026 AttendEase. All rights reserved.
          </div>

        </div>
      </footer>

    </main>
  );
}