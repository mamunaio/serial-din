import BookingForm from "@/components/BookingForm";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-zinc-950 text-zinc-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-black">
      {/* Dynamic Background Mesh Gradients */}
      <div className="no-print fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[55vw] h-[55vw] rounded-full bg-cyan-600/10 blur-[130px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-600/15 blur-[140px]" />
        <div className="absolute top-[35%] left-[30%] w-[35vw] h-[35vw] rounded-full bg-teal-500/10 blur-[110px]" />
      </div>

      {/* Navigation Header */}
      <header className="no-print sticky top-0 z-50 backdrop-blur-xl bg-zinc-950/60 border-b border-white/5 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-black text-white text-lg shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              +
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                Serial Din
              </span>
              <span className="block text-[10px] text-cyan-400 font-semibold tracking-wider uppercase">
                Smart Doctor Queue
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-xs text-zinc-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>System Live: Database Connected</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Hero & Booking Section */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-16 flex flex-col items-center">
        {/* Intro Tag (Hidden on Print) */}
        <div className="no-print text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-xs font-medium mb-4 backdrop-blur-md">
            <span>✨ Real-Time Doctor Serial Management</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Book Your Consultation & Get{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
              Instant Serial
            </span>
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base leading-relaxed">
            Skip long hospital waiting queues. Choose your doctor, book with your phone number, and track your serial token live.
          </p>
        </div>

        {/* Doctor Booking Form & Slip */}
        <BookingForm />

        {/* Feature Highlights (Hidden on Print) */}
        <div className="no-print w-full max-w-4xl mt-16 grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="backdrop-blur-lg bg-white/[0.03] border border-white/10 p-5 rounded-2xl">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold text-sm mb-3">
              ⚡
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Instant Token Generation</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Automated serial sequence calculation ensures zero overlapping appointments.
            </p>
          </div>

          <div className="backdrop-blur-lg bg-white/[0.03] border border-white/10 p-5 rounded-2xl">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-sm mb-3">
              🏥
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Verified Specialists</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Top chamber consultants with verified fees, addresses, and schedule slots.
            </p>
          </div>

          <div className="backdrop-blur-lg bg-white/[0.03] border border-white/10 p-5 rounded-2xl">
            <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold text-sm mb-3">
              🔒
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Seamless Patient Profile</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Auto-syncs patient records with PostgreSQL without complex sign-up hurdles.
            </p>
          </div>
        </div>
      </main>

      {/* Footer (Hidden on Print) */}
      <footer className="no-print border-t border-white/5 py-6 px-6 text-center text-xs text-zinc-500 backdrop-blur-md bg-zinc-950/40">
        <p>© {new Date().getFullYear()} Serial Din Clinic Queue System. Built with Next.js, Prisma & PostgreSQL.</p>
      </footer>
    </div>
  );
}
