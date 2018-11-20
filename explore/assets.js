var Explore_assets = (function() {
    var player_ship = create_image("player_ship.png");
    
    return {
        get player_ship() { return player_ship; },
    };
})();

var EA = Explore_assets;

function create_image(path) {
    var img = document.createElement("img");
    img.src = path;
    return img;
}