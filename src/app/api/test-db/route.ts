import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export async function GET() {
  let prisma: PrismaClient | null = null;
  
  try {
    console.log('Testing database connection...');
    console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
    console.log('DATABASE_URL starts with:', process.env.DATABASE_URL?.substring(0, 20));
    
    prisma = new PrismaClient({
      log: ['query', 'error', 'info', 'warn'],
    });
    
    // Test basic connection
    await prisma.$connect();
    console.log('Database connected successfully');
    
    // Test if GameScore table exists by trying to count records
    const count = await prisma.gameScore.count();
    console.log('GameScore table exists, record count:', count);
    
    // Test a simple query
    const scores = await prisma.gameScore.findMany({
      take: 1,
    });
    console.log('Sample query successful, found records:', scores.length);
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      recordCount: count,
      sampleRecords: scores.length,
      databaseUrl: process.env.DATABASE_URL ? 'Set' : 'Not set'
    });
    
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      databaseUrl: process.env.DATABASE_URL ? 'Set' : 'Not set'
    }, { status: 500 });
  } finally {
    if (prisma) {
      await prisma.$disconnect();
    }
  }
}
