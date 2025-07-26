'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Play, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 30
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced 3D Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-background/95">
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] animate-pulse" />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-cyan rounded-full opacity-60"
            style={{
              left: `${(i * 17 + 13) % 100}%`,
              top: `${(i * 23 + 7) % 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* 3D Floating Cubes */}
        <div className="absolute inset-0 perspective-1000">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-8 h-8 border border-neon-cyan/30 bg-neon-cyan/5"
              style={{
                left: `${20 + i * 15}%`,
                top: `${20 + (i % 2) * 40}%`,
                transformStyle: 'preserve-3d',
              }}
              animate={{
                rotateX: [0, 360],
                rotateY: [0, 360],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>



        {/* Holographic Panels */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-20 border border-neon-cyan/20 bg-neon-cyan/5 backdrop-blur-sm"
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-32 right-16 w-24 h-16 border border-neon-pink/20 bg-neon-pink/5 backdrop-blur-sm"
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: 1,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Developer Badge */}
          <motion.div variants={fadeInUp} className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-neon-cyan/10 border border-neon-cyan/20 rounded-full mb-6">
              <User className="h-4 w-4 text-neon-cyan" />
              <span className="text-sm font-body text-neon-cyan select-none">Sam Kleespies</span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.div variants={fadeInUp} className="mb-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-6 select-none">
              <span className="block text-foreground">Gamedev</span>
              <span className="block text-neon-cyan">Portfolio</span>
            </h1>

            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-body select-none">
              A collection of some of my games
              <br />
              <span className="text-foreground">Play directly in browser</span>
            </p>
          </motion.div>

          {/* Clean CTA Buttons */}
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              asChild
              className="bg-neon-cyan text-black hover:bg-neon-cyan/90 px-8 py-3 text-lg font-body font-medium"
            >
              <a href="#games" className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                <span>Play Games</span>
              </a>
            </Button>

            <Button
              variant="outline"
              asChild
              className="border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/10 px-8 py-3 text-lg font-body"
            >
              <a href="#about" className="flex items-center gap-2">
                <span>Learn More</span>
                <ArrowDown className="h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Simple Scroll Indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-muted-foreground"
          >
            <span className="text-sm mb-2 font-body select-none">Scroll to explore</span>
            <ArrowDown className="h-4 w-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 