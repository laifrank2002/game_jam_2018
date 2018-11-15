** IMPORTANT PLEASE READ **

The engines have been unified!

However, we need to rigourously test these. Anything can go wrong here.


** TO IMPLEMENT THE CANVAS **

First, you need to reference a canvas element. This is the canvas that the
player will fly on.

    var canv = <your canvas element here>;
    
then, call the Engine's init_explore method. You'll also provide the width
and the height of the canvas.

    Engine.init_explore(canv, <width>, <height>);
    
Next, activate the keys.

    Engine.activate_keys();
    
Start the animation.

    Engine.animate();
    
* Remember to watch the console for any problems.