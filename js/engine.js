// 0.30 hybrid build Alpha (ADR) branch

var Engine = (function() {
    //new hybrid engine! Wow!
    //the goal: put both engines into one file,
    //and hope to minify the impact of everything else
    
    /*------- the core parts of the engine -------*/
    
    // events
    var triggers = [];
    /*------- for the ADR part -------*/
    
    
    //data
    var triggers = [];
    
    /*--------for the Everyone's Sky part -------*/
    //data
    var ships = [], projectiles = [], asteroids = [], resources = [];
    
    var exploring = true;
    
    // event_listener for all the events 
    
    //to keep track of animation time
    var last_time = null, lapse = 0, paused = false;
    
    //canvas and its context
    var canvas, context;
    
    //handles key presses; to help remove and add event handlers
    //left: 37, right: 39, up: 38, down: 40
    //   a: 65,     d: 68,  w: 87,    s: 83, space: 32
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
            case 32:
                //space: fire blasters (pew pew)
                Player_ship.fire = true;
                Engine.log("FIRE key pressed.");
        }
    }
    
    function key_up_event(e) {
        e.preventDefault();
        switch (e.keyCode) {
            case 37:
            case 65:
                Player_ship.rot_left = false;
                break;
            case 39:
            case 68:
                Player_ship.rot_right = false;
                break;
            case 38:
            case 87:
                Player_ship.forward = false;
                break;
            case 40:
            case 83:
                Player_ship.reverse = false;
                break;
            case 32:
                Player_ship.fire = false;
                break;
            case 66:
                Engine.asteroids.push(new Asteroid(Math.random() * Engine.canvas_x, Math.random() * Engine.canvas_y, 1, 1));
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
            
            // Set triggers
            setInterval(Engine.check_triggers,1000);
        },
        
        notify: function(message) {
            // auto clear 
            if (message_panel.childNodes.length > 20 ) {
                message_panel.removeChild(message_panel.childNodes[19]); // keeping the glass pane alive and well.
            }

            var new_message         = document.createElement("DIV");
            var message_attribute   = document.createAttribute("class");
            message_attribute.value = "message";
            new_message.setAttributeNode(message_attribute);

            var message_text = document.createTextNode(message);
            new_message.appendChild(message_text);

            message_panel.insertBefore(new_message, message_panel.childNodes[0]);
        },
        
        /* do not use.
        add_trigger: function(trigger) {
            triggers.push(trigger);
            Engine.log("added a trigger.");
        },
        
        remove_trigger: function(trigger) {
            triggers.filter(function(t) {
                return t != trigger;
            });
            
            Engine.log("a trigger has been removed.");
        },
        
        check_triggers: function() {
            triggers.forEach(function(t) {
                t();
            });
        }, */
        
        /*------- Everyone's sky components -------*/
        init_explore: function(canv, canv_width, canv_height) {
            paused = false;
            
            //Frank, give this function a canvas element, a width and a height
            canvas        = canv;
            canvas.width  = canv_width;
            canvas.height = canv_height;
            context       = canvas.getContext("2d");
            
            //you'll need to activate the event handlers seperately
        },
        
        deact_explore: function() {
            paused = true;
            //you need to deactivate the event handlers seperately
            
            Engine.log("explore has been deactivated.");
        },
        
        draw_screen: function(lapse) {
            //clear the canvas first
            context.clearRect(0, 0, Engine.canvas_x, Engine.canvas_y);
            
            context.fillStyle = "rgb(0, 0, 0)";
            context.fillRect(0, 0, Engine.canvas_x, Engine.canvas_y);
            
            //animation code below
            
            //draw everything else first
            //draw the asteroids
            asteroids = asteroids.filter(function(a) { return a.active; });
            asteroids.forEach(function(a) {
                a.get_new_position(lapse);
                a.draw(context);
            });
            
            //draw projectiles
            projectiles = projectiles.filter(function(p) { return p.active; });
            projectiles.forEach(function(p) {
                p.get_new_position(lapse);
                p.draw(context);
            });
            
            //draw the resource sprites
            resources = resources.filter(function (r) { return r.active; });
            resources.forEach(function(r) {
                r.get_new_position(lapse);
                r.draw(context);
            });
            
            //draw the player's ship last
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
                requestAnimationFrame(Engine.animate);
            } else {
                Engine.log("next animation frame NOT requested.");
                last_time = null;
            }
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
        
        // events, triggers
        add_trigger: function(event_name) {
            triggers.push(event_name);
        },
        
        remove_trigger: function(event_name) {
            // search and delete 
            for(let index in triggers)
            {
                if (triggers[index] === event_name)
                {
                    triggers.splice(index, index+1);
                    return;
                }
            }
        },
        
        // regularly intervaled checkers 
        check_triggers: function() {
            for(let index in triggers)
            {
                if (triggers[index])
                {
                    if(events[triggers[index]]["trigger"]())
                    {
                        events[triggers[index]]["event"]();
                        Engine.log("Event " + triggers[index] + " has been triggered.");
                    }
                }
            }
        },
        
        //getters: these will be visible, but not directly changeable
        get ships() { return ships; },
        get projectiles() { return projectiles; },
        get asteroids() { return asteroids; },
        get resources() { return resources; },
        
        get canvas_x() { return canvas.width; },
        get canvas_y() { return canvas.height; },
    };
})();