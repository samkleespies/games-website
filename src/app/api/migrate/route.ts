import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export async function POST() {
  try {
    console.log('Testing database connection and creating tables...');

    const prisma = new PrismaClient();

    // Test connection by trying to create the table if it doesn't exist
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "GameScore" (
        "id" TEXT NOT NULL,
        "gameId" TEXT NOT NULL,
        "playerName" TEXT NOT NULL,
        "score" INTEGER NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "GameScore_pkey" PRIMARY KEY ("id")
      );
    `;

    // Create index if it doesn't exist
    await prisma.$executeRaw`
      CREATE INDEX IF NOT EXISTS "GameScore_gameId_score_idx" ON "GameScore"("gameId", "score");
    `;

    await prisma.$disconnect();

    return NextResponse.json({
      success: true,
      message: 'Database tables created successfully'
    });
  } catch (error) {
    console.error('Database setup error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
