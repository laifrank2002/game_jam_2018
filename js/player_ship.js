var Player_ship = (function() {
    var HEALTH = 150;
    
    var POS = {
        x: 100,
        y: 100,
    };
    
    var VECTOR = {
        x: 0,
        y: 0,
    };
    
    var THRUST    = 0.03;
    var MAX_SPEED = 0.5;
    var ROT_SPEED = 0.003;
    var FRICTION  = 0.025; //coefficient of friction
    var angle     = -Math.PI / 2; //start facing...up?
    
    var keys = {
        forward:   false,
        rot_left:  false,
        rot_right: false,
    };
    
    var wrap = function() {
        if (POS.x < 0) {
            POS.x += Engine.canvas_x;
        }
        
        if (POS.x > Engine.canvas_x) {
            POS.x = POS.x % Engine.canvas_x;
        }
        
        if (POS.y < 0) {
            POS.y += Engine.canvas_y;
        }
        
        if (POS.y > Engine.canvas_y) {
            POS.y = POS.y % Engine.canvas_y;
        }
    };
    
    var SHIP_WIDTH_OFFSET  = 15;
    var SHIP_HEIGHT_OFFSET = 10;
    
    var in_orbit  = false;
    var in_combat = false;
    
    var weapons   = [];
    var abilities = []; //store functions for them here.
    
    function rotate(lapse) {
        //rotates the ship
        angle += (keys.rot_left ? -ROT_SPEED * lapse : 0);
        angle += (keys.rot_right ? ROT_SPEED * lapse : 0);
    }
    
    function get_friction() {
        //gets the friction vector
        return {
            x: -VECTOR.x * FRICTION,
            y: -VECTOR.y * FRICTION,
        };
    }
    
    function get_thrust() {
        //gets the thrust vector
        
        //make a bubble
        if (keys.forward) {
            Engine.projectiles.push(new Bubble(POS.x, POS.y, -Math.cos(angle), -Math.sin(angle)));
        }
        
        return {
            x: (keys.forward ? Math.cos(angle) * THRUST : 0),
            y: (keys.forward ? Math.sin(angle) * THRUST : 0),
        };
    }
    
    return {
        enter_orbit: function() {
            //code for entering orbit around a planet
        },
        
        get_new_position(lapse) {
            //first, update the angles
            rotate(lapse);
            
            //get friction
            VECTOR.x += get_friction().x;
            VECTOR.y += get_friction().y;
            
            //get thrust
            VECTOR.x += get_thrust().x;
            VECTOR.y += get_thrust().y;
            
            POS.x += VECTOR.x * lapse;
            POS.y += VECTOR.y * lapse;
            
            wrap();
        },
        
        draw: function(context) {
            context.save();
            
            context.translate(POS.x, POS.y);
            context.rotate(angle);
            context.drawImage(Assets.player_ship, -SHIP_WIDTH_OFFSET, -SHIP_HEIGHT_OFFSET);
            
            context.restore();
        },
        
        get is_moving() { return !(in_orbit && in_combat);},
        
        get angle() { return angle; },
        
        get weapons() { return weapons; },
        get abilities() { return abilities; },
        
        set forward(a)   { keys.forward   = a; },
        set rot_left(a)  { keys.rot_left  = a; },
        set rot_right(a) { keys.rot_right = a; },
    };
})();