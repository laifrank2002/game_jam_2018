var Player_planet = (function() {
    var space  = 150; //max number of buildings
    var morale = 100; //how your people feel
    
    var buildings = [];
    var resources = [];
    
    return {
        build: function(building) {
            buildings.push(building);
        },
        
        destroy: function() { //space barbarians and whatnot
            var i = Math.floor(Math.random() * buildings.length);
            
            buildings.filter(function(b) { return b != buildings[i]; });
        },
        
        get buildings() { return buildings; };
    };
})();