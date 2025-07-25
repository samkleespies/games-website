export interface Game {
  id: string
  title: string
  description: string
  longDescription?: string
  thumbnail: string
  screenshots: string[]
  gameUrl: string
  sourceCodeUrl?: string
  technologies: string[]
  engine: 'Godot 4' | 'Unity' | 'Unreal' | 'Custom' | 'Web' | 'Other'
  genre: string[]
  releaseDate: Date
  featured: boolean
  playable: boolean
  controls?: GameControls
  requirements?: GameRequirements
  awards?: string[]
  stats?: GameStats
  leaderboardEnabled?: boolean
}

export interface GameControls {
  mouse?: boolean
  keyboard?: boolean
  gamepad?: boolean
  touch?: boolean
  instructions: string
  requiresMouseCapture?: boolean
}

export interface GameRequirements {
  browser?: string[]
  minResolution?: string
  recommendedResolution?: string
  webgl?: boolean
}

export interface GameStats {
  plays: number
  rating: number
  reviews: number
}

export interface GameCategory {
  id: string
  name: string
  description: string
  games: Game[]
} 