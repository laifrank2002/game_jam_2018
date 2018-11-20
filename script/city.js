var City = (
	// DOM elements
	// array of elements!
	function()
	{
		var INCOME_INTERVAL = 1000;
		var INCOME_RATE = 1;
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
				// set intervals
				setInterval(City.income,INCOME_INTERVAL);
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
			// this is the one that should be used when buying by the user, not by any events
			buy_building: function(name)
			{
				let cost = buildings[name].buy();
				// check first
				for (let ware in cost)
				{
					if (City.get_ware(ware) < cost[ware])
					{
						Engine.notify("Not enough " + resources[ware].name + ".");
						return;
					}
				}
				// check max
				if (city[name] >= buildings[name].maximum)
				{
					Engine.notify(buildings[name].max_message);
					return;
				}
				// subtract
				for (let ware in cost)
				{
					City.add_ware(ware, -cost[ware]);
				}
				// add
				City.add_building(name,1);
				Engine.notify(buildings[name].build_message);
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
			
			get_ware: function(name)
			{
				return wares[name];
			},
			get_building: function(name)
			{
				return city[name];
			},
			get_utility: function(name)
			{
				return utility[name];
			},
			// mining
			mine_resources: function()
			{
				// finite resources
				
				// random gain checks
				City.add_ware("ore",Math.floor(Math.random()*10));
				City.add_ware("silicon",Math.floor(Math.random()*2));
				City.add_ware("plastic",Math.floor(Math.random()*3));
				if(Math.floor(Math.random()*11)>9)
				{
					City.add_ware("battery",1);
					Engine.notify("Found a nice battery just sitting there.");
				}
			},
			
			// income
			income: function()
			{
				// goes through all buildings and performs income actions
				for (let building in city)
				{

					for (let count = 0; count < city[building]; count++)
					{
						buildings[building].produce();
					}

				}
				Engine.log("incomed");
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