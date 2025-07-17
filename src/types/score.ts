export interface GameScore {
  id: string
  gameId: string
  playerName: string
  score: number
  createdAt: Date
}

export interface LeaderboardEntry {
  playerName: string
  score: number
  createdAt: Date
  rank?: number
}

export interface ScoreSubmission {
  playerName: string
  score: number
}

export interface LeaderboardResponse {
  scores: LeaderboardEntry[]
  totalCount: number
  gameId: string
}
