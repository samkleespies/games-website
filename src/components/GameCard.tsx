'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Github, ExternalLink, Calendar, Tag, Monitor } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import GamePlayer from '@/components/GamePlayer'
import { Game } from '@/types/game'
import { cn } from '@/lib/utils'

interface GameCardProps {
  game: Game
  index: number
}

export default function GameCard({ game, index }: GameCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isGamePlayerOpen, setIsGamePlayerOpen] = useState(false)

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  }

  const handlePlayGame = () => {
    if (game.playable) {
      setIsGamePlayerOpen(true)
    }
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group"
    >
      <Card className="overflow-hidden h-full bg-gradient-to-br from-background/50 to-background/30 hover:from-background/60 hover:to-background/40 transition-all duration-500">
        {/* Game Thumbnail */}
        <div className="relative overflow-hidden aspect-video">
          <motion.img
            src={game.thumbnail}
            alt={game.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            onLoad={() => setImageLoaded(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: imageLoaded ? 1 : 0 }}
          />
          
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Play Button */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.8
            }}
            transition={{ duration: 0.3 }}
          >
            <Button
              onClick={handlePlayGame}
              variant="gradient"
              size="lg"
              className="shadow-2xl backdrop-blur-sm"
              disabled={!game.playable}
            >
              <Play className="h-5 w-5 mr-2" />
              {game.playable ? 'Play Now' : 'Coming Soon'}
            </Button>
          </motion.div>

          {/* Featured Badge */}
          {game.featured && (
            <div className="absolute top-3 left-3">
              <div className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold rounded-full">
                ⭐ Featured
              </div>
            </div>
          )}

          {/* Engine Badge */}
          <div className="absolute top-3 right-3">
            <div className="px-3 py-1 bg-background/80 backdrop-blur-sm text-foreground text-xs font-medium rounded-full border border-white/10">
              {game.engine}
            </div>
          </div>
        </div>

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-bold text-xl mb-2 text-gradient-primary line-clamp-1">
                {game.title}
              </h3>
              <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                {game.description}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {game.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-secondary/50 text-secondary-foreground text-xs rounded-md border border-white/5"
              >
                {tech}
              </span>
            ))}
            {game.technologies.length > 3 && (
              <span className="px-2 py-1 bg-secondary/30 text-muted-foreground text-xs rounded-md">
                +{game.technologies.length - 3} more
              </span>
            )}
          </div>

          {/* Genres */}
          <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground">
            <Tag className="h-3 w-3" />
            {game.genre.slice(0, 2).join(', ')}
            {game.genre.length > 2 && ', ...'}
          </div>

          {/* Stats */}
          {game.stats && (
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
              <div className="flex items-center gap-4">
                <span>▶️ {game.stats.plays.toLocaleString()} plays</span>
                <span>⭐ {game.stats.rating.toFixed(1)}/5</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              onClick={handlePlayGame}
              variant="gradient"
              size="sm"
              className="flex-1"
              disabled={!game.playable}
            >
              <Play className="h-4 w-4 mr-2" />
              {game.playable ? 'Play' : 'Soon'}
            </Button>
            
            {game.sourceCodeUrl && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={game.sourceCodeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            )}
            
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Game Player Modal */}
      <GamePlayer
        game={game}
        isOpen={isGamePlayerOpen}
        onClose={() => setIsGamePlayerOpen(false)}
      />
    </motion.div>
  )
} 