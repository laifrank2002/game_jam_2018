var MPM = (
	function ()
	{
		var DEF_PANEL = "main_panel";
		var panel;
		// references
		var build_panel;
		var display_panel;
		var resources_panel;
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
									build_panel.appendChild(MPM.create_button("Set it up somewhere"
									,function()
									{
										City.add_building("solar_panel",1);
										Engine.notify("A little more to the right?");
										if(!City.add_ware("photovoltaic_panel",-1))
										{
											MPM.remove_element('test3');	
											Engine.notify("That's all of them.");
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
				// DO AUTO LATER
				resources_panel.appendChild(MPM.create_display("Photovoltaic Panels","photovoltaic_panel_display",["display"]));
				// buildings panel
				buildings_panel = MPM.create_panel("buildings_panel",["panel","resource_panel"]);
				// DO AUTO LATER TOO
				buildings_panel.appendChild(MPM.create_display("Solar Panels","solar_panel_display",["display"]));
				display_panel.appendChild(resources_panel);
				display_panel.appendChild(buildings_panel);
				// main 
				panel.appendChild(build_panel);
				panel.appendChild(display_panel);
			},
			
			// DOM Managers
			
			remove_element: function(button_id)
			{
				if(document.getElementById(button_id))
				{
					document.getElementById(button_id).parentNode.removeChild(document.getElementById(button_id));
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
			
			create_button: function(button_text,button_function,button_id,button_class)
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
				button_element.onclick = button_function;
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
			
			// display
			create_display: function(display_name, display_id, display_class)
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