// 0.30 hybrid build Alpha (ADR) branch

var Engine = (function() {
    //new hybrid engine! Wow!
    //the goal: put both engines into one file,
    //and hope to minify the impact of everything else
    var MAIN_HEIGHT = 700;
    var MAIN_WIDTH  = 700;
    /*------- for the ADR part -------*/
    //data
    var triggers = [];
    var event_global = [];
    
    
    /*--------for the Everyone's Sky part -------*/
    //data
    var ships = [], projectiles = [], asteroids = [], resources = [];
    
    var exploring = false;
    
    //to keep track of animation time
    var last_time = null, lapse = 0, paused = false;
    
    //canvas and its context
    var canvas, context;
    
    //map size, viewport and their properties
    var map_size = {
        //for testing purposes, 1000 by 1000.
        x: 5000,
        y: 5000,
    };
    
    var viewport = {
        width: 0,
        height: 0,
        top_left_x: 0,
        top_left_y: 0,
        bot_right_x: 0,
        bot_right_y: 0,
        
        scroll_player_to_view: function() {
            this.top_left_x = Player_ship.pos.x - this.width / 2;
            this.top_left_y = Player_ship.pos.y - this.height /2 ;
            
            //make sure the dimensions aren't outside of the map
            this.top_left_x = Math.max(this.top_left_x, 0);
            this.top_left_y = Math.max(this.top_left_y, 0);
            
            this.top_left_x = Math.min(this.top_left_x, map_size.x - this.width);
            this.top_left_y = Math.min(this.top_left_y, map_size.y - this.height);
            
            this.bot_right_x = this.top_left_x + this.width;
            this.bot_right_y = this.top_left_x + this.height;
        },
        
        is_in_view: function(o, h, v) {
            var h_offset = h;
            var v_offset = v;
            
            return (
                o.x + h_offset > this.top_left_x &&
                o.x - h_offset < this.bot_right_x &&
                o.y + v_offset > this.top_left_y &&
                o.y - v_offset < this.bot_right_y
            );
        },
        
        get objects_in_view() {
            var v = this;
            //arrange them in the order they're being drawn
            var ast = asteroids.filter(function(a) {
                return v.is_in_view(a, -a.horizontal_offset, -a.vertical_offset);
            });
            
            var res = resources.filter(function(r) {
                return v.is_in_view(r, r.offset, r.offset);
            });
            
            var prj = projectiles.filter(function(p) {
                return v.is_in_view(p, 0, 0);
            });
            
            var arr = [].concat(ast, res, prj);
            arr.push(Player_ship);
            
            return arr;
        },
    };
    
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
        
        switch_explore: function(message) {
            if (exploring)
            {
                MPM.show();
                MPM.add_class("invisible",explore_panel);
                Engine.deact_explore();
                Engine.deactivate_keys();
                exploring = false;
				Engine.log("Initializing city...");
            }
            else
            {
                MPM.hide();
                MPM.remove_class("invisible",explore_panel);
                Engine.init_explore(canv,MAIN_WIDTH,MAIN_HEIGHT);
                Engine.animate();
                Engine.activate_keys();
                exploring = true;
				Engine.log("Initializing explore...");
            }
        },
        
        /*------- Everyone's sky components -------*/
        init_explore: function(canv, canv_width, canv_height) {
            paused = false;
            
            //Frank, give this function a canvas element, a width and a height
            canvas        = canv;
            canvas.width  = canv_width;
            canvas.height = canv_height;
            context       = canvas.getContext("2d");
            
            viewport.width  = canvas.width;
            viewport.height = canvas.height;
            //you'll need to activate the event handlers seperately
        },
        
        deact_explore: function() {
            paused = true;
            //you need to deactivate the event handlers seperately
            
            Engine.log("explore has been deactivated.");
        },
        
        draw_new_frame: function(lapse) {
            //update player first
            Player_ship.get_new_position(lapse);
            
            //update the viewport right after
            viewport.scroll_player_to_view();
            
            //for asteroids, projectiles, and resource sprites:
            //first, filter off the ones that aren't active
            //then, get the new positions of the remaining ones
            
            asteroids = asteroids.filter(function(a) {return a.active; });
            asteroids.forEach(function(a) { a.get_new_position(lapse);});
            
            resources = resources.filter(function(r) {return r.active; });
            resources.forEach(function(r) { r.get_new_position(lapse);});
            
            projectiles = projectiles.filter(function(p) { return p.active; });
            projectiles.forEach(function(p) { p.get_new_position(lapse); });
            
            //up to this point, nothing has been drawn yet!
            
            //clear the canvas
            context.clearRect(0, 0, Engine.canvas_x, Engine.canvas_y);
            
            //draw the background
            context.fillStyle = "rgb(0, 0, 0)";
            context.fillRect(0, 0, Engine.canvax_x, Engine.canvas_y);
            
            //draw everything else now!
            var objects = viewport.objects_in_view;
            objects.forEach(function(o) {
                o.draw(context);
            });
            
            //draw_arrow(context);
        },
        
        animate: function(time) {
            if (last_time == null) {
                lapse = 0;
            } else {
                lapse = time - last_time;
            }
            
            last_time = time;
            
            if (!paused) {
                Engine.draw_new_frame(lapse);
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
        
        prompt: function(sentence, responses) {
            //for prompting the player during explore
            //sentence is the sentence prompt
            //responses are the responses.
            //play Everyone's Sky for a bit, and you'll know
        },
        
        // events
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
        
        add_event_global: function(event_global_name, value) {
            event_global[event_global_name] = value;
        },
        
        set_event_global: function(event_global_name, value) {
            event_global[event_global_name] = value;
        },
        
        get_event_global: function(event_global_name) {
            return event_global[event_global_name];
        },
        
        remove_event_global: function(event_global_name) {
            // search and delete 
            delete event_global[event_global_name];
        },
        
        //getters: these will be visible, but not directly changeable
        //i think most of them are self-explanatory.
        get ships() { return ships; },
        get projectiles() { return projectiles; },
        get asteroids() { return asteroids; },
        get resources() { return resources; },
        
        get canvas_x() { return canvas.width; },
        get canvas_y() { return canvas.height; },
        
        get viewport() { return viewport; },
        get map_size() { return map_size; },
        set map_size(new_size) { map_size.x = new_size.x; map_size.y = new_size.y; },
    };
})();

//helper functions

var relative = {
    x: function(x1) { return x1 - Engine.viewport.top_left_x; },
    y: function(y1) { return y1 - Engine.viewport.top_left_y; },
};
