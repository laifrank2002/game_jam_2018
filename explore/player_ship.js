var Player_ship = (function() {
    var health = 150;
    
    var pos = {
        x: 100,
        y: 100,
    };
    
    var forward_speed = 0.25;
    var rot_speed     = 0.003;
    var angle         = -Math.PI / 2; //start facing...up?
    
    var keys = {
        forward:   false,
        rot_left:  false,
        rot_right: false,
    };
    
    var ship_width_offset  = 15;
    var ship_height_offset = 10;
    
    var in_orbit  = false;
    var in_combat = false;
    
    var weapons   = [];
    var abilities = []; //store functions for them here.
    
    return {
        enter_orbit: function() {
            //code for entering orbit around a planet
        },
        
        get_new_position(lapse) {
            //first, update the angles
            angle += (keys.rot_left ? -rot_speed * lapse : 0);
            angle += (keys.rot_right ? rot_speed * lapse : 0);
            
            if (keys.forward) {
                pos.x += Math.cos(angle) * forward_speed * lapse;
                pos.y += Math.sin(angle) * forward_speed * lapse;
            }
        },
        
        draw: function(context) {
            context.save();
            
            context.translate(pos.x, pos.y);
            context.rotate(angle);
            context.drawImage(EA.player_ship, -ship_width_offset, -ship_height_offset);
            
            context.restore();
        },
        
        get is_moving() { return !(in_orbit && in_combat);},
        
        get weapons() { return weapons; },
        get abilities() { return abilities; },
        
        set forward(a)   { keys.forward   = a; },
        set rot_left(a)  { keys.rot_left  = a; },
        set rot_right(a) { keys.rot_right = a; },
    };
})();