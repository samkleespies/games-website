import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ScoreSubmission, LeaderboardResponse } from '@/types/score'

// CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

// Handle preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  })
}

export async function GET() {
  try {
    // Get top 10 scores for zombies-kino-remake
    const scores = await prisma.gameScore.findMany({
      where: { gameId: 'zombies-kino-remake' },
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
      gameId: 'zombies-kino-remake'
    }

    return NextResponse.json(response, { headers: corsHeaders })
  } catch (error) {
    console.error('Error fetching scores:', error)
    return NextResponse.json(
      { error: 'Failed to fetch scores' },
      { status: 500, headers: corsHeaders }
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
        { status: 400, headers: corsHeaders }
      )
    }

    // Sanitize player name
    const playerName = body.playerName.trim().slice(0, 50)
    if (playerName.length === 0) {
      return NextResponse.json(
        { error: 'Player name cannot be empty' },
        { status: 400, headers: corsHeaders }
      )
    }

    // Validate score
    if (body.score < 0 || body.score > 999999999) {
      return NextResponse.json(
        { error: 'Invalid score value' },
        { status: 400, headers: corsHeaders }
      )
    }

    const newScore = await prisma.gameScore.create({
      data: {
        gameId: 'zombies-kino-remake',
        playerName,
        score: body.score
      }
    })

    return NextResponse.json({
      id: newScore.id,
      playerName: newScore.playerName,
      score: newScore.score,
      createdAt: newScore.createdAt
    }, { headers: corsHeaders })
  } catch (error) {
    console.error('Error submitting score:', error)
    return NextResponse.json(
      { error: 'Failed to submit score' },
      { status: 500, headers: corsHeaders }
    )
  }
}
