import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST() {
  try {
    console.log('Running database migration...');
    
    // Run Prisma migration
    const { stdout, stderr } = await execAsync('npx prisma migrate deploy');
    
    console.log('Migration stdout:', stdout);
    if (stderr) {
      console.log('Migration stderr:', stderr);
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database migration completed successfully',
      output: stdout 
    });
  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}
