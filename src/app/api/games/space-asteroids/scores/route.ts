import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ScoreSubmission, LeaderboardResponse } from '@/types/score'

export async function GET() {
  try {
    // Get top 10 scores for space-asteroids
    const scores = await prisma.gameScore.findMany({
      where: { gameId: 'space-asteroids' },
      orderBy: { score: 'desc' },
      take: 10,
      select: {
        playerName: true,
        score: true,
        createdAt: true
      }
    })

    const response: LeaderboardResponse = {
      scores: scores.map((score, index) => ({
        ...score,
        rank: index + 1
      })),
      totalCount: scores.length,
      gameId: 'space-asteroids'
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching scores:', error)
    return NextResponse.json(
      { error: 'Failed to fetch scores' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ScoreSubmission = await request.json()
    
    // Validate input
    if (!body.playerName || typeof body.score !== 'number') {
      return NextResponse.json(
        { error: 'Invalid input. playerName and score are required.' },
        { status: 400 }
      )
    }

    // Sanitize player name
    const playerName = body.playerName.trim().slice(0, 50)
    if (playerName.length === 0) {
      return NextResponse.json(
        { error: 'Player name cannot be empty' },
        { status: 400 }
      )
    }

    // Validate score
    if (body.score < 0 || body.score > 999999999) {
      return NextResponse.json(
        { error: 'Invalid score value' },
        { status: 400 }
      )
    }

    const newScore = await prisma.gameScore.create({
      data: {
        gameId: 'space-asteroids',
        playerName,
        score: body.score
      }
    })

    return NextResponse.json({
      id: newScore.id,
      playerName: newScore.playerName,
      score: newScore.score,
      createdAt: newScore.createdAt
    })
  } catch (error) {
    console.error('Error submitting score:', error)
    return NextResponse.json(
      { error: 'Failed to submit score' },
      { status: 500 }
    )
  }
}
