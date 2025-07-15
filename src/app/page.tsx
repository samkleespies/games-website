import Header from '@/components/Header'
import Hero from '@/components/Hero'
import GamesSection from '@/components/GamesSection'

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <GamesSection />

      {/* About Section Placeholder */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-background/50 to-secondary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-gradient">About Me</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            A software engineer by trade, I like to make games in my free time. My favorite game is
            The Legend of Zelda: Ocarina of Time. Notable other favorites include: Bioshock, Hollow Knight, Fallout: New Vegas.
          </p>
        </div>
      </section>



      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>&copy; 2025 Sam Kleespies. Built with Next.js 15, TypeScript, and Tailwind CSS.</p>
        </div>
      </footer>
    </main>
  )
} 