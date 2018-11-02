var Engine = (function() {
    //feel free to chime in with suggestions
    var last_time = null, lapse = 0, paused = false;
    
    return {
        logging: true,
        log: function(msg) {
            if (this.logging) {
                console.log(msg);
            }
        },
        
        draw_screen: function(lapse) {
            //animation code
        },
        
        animate: function(time) {
            if (last_time == null) {
                lapse = 0;
            } else {
                lapse = time - last_time;
            }
            
            last_time = time;
            
            if (paused) {
                Engine.draw_screen(lapse);
            }
        },
    };
})();