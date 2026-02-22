pc.script.create('rotatingMines', function (app) {
    var jumpingMines = 0;
    // Creates a new RotatingMines instance
    var RotatingMines = function (entity) {
        this.entity = entity;
    };
    
    RotatingMines.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            var pos = this.entity.getPosition();
            // Mine's rotation behavior
            this.entity.rotate(0,-90 * dt, 0);
            // Mine's hopping behavior
            this.entity.setPosition(pos.x, -1+Math.abs(Math.sin(jumpingMines)), pos.z );
            jumpingMines = jumpingMines + dt/30.0;
        }
    };

    return RotatingMines;
});