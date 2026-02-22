pc.script.create('changeSound', function (app) {
    // Flag so boom melody is played only once
    var played = 0;
    // Creates a new ChangeSound instance
    var ChangeSound = function (entity) {
        this.entity = entity;
    };

    ChangeSound.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.audio = app.root.findByName('Audio Source');
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            if(collisionDetected === 1 && played === 0) {
                this.audio.audiosource.play("Bomb-SoundBible.com-891110113");
                played = 1;
            }
        }
    };

    return ChangeSound;
});