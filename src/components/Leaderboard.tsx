'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Medal, Award, RefreshCw, User, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LeaderboardResponse, LeaderboardEntry } from '@/types/score'

interface LeaderboardProps {
  gameId: string
  className?: string
  leaderboardEnabled?: boolean
}

export default function Leaderboard({ gameId, className = '', leaderboardEnabled = true }: LeaderboardProps) {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchScores = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`/api/games/${gameId}/scores`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch scores')
      }
      
      const data: LeaderboardResponse = await response.json()
      setLeaderboardData(data)
    } catch (err) {
      console.error('Failed to fetch scores:', err)
      setError('Failed to load leaderboard')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (leaderboardEnabled) {
      fetchScores()
    }
  }, [gameId, leaderboardEnabled])

  // Show disabled message if leaderboards are not enabled for this game
  if (!leaderboardEnabled) {
    return (
      <div className={`bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700 ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-400 flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Leaderboard
          </h3>
        </div>
        <div className="text-center py-8">
          <Trophy className="h-12 w-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 mb-2">Leaderboard not available for this game</p>
          <p className="text-sm text-gray-500">This is a sandbox experience - focus on creativity and experimentation!</p>
        </div>
      </div>
    )
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-400" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-muted-foreground font-mono">#{rank}</span>
    }
  }

  const formatScore = (score: number) => {
    return score.toLocaleString()
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className={`bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700 ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-green-400 flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Leaderboard
          </h3>
        </div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-12 bg-gray-700/50 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700 ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-green-400 flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Leaderboard
          </h3>
          <Button
            onClick={fetchScores}
            variant="outline"
            size="sm"
            className="border-gray-600 hover:border-green-400"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-center py-8">
          <p className="text-red-400 mb-4">{error}</p>
          <Button onClick={fetchScores} variant="outline" size="sm">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-green-400 flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          Leaderboard
        </h3>
        <Button
          onClick={fetchScores}
          variant="outline"
          size="sm"
          className="border-gray-600 hover:border-green-400"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      {!leaderboardData?.scores.length ? (
        <div className="text-center py-8">
          <Trophy className="h-12 w-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No scores yet!</p>
          <p className="text-sm text-gray-500 mt-2">Be the first to set a high score!</p>
        </div>
      ) : (
        <div className="space-y-2">
          <AnimatePresence>
            {leaderboardData.scores.map((entry, index) => (
              <motion.div
                key={`${entry.playerName}-${entry.score}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-gray-600/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 flex justify-center">
                    {getRankIcon(entry.rank || index + 1)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="font-medium text-white">{entry.playerName}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar className="h-3 w-3" />
                      {formatDate(entry.createdAt)}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-mono font-bold text-lg">
                    {formatScore(entry.score)}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
