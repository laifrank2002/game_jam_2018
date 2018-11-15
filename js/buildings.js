// def assets in JSON
var buildings = {
	'solar_panel': {
		'name': "Solar Panel",	
		'button': null,
		'maximum': 10,
		'tooltip_message': "What a nice solar panel.",
		'build_message': "One small step, one giant leap, blah blah blah.",
		'max_message': "That's about all the free space there is to set up these darn things.",
		'buy': function()
		{
			return {
				'photovoltaic_panel': 1,
			};
		},
		'produce': function()
		{
		},
	},
	
	'minerbot': {
		'name': "Automatic Mining Rover",
		'button': null,
		'maximum': 3,
		'tooltip_message': "Mines ores automatically.",
		'build_message': "Good bot.",
		'max_message': "Any more and they'll crash into each other!",
		'buy': function()
		{
			return {
				'ore': 50,
				'silicon': 5,
				'plastic': 25,
			};
		},
		'produce': function()
		{
			City.mine_resources();
		},
	},
}