extends Area2D

signal hit_asteroid(bullet, asteroid)

@export var speed = 500.0
@export var lifetime = 2.0

var direction = Vector2.UP
var timer = 0.0

@onready var sprite = $Sprite2D
@onready var collision_shape = $CollisionShape2D

func _ready():
	area_entered.connect(_on_area_entered)
	setup_bullet_appearance()

func setup(start_position, start_direction):
	position = start_position
	direction = start_direction.normalized()
	rotation = direction.angle() + PI/2

func _process(delta):
	position += direction * speed * delta
	timer += delta
	
	if timer >= lifetime:
		queue_free()
	
	# Remove if off screen
	var viewport_size = get_viewport().get_visible_rect().size
	if position.x < -50 or position.x > viewport_size.x + 50 or \
	   position.y < -50 or position.y > viewport_size.y + 50:
		queue_free()

func hit_target(target):
	hit_asteroid.emit(self, target)

func _on_area_entered(area):
	# Hit an asteroid
	if area.get_parent().has_method("destroy"):
		hit_asteroid.emit(self, area.get_parent())

func setup_bullet_appearance():
	# Space-themed bright cyan energy bullet
	sprite.modulate = Color(0.3, 0.8, 1.0, 1.0)  # Bright cyan energy