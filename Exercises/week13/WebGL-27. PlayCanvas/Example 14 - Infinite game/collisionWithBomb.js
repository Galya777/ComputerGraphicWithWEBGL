pc.script.create('collisionWithBomb', function (app) {
    // Flag if collision occured
    bombCollision = 0;
    // Creates a new CollisionWithBomb instance
    var CollisionWithBomb = function (entity) {
        this.entity = entity;
    };

    CollisionWithBomb.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            // Collision event listener
            this.entity.collision.on('collisionstart', this.onCollisionStart, this);
        },
        
        onCollisionStart: function (entity) { 
            collisionDetected = 1;
            bombCollision = 1;
            // JavaScript code that dynamically creates HTML element, type button
            var loseButton = document.createElement("button");
            loseButton.style.position = "absolute";
            loseButton.style.left = "100px";
            loseButton.style.top = "100px";
            loseButton.style.width = "170px";
            loseButton.style.height = "50px";
            loseButton.textContent = "You lost! Try again?";
            loseButton.id = "loseButton";
            loseButton.addEventListener("click", function() {
                // If bombCollision value is 3, program will make a clean start
                bombCollision = 3; 
                played = 0; 
                var poppedButton = document.getElementById("loseButton");
                poppedButton.parentNode.removeChild(poppedButton);
            }, false);
            document.body.appendChild(loseButton);
        }
    };
    return CollisionWithBomb;
});