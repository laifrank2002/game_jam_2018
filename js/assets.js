var Assets = (function() {
    //place image assets here
    var player_ship = create_image("assets/player_ship.png");
    
    return {
        get player_ship() { return player_ship; },
    };
})();

function create_image(path) {
    var img = document.createElement("img");
    img.src = path;
    return img;
}