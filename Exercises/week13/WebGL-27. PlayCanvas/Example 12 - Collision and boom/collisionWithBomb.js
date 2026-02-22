pc.script.create('collisionWithBomb', function (app) {
    // Flag if collision occured
    collisionDetected = 0;
    // Robot state
    var states = {
        dead: {
            animation: 'Playbot_die'
        }
    };
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
            // Execute die animation only once
            this.entity.animation.loop = false;
            this.setState('dead');
            // Flag used in changeSound.js script
            collisionDetected = 1;
        },
        
         setState: function (state) {
            this.state = state;
            this.entity.animation.play(states[state].animation, 0.2);
        }
    };
    return CollisionWithBomb;
});