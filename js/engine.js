var Engine = (function() {
    //new hybrid engine! Wow!
    //the goal: put both engines into one file,
    //and hope to minify the impact of everything else
    //****PLEASE RIGOUROUSLY TEST BEFORE DECIDING IF YOU LIKE IT****//
    
    /*------- the core parts of the engine -------*/
    
    //insert stuff here
    
    /*------- for the ADR part -------*/
    
    //insert stuff here, Frank
    
    /*--------for the Everyone's Sky part -------*/
    //data
    var ships = [], projectiles = [], planets = [], resources = [];
    
    var exploring = true;
    
    //to keep track of animation time
    var last_time = null, lapse = 0, paused = false;
    
    //canvas and its context
    var canvas, context;
    
    //handles key presses; to help remove and add event handlers
    //left: 37, right: 39, up: 38, down: 40
    //   a: 65,     d: 68,  w: 87,    s: 83
    function key_down_event(e) {
        e.preventDefault();
        switch (e.keyCode) {
            case 37:
            case 65:
                //left key: rotate shiop counter-clockwise
                Player_ship.rot_left = true;
                Engine.log("LEFT key pressed.");
                break;
            case 39:
            case 68:
                //right key: rotate ship clockwise
                Player_ship.rot_right = true;
                Engine.log("RIGHT key pressed");
                break;
            case 38:
            case 87:
                //up key: move forward
                Player_ship.forward = true;
                Engine.log("FORWARD key pressed.");
                break;
            case 40:
            case 83:
                //down key: reverse, somehow
                Player_ship.reverse = true;
                Engine.log("BACKWARD key pressed.");
                break;
        }
    }
    
    function key_up_event(e) {
        e.preventDefault();
        switch (e.keyCode) {
            case 37:
            case 65:
                //left key: rotate shiop counter-clockwise
                Player_ship.rot_left = false;
                Engine.log("LEFT key pressed.");
                break;
            case 39:
            case 68:
                //right key: rotate ship clockwise
                Player_ship.rot_right = false;
                Engine.log("RIGHT key pressed");
                break;
            case 38:
            case 87:
                //up key: move forward
                Player_ship.forward = false;
                Engine.log("FORWARD key pressed.");
                break;
            case 40:
            case 83:
                //down key: reverse, somehow
                Player_ship.reverse = false;
                Engine.log("BACKWARD key pressed.");
                break;
        }
    }
    
    return {
        _log: true,
        log: function(msg) {
            if (this._log) {
                console.log(msg);
            }
        },
        
        /*------- ADR components -------*/
        //Frank, add stuff that needs to be visible here
        initialize: function() {        
            MPM.initialize();
            City.initialize();
            Engine.notify("It is a cold night, isn't it?");
        },
        
        notify: function(message) {
            // auto clear 
            if (message_panel.childNodes.length > 40 ) {
                message_panel.removeChild(message_panel.childNodes[9]);
            }

            var new_message         = document.createElement("DIV");
            var message_attribute   = document.createAttribute("class");
            message_attribute.value = "message";
            new_message.setAttributeNode(message_attribute);

            var message_text = document.createTextNode(message);
            new_message.appendChild(message_text);

            message_panel.insertBefore(new_message, message_panel.childNodes[0]);
        },
        
        /*------- Everyone's sky components -------*/
        init_explore: function(canv, canv_width, canv_height) {
            //Frank, give this function a canvas element, a width and a height
            canvas        = canv;
            canvas.width  = canv_width;
            canvas.height = canv_height;
            context       = canvas.getContext("2d");
            
            //you'll need to activate the event handlers seperately
        },
        
        draw_screen: function(lapse) {
            //clear the canvas first
            context.clearRect(0, 0, Engine.canvas_x, Engine.canvas_y);
            
            context.fillStyle = "rgb(0, 0, 0)";
            context.fillRect(0, 0, Engine.canvas_x, Engine.canvas_y);
            
            //animation code
            Player_ship.get_new_position(lapse);
            Player_ship.draw(context);
        },
        
        animate: function(time) {
            if (last_time == null) {
                lapse = 0;
            } else {
                lapse = time - last_time;
            }
            
            last_time = time;
            
            if (!paused) {
                Engine.draw_screen(lapse);
            }
            
            requestAnimationFrame(Engine.animate);
        },
        
        toggle_pause: function() { paused = !paused; },
    
        activate_keys: function() {
            //activates keys' event handlers
            addEventListener("keydown", key_down_event);
            addEventListener("keyup", key_up_event);
        },
        
        deactivate_keys: function() {
            //deactivates keys' event handlers
            removeEventListener("keydown", key_down_event);
            removeEventListener("keyup", key_up_event);
        },
        
        //getters: these will be visible, but not directly changeable
        get ships() { return ships; },
        get projectiles() { return projectiles; },
        get planets() { return planets; },
        get resources() { return resources; },
        
        get canvas_x() { return canvas.width; },
        get canvas_y() { return canvas.height; },
    };
})();