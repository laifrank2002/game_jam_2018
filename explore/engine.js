var Explore_engine = (function() {
    //feel free to chime in with suggestions
    var last_time = null, lapse = 0, paused = false;
    
    var canvas, context;
    
    return {
        logging: true,
        log: function(msg) {
            if (this.logging) {
                console.log(msg);
            }
        },
        
        init: function() {
            //make the canvas
            canvas        = document.querySelector("canvas");
            canvas.width  = window.innerWidth;
            canvas.height = window.innerHeight;
            context       = canvas.getContext("2d");
            
            //register the key event handlers for flying
            //left: 37, right: 39, up: 38, down is not used here
            //a: 65, d: 68, w: 87, s is not used here
            addEventListener("keydown", function(e) {
                switch (e.keyCode) {
                    case 37:
                    case 65:
                        //left key: rotate counter-clockwise
                        Player_ship.rot_left = true;
                        EE.log("LEFT key pressed.");
                        break;
                    case 39:
                    case 68:
                        //right key: rotate clockwise
                        Player_ship.rot_right = true;
                        EE.log("RIGHT key pressed.");
                        break;
                    case 38:
                    case 87:
                        //up key: move forward
                        Player_ship.forward = true;
                        EE.log("FORWARD key pressed.");
                        break;
                    default:
                        //ignore
                }
            });
            
            addEventListener("keyup", function(e) {
                switch (e.keyCode) {
                    case 37:
                    case 65:
                        //left key: rotate counter-clockwise
                        Player_ship.rot_left = false;
                        break;
                    case 39:
                    case 68:
                        //right key: rotate clockwise
                        Player_ship.rot_right = false;
                        break;
                    case 38:
                    case 87:
                        //up key: move forward
                        Player_ship.forward = false;
                        break;
                }
            });
            
            requestAnimationFrame(EE.animate);
        }, 
        
        draw_screen: function(lapse) {
            //clear the canvas first
            context.clearRect(0, 0, EE.game_area_x, EE.game_area_y);
            
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
                EE.draw_screen(lapse);
            }
            
            requestAnimationFrame(EE.animate);
        },
        
        get game_area_x() { return canvas.width; },
        get game_area_y() { return canvas.height; },
    };
})();

//alias
var EE = Explore_engine;

EE.init();