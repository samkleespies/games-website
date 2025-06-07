extends Node2D

var stars = []
var star_count = 150  # More stars for better space feel

func _ready():
	generate_stars()

func generate_stars():
	var viewport_size = get_viewport().get_visible_rect().size
	
	for i in range(star_count):
		var star = {
			"position": Vector2(randf() * viewport_size.x, randf() * viewport_size.y),
			"brightness": randf_range(0.1, 0.8),  # Dimmer stars for space feel
			"size": randf_range(0.5, 2.0),  # Smaller, more realistic stars
			"color_type": randi() % 4  # Different star colors
		}
		stars.append(star)

func _draw():
	# Draw deep space background
	draw_rect(get_viewport().get_visible_rect(), Color(0.02, 0.02, 0.05))  # Very dark blue-black space
	
	# Draw stars with varied colors
	for star in stars:
		var color: Color
		match star.color_type:
			0: color = Color(0.9, 0.9, 1.0)    # Cool white-blue
			1: color = Color(1.0, 0.95, 0.8)   # Warm white-yellow  
			2: color = Color(0.8, 0.9, 1.0)    # Blue giant
			_: color = Color(1.0, 0.9, 0.9)    # Red giant
		
		color.a = star.brightness
		draw_circle(star.position, star.size, color)