'use client'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Gamepad2, Download, ExternalLink, Maximize2, Minimize2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Leaderboard from '@/components/Leaderboard'
import GameIframe from '@/components/GameIframe'
import { games } from '@/data/games'

export default function PhysicsSandboxPage() {
  const [gameLoaded, setGameLoaded] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const game = games.find(g => g.id === 'physics-sandbox')

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  const handleFullscreen = () => {
    if (!isFullscreen && iframeRef.current) {
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }



  if (!game) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Game Not Found</h1>
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <div className="border-b border-gray-800 bg-background/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-blue-400">{game.title}</h1>
                <p className="text-sm text-gray-400">Built with {game.engine}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <a href={`/api/games/${game.id}/download`} target="_blank">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </a>
              </Button>
              {game.sourceCodeUrl && (
                <Button variant="outline" size="sm" asChild>
                  <a href={game.sourceCodeUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Source
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Game Area */}
          <div className="xl:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 overflow-hidden"
            >
              <div className="p-4 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Gamepad2 className="h-5 w-5 text-blue-400" />
                    <span className="font-medium">Physics Sandbox</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {!gameLoaded && (
                      <span className="text-sm text-gray-400">Loading...</span>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleFullscreen}
                      className="hover:bg-white/10"
                      title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                    >
                      {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="relative aspect-video bg-black">
                <GameIframe
                  ref={iframeRef}
                  src={game.gameUrl}
                  title={game.title}
                  onLoad={() => setGameLoaded(true)}
                />
                {!gameLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
                      <p className="text-gray-400">Loading {game.title}...</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Game Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 p-6"
            >
              <h2 className="text-xl font-bold mb-4">About the Game</h2>
              <p className="text-gray-300 mb-4">{game.longDescription || game.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-blue-400 mb-2">Controls</h3>
                  <p className="text-sm text-gray-300 mb-2">{game.controls?.instructions}</p>
                  <p className="text-xs text-yellow-400 bg-yellow-400/10 p-2 rounded border border-yellow-400/20">
                    💡 <strong>Tip:</strong> Click inside the game area to enable mouse capture for first-person camera controls!
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-400 mb-2">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {game.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-800 text-xs rounded border border-gray-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Leaderboard gameId={game.id} className="sticky top-24" leaderboardEnabled={game.leaderboardEnabled} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
