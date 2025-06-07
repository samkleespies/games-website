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
            I&apos;m a passionate game developer with expertise in Godot 4, creating immersive experiences 
            that push the boundaries of interactive entertainment. My focus is on innovative gameplay 
            mechanics, polished user experiences, and engaging storytelling.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl mb-4">🎮</div>
              <h3 className="text-lg font-semibold mb-2">Game Development</h3>
              <p className="text-muted-foreground text-sm">
                Specializing in Godot 4 with expertise in GDScript, shaders, and performance optimization
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-4">🎨</div>
              <h3 className="text-lg font-semibold mb-2">Creative Design</h3>
              <p className="text-muted-foreground text-sm">
                Crafting engaging gameplay mechanics and stunning visual experiences
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-lg font-semibold mb-2">Innovation</h3>
              <p className="text-muted-foreground text-sm">
                Always exploring new technologies and pushing creative boundaries
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section Placeholder */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-gradient">Get In Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Ready to collaborate on your next project? I&apos;d love to hear from you!
          </p>
          <div className="glass-effect rounded-2xl p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <a 
                href="mailto:your.email@example.com"
                className="flex items-center justify-center gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 hover:border-white/20 transition-all"
              >
                <span className="text-2xl">📧</span>
                <span>Email</span>
              </a>
              <a 
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 hover:border-white/20 transition-all"
              >
                <span className="text-2xl">💻</span>
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 GameDev Portfolio. Built with Next.js 15, TypeScript, and Tailwind CSS.</p>
        </div>
      </footer>
    </main>
  )
} 