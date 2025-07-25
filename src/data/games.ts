import { Game } from '@/types/game'

// Real games data - featuring the actual Space Asteroids game
export const games: Game[] = [
  {
    id: 'space-asteroids',
    title: 'Space Asteroids',
    description: 'Classic asteroids',
    longDescription: 'Go for the high score! You may get something special...',
    thumbnail: '/games/space-asteroids/thumbnail.png',
    screenshots: [
      '/games/space-asteroids/screenshot1.jpg',
      '/games/space-asteroids/screenshot2.jpg',
      '/games/space-asteroids/screenshot3.jpg'
    ],
    gameUrl: '/games/space-asteroids/index.html',
    genre: ['Arcade', 'Action', 'Shooter'],
    engine: 'Godot 4',
    releaseDate: new Date('2025-06-07'),
    playable: true,
    featured: true,
    technologies: ['Godot 4.4', 'GDScript', 'GPU Particles', 'WebGL'],
    requirements: {
      webgl: true,
      minResolution: '1024x768',
      browser: ['Chrome', 'Firefox', 'Safari', 'Edge']
    },
    controls: {
      instructions: 'WASD to move, Mouse to aim, Space/Enter/Left Click to shoot, ESC to pause',
      keyboard: true,
      mouse: true,
      gamepad: false,
      requiresMouseCapture: false
    },
    stats: {
      plays: 0,
      rating: 0,
      reviews: 0
    },
    sourceCodeUrl: 'https://github.com/samkleespies/space-asteroids'
  },
  {
    id: 'physics-sandbox',
    title: 'Physics Sandbox',
    description: 'A first-person interactive physics sandbox game',
    longDescription: 'Utilizes Godot 4 JoltPhysics3D',
    thumbnail: '/games/physics-sandbox/thumbnail.png',
    screenshots: [
      '/games/physics-sandbox/screenshot1.jpg',
      '/games/physics-sandbox/screenshot2.jpg',
      '/games/physics-sandbox/screenshot3.jpg'
    ],
    gameUrl: '/games/physics-sandbox/index.html',
    genre: ['Sandbox', 'FPS'],
    engine: 'Godot 4',
    releaseDate: new Date('2025-07-24'),
    playable: true,
    featured: true,
    technologies: ['Godot 4.4', 'GDScript', 'JoltPhysics3D', 'WebGL'],
    requirements: {
      webgl: true,
      minResolution: '1280x720',
      browser: ['Chrome', 'Firefox', 'Safari', 'Edge']
    },
    controls: {
      instructions: 'WASD to move, mouse to look around, left click to apply a force to an object, right click to grab objects, space to jump, shift to sprint, ctrl to crouch, E to toggle inventory, F to use items, number keys 1-5 or mouse scroll for hotbar',
      keyboard: true,
      mouse: true,
      gamepad: false,
      requiresMouseCapture: true
    },
    stats: {
      plays: 0,
      rating: 0,
      reviews: 0
    },
    sourceCodeUrl: 'https://github.com/samkleespies/physics-sandbox',
    leaderboardEnabled: false
  },
  {
    id: 'zombies-kino-remake',
    title: 'Zombies: Kino Remake',
    description: 'A WIP remake of the Call of Duty Zombies game mode and map "Kino Der Toten"',
    longDescription: 'Relive the legendary classic in stunning low-res',
    thumbnail: '/games/zombies-kino-remake/thumbnail.png',
    screenshots: [
      '/games/zombies-kino-remake/screenshot1.jpg',
      '/games/zombies-kino-remake/screenshot2.jpg',
      '/games/zombies-kino-remake/screenshot3.jpg'
    ],
    gameUrl: '/games/zombies-kino-remake/index.html',
    genre: ['FPS', 'Zombies', 'Remake'],
    engine: 'Godot 4',
    releaseDate: new Date('2025-07-24'),
    playable: true,
    featured: true,
    technologies: ['Godot 4.4', 'GDScript', 'WebGL'],
    requirements: {
      webgl: true,
      minResolution: '1280x720',
      browser: ['Chrome', 'Firefox', 'Safari', 'Edge']
    },
    controls: {
      instructions: 'WASD to move, Mouse to look around and aim, Right Click to ADS, Left Click to shoot, V to knife, R to reload, Space to jump, Shift to sprint, Ctrl to crouch, E to interact, F to use/buy',
      keyboard: true,
      mouse: true,
      gamepad: false,
      requiresMouseCapture: true
    },
    stats: {
      plays: 0,
      rating: 0,
      reviews: 0
    },
    sourceCodeUrl: 'https://github.com/samkleespies/zombies-kino-remake',
    leaderboardEnabled: false
  },
]