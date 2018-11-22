** IMPORTANT PLEASE READ **

However, we need to rigourously test these. Anything can go wrong here.

** CHANGES SINCE LAST UPDATE **
 - resources to be picked up added (try destroying an asteroid)
 - See "RESOURCES" section (at the bottom)


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

To deactivate the explore, first disable event handlers for the keys.

    Engine.deactivate_keys();

Then call Engine.deact_explore().

    Engine.deact_explore();

** TO ADD IMAGE ASSETS **

First, put the image itself in the "assets" folder.

Then, create a variable under the comment that says "place image assets here".

    var new_image_asset = create_image("assets/<file path>");

Last, create a getter property under the comment that says "put references to image assets here

    get new_image() { return new_image_asset; },

* Remember that object properties end with a colon, not a semicolon (like a statement would).


** EVENTS **

Events have been implemented now. 

Events are snippets of code packaged up into one place.

An event require two things: a trigger and an event.

Triggers are only used if they need to be added to the engine with
	
	Engine.add_trigger("event_name");
	
* Remember in the event to remove the trigger on event firing, unless you don't want it that way.


** RESOURCES **

When a resource is picked up, nothing happens.

Make something happen, open pickupable.js and edit the Pickupable.prototype.pickup function.