pc.script.create('winPointCollision', function (app) {
    // Flag if collision occured
    winPointCollision = 0;
    // Creates a new WinPointCollision instance
    var WinPointCollision = function (entity) {
        this.entity = entity;
    };

    WinPointCollision.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            // Collision event listener
             this.entity.collision.on('collisionstart', this.onCollisionStart, this);
        },

        onCollisionStart: function (entity) { 
            // Flag for robot's behavior when collision occured and button realesed
            collisionDetected = 1;
            // Flag for robot's behavior when won
            winPointCollision = 1;
            // JavaScript code that dynamically creates HTML element, type button
            var winButton = document.createElement("button");
            winButton.style.position = "absolute";
            winButton.style.left = "100px";
            winButton.style.top = "100px";
            winButton.style.width = "170px";
            winButton.style.height = "50px";
            winButton.textContent = "You won! Try again?";
            winButton.id = "winButton";
            winButton.addEventListener("click", function() {
                // If winPointCollision value is 3, program will make a clean start
                winPointCollision = 3; 
                played = 0; 
                var poppedButton = document.getElementById("winButton");
                poppedButton.parentNode.removeChild(poppedButton);
            }, false);
            document.body.appendChild(winButton);
        }
    };

    return WinPointCollision;
});