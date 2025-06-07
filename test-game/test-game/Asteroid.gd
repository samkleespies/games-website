extends CharacterBody2D

signal destroyed(asteroid, points)

@export var points = 100
@export var rotation_speed = 2.0

@onready var sprite = $Sprite2D
@onready var collision_shape = $CollisionShape2D
@onready var area_2d = $Area2D

var size_scale = 1.0

func _ready():
	print("DEBUG: CharacterBody2D Asteroid _ready() called, position: ", position)
	
	# Random size and rotation - back to normal size
	size_scale = randf_range(0.5, 1.5)
	scale = Vector2(size_scale, size_scale)
	points = int(100 / size_scale) # Smaller asteroids worth more points
	
	print("DEBUG: Asteroid scale set to: ", scale)
	print("DEBUG: Asteroid points: ", points)
	
	# Random rotation speed
	rotation_speed = randf_range(-3.0, 3.0)
	
	# Make asteroids prettier with varied colors and subtle effects
	setup_asteroid_appearance()
	
	# Connect area signal for collision detection
	area_2d.area_entered.connect(_on_area_2d_area_entered)
	area_2d.body_entered.connect(_on_area_2d_body_entered)
	
	print("DEBUG: CharacterBody2D setup complete - ready for movement!")

func _physics_process(delta):
	# Move using CharacterBody2D's built-in movement system
	move_and_slide()
	
	# Rotate the asteroid
	rotation += rotation_speed * delta
	
	# Debug position more frequently to track movement into viewport
	if Engine.get_process_frames() % 60 == 0:  # Every 1 second at 60fps
		var viewport_size = get_viewport().get_visible_rect().size
		var is_visible_area = position.x >= 0 and position.x <= viewport_size.x and position.y >= 0 and position.y <= viewport_size.y
		print("DEBUG: Asteroid pos: ", position, " vel: ", velocity, " in_visible_area: ", is_visible_area)
		if is_visible_area:
			print("*** ASTEROID SHOULD BE VISIBLE NOW! ***")
	
	# Remove asteroid if it goes too far off screen
	var viewport_size = get_viewport().get_visible_rect().size
	if position.x < -200 or position.x > viewport_size.x + 200 or \
	   position.y < -200 or position.y > viewport_size.y + 200:
		print("DEBUG: Asteroid removed - out of bounds at: ", position)
		queue_free()

func destroy():
	destroyed.emit(self, points)
	# Create smaller asteroids if this one is big enough
	if size_scale > 0.8:
		spawn_fragments()

func spawn_fragments():
	for i in range(2):
		var fragment = preload("res://Asteroid.tscn").instantiate()
		get_parent().add_child(fragment)
		fragment.position = position + Vector2(randf_range(-20, 20), randf_range(-20, 20))
		fragment.size_scale = size_scale * 0.6
		fragment.scale = Vector2(fragment.size_scale, fragment.size_scale)
		fragment.points = int(points * 0.5)
		
		# Random velocity for fragments
		var direction = Vector2.UP.rotated(randf() * TAU)
		fragment.velocity = direction * randf_range(100, 200)

func _on_area_2d_area_entered(area):
	# Hit by bullet
	if area.get_parent().has_method("hit_target"):
		area.get_parent().hit_target(self)

func _on_area_2d_body_entered(body):
	# Hit by player
	if body.has_signal("hit"):
		body.hit.emit()

func setup_asteroid_appearance():
	# Create space-themed asteroid colors with cohesive cool palette
	var color_variations = [
		Color(0.3, 0.4, 0.6),     # Deep space blue
		Color(0.4, 0.4, 0.5),     # Cool asteroid gray
		Color(0.35, 0.5, 0.55),   # Teal space rock
		Color(0.45, 0.35, 0.6),   # Purple asteroid
		Color(0.5, 0.5, 0.6),     # Light blue-gray
		Color(0.25, 0.35, 0.45),  # Dark space blue
		Color(0.4, 0.45, 0.65),   # Nebula blue
		Color(0.35, 0.4, 0.55),   # Steel blue
	]
	
	# Apply random color tint
	var chosen_color = color_variations[randi() % color_variations.size()]
	sprite.modulate = chosen_color
	
	# Add subtle random rotation to make each asteroid unique
	sprite.rotation_degrees = randf_range(0, 360)
