var MPM = (
	function ()
	{
		var MINING_COOLDOWN = 50;
		
		var DEF_PANEL = "main_panel";
		var panel;
		// references
		var build_panel;
		var display_panel;
		var resources_panel;
		var utilities_panel;
		var buildings_panel;
		return {
			initialize: function()
			{
				panel = document.getElementById("main_panel");
				// build_panel
				build_panel = MPM.create_panel("build_panel",["panel"]);
				
				// I should overhaul this nesting thing, presumably with scenes or something, we'll see
				build_panel.appendChild(MPM.create_button("Hello"
					,function(){
						let solar_panels = 2;
						let bot_button;
						Engine.notify('Hi.');
						MPM.remove_element('test')
						build_panel.appendChild(MPM.create_button("A solar panel"
							,function()
							{
								Engine.notify("Yup, that's a solar panel alright. " + (solar_panels-1) + " more left.")
								solar_panels -= 1;
								City.add_ware("photovoltaic_panel",1);
								if(solar_panels <= 0)
								{
									MPM.remove_element('test2');
									bot_button = MPM.create_button("Build a bot"
										,function()
										{
											City.buy_building("minerbot");
										}
										,"build_bot_button",["light_button"]
										,MPM.create_tooltip(JSON.stringify(buildings["minerbot"].buy())));
									build_panel.appendChild(MPM.disable(bot_button));
									build_panel.appendChild(MPM.create_button("Set it up"
									,function()
									{
										City.buy_building("solar_panel");
										Engine.notify("A little more to the right?");
										City.add_utility_capacity("energy",1);
										if(!City.get_ware("photovoltaic_panel",-1))
										{
											MPM.remove_element('test3');	
											Engine.notify("That's all of them.");
											Engine.notify("Hey! Look! There's some shiny rocks on the ground.");
											var mine_button = MPM.create_button("Mine"
												,function()
												{
													City.mine_resources();
													MPM.time_out(mine_button,MINING_COOLDOWN);
													if (City.get_ware("ore")>50)
													{
														MPM.enable(bot_button);
													}
												}
												,"mine_button",["light_button"]);
											build_panel.appendChild(mine_button);
										}
										
									}
									,"test3",["light_button"]));
								}
							}
							,"test2",["light_button"]));}
					,"test",["light_button"]));
				
				// display panel
				display_panel = MPM.create_panel("display_panel",["panel"]);
				
				// resources panel
				resources_panel = MPM.create_panel("resources_panel",["panel","resource_panel"]);
				for (let index in resources)
				{
					resources_panel.appendChild(MPM.create_display(resources[index].name,index+"_display",["display"],MPM.create_tooltip(resources[index].tooltip_message,index+"_display_tooltip",["tooltip","bottom","right"])));
				}
				// buildings panel
				buildings_panel = MPM.create_panel("buildings_panel",["panel","resource_panel"]);
				// DO AUTO LATER TOO
				for (let index in buildings)
				{
					buildings_panel.appendChild(MPM.create_display(buildings[index].name,index + "_display",["display"],MPM.create_tooltip(buildings[index].tooltip_message,index+"_display_tooltip",["tooltip","bottom","right"])));
				}
				
				// Utilities
				utilities_panel = MPM.create_panel("utilities_panel",["panel","resource_panel"]);
				// also do auto 
				for (let index in utilities)
				{
					let utility_num_max = MPM.create_number(index + "_display" + "_number_maximum", ["display_number"]);
					let utility_num = MPM.create_display(utilities[index].name,index + "_display",["display"],MPM.create_tooltip(utilities[index].tooltip_message,index+"_display_tooltip",["tooltip","bottom","right"]));
					utility_num.appendChild(document.createTextNode("/"));
					utility_num.appendChild(utility_num_max);
					utilities_panel.appendChild(utility_num);
				}
				
				display_panel.appendChild(resources_panel);
				display_panel.appendChild(buildings_panel);
				display_panel.appendChild(utilities_panel);
				
				// main 
				panel.appendChild(build_panel);
				panel.appendChild(display_panel);
			},
			
			// DOM Managers
			
			time_out: function(element,cooldown)
			{
				if (element)
				{
					MPM.add_class("disabled",element);
					element.disabled = true;
					setTimeout(function(){element.disabled = false;MPM.remove_class("disabled",element)},cooldown);
				}
				return element;
			},
			
			disable: function(element)
			{
				if (element)
				{
					MPM.add_class("disabled",element);
					element.disabled = true;
				}
				return element;
			},
			
			enable: function(element)
			{
				if (element)
				{
					MPM.remove_class("disabled",element);
					element.disabled = false;
				}
				return element;
			},
			
			remove_element: function(id)
			{
				if(document.getElementById(id))
				{
					document.getElementById(id).parentNode.removeChild(document.getElementById(id));
				}
			},
			
			set_id: function(id, element)
			{
				if (id)
				{
					if (!document.getElementById(id))
					{
						element.id = id;
					}
				}
			},
			
			add_class: function(element_class, element)
			{
				element.classList.add(element_class);
			},
			
			remove_class: function(element_class, element)
			{
				element.classList.remove(element_class);
			},
			
			create_button: function(button_text,button_function,button_id,button_class,tooltip)
			{
				var button_name = button_text || "";
				var button_classList = button_class;
				var button_element = document.createElement("div");
				if (button_id)
				{
					if (!document.getElementById(button_id))
					{
						button_element.id = button_id;
					}
				}
				else
				{
					// do nothing because there is no id to set
				}
				if (button_class)
				{
					for(let index = 0; index<button_class.length; index++)
					{
						button_element.classList.add(button_class[index]);
					}
				}
				button_element.innerHTML = button_name;
				button_element.addEventListener("click"
					, 
					function()
						{
						// disabled
							if (!this.disabled)
							{
							button_function();
							}
						}
					);
				Engine.log(tooltip);
				if (tooltip)
				{
					button_element.appendChild(tooltip);
				}
				return button_element;
			},
			
			create_panel: function(panel_id,panel_class)
			{
				var panel_element = document.createElement("div");
				if (panel_id)
				{
					if (!document.getElementById(panel_id))
					{
						panel_element.id = panel_id;
					}
				}
				else
				{
					// do nothing because there is no id to set
				}
				if (panel_class)
				{
					for(let index = 0; index<panel_class.length; index++)
					{
						panel_element.classList.add(panel_class[index]);
					}
				}
				return panel_element;
			},
			
			// turns most any light weight button into a progress bar! yay!
			set_button_progress: function()
			{
				
			},
			
			// ends this progress. yay!
			end_button_progress: function()
			{
				
			},
			// tooltip 
			create_tooltip: function(tooltip, tooltip_id, tooltip_class)
			{
				var tooltip_element = document.createElement("div");
				if (tooltip_id)
				{
					if (!document.getElementById(tooltip_id))
					{
						tooltip_element.id = tooltip_id;
					}
				}
				else
				{
					// do nothing because there is no id to set
				}
				if (tooltip_class)
				{
					for(let index = 0; index<tooltip_class.length; index++)
					{
						tooltip_element.classList.add(tooltip_class[index]);
					}
				}
				// auto add default class 
				tooltip_element.classList.add("tooltip");
				tooltip_element.innerHTML = tooltip;
				return tooltip_element;
			},
			
			// display
			create_display: function(display_name, display_id, display_class,tooltip)
			{
				var display_element = document.createElement("div");
				if (display_id)
				{
					if (!document.getElementById(display_id))
					{
						display_element.id = display_id;
					}
				}
				else
				{
					// do nothing because there is no id to set
				}
				if (display_class)
				{
					for(let index = 0; index<display_class.length; index++)
					{
						display_element.classList.add(display_class[index]);
					}
				}
				display_element.innerHTML = display_name + ": ";
				// auto create number class and append 
				display_element.append(MPM.create_number(display_id + "_number", ["display_number"]));
				// tooltip
				if (tooltip)
				{
					display_element.appendChild(tooltip);
				}
				return display_element;
			},
			
			// updatable number element
			create_number: function(number_id, number_class)
			{
				var number_element = document.createElement("span");
				if (number_id)
				{
					if (!document.getElementById(number_id))
					{
						number_element.id = number_id;
					}
				}
				else
				{
					// do nothing because there is no id to set
				}
				if (number_class)
				{
					for(let index = 0; index<number_class.length; index++)
					{
						number_element.classList.add(number_class[index]);
					}
				}
				number_element.innerHTML = "0";
				return number_element;
			},
			
			set_number: function(number_id, value)
			{
				if(document.getElementById(number_id))
				{
					document.getElementById(number_id).innerHTML = value;
				}
			},
		} //
	}
)();