var Player_planet = (function() {
    var space  = 150; //max number of buildings
    var morale = 100; //how your people feel
    
    return {
        draw: function(context) {
            context.drawImage(Assets.player_planet, 50, 50);
        },
    };
})();