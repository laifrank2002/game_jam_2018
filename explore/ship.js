function Ship(x, y, angle) {
    this.pos = {
        x: x,
        y: y,
    };
    
    this.angle = angle || 0;
    
    this.vector = {
        x: 0,
        y: 0,
    };
}