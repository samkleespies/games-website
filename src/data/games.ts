import { Game } from '@/types/game'

// Real games data - featuring the actual Space Asteroids game
export const games: Game[] = [
  {
    id: 'space-asteroids',
    title: 'Space Asteroids',
    description: 'A classic asteroids-style space shooter game built with Godot 4. Navigate your ship through space, destroy asteroids, and survive as long as possible!',
    longDescription: 'Experience the thrill of classic arcade gaming with this modern take on the asteroids formula. Built with Godot 4, this game features smooth physics, particle effects, progressive difficulty, and all the nostalgic gameplay you love. Control your ship with mouse aiming, destroy asteroids for points, and watch out for smaller fragments that break off! The game includes a comprehensive pause menu with display options and full screen wrapping mechanics.',
    thumbnail: '/games/space-asteroids/thumbnail.png',
    screenshots: [
      '/games/space-asteroids/screenshot1.jpg',
      '/games/space-asteroids/screenshot2.jpg',
      '/games/space-asteroids/screenshot3.jpg'
    ],
    gameUrl: '/games/space-asteroids/index.html',
    genre: ['Arcade', 'Action', 'Shooter'],
    engine: 'Godot 4',
    releaseDate: new Date('2024-01-01'),
    playable: true,
    featured: true,
    technologies: ['Godot 4.4', 'GDScript', 'GPU Particles', 'WebGL'],
    requirements: {
      webgl: true,
      minResolution: '1024x768',
      browser: ['Chrome', 'Firefox', 'Safari', 'Edge']
    },
    controls: {
      instructions: 'WASD to move, Mouse to aim, Space/Enter/Left Click to shoot, ESC for pause menu',
      keyboard: true,
      mouse: true,
      gamepad: false
    },
    stats: {
      plays: 1250,
      rating: 4.7,
      reviews: 89
    },
    sourceCodeUrl: 'https://github.com/yourusername/space-asteroids'
  },
]