extends GPUParticles2D

func _ready():
	# Tone down explosion effects for less visual clutter
	setup_explosion_effects()
	
	# Auto-remove after lifetime + 1 second
	var timer = Timer.new()
	add_child(timer)
	timer.wait_time = lifetime + 1.0
	timer.one_shot = true
	timer.timeout.connect(queue_free)
	timer.start()

func setup_explosion_effects():
	# Set explosion properties with absolute values to prevent shrinking over time
	amount = 30  # Fixed particle count (down from default ~50)
	lifetime = 1.5  # Fixed lifetime (down from default ~2.0)
	
	var particle_material = process_material as ParticleProcessMaterial
	if particle_material:
		# Set absolute scale values instead of multiplying existing ones
		particle_material.scale_min = 0.4  # Fixed minimum scale
		particle_material.scale_max = 0.8  # Fixed maximum scale
		
		# Set absolute velocity values
		particle_material.initial_velocity_min = 60.0  # Fixed minimum velocity
		particle_material.initial_velocity_max = 120.0  # Fixed maximum velocity
		
		# Space-themed explosion colors - bright cyan-white for energy burst
		particle_material.color = Color(0.7, 0.9, 1.0, 0.9)  # Bright cyan-white energy