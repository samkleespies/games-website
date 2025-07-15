'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Cpu, Github, Mail, Zap, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'HOME', href: '#home' },
  { name: 'GAMES', href: '#games' },
  { name: 'ABOUT', href: '#about' },
  { name: 'CONTACT', href: '#contact' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-neon-cyan/30 shadow-[0_0_20px_rgba(0,255,255,0.3)]'
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Clean Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="p-2 bg-neon-cyan/10 border border-neon-cyan/30 rounded">
              <Cpu className="h-6 w-6 text-neon-cyan" />
            </div>
            <div className="font-display font-bold">
              <span className="text-foreground text-lg">Sam</span>
              <span className="text-neon-cyan text-lg ml-1">Kleespies</span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navigation.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="text-foreground/80 hover:text-neon-cyan transition-all duration-300 font-display font-medium relative group tracking-wider text-sm"
                >
                  <span className="relative z-10">{item.name}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-cyan transition-all duration-300 group-hover:w-full shadow-[0_0_10px_currentColor]" />
                  <span className="absolute inset-0 bg-neon-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Cyberpunk CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.a
              href="https://github.com/samkleespies"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-neon-cyan/50 bg-transparent text-neon-cyan px-3 py-2 font-display text-xs tracking-wider hover:bg-neon-cyan/10 hover:border-neon-cyan transition-all duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="h-3 w-3" />
              <span>GITHUB</span>
            </motion.a>
            
            {/* Contact Dropdown */}
            <div className="relative">
              <motion.button
                onClick={() => setIsContactDropdownOpen(!isContactDropdownOpen)}
                className="bg-neon-pink/20 border border-neon-pink text-neon-pink px-3 py-2 font-display text-xs tracking-wider hover:bg-neon-pink/30 transition-all duration-300 flex items-center gap-2 relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-neon-pink/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                <Zap className="h-3 w-3 relative z-10" />
                <span className="relative z-10">CONTACT</span>
                <ChevronDown className={`h-3 w-3 relative z-10 transition-transform duration-200 ${isContactDropdownOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              {/* Contact Dropdown Menu */}
              <AnimatePresence>
                {isContactDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-64 bg-black/95 backdrop-blur-md border border-neon-cyan/30 rounded shadow-lg shadow-neon-cyan/20"
                  >
                    <div className="p-4 space-y-3">
                      <div className="text-neon-cyan font-display text-sm tracking-wider mb-3 border-b border-neon-cyan/20 pb-2">
                        CONTACT INFO
                      </div>
                      
                      <a
                        href="mailto:sam.kleespies@gmail.com"
                        className="flex items-center gap-3 text-foreground hover:text-neon-cyan transition-colors duration-300 p-2 rounded hover:bg-neon-cyan/10"
                      >
                        <Mail className="h-4 w-4" />
                        <div>
                          <div className="font-display text-xs tracking-wider">EMAIL</div>
                          <div className="text-sm">sam.kleespies@gmail.com</div>
                        </div>
                      </a>
                      
                      <a
                        href="https://github.com/samkleespies"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-foreground hover:text-neon-cyan transition-colors duration-300 p-2 rounded hover:bg-neon-cyan/10"
                      >
                        <Github className="h-4 w-4" />
                        <div>
                          <div className="font-display text-xs tracking-wider">GITHUB</div>
                          <div className="text-sm">github.com/samkleespies</div>
                        </div>
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative z-50 p-2 border border-neon-cyan/50 bg-black/50 text-neon-cyan"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-black/95 backdrop-blur-md border-t border-neon-cyan/30"
          >
            <div className="px-4 py-6 space-y-4">
              {navigation.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-foreground/80 hover:text-neon-cyan transition-colors duration-300 font-display font-medium py-2 tracking-wider border-l-2 border-transparent hover:border-neon-cyan pl-4"
                >
                  {item.name}
                </motion.a>
              ))}
              <div className="pt-4 space-y-3 border-t border-neon-cyan/20">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-neon-cyan font-display text-sm tracking-wider py-2 px-4 border border-neon-cyan/30 hover:bg-neon-cyan/10 transition-all"
                >
                  <Github className="h-4 w-4" />
                  <span>GITHUB</span>
                </a>
                <a
                  href="#contact"
                  className="flex items-center gap-3 text-neon-pink font-display text-sm tracking-wider py-2 px-4 border border-neon-pink/30 hover:bg-neon-pink/10 transition-all"
                >
                  <Zap className="h-4 w-4" />
                  <span>CONTACT</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
} 