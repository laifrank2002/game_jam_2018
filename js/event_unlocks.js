// Events, prewritten script neatly bunched up here.
// Trigger: some condition.
var events = {
	
	// CASCADING INIT
	"initialize":
	{
		"trigger": function()
		{
			return true;
		},
		
		"event": function()
		{
			MPM.append_build_panel(
				MPM.create_button("Hello",
					function()
					{
						Engine.notify("Hi");
						MPM.remove_element("hello_button");
						events["initialize_solar_panel_pickup"]["event"]();
					},"hello_button",["light_button"]));
			//
		}
	},
	
	"initialize_solar_panel_pickup":
	{
		"trigger": function()
		{
			
		},
		
		"event": function()
		{
			let solar_panels = 2;
			let pickup_button = MPM.create_button("A Solar Panel",
				function()
				{
					Engine.notify("Yup, that's a solar panel alright. " + (solar_panels-1) + " more left.")
					solar_panels -= 1;
					City.add_ware("photovoltaic_panel",1);
					if(solar_panels <= 0)
					{
						MPM.remove_element("pickup_button");
						events["initialize_solar_panel_setup"]["event"]();
					}
					MPM.time_out(pickup_button, MPM.DEFAULT_COOLDOWN);
				},"pickup_button",["light_button"]);
			MPM.append_build_panel(pickup_button);
		}
	},
	
	"initialize_solar_panel_setup":
	{
		"trigger": function()
		{
			
		},
		
		"event": function()
		{
			let bot_button = MPM.create_button("Build a bot"
				,function()
				{
					City.buy_building("minerbot");
				}
				,"initialize_build_bot_button",["light_button"]
				,MPM.create_tooltip(JSON.stringify(buildings["minerbot"].buy())));
			build_panel.appendChild(MPM.disable(bot_button));
			build_panel.appendChild(MPM.create_button("Set it up"
				,function()
				{
					if(City.buy_building("solar_panel"))
					{
					}
					if(!City.get_ware("photovoltaic_panel").number)
					{
						MPM.remove_element('initialize_solar_panel_setup_button');	
						Engine.notify("A little more to the right?");
						Engine.notify("That's all of them.");
						Engine.notify("Hey! Look! There's some shiny rocks on the ground.");
						events["initialize_mining"]["event"]();
					}
					
				}
				,"initialize_solar_panel_setup_button",["light_button"]));
		}
	},
	
	"initialize_mining": 
	{
		"trigger": function()
		{
			
		},
		
		"event": function()
		{
			var mine_button = MPM.create_button("Mine"
				,function()
				{
					City.mine_resources();
					MPM.time_out(mine_button,MPM.MINING_COOLDOWN);
					
				}
				,"mine_button",["light_button"]);
			build_panel.appendChild(mine_button);
			Engine.add_trigger("initialize_bot_button");
			Engine.add_trigger("initialize_trade_solar_panel");
			Engine.add_trigger("unlock_iron_smelter");
			
		}
	},
	
	"initialize_bot_button":
	{
		"trigger": function()
		{
			if (City.get_ware("ore").number>=50)
			{
				return true;
			}
			return false;
		},
		
		"event": function()
		{
			MPM.enable(MPM.get_button("initialize_build_bot_button"));
			Engine.remove_trigger("initialize_bot_button");
		}
	},
	
	"initialize_trade_solar_panel":
	{
		"trigger": function()
		{
			if (City.get_ware("battery").number>=10)
			{
				return true;
			}
			return false;
		},
		
		"event": function()
		{
			Engine.notify("A strange old woman appears out of the fog. She wants 100 ore and 10 batteries, she says she can find some solar panels.");
			var trade_button = MPM.create_button("Solar Panels"
				,function()
				{
					if(City.get_ware("battery").number >= 10 && City.get_ware("ore").number >= 100)
					{
						City.add_ware("battery",-10);
						City.add_ware("ore",-100);
						City.add_ware("photovoltaic_panel",1);
					}
				}
				,"trade_button",["light_button"]
				,MPM.create_tooltip("100 ore and 10 batteries for 1 solar panel."));
			build_panel.appendChild(trade_button);
			
			build_panel.appendChild(MPM.create_button("Set up a solar panel"
				,function()
				{
					if(City.buy_building("solar_panel")){
						Engine.notify("A little more to the right?");		
					}
				}
				,"initialize_solar_panel_setup_button2",["light_button"]));
			
			Engine.remove_trigger("initialize_trade_solar_panel");
			
		}
	},
	
	"unlock_iron_smelter":
	{
		"trigger": function()
		{
			if (City.get_ware("raw_iron").number >= 100)
			{
				return true;
			}
			return false;
		},
		
		"event": function()
		{
			var button = MPM.create_button("Iron Smelter"
				,function()
				{
					City.buy_building("iron_smelter");
				}
				,"buy_iron_smelter",["light_button"]
				,MPM.create_tooltip(JSON.stringify(buildings["iron_smelter"].buy())));
			build_panel.appendChild(button);
			Engine.remove_trigger("unlock_iron_smelter");
			Engine.add_trigger("unlock_mining_depot");
			Engine.add_trigger("unlock_solar_distiller");
			Engine.add_trigger("unlock_helium_collector");
		}
	},
	
	"unlock_mining_depot":
	{
		"trigger": function()
		{
			if (City.get_ware("iron").number >= 100)
			{
				return true;
			}
			return false;
		},
		
		"event": function()
		{
			var button = MPM.create_button("Bot Depot"
				,function()
				{
					City.buy_building("mining_depot");
				}
				,"buy_mining_depot",["light_button"]
				,MPM.create_tooltip(JSON.stringify(buildings["mining_depot"].buy())));
			build_panel.appendChild(button);
			Engine.remove_trigger("unlock_mining_depot");
		}
	},
	
	"unlock_solar_distiller":
	{
		"trigger": function()
		{
			if (City.get_ware("iron").number >= 200)
			{
				return true;
			}
			return false;
		},
		
		"event": function()
		{
			var button = MPM.create_button("Distiller"
				,function()
				{
					City.buy_building("solar_distiller");
				}
				,"buy_solar_distiller",["light_button"]
				,MPM.create_tooltip(JSON.stringify(buildings["solar_distiller"].buy())));
			build_panel.appendChild(button);
			Engine.remove_trigger("unlock_solar_distiller");
		}
	},
	
	"unlock_helium_collector":
	{
		"trigger": function()
		{
			if (City.get_ware("iron").number >= 100)
			{
				return true;
			}
			return false;
		},
		
		"event": function()
		{
			var button = MPM.create_button("Helium Collector"
				,function()
				{
					City.buy_building("helium_collector");
				}
				,"buy_helium_collector",["light_button"]
				,MPM.create_tooltip(JSON.stringify(buildings["helium_collector"].buy())));
			build_panel.appendChild(button);
			Engine.remove_trigger("unlock_helium_collector");
			Engine.add_trigger("unlock_helium_fusion_plant");
		}
	},
	
	"unlock_helium_fusion_plant":
	{
		"trigger": function()
		{
			if (City.get_ware("helium3").number >= 1000)
			{
				return true;
			}
			return false;
		},
		
		"event": function()
		{
			var button = MPM.create_button("Fusion Plant"
				,function()
				{
					City.buy_building("helium_fusion_plant");
				}
				,"buy_helium_fusion_plant",["light_button"]
				,MPM.create_tooltip(JSON.stringify(buildings["helium_fusion_plant"].buy())));
			build_panel.appendChild(button);
			Engine.remove_trigger("unlock_helium_fusion_plant");
		}
	},
}