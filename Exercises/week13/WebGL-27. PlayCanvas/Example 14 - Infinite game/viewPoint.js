pc.script.create('viewPoint', function (app) {
    var rotatingVar = 0;
    // Creates a new ViewPoint instance
    var ViewPoint = function (entity) {
        this.entity = entity;
    };

    ViewPoint.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            rotatingVar = rotatingVar + dt;
            // Camera position
            this.entity.setPosition(30*Math.sin(rotatingVar), 17.85, 30*Math.cos(rotatingVar));
            // Camera lookat point
            this.entity.lookAt(0,0,0);
        }
    };

    return ViewPoint;
});