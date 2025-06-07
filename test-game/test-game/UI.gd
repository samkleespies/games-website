extends CanvasLayer

@onready var score_label = $ScoreLabel
@onready var game_over_panel = $GameOverPanel
@onready var game_over_label = $GameOverPanel/VBoxContainer/GameOverLabel
@onready var final_score_label = $GameOverPanel/VBoxContainer/FinalScoreLabel
@onready var restart_label = $GameOverPanel/VBoxContainer/RestartLabel

func _ready():
	game_over_panel.visible = false
	setup_modern_ui()

func update_score(score):
	# Format score with modern styling
	score_label.text = str(score).pad_zeros(6)  # Modern zero-padded format like 000125

func show_game_over():
	var current_score = score_label.text
	final_score_label.text = "FINAL SCORE: " + current_score
	game_over_panel.visible = true

func setup_modern_ui():
	# Position score label in top-left corner with modern styling
	score_label.position = Vector2(20, 20)  # Top-left corner with padding
	
	# Make sure score label is visible and properly sized
	score_label.size = Vector2(200, 50)  # Ensure it has adequate size
	score_label.visible = true
	
	# Modern font styling
	score_label.add_theme_font_size_override("font_size", 28)
	
	# Set space-themed color scheme
	score_label.add_theme_color_override("font_color", Color(0.6, 0.9, 1.0))  # Bright cyan to match theme
	
	# Add subtle glow effect
	score_label.add_theme_color_override("font_shadow_color", Color(0.2, 0.6, 0.9, 0.8))
	score_label.add_theme_constant_override("shadow_offset_x", 2)
	score_label.add_theme_constant_override("shadow_offset_y", 2)
	
	print("DEBUG: Modern UI setup complete - score label positioned at top-left")
