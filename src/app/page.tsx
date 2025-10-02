export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center px-6 bg-gradient-to-b from-white to-green-50 dark:from-gray-950 dark:to-emerald-950/20 relative overflow-hidden">

        {/* Abstract Background Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Backend/Database Layer - Hexagons (representing structure/APIs) */}
          <div className="absolute top-20 left-10 w-32 h-32 opacity-10 dark:opacity-5">
            <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg transform rotate-45"></div>
          </div>

          <div className="absolute bottom-20 right-20 w-24 h-24 opacity-10 dark:opacity-5">
            <div className="w-full h-full bg-gradient-to-tr from-green-500 to-emerald-600 rounded-lg transform rotate-12"></div>
          </div>

          {/* Frontend Layer - Circles (representing UI/components) */}
          <div className="absolute top-40 right-32 w-20 h-20 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full opacity-10 dark:opacity-5"></div>

          <div className="absolute bottom-32 left-20 w-16 h-16 bg-gradient-to-l from-green-400 to-emerald-500 rounded-full opacity-10 dark:opacity-5"></div>

          {/* Code Brackets - Abstract representation */}
          <div className="absolute top-1/4 left-1/4 text-green-300 dark:text-green-800 opacity-20 text-6xl font-mono">
            &lt;/&gt;
          </div>

          {/* Server/Cloud - Rounded rectangles */}
          <div className="absolute top-1/3 right-1/4 w-40 h-20 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-2xl transform -rotate-12"></div>

          {/* Database Schema - Grid dots */}
          <div className="absolute bottom-1/4 left-1/3 grid grid-cols-3 gap-2 opacity-10 dark:opacity-5">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>

          {/* API Routes - Connected lines */}
          <svg className="absolute top-1/2 right-10 w-32 h-32 opacity-10 dark:opacity-5" viewBox="0 0 100 100">
            <path d="M20,20 L50,50 L20,80" stroke="currentColor" strokeWidth="2" fill="none" className="text-green-500" />
            <circle cx="20" cy="20" r="3" fill="currentColor" className="text-emerald-500" />
            <circle cx="50" cy="50" r="3" fill="currentColor" className="text-green-500" />
            <circle cx="20" cy="80" r="3" fill="currentColor" className="text-emerald-500" />
          </svg>

          {/* Terminal Window - Abstract */}
          <div className="absolute bottom-10 right-1/3 opacity-10 dark:opacity-5">
            <div className="w-32 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg">
              <div className="flex gap-1 p-2">
                <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                <div className="w-2 h-2 bg-white/30 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Floating Particles */}
          <div className="absolute top-2/3 left-10 w-3 h-3 bg-emerald-500 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-green-500 rounded-full opacity-20 animate-pulse animation-delay-200"></div>
          <div className="absolute bottom-1/3 left-2/3 w-3 h-3 bg-emerald-500 rounded-full opacity-20 animate-pulse animation-delay-400"></div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <div className="relative">
            <p className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4 animate-fade-in">
              Welcome to my portfolio
            </p>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
              <span className="bg-gradient-to-r from-green-800 to-emerald-600 dark:from-emerald-400 dark:to-green-300 bg-clip-text text-transparent">
                Adam Wheatley
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 animate-slide-up animation-delay-200">
              Full-Stack Developer
            </p>

            <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-12 animate-fade-in animation-delay-400">
              Specializing in Ruby on Rails and Next.js development.
              Building scalable web applications with modern frameworks and best practices.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animation-delay-600">
              <a
                href="/projects"
                className="group px-8 py-4 bg-gradient-to-r from-green-700 to-emerald-700 hover:from-green-800 hover:to-emerald-800 text-white rounded-full hover:scale-105 transition-all duration-300 font-medium shadow-lg"
              >
                View My Work
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </a>
              <a
                href="/contact"
                className="px-8 py-4 border border-green-600 dark:border-emerald-600 text-green-700 dark:text-emerald-400 rounded-full hover:bg-green-50 dark:hover:bg-emerald-900/20 transition-all duration-300 font-medium"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}