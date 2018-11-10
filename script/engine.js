var Engine = {
	_log: true,
	
	initialize: function()
	{
		MPM.initialize();
		City.initialize();
		Engine.notify("It is a cold night, isn't it?");
	},

	log: function(message)
	{
		if(Engine._log)
		{
			console.log(message);
		}
	},
	
	notify: function(message)
	{
		// auto clear 
		if (message_panel.childNodes.length > 40 ) {
            message_panel.removeChild(message_panel.childNodes[9]);
        }

        var new_message = document.createElement("DIV");
        var message_attribute = document.createAttribute("class");
        message_attribute.value = "message";
        new_message.setAttributeNode(message_attribute);

        var message_text = document.createTextNode(message);
        new_message.appendChild(message_text);

        message_panel.insertBefore(new_message, message_panel.childNodes[0]);
	},
	
};