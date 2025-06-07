'use client'

export default function SpaceAsteroidsDemo() {
  return (
    <div style={{
      margin: 0,
      padding: 0,
      background: '#000',
      color: '#fff',
      fontFamily: 'Courier New, monospace',
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw'
    }}>
      <style jsx>{`
        canvas {
          border: 2px solid #333;
          background: radial-gradient(circle at 30% 30%, #001133, #000000);
        }
        
        .ui {
          position: absolute;
          top: 20px;
          left: 20px;
          z-index: 10;
        }
        
        .score {
          font-size: 24px;
          color: #00ff00;
          text-shadow: 0 0 10px #00ff00;
        }
        
        .lives {
          font-size: 18px;
          color: #ff6600;
          margin-top: 10px;
        }
        
        .controls {
          position: absolute;
          bottom: 20px;
          left: 20px;
          font-size: 14px;
          color: #888;
        }
        
        .game-over {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          font-size: 32px;
          color: #ff0000;
          text-shadow: 0 0 20px #ff0000;
          display: none;
        }
        
        .restart {
          font-size: 18px;
          margin-top: 20px;
          color: #00ff00;
          cursor: pointer;
          text-decoration: underline;
        }
      `}</style>
      
      <div className="ui">
        <div className="score">Score: <span id="score">0</span></div>
        <div className="lives">Lives: <span id="lives">3</span></div>
      </div>
      
      <div className="controls">
        WASD: Move | Mouse: Aim | Click/Space: Shoot
      </div>
      
      <div className="game-over" id="gameOver">
        <div>GAME OVER</div>
        <div className="restart" id="restartBtn">Click to Restart</div>
      </div>
      
      <canvas id="gameCanvas" width="800" height="600"></canvas>

      <script dangerouslySetInnerHTML={{
        __html: `
          const canvas = document.getElementById('gameCanvas');
          const ctx = canvas.getContext('2d');
          
          // Game state
          let score = 0;
          let lives = 3;
          let gameRunning = true;
          let keys = {};
          let mouseX = 0;
          let mouseY = 0;
          
          // Player
          const player = {
            x: canvas.width / 2,
            y: canvas.height / 2,
            angle: 0,
            velocity: { x: 0, y: 0 },
            size: 8
          };
          
          // Arrays for game objects
          let bullets = [];
          let asteroids = [];
          let particles = [];
          
          // Initialize asteroids
          function createAsteroid(x, y, size) {
            return {
              x: x || Math.random() * canvas.width,
              y: y || Math.random() * canvas.height,
              velocity: {
                x: (Math.random() - 0.5) * 4,
                y: (Math.random() - 0.5) * 4
              },
              angle: Math.random() * Math.PI * 2,
              rotation: (Math.random() - 0.5) * 0.1,
              size: size || 30,
              health: size || 30
            };
          }
          
          // Initialize game
          function initGame() {
            asteroids = [];
            for (let i = 0; i < 5; i++) {
              asteroids.push(createAsteroid());
            }
          }
          
          // Create particles
          function createParticles(x, y, count, color) {
            for (let i = 0; i < count; i++) {
              particles.push({
                x: x,
                y: y,
                velocity: {
                  x: (Math.random() - 0.5) * 8,
                  y: (Math.random() - 0.5) * 8
                },
                life: 30,
                maxLife: 30,
                color: color || '#ffaa00'
              });
            }
          }
          
          // Input handling
          document.addEventListener('keydown', (e) => {
            keys[e.key.toLowerCase()] = true;
            if (e.key === ' ') {
              e.preventDefault();
              shoot();
            }
          });
          
          document.addEventListener('keyup', (e) => {
            keys[e.key.toLowerCase()] = false;
          });
          
          canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
          });
          
          canvas.addEventListener('click', () => {
            if (gameRunning) shoot();
          });
          
          // Game functions
          function shoot() {
            if (!gameRunning) return;
            
            bullets.push({
              x: player.x,
              y: player.y,
              velocity: {
                x: Math.cos(player.angle) * 8,
                y: Math.sin(player.angle) * 8
              },
              life: 60
            });
          }
          
          function updatePlayer() {
            // Calculate angle to mouse
            const dx = mouseX - player.x;
            const dy = mouseY - player.y;
            player.angle = Math.atan2(dy, dx);
            
            // Movement
            if (keys['w'] || keys['arrowup']) {
              player.velocity.x += Math.cos(player.angle) * 0.3;
              player.velocity.y += Math.sin(player.angle) * 0.3;
            }
            if (keys['s'] || keys['arrowdown']) {
              player.velocity.x -= Math.cos(player.angle) * 0.2;
              player.velocity.y -= Math.sin(player.angle) * 0.2;
            }
            if (keys['a'] || keys['arrowleft']) {
              player.velocity.x -= Math.cos(player.angle + Math.PI/2) * 0.2;
              player.velocity.y -= Math.sin(player.angle + Math.PI/2) * 0.2;
            }
            if (keys['d'] || keys['arrowright']) {
              player.velocity.x += Math.cos(player.angle + Math.PI/2) * 0.2;
              player.velocity.y += Math.sin(player.angle + Math.PI/2) * 0.2;
            }
            
            // Apply friction
            player.velocity.x *= 0.98;
            player.velocity.y *= 0.98;
            
            // Update position
            player.x += player.velocity.x;
            player.y += player.velocity.y;
            
            // Screen wrapping
            if (player.x < 0) player.x = canvas.width;
            if (player.x > canvas.width) player.x = 0;
            if (player.y < 0) player.y = canvas.height;
            if (player.y > canvas.height) player.y = 0;
          }
          
          function updateBullets() {
            bullets = bullets.filter(bullet => {
              bullet.x += bullet.velocity.x;
              bullet.y += bullet.velocity.y;
              bullet.life--;
              
              // Screen wrapping
              if (bullet.x < 0) bullet.x = canvas.width;
              if (bullet.x > canvas.width) bullet.x = 0;
              if (bullet.y < 0) bullet.y = canvas.height;
              if (bullet.y > canvas.height) bullet.y = 0;
              
              return bullet.life > 0;
            });
          }
          
          function updateAsteroids() {
            asteroids.forEach(asteroid => {
              asteroid.x += asteroid.velocity.x;
              asteroid.y += asteroid.velocity.y;
              asteroid.angle += asteroid.rotation;
              
              // Screen wrapping
              if (asteroid.x < 0) asteroid.x = canvas.width;
              if (asteroid.x > canvas.width) asteroid.x = 0;
              if (asteroid.y < 0) asteroid.y = canvas.height;
              if (asteroid.y > canvas.height) asteroid.y = 0;
            });
          }
          
          function updateParticles() {
            particles = particles.filter(particle => {
              particle.x += particle.velocity.x;
              particle.y += particle.velocity.y;
              particle.velocity.x *= 0.98;
              particle.velocity.y *= 0.98;
              particle.life--;
              return particle.life > 0;
            });
          }
          
          function checkCollisions() {
            // Bullet-asteroid collisions
            bullets.forEach((bullet, bIndex) => {
              asteroids.forEach((asteroid, aIndex) => {
                const dx = bullet.x - asteroid.x;
                const dy = bullet.y - asteroid.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < asteroid.size) {
                  // Remove bullet
                  bullets.splice(bIndex, 1);
                  
                  // Create particles
                  createParticles(asteroid.x, asteroid.y, 8, '#ffaa00');
                  
                  // Add score
                  score += 10;
                  document.getElementById('score').textContent = score;
                  
                  // Split asteroid or remove it
                  if (asteroid.size > 15) {
                    asteroids.push(createAsteroid(asteroid.x, asteroid.y, asteroid.size / 2));
                    asteroids.push(createAsteroid(asteroid.x, asteroid.y, asteroid.size / 2));
                  }
                  
                  asteroids.splice(aIndex, 1);
                  
                  // Spawn new asteroid if none left
                  if (asteroids.length === 0) {
                    for (let i = 0; i < 5; i++) {
                      asteroids.push(createAsteroid());
                    }
                  }
                }
              });
            });
            
            // Player-asteroid collisions
            asteroids.forEach(asteroid => {
              const dx = player.x - asteroid.x;
              const dy = player.y - asteroid.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              if (distance < asteroid.size + player.size) {
                lives--;
                document.getElementById('lives').textContent = lives;
                
                // Create explosion particles
                createParticles(player.x, player.y, 15, '#ff0000');
                
                // Reset player position
                player.x = canvas.width / 2;
                player.y = canvas.height / 2;
                player.velocity.x = 0;
                player.velocity.y = 0;
                
                if (lives <= 0) {
                  gameRunning = false;
                  document.getElementById('gameOver').style.display = 'block';
                }
              }
            });
          }
          
          function drawPlayer() {
            ctx.save();
            ctx.translate(player.x, player.y);
            ctx.rotate(player.angle);
            
            // Draw ship
            ctx.strokeStyle = '#00ff00';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(12, 0);
            ctx.lineTo(-8, -6);
            ctx.lineTo(-4, 0);
            ctx.lineTo(-8, 6);
            ctx.closePath();
            ctx.stroke();
            
            // Engine flame
            if (keys['w'] || keys['arrowup']) {
              ctx.strokeStyle = '#ff4400';
              ctx.beginPath();
              ctx.moveTo(-8, -2);
              ctx.lineTo(-15, 0);
              ctx.lineTo(-8, 2);
              ctx.stroke();
            }
            
            ctx.restore();
          }
          
          function drawBullets() {
            ctx.fillStyle = '#ffff00';
            bullets.forEach(bullet => {
              ctx.beginPath();
              ctx.arc(bullet.x, bullet.y, 2, 0, Math.PI * 2);
              ctx.fill();
            });
          }
          
          function drawAsteroids() {
            ctx.strokeStyle = '#888888';
            ctx.lineWidth = 2;
            asteroids.forEach(asteroid => {
              ctx.save();
              ctx.translate(asteroid.x, asteroid.y);
              ctx.rotate(asteroid.angle);
              
              ctx.beginPath();
              const points = 8;
              for (let i = 0; i < points; i++) {
                const angle = (Math.PI * 2 / points) * i;
                const radius = asteroid.size * (0.8 + Math.sin(angle * 3) * 0.2);
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
              }
              ctx.closePath();
              ctx.stroke();
              
              ctx.restore();
            });
          }
          
          function drawParticles() {
            particles.forEach(particle => {
              const alpha = particle.life / particle.maxLife;
              ctx.fillStyle = particle.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
              ctx.beginPath();
              ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
              ctx.fill();
            });
          }
          
          function drawStars() {
            ctx.fillStyle = '#ffffff';
            for (let i = 0; i < 100; i++) {
              const x = (i * 137.5) % canvas.width;
              const y = (i * 245.7) % canvas.height;
              const size = (i % 3) * 0.5 + 0.5;
              ctx.beginPath();
              ctx.arc(x, y, size, 0, Math.PI * 2);
              ctx.fill();
            }
          }
          
          function gameLoop() {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw background
            drawStars();
            
            if (gameRunning) {
              updatePlayer();
              updateBullets();
              updateAsteroids();
              updateParticles();
              checkCollisions();
            }
            
            // Draw everything
            drawPlayer();
            drawBullets();
            drawAsteroids();
            drawParticles();
            
            requestAnimationFrame(gameLoop);
          }
          
          function restartGame() {
            score = 0;
            lives = 3;
            gameRunning = true;
            bullets = [];
            particles = [];
            player.x = canvas.width / 2;
            player.y = canvas.height / 2;
            player.velocity.x = 0;
            player.velocity.y = 0;
            
            document.getElementById('score').textContent = score;
            document.getElementById('lives').textContent = lives;
            document.getElementById('gameOver').style.display = 'none';
            
            initGame();
          }
          
          // Add restart button event listener
          document.addEventListener('DOMContentLoaded', () => {
            const restartBtn = document.getElementById('restartBtn');
            if (restartBtn) {
              restartBtn.addEventListener('click', restartGame);
            }
            
            // Start the game
            initGame();
            gameLoop();
          });
          
          // If DOM is already loaded
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
              const restartBtn = document.getElementById('restartBtn');
              if (restartBtn) {
                restartBtn.addEventListener('click', restartGame);
              }
              initGame();
              gameLoop();
            });
          } else {
            const restartBtn = document.getElementById('restartBtn');
            if (restartBtn) {
              restartBtn.addEventListener('click', restartGame);
            }
            initGame();
            gameLoop();
          }
        `
      }} />
    </div>
  )
} 