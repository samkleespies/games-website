'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Maximize2, Minimize2, RotateCcw, Volume2, VolumeX, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Game } from '@/types/game'
import { cn } from '@/lib/utils'

interface GamePlayerProps {
  game: Game
  isOpen: boolean
  onClose: () => void
}

export default function GamePlayer({ game, isOpen, onClose }: GamePlayerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setIsLoading(true)
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleFullscreen = () => {
    if (!isFullscreen && containerRef.current) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
    setIsFullscreen(!isFullscreen)
  }

  const handleRestart = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src
      setIsLoading(true)
    }
  }

  const handleGameLoad = () => {
    setIsLoading(false)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          ref={containerRef}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className={cn(
            "absolute inset-4 md:inset-8 lg:inset-16",
            isFullscreen && "inset-0"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="h-full flex flex-col overflow-hidden bg-background border-2 border-white/20">
            {/* Header */}
            <div 
              className={cn(
                "flex items-center justify-between p-4 bg-gradient-to-r from-background to-secondary/20 border-b border-white/10 transition-all duration-300",
                !showControls && isFullscreen && "opacity-0 pointer-events-none"
              )}
              onMouseEnter={() => setShowControls(true)}
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">🎮</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{game.title}</h3>
                    <p className="text-xs text-muted-foreground">{game.engine}</p>
                  </div>
                </div>
                
                {isLoading && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    Loading game...
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRestart}
                  className="hover:bg-white/10"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:bg-white/10"
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleFullscreen}
                  className="hover:bg-white/10"
                >
                  {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="hover:bg-red-500/20 hover:text-red-400"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Game Container */}
            <div 
              className="flex-1 relative bg-black"
              onMouseMove={() => setShowControls(true)}
              onMouseLeave={() => isFullscreen && setShowControls(false)}
            >
              {/* Loading Overlay */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm z-10">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <h3 className="text-xl font-bold mb-2">Loading {game.title}</h3>
                    <p className="text-muted-foreground">Preparing your gaming experience...</p>
                  </div>
                </div>
              )}

              {/* Game iframe */}
              <iframe
                ref={iframeRef}
                src={game.gameUrl}
                className="w-full h-full border-0"
                allow="fullscreen; gamepad; microphone; camera"
                onLoad={handleGameLoad}
                title={game.title}
              />
            </div>

            {/* Controls Footer */}
            {game.controls && (
              <div 
                className={cn(
                  "p-4 bg-gradient-to-r from-background to-secondary/20 border-t border-white/10 transition-all duration-300",
                  !showControls && isFullscreen && "opacity-0 pointer-events-none"
                )}
                onMouseEnter={() => setShowControls(true)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-1">Controls:</h4>
                    <p className="text-xs text-muted-foreground">{game.controls.instructions}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs">
                    {game.controls.keyboard && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-white/10 rounded">
                        <span>⌨️</span>
                        <span>Keyboard</span>
                      </div>
                    )}
                    {game.controls.mouse && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-white/10 rounded">
                        <span>🖱️</span>
                        <span>Mouse</span>
                      </div>
                    )}
                    {game.controls.gamepad && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-white/10 rounded">
                        <span>🎮</span>
                        <span>Gamepad</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
} 