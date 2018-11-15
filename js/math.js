//code for math helper functions

function toward_zero(a, b) {
    return toward(a, b, 0);
};

function toward(a, b, c) {
    var d = a < c ? a + b : a - b;
    d     = a < c ? Math.min(d, c) : Math.max(d, c);
    
    return d;
}

function closer_to(a, b, c) {
    var ca = Math.abs(c - a);
    var cb = Math.abs(c - b);
    
    return ca < cb ? a : b;
}

function closer_to_zero(a, b) {
    return closer_to(a, b, 0);
}