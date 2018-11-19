var Assets = (function() {
    //place image assets here
    var player_ship   = create_image("assets/player_ship.png");
    var player_planet = create_image("assets/player_planet.png");
    
    var asteroid = create_image("assets/asteroid.png");
    
    var bullet = create_image("assets/bullet.png");
    
    return {
        get player_ship() { return player_ship; },
        get player_planet() { return player_planet; },
        get asteroid() { return asteroid; },
        get bullet() { return bullet; },
    };
})();

function create_image(path) {
    var img = document.createElement("img");
    img.src = path;
    return img;
}