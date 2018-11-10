var City = (
	// DOM elements
	// array of elements!
	function()
	{
		var city = {};
		var wares = {};
		
		return {
			initialize: function()
			{
				// create buildings
				
				for (var building in buildings)
				{
					city[building] = 0;
				}
				
				// create wares
				for (var ware in resources)
				{
					Engine.log(ware);
					wares[ware] = 0;
				}
				
			},
			
			add_building: function(name, number)
			{
				if (city[name] || city[name] === 0) // so that even if wares[name] is 0, it will still register
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
			
			// debugging dump 
			get_wares: function()
			{
				return wares;
			},
			
			get_buildings: function()
			{
				return city;
			},
		}
	} // 
)();