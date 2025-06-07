import { Game } from '@/types/game'

// Sample game data - replace with your actual games
export const games: Game[] = [
  {
    id: 'quantum-runner',
    title: 'Quantum Runner',
    description: 'A fast-paced platformer where you manipulate quantum states to navigate through challenging levels.',
    longDescription: 'Experience a unique platforming adventure where quantum mechanics meet fast-paced gameplay. Manipulate particle states, phase through walls, and solve mind-bending puzzles in this innovative take on the platformer genre.',
    thumbnail: 'https://via.placeholder.com/400x225/1e293b/64748b?text=Quantum+Runner',
    screenshots: [
      'https://via.placeholder.com/800x450/1e293b/64748b?text=Quantum+Runner+Screenshot+1',
      'https://via.placeholder.com/800x450/1e293b/64748b?text=Quantum+Runner+Screenshot+2',
    ],
    gameUrl: '/games/quantum-runner',
    sourceCodeUrl: 'https://github.com/yourusername/quantum-runner',
    technologies: ['Godot 4', 'GDScript', 'Shader Language', 'Physics Engine'],
    engine: 'Godot 4',
    genre: ['Platformer', 'Puzzle', 'Sci-Fi'],
    releaseDate: new Date('2024-01-15'),
    featured: true,
    playable: true,
    controls: {
      keyboard: true,
      gamepad: true,
      instructions: 'WASD to move, Space to jump, Q/E to phase shift'
    },
    requirements: {
      browser: ['Chrome 90+', 'Firefox 88+', 'Safari 14+'],
      minResolution: '1280x720',
      recommendedResolution: '1920x1080',
      webgl: true
    },
    stats: {
      plays: 15420,
      rating: 4.8,
      reviews: 324
    },
    awards: ['Best Indie Game 2024', 'Innovation Award']
  },
  {
    id: 'neon-city-drift',
    title: 'Neon City Drift',
    description: 'High-octane racing through cyberpunk streets with dynamic weather and day/night cycles.',
    longDescription: 'Race through the neon-lit streets of a cyberpunk metropolis. Experience dynamic weather systems, realistic physics, and intense night races with stunning visual effects.',
    thumbnail: 'https://via.placeholder.com/400x225/7c3aed/a855f7?text=Neon+City+Drift',
    screenshots: [
      'https://via.placeholder.com/800x450/7c3aed/a855f7?text=Neon+City+Drift+Screenshot+1',
      'https://via.placeholder.com/800x450/7c3aed/a855f7?text=Neon+City+Drift+Screenshot+2',
    ],
    gameUrl: '/games/neon-city-drift',
    sourceCodeUrl: 'https://github.com/yourusername/neon-city-drift',
    technologies: ['Godot 4', 'GDScript', 'Vulkan', 'Post-Processing'],
    engine: 'Godot 4',
    genre: ['Racing', 'Arcade', 'Cyberpunk'],
    releaseDate: new Date('2023-11-20'),
    featured: true,
    playable: true,
    controls: {
      keyboard: true,
      gamepad: true,
      instructions: 'Arrow keys or WASD to drive, Space for handbrake'
    },
    requirements: {
      browser: ['Chrome 90+', 'Firefox 88+'],
      minResolution: '1280x720',
      recommendedResolution: '1920x1080',
      webgl: true
    },
    stats: {
      plays: 28350,
      rating: 4.6,
      reviews: 512
    }
  },
  {
    id: 'mystical-gardens',
    title: 'Mystical Gardens',
    description: 'A peaceful puzzle game about growing magical plants and solving nature-based mysteries.',
    longDescription: 'Cultivate enchanted gardens, solve botanical puzzles, and uncover the secrets of ancient plant magic in this relaxing puzzle adventure.',
    thumbnail: 'https://via.placeholder.com/400x225/059669/10b981?text=Mystical+Gardens',
    screenshots: [
      'https://via.placeholder.com/800x450/059669/10b981?text=Mystical+Gardens+Screenshot+1',
      'https://via.placeholder.com/800x450/059669/10b981?text=Mystical+Gardens+Screenshot+2',
    ],
    gameUrl: '/games/mystical-gardens',
    technologies: ['Godot 4', 'GDScript', 'Procedural Generation', 'Particle Systems'],
    engine: 'Godot 4',
    genre: ['Puzzle', 'Simulation', 'Casual'],
    releaseDate: new Date('2023-08-10'),
    featured: false,
    playable: true,
    controls: {
      mouse: true,
      touch: true,
      instructions: 'Click to plant and water, drag to connect elements'
    },
    requirements: {
      browser: ['Chrome 80+', 'Firefox 75+', 'Safari 13+'],
      minResolution: '1024x768',
      recommendedResolution: '1920x1080',
      webgl: true
    },
    stats: {
      plays: 42180,
      rating: 4.9,
      reviews: 892
    }
  },
  {
    id: 'space-station-defender',
    title: 'Space Station Defender',
    description: 'Defend your space station from waves of alien invaders in this intense tower defense game.',
    longDescription: 'Command a space station under siege! Deploy defensive systems, manage resources, and fight off endless waves of alien attackers in this strategic tower defense experience.',
    thumbnail: 'https://via.placeholder.com/400x225/dc2626/ef4444?text=Space+Station+Defender',
    screenshots: [
      'https://via.placeholder.com/800x450/dc2626/ef4444?text=Space+Station+Defender+Screenshot+1',
      'https://via.placeholder.com/800x450/dc2626/ef4444?text=Space+Station+Defender+Screenshot+2',
    ],
    gameUrl: '/games/space-station-defender',
    sourceCodeUrl: 'https://github.com/yourusername/space-station-defender',
    technologies: ['Godot 4', 'GDScript', 'AI Systems', 'Real-time Strategy'],
    engine: 'Godot 4',
    genre: ['Tower Defense', 'Strategy', 'Sci-Fi'],
    releaseDate: new Date('2023-12-05'),
    featured: false,
    playable: true,
    controls: {
      mouse: true,
      keyboard: true,
      instructions: 'Click to place towers, hotkeys for quick actions'
    },
    requirements: {
      browser: ['Chrome 85+', 'Firefox 80+'],
      minResolution: '1280x720',
      recommendedResolution: '1920x1080',
      webgl: true
    },
    stats: {
      plays: 19750,
      rating: 4.4,
      reviews: 267
    }
  },
  {
    id: 'adventure-quest',
    title: 'Adventure Quest',
    description: 'Classic RPG adventure with modern mechanics and stunning pixel art graphics.',
    longDescription: 'Embark on an epic journey through a beautifully crafted pixel world. Level up your character, discover ancient treasures, and battle mythical creatures in this homage to classic RPGs.',
    thumbnail: 'https://via.placeholder.com/400x225/f59e0b/fbbf24?text=Adventure+Quest',
    screenshots: [
      'https://via.placeholder.com/800x450/f59e0b/fbbf24?text=Adventure+Quest+Screenshot+1',
      'https://via.placeholder.com/800x450/f59e0b/fbbf24?text=Adventure+Quest+Screenshot+2',
    ],
    gameUrl: '/games/adventure-quest',
    technologies: ['Godot 4', 'GDScript', 'Pixel Art Pipeline', 'Save System'],
    engine: 'Godot 4',
    genre: ['RPG', 'Adventure', 'Retro'],
    releaseDate: new Date('2024-02-28'),
    featured: false,
    playable: false, // Coming soon
    controls: {
      keyboard: true,
      gamepad: true,
      instructions: 'WASD to move, Enter to interact, Tab for inventory'
    },
    requirements: {
      browser: ['Chrome 90+', 'Firefox 88+', 'Safari 14+'],
      minResolution: '1280x720',
      recommendedResolution: '1920x1080',
      webgl: true
    },
    stats: {
      plays: 0,
      rating: 0,
      reviews: 0
    }
  },
  {
    id: 'puzzle-labyrinth',
    title: 'Puzzle Labyrinth',
    description: 'Navigate through mind-bending mazes with rotating mechanics and optical illusions.',
    longDescription: 'Challenge your spatial reasoning in this innovative puzzle game. Rotate perspectives, manipulate gravity, and solve increasingly complex labyrinths.',
    thumbnail: 'https://via.placeholder.com/400x225/8b5cf6/a78bfa?text=Puzzle+Labyrinth',
    screenshots: [
      'https://via.placeholder.com/800x450/8b5cf6/a78bfa?text=Puzzle+Labyrinth+Screenshot+1',
      'https://via.placeholder.com/800x450/8b5cf6/a78bfa?text=Puzzle+Labyrinth+Screenshot+2',
    ],
    gameUrl: '/games/puzzle-labyrinth',
    technologies: ['Godot 4', 'GDScript', '3D Graphics', 'Procedural Generation'],
    engine: 'Godot 4',
    genre: ['Puzzle', '3D', 'Mind-bending'],
    releaseDate: new Date('2023-09-15'),
    featured: false,
    playable: true,
    controls: {
      keyboard: true,
      mouse: true,
      instructions: 'WASD to move, Mouse to look around, R to rotate view'
    },
    requirements: {
      browser: ['Chrome 90+', 'Firefox 88+'],
      minResolution: '1280x720',
      recommendedResolution: '1920x1080',
      webgl: true
    },
    stats: {
      plays: 8920,
      rating: 4.7,
      reviews: 156
    }
  }
]

// Featured games (for hero section or special showcase)
export const featuredGames = games.filter(game => game.featured)

// Playable games
export const playableGames = games.filter(game => game.playable)

// Games by engine
export const gamesByEngine = games.reduce((acc, game) => {
  if (!acc[game.engine]) {
    acc[game.engine] = []
  }
  acc[game.engine].push(game)
  return acc
}, {} as Record<string, Game[]>) 