var City = (
	// DOM elements
	// array of elements!
	function()
	{
		var city = {};
		var wares = {};
		var utility = {};
		return {
			initialize: function()
			{
				// create buildings
				
				for (let building in buildings)
				{
					city[building] = 0;
				}
				
				// create wares
				for (let ware in resources)
				{
					wares[ware] = 0;
				}
				
				// create utilities
				for (let index in utilities)
				{
					Engine.log(index);
					utility[index] = {capacity: 0,demand: 0};
				}
			},
			
			add_building: function(name, number)
			{
				if (city[name] || city[name] === 0) // so that even if city[name] is 0, it will still register
				{
					city[name] = city[name] + number;
					// also do DOM
					MPM.set_number(name+"_display_number",city[name]);
				}
				return city[name];
			},
			
			add_ware: function(name, number)
			{
				if (wares[name] || wares[name] === 0) // so that even if wares[name] is 0, it will still register
				{
					wares[name] = wares[name] + number;
					// also do DOM
					MPM.set_number(name+"_display_number",wares[name]);
				}
				return wares[name];
			},
			
			add_utility_capacity: function(name, number)
			{
				if (utility[name] || utility[name] === 0) // so that even if utility[name] is 0, it will still register
				{
					utility[name].capacity = utility[name].capacity + number;
					// also do DOM
					MPM.set_number(name+"_display_number_maximum",utility[name].capacity);
				}
				return utility[name];
			},
			
			add_utility_demand: function(name, number)
			{
				if (utility[name] || utility[name] === 0) // so that even if utility[name] is 0, it will still register
				{
					utility[name].demand = utility[name].demand + number;
					// also do DOM
					MPM.set_number(name+"_display_number",utility[name].demand);
				}
				return utility[name];
			},
			// debugging dump 
			get_wares: function()
			{
				return wares;
			},
			
			get_buildings: function()
			{
				return city;
			},
			
			get_utilities: function()
			{
				return utility;
			},
		}
	} // 
)();