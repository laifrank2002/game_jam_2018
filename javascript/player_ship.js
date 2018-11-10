var Player_ship = (function() {
    var health  = 150;
    
    var in_orbit  = false;
    var in_combat = false;
    
    var weapons   = [];
    var abilities = []; //store functions for them here.
    
    return {
        
        enter_orbit: function() {
            //code for entering orbit around a planet
            if ();
        },
        
        get is_moving() { return !(in_orbit && return in_combat)},
    };
})();