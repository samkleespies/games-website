'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter, Grid, List, Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import GameCard from '@/components/GameCard'
import { games } from '@/data/games'
import { Game } from '@/types/game'

const genres = ['All', 'Platformer', 'Racing', 'Puzzle', 'Strategy', 'RPG', 'Simulation']
const engines = ['All', 'Godot 4', 'Unity', 'Unreal', 'Custom', 'Web']

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.25, 0.25, 0.75],
    },
  },
}

export default function GamesSection() {
  const [selectedGenre, setSelectedGenre] = useState('All')
  const [selectedEngine, setSelectedEngine] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [showOnlyPlayable, setShowOnlyPlayable] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      // Genre filter
      if (selectedGenre !== 'All' && !game.genre.includes(selectedGenre)) {
        return false
      }
      
      // Engine filter
      if (selectedEngine !== 'All' && game.engine !== selectedEngine) {
        return false
      }
      
      // Playable filter
      if (showOnlyPlayable && !game.playable) {
        return false
      }
      
      // Search filter
      if (searchQuery && !game.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !game.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }
      
      return true
    })
  }, [selectedGenre, selectedEngine, searchQuery, showOnlyPlayable])

  // Check if any filters are active
  const hasActiveFilters = selectedGenre !== 'All' || selectedEngine !== 'All' || showOnlyPlayable

  return (
    <section id="games" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-gradient">My Games</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Explore my collection of interactive experiences. Each game is playable directly in your browser
            and represents a unique challenge I&apos;ve tackled in game development.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>{games.filter(g => g.playable).length} Playable</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>{games.filter(g => !g.playable).length} Coming Soon</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>{games.filter(g => g.featured).length} Featured</span>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="glass-effect rounded-2xl p-6 mb-8">
            {/* Search Bar with Filter Button */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-20 py-3 bg-background/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
              
              {/* Filter Button inside search bar */}
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                {hasActiveFilters && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                )}
                <Button
                  onClick={() => setShowFilters(!showFilters)}
                  variant={showFilters ? "gradient" : "ghost"}
                  size="sm"
                  className="h-8 px-3"
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Collapsible Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-white/10 pt-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Genre Filter */}
                      <div className="flex-1">
                        <label className="block text-sm font-medium mb-3 text-muted-foreground">
                          <Filter className="inline h-4 w-4 mr-2" />
                          Genre
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {genres.map((genre) => (
                            <Button
                              key={genre}
                              onClick={() => setSelectedGenre(genre)}
                              variant={selectedGenre === genre ? "gradient" : "outline"}
                              size="sm"
                              className="transition-all duration-300"
                            >
                              {genre}
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Engine Filter */}
                      <div className="flex-1">
                        <label className="block text-sm font-medium mb-3 text-muted-foreground">
                          Engine
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {engines.map((engine) => (
                            <Button
                              key={engine}
                              onClick={() => setSelectedEngine(engine)}
                              variant={selectedEngine === engine ? "gradient" : "outline"}
                              size="sm"
                              className="transition-all duration-300"
                            >
                              {engine}
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Options */}
                      <div className="flex flex-col gap-3">
                        <Button
                          onClick={() => setShowOnlyPlayable(!showOnlyPlayable)}
                          variant={showOnlyPlayable ? "gradient" : "outline"}
                          size="sm"
                          className="whitespace-nowrap"
                        >
                          {showOnlyPlayable ? '✓ Playable Only' : 'Show Playable Only'}
                        </Button>
                        
                        {/* Clear Filters Button */}
                        {hasActiveFilters && (
                          <Button
                            onClick={() => {
                              setSelectedGenre('All')
                              setSelectedEngine('All')
                              setShowOnlyPlayable(false)
                            }}
                            variant="outline"
                            size="sm"
                            className="whitespace-nowrap text-red-400 border-red-400/30 hover:bg-red-400/10"
                          >
                            <X className="h-3 w-3 mr-1" />
                            Clear
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Results count */}
          <div className="text-center text-muted-foreground">
            Showing {filteredGames.length} of {games.length} games
          </div>
        </motion.div>

        {/* Games Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredGames.map((game, index) => (
            <GameCard
              key={game.id}
              game={game}
              index={index}
            />
          ))}
        </motion.div>

        {/* No results */}
        {filteredGames.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🎮</div>
            <h3 className="text-2xl font-bold mb-2">No games found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters or search terms
            </p>
            <Button
              onClick={() => {
                setSelectedGenre('All')
                setSelectedEngine('All')
                setSearchQuery('')
                setShowOnlyPlayable(false)
              }}
              variant="gradient"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-20"
        >
          <div className="glass-effect rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Want to Collaborate?</h3>
            <p className="text-muted-foreground mb-6">
              I&apos;m always interested in new projects and collaborations. 
              Let&apos;s create something amazing together!
            </p>
            <Button variant="gradient" size="lg" asChild>
              <a href="#contact">Get In Touch</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 