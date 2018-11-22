function Pickupable(x, y) {
    this.x = x; this.y = y;
    
    this.active = true;
}

Pickupable.prototype.get_new_position = function(lapse) {
    //these don't move
    
    //but check for collision with the player. to simplify this,
    //treat the player as a 20 by 20 square
    //treat the pickup as a 30 by 30 square
    var x = Player_ship.pos.x, y = Player_ship.pos.y;
    
    var same_x = (this.x < x + 10 && this.x > x - 10);
    var same_y = (this.y < y + 10 && this.y > y - 10);
    
    if (same_x && same_y) {
        this.pickup();
        this.active = false;
    }
};

Pickupable.prototype.draw = function(context) {
    context.drawImage(Assets.pickupable, this.x - 15, this.y - 15);
};

Pickupable.prototype.pickup = function() {
    //do something when the pickupable is touched
    Engine.log("a resource at (" + this.x + ", " + this.y + ") has been picked up.");
};