pc.script.create('rotatingMines', function (app) {
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
			// Mines rotating behavior
            this.entity.rotate(0,90 * dt, 0);
        }
    };

    return RotatingMines;
});