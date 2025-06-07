extends Node

@export var asteroid_scene: PackedScene
@export var bullet_scene: PackedScene

var score = 0
var game_over = false
var paused = false
var spawn_timer = 0.0
var spawn_interval = 1.0

@onready var player = $Player
@onready var ui = $UI
@onready var asteroid_container = $AsteroidContainer
@onready var bullet_container = $BulletContainer
@onready var background = $Background

var pause_menu # Will be loaded later

func _ready():
	# Load scenes
	asteroid_scene = preload("res://Asteroid.tscn")
	bullet_scene = preload("res://Bullet.tscn")
	
	# Connect player signals
	player.shoot.connect(_on_player_shoot)
	player.hit.connect(_on_player_hit)
	
	# Load and setup pause menu
	var pause_scene = preload("res://PauseMenu.tscn")
	pause_menu = pause_scene.instantiate()
	add_child(pause_menu)
	
	# Connect pause menu signals
	pause_menu.resume_requested.connect(_on_resume_requested)
	pause_menu.exit_requested.connect(_on_exit_requested)
	
	# Hide pause menu initially and set it to process during pause
	pause_menu.visible = false
	pause_menu.process_mode = Node.PROCESS_MODE_WHEN_PAUSED
	
	# CRITICAL: Allow Main to process input even when paused so ESC can unpause
	process_mode = Node.PROCESS_MODE_ALWAYS
	
	# Set game objects to pause when tree is paused
	asteroid_container.process_mode = Node.PROCESS_MODE_PAUSABLE
	bullet_container.process_mode = Node.PROCESS_MODE_PAUSABLE
	player.process_mode = Node.PROCESS_MODE_PAUSABLE

func _input(event):
	# Handle pause toggle - check for ESC key directly
	if event is InputEventKey and event.pressed:
		if event.keycode == KEY_ESCAPE:
			print("DEBUG: ESC key detected - toggling pause!")
			toggle_pause()

func _process(delta):
	
	if game_over:
		if Input.is_action_just_pressed("ui_accept"):
			restart_game()
		return
	
	if paused:
		return
	
	# Spawn asteroids
	spawn_timer += delta
	if spawn_timer >= spawn_interval:
		spawn_asteroid()
		spawn_timer = 0.0
		# Gradually increase difficulty
		spawn_interval = max(0.5, spawn_interval - 0.02)
	
	# Update UI
	ui.update_score(score)

func spawn_asteroid():
	print("DEBUG: Timer reached, spawning asteroid...")
	var asteroid = asteroid_scene.instantiate()
	print("DEBUG: Asteroid instantiated: ", asteroid)
	
	# Debug container info BEFORE adding asteroid
	print("DEBUG: AsteroidContainer position: ", asteroid_container.position)
	print("DEBUG: AsteroidContainer global_position: ", asteroid_container.global_position)
	print("DEBUG: AsteroidContainer scale: ", asteroid_container.scale)
	print("DEBUG: AsteroidContainer visible: ", asteroid_container.visible)
	print("DEBUG: AsteroidContainer z_index: ", asteroid_container.z_index)
	
	# CRITICAL: Set asteroid to pause when tree is paused
	asteroid.process_mode = Node.PROCESS_MODE_PAUSABLE
	
	asteroid_container.add_child(asteroid)
	print("DEBUG: Asteroid added to container. Container child count: ", asteroid_container.get_child_count())
	
	# Random spawn position around screen edges
	var viewport_size = get_viewport().get_visible_rect().size
	var spawn_side = randi() % 4
	
	match spawn_side:
		0: # Top - spawn just above screen, moving toward screen center
			asteroid.position = Vector2(randf() * viewport_size.x, -50)
		1: # Right - spawn just right of screen, moving toward screen center
			asteroid.position = Vector2(viewport_size.x + 50, randf() * viewport_size.y)
		2: # Bottom - spawn just below screen, moving toward screen center
			asteroid.position = Vector2(randf() * viewport_size.x, viewport_size.y + 50)
		3: # Left - spawn just left of screen, moving toward screen center
			asteroid.position = Vector2(-50, randf() * viewport_size.y)
	
	print("DEBUG: Asteroid local position: ", asteroid.position)
	print("DEBUG: Asteroid global_position: ", asteroid.global_position)
	print("DEBUG: Viewport size: ", viewport_size)
	print("DEBUG: Viewport rect: ", get_viewport().get_visible_rect())
	
	# Add a delay to check position after physics frame
	await get_tree().process_frame
	print("DEBUG: After frame - Asteroid global_position: ", asteroid.global_position)
	print("DEBUG: After frame - Asteroid position: ", asteroid.position)
	
	# SIMPLE FIX: CharacterBody2D uses direct velocity setting
	var center = viewport_size / 2
	var direction = (center - asteroid.position).normalized()
	direction = direction.rotated(randf_range(-0.5, 0.5))
	var speed = randf_range(50, 150)
	
	# Set velocity directly - this works reliably with CharacterBody2D!
	asteroid.velocity = direction * speed
	
	print("DEBUG: Center: ", center, " Direction: ", direction, " Speed: ", speed)
	print("DEBUG: CharacterBody2D velocity set to: ", asteroid.velocity)
	
	# Connect signals
	asteroid.destroyed.connect(_on_asteroid_destroyed)

func _on_player_shoot(bullet_position, bullet_direction):
	var bullet = bullet_scene.instantiate()
	# CRITICAL: Set bullet to pause when tree is paused
	bullet.process_mode = Node.PROCESS_MODE_PAUSABLE
	bullet_container.add_child(bullet)
	bullet.setup(bullet_position, bullet_direction)
	bullet.hit_asteroid.connect(_on_bullet_hit_asteroid)

func _on_asteroid_destroyed(asteroid, points):
	score += points
	asteroid.queue_free()

func _on_bullet_hit_asteroid(bullet, asteroid):
	# Create explosion effect
	create_explosion(asteroid.position)
	
	# Award points and destroy asteroid
	score += asteroid.points
	asteroid.queue_free()
	bullet.queue_free()

func _on_player_hit():
	game_over = true
	ui.show_game_over()

func create_explosion(pos):
	# Simple particle explosion
	var explosion = preload("res://Explosion.tscn").instantiate()
	add_child(explosion)
	explosion.position = pos
	explosion.emitting = true

func restart_game():
	get_tree().reload_current_scene()

func toggle_pause():
	print("DEBUG: toggle_pause called, current paused state: ", paused)
	paused = !paused
	if paused:
		print("DEBUG: Pausing game, showing pause menu")
		pause_menu.visible = true
		get_tree().paused = true
	else:
		print("DEBUG: Unpausing game, hiding pause menu")
		pause_menu.visible = false
		get_tree().paused = false
	print("DEBUG: New paused state: ", paused)

func _on_resume_requested():
	toggle_pause()

func _on_exit_requested():
	get_tree().quit()
