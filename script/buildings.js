// def assets in JSON
var buildings = {
	'solar_panel': {
		'name': "Photovoltaic Solar Panel",	
		'button': null,
		'maximum': 10,
		'build_message': "One small step, one giant leap, blah blah blah.",
		'max_message': "That's about all the free space there is to set up these darn things.",
		'buy': function()
		{
			return {
				'photovoltaic_panel': 1,
			};
		}
	}
}