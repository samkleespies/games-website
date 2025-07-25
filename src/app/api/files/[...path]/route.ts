import { NextRequest, NextResponse } from 'next/server';

const GITHUB_RELEASE_BASE_URL = 'https://github.com/samkleespies/games-website/releases/download/v1.0.0-game-files';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const filePath = params.path.join('/');
    const githubUrl = `${GITHUB_RELEASE_BASE_URL}/${filePath}`;
    
    console.log(`Proxying request for: ${githubUrl}`);
    
    // Fetch the file from GitHub releases
    const response = await fetch(githubUrl, {
      headers: {
        'User-Agent': 'games-website-proxy',
      },
    });
    
    if (!response.ok) {
      console.error(`Failed to fetch ${githubUrl}: ${response.status} ${response.statusText}`);
      return new NextResponse('File not found', { status: 404 });
    }
    
    // Get the file content
    const fileBuffer = await response.arrayBuffer();
    
    // Determine content type based on file extension
    const contentType = getContentType(filePath);
    
    // Return the file with proper CORS headers
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
      },
    });
  } catch (error) {
    console.error('Error proxying file:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

function getContentType(filePath: string): string {
  const extension = filePath.split('.').pop()?.toLowerCase();
  
  switch (extension) {
    case 'wasm':
      return 'application/wasm';
    case 'pck':
      return 'application/octet-stream';
    case 'js':
      return 'application/javascript';
    case 'html':
      return 'text/html';
    case 'css':
      return 'text/css';
    case 'png':
      return 'image/png';
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    default:
      return 'application/octet-stream';
  }
}
