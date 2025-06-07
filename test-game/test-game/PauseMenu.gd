extends Control

signal resume_requested
signal exit_requested

@onready var resume_button = $CenterContainer/VBoxContainer/ResumeButton
@onready var options_button = $CenterContainer/VBoxContainer/OptionsButton
@onready var exit_button = $CenterContainer/VBoxContainer/ExitButton
@onready var options_menu = $OptionsMenu
@onready var display_mode_option = $OptionsMenu/CenterContainer/VBoxContainer/DisplayModeContainer/DisplayModeOption
@onready var resolution_option = $OptionsMenu/CenterContainer/VBoxContainer/ResolutionContainer/ResolutionOption
@onready var back_button = $OptionsMenu/CenterContainer/VBoxContainer/BackButton

var resolutions = [
	Vector2i(1152, 648),   # 16:9 - Default
	Vector2i(1280, 720),   # HD
	Vector2i(1920, 1080),  # Full HD
	Vector2i(2560, 1440),  # 2K
	Vector2i(3840, 2160)   # 4K
]

func _ready():
	# Connect button signals
	resume_button.pressed.connect(_on_resume_pressed)
	options_button.pressed.connect(_on_options_pressed)
	exit_button.pressed.connect(_on_exit_pressed)
	back_button.pressed.connect(_on_back_pressed)
	
	# Setup display mode options
	display_mode_option.add_item("Windowed")
	display_mode_option.add_item("Borderless Fullscreen")
	display_mode_option.add_item("Exclusive Fullscreen")
	display_mode_option.item_selected.connect(_on_display_mode_changed)
	
	# Setup resolution options
	for i in range(resolutions.size()):
		var res = resolutions[i]
		resolution_option.add_item(str(res.x) + "x" + str(res.y))
	resolution_option.item_selected.connect(_on_resolution_changed)
	
	# Set current selections
	_update_current_settings()

func _update_current_settings():
	# Set current display mode
	var current_mode = DisplayServer.window_get_mode()
	match current_mode:
		DisplayServer.WINDOW_MODE_WINDOWED:
			display_mode_option.selected = 0
		DisplayServer.WINDOW_MODE_FULLSCREEN:
			if DisplayServer.window_get_flag(DisplayServer.WINDOW_FLAG_BORDERLESS):
				display_mode_option.selected = 1
			else:
				display_mode_option.selected = 2
		_:
			display_mode_option.selected = 0
	
	# Set current resolution
	var current_size = DisplayServer.window_get_size()
	for i in range(resolutions.size()):
		if resolutions[i] == current_size:
			resolution_option.selected = i
			break

func _on_resume_pressed():
	resume_requested.emit()

func _on_options_pressed():
	options_menu.visible = true

func _on_exit_pressed():
	exit_requested.emit()

func _on_back_pressed():
	options_menu.visible = false

func _on_display_mode_changed(index: int):
	match index:
		0: # Windowed
			DisplayServer.window_set_mode(DisplayServer.WINDOW_MODE_WINDOWED)
			DisplayServer.window_set_flag(DisplayServer.WINDOW_FLAG_BORDERLESS, false)
		1: # Borderless Fullscreen
			DisplayServer.window_set_flag(DisplayServer.WINDOW_FLAG_BORDERLESS, true)
			DisplayServer.window_set_mode(DisplayServer.WINDOW_MODE_FULLSCREEN)
		2: # Exclusive Fullscreen
			DisplayServer.window_set_flag(DisplayServer.WINDOW_FLAG_BORDERLESS, false)
			DisplayServer.window_set_mode(DisplayServer.WINDOW_MODE_FULLSCREEN)

func _on_resolution_changed(index: int):
	if index < resolutions.size():
		var new_size = resolutions[index]
		DisplayServer.window_set_size(new_size)
		# Center the window if in windowed mode
		if DisplayServer.window_get_mode() == DisplayServer.WINDOW_MODE_WINDOWED:
			var screen_size = DisplayServer.screen_get_size()
			var window_pos = (screen_size - new_size) / 2
			DisplayServer.window_set_position(window_pos)