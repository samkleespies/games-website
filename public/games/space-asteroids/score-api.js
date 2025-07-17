// Score submission API for Space Asteroids game
// This script provides functions that can be called from the Godot game

window.GameAPI = {
  // Submit a score to the leaderboard
  submitScore: async function(playerName, score) {
    try {
      console.log('Submitting score:', { playerName, score });
      
      const response = await fetch('/api/games/space-asteroids/scores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          playerName: playerName || 'Anonymous',
          score: parseInt(score) || 0
        })
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('Score submitted successfully:', result);
        
        // Notify the game of successful submission
        if (window.godotSubmitScoreCallback) {
          window.godotSubmitScoreCallback(true, result);
        }
        
        return { success: true, data: result };
      } else {
        const error = await response.json();
        console.error('Failed to submit score:', error);
        
        if (window.godotSubmitScoreCallback) {
          window.godotSubmitScoreCallback(false, error);
        }
        
        return { success: false, error: error.error || 'Failed to submit score' };
      }
    } catch (error) {
      console.error('Error submitting score:', error);
      
      if (window.godotSubmitScoreCallback) {
        window.godotSubmitScoreCallback(false, { error: error.message });
      }
      
      return { success: false, error: error.message };
    }
  },

  // Get the current leaderboard
  getLeaderboard: async function() {
    try {
      const response = await fetch('/api/games/space-asteroids/scores');
      
      if (response.ok) {
        const result = await response.json();
        console.log('Leaderboard fetched:', result);
        return { success: true, data: result };
      } else {
        const error = await response.json();
        console.error('Failed to fetch leaderboard:', error);
        return { success: false, error: error.error || 'Failed to fetch leaderboard' };
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      return { success: false, error: error.message };
    }
  },

  // Show a simple score submission dialog
  showScoreDialog: function(score) {
    return new Promise((resolve) => {
      // Create a simple modal dialog
      const modal = document.createElement('div');
      modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        font-family: 'Courier New', monospace;
      `;

      const dialog = document.createElement('div');
      dialog.style.cssText = `
        background: #1a1a1a;
        border: 2px solid #00ff00;
        border-radius: 8px;
        padding: 20px;
        text-align: center;
        color: #00ff00;
        max-width: 400px;
        width: 90%;
      `;

      dialog.innerHTML = `
        <h2 style="margin: 0 0 20px 0; color: #00ff00;">Game Over!</h2>
        <p style="margin: 0 0 20px 0; font-size: 18px;">Final Score: <span style="color: #ffff00;">${score.toLocaleString()}</span></p>
        <div style="margin-bottom: 20px;">
          <label style="display: block; margin-bottom: 10px;">Enter your name:</label>
          <input type="text" id="playerNameInput" maxlength="20" placeholder="Anonymous" 
                 style="padding: 8px; background: #333; border: 1px solid #666; color: #fff; border-radius: 4px; width: 200px;">
        </div>
        <div>
          <button id="submitBtn" style="padding: 10px 20px; margin: 0 10px; background: #00ff00; color: #000; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">Submit Score</button>
          <button id="skipBtn" style="padding: 10px 20px; margin: 0 10px; background: #666; color: #fff; border: none; border-radius: 4px; cursor: pointer;">Skip</button>
        </div>
      `;

      modal.appendChild(dialog);
      document.body.appendChild(modal);

      const nameInput = dialog.querySelector('#playerNameInput');
      const submitBtn = dialog.querySelector('#submitBtn');
      const skipBtn = dialog.querySelector('#skipBtn');

      nameInput.focus();

      const cleanup = () => {
        document.body.removeChild(modal);
      };

      submitBtn.onclick = async () => {
        const playerName = nameInput.value.trim() || 'Anonymous';
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
        
        const result = await window.GameAPI.submitScore(playerName, score);
        cleanup();
        resolve({ submitted: true, playerName, result });
      };

      skipBtn.onclick = () => {
        cleanup();
        resolve({ submitted: false });
      };

      nameInput.onkeypress = (e) => {
        if (e.key === 'Enter') {
          submitBtn.click();
        }
      };
    });
  }
};

// Legacy function names for backward compatibility
window.submitScore = window.GameAPI.submitScore;
window.getLeaderboard = window.GameAPI.getLeaderboard;

console.log('Space Asteroids Score API loaded');
