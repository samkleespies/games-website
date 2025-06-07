extends CharacterBody2D

signal shoot(bullet_position, bullet_direction)
signal hit

@export var speed = 300.0
@export var rotation_speed = 5.0

var can_shoot = true
var shoot_cooldown = 0.12  # Faster fire rate for automatic shooting

@onready var sprite = $Sprite2D
@onready var collision_shape = $CollisionShape2D
@onready var shoot_timer = $ShootTimer
@onready var trail_particles = $TrailParticles

func _ready():
	shoot_timer.wait_time = shoot_cooldown
	shoot_timer.timeout.connect(_on_shoot_timer_timeout)
	$Area2D.area_entered.connect(_on_area_2d_area_entered)
	
	# Set player ship to yellow color like OG Asteroids
	sprite.modulate = Color(1.0, 1.0, 0.2, 1.0)  # Bright yellow ship
	
	# Customize exhaust trail for better visibility
	setup_exhaust_effects()

func _physics_process(_delta):
	handle_input()
	move_and_slide()
	wrap_around_screen()
	
	# Update trail particles - toned down for subtlety
	if velocity.length() > 50:
		trail_particles.emitting = true
		# Adjust intensity based on velocity for dynamic effect
		var intensity = min(velocity.length() / 300.0, 1.0)
		trail_particles.amount_ratio = intensity * 0.6  # Reduced from full intensity
	else:
		trail_particles.emitting = false

func handle_input():
	# Mouse aiming
	var mouse_pos = get_global_mouse_position()
	var direction_to_mouse = (mouse_pos - global_position).normalized()
	rotation = direction_to_mouse.angle() + PI/2  # Add PI/2 because sprite faces up
	
	# Movement (thrust forward with WASD)
	var thrust_input = Vector2.ZERO
	if Input.is_action_pressed("ui_up"):
		thrust_input.y -= 1
	if Input.is_action_pressed("ui_down"):
		thrust_input.y += 1
	if Input.is_action_pressed("ui_left"):
		thrust_input.x -= 1
	if Input.is_action_pressed("ui_right"):
		thrust_input.x += 1
	
	if thrust_input.length() > 0:
		thrust_input = thrust_input.normalized()
		velocity += thrust_input * speed * get_physics_process_delta_time()
	
	# Apply friction
	velocity *= 0.98
	
	# Automatic shooting when holding mouse button or key
	if (Input.is_action_pressed("ui_accept") or Input.is_action_pressed("shoot") or Input.is_mouse_button_pressed(MOUSE_BUTTON_LEFT)) and can_shoot:
		shoot_bullet()

func shoot_bullet():
	can_shoot = false
	shoot_timer.start()
	
	var bullet_position = global_position + Vector2.UP.rotated(rotation) * 30
	var bullet_direction = Vector2.UP.rotated(rotation)
	shoot.emit(bullet_position, bullet_direction)

func wrap_around_screen():
	var viewport_size = get_viewport().get_visible_rect().size
	
	if position.x < -30:
		position.x = viewport_size.x + 30
	elif position.x > viewport_size.x + 30:
		position.x = -30
	
	if position.y < -30:
		position.y = viewport_size.y + 30
	elif position.y > viewport_size.y + 30:
		position.y = -30

func _on_shoot_timer_timeout():
	can_shoot = true

func setup_exhaust_effects():
	# Customize trail particles for better visibility and style
	var particle_material = trail_particles.process_material as ParticleProcessMaterial
	if particle_material:
		# Change to yellow-orange exhaust color
		particle_material.color = Color(1.0, 0.8, 0.2, 0.9)  # Bright yellow-orange exhaust flame
		particle_material.color_ramp = null  # Remove any existing color ramp for consistency
		
		# Set absolute particle size values to prevent accumulating changes
		particle_material.scale_min = 0.3
		particle_material.scale_max = 0.8
		
		# Set absolute velocity values for consistent trail effect
		particle_material.initial_velocity_min = 20.0
		particle_material.initial_velocity_max = 50.0
		
	# Set absolute emission amount for subtler effect
	trail_particles.amount = 25  # Fixed amount

func _on_area_2d_area_entered(area):
	if area.get_parent().has_method("destroy"):
		hit.emit()