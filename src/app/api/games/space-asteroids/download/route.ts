import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { createReadStream } from 'fs'
import path from 'path'

export async function GET(request: NextRequest) {
  try {
    // For now, let's create a simple text response that explains how to get the game
    // This avoids the archiver dependency issue
    
    const readmeContent = `# Space Asteroids - Godot 4 Game

Thank you for your interest in playing Space Asteroids!

## How to Get the Game

1. **Clone/Download from Repository**: 
   - Visit the GitHub repository (if available)
   - Download the source code

2. **Requirements**:
   - Godot 4.4 or later
   - Compatible with Windows, Mac, and Linux

## How to Run

1. **Install Godot 4.4+**
   - Download from: https://godotengine.org/download
   
2. **Open the Project**
   - Launch Godot
   - Click "Import"
   - Navigate to the downloaded project folder
   - Select the "project.godot" file
   - Click "Open"

3. **Play the Game**
   - Click the "Play" button (▶️) in Godot
   - Or press F5

## Game Controls

- **WASD**: Move ship
- **Mouse**: Aim direction  
- **Space/Enter/Left Click**: Shoot
- **ESC**: Pause menu

## Features

- Classic asteroids gameplay
- Progressive difficulty with faster asteroid spawning
- Asteroid fragmentation system
- Particle effects for explosions and ship trails
- Score system with points for destroying asteroids
- Screen wrapping mechanics
- Pause menu with display options
- Game over and restart functionality

## Technical Details

- **Engine**: Godot 4.4
- **Language**: GDScript
- **Graphics**: 2D with GPU particles
- **Physics**: CharacterBody2D and Area2D systems
- **Resolution**: 1152x648 (adjustable)

## Troubleshooting

If you encounter issues:
1. Make sure you have Godot 4.4 or later
2. Check that all game files are present
3. Try importing the project fresh in Godot

Enjoy playing Space Asteroids!
`

    // Return as downloadable file
    const headers = new Headers()
    headers.set('Content-Type', 'text/plain')
    headers.set('Content-Disposition', 'attachment; filename="Space-Asteroids-Instructions.txt"')
    
    return new NextResponse(readmeContent, { headers })

  } catch (error) {
    console.error('Error creating download:', error)
    return NextResponse.json(
      { error: 'Failed to create download' },
      { status: 500 }
    )
  }
}