function Asteroid(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vector = {
        x: vx,
        y: vy,
    };
    
    this.speed = 0.05;
    
    this.angle       = Math.random() * 2 * Math.PI;
    this.angle_speed = Math.random() > 0.5 ? 0.0007 : -0.0007;
    
    this.health = 15;
    this.active = true;
    
    this.horizontal_offset = -39;
    this.vertical_offset   = -33;
}

Asteroid.prototype.get_new_position = function(lapse) {
    this.x += this.vector.x * lapse * this.speed;
    this.y += this.vector.y * lapse * this.speed;
    
    this.angle += this.angle_speed * lapse;
    
    this.check_collision();
    
    this.wrap();
};

Asteroid.prototype.draw = function(context) {
    context.save();
    
    context.translate(this.x, this.y);
    context.rotate(this.angle);
    context.drawImage(Assets.asteroid, this.horizontal_offset, this.vertical_offset);
    
    context.restore();
};

Asteroid.prototype.wrap = function() {
    if (this.x < 0) {
        this.x += Engine.canvas_x;
    }
    
    if (this.x > Engine.canvas_x) {
        this.x = this.x % Engine.canvas_x;
    }
    
    if (this.y < 0) {
        this.y += Engine.canvas_y;
    }
    
    if (this.y > Engine.canvas_y) {
        this.y = this.y % Engine.canvas_y;
    }
};

Asteroid.prototype.check_collision = function() {
    var x = this.x, y = this.y;
    
    var collision = false;
    
    var bullets = Engine.projectiles.filter(function(b) {
        return (
            b.x >= x - 35 &&
            b.x <= x + 35 &&
            b.y >= y - 35 &&
            b.y <= y + 35
        ) && b.bullet;
    });
    
    bullets.forEach(function(b) {
        collision = true;
        b.collision();
    });
    
    if (collision) { this.collision(); }
};

Asteroid.prototype.collision = function() {
    this.health -= 1;
    
    if (this.health <= 0) {
        this.explode();
    }
};

Asteroid.prototype.explode = function() {
    this.active = false;
    Engine.log("an asteroid has been destroyed.");
    
    //then scatter some resources
    var num = Math.random() * 8 + 3;
    
    while (num > 0) {
        var angle  = Math.random() * 2 * Math.PI;
        var radius = Math.random() * 75;
        
        Engine.resources.push(new Pickupable(Math.cos(angle) * radius + this.x, Math.sin(angle) * radius + this.y));
        num -= 1;
    }
};