pc.script.create('robotMovement', function (app) {
    // Flags for correct orientation
    var orientation = 0;
    var lastOrientation = 0;
    // Present robot states
    var states = {
        idle: {
            animation: 'Playbot_idle'
        },
        running: {
            animation: 'Playbot_run'
        }
    };
    var step = 0.5;
    // Creates a new RobotMovement instance
    var RobotMovement = function (entity) {
        this.entity = entity;
    };

    RobotMovement.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            // Listeners for event UP and DOWN
            app.keyboard.on(pc.EVENT_KEYDOWN, this.onKeyDown, this);
            app.keyboard.on(pc.EVENT_KEYUP, this.onKeyUp, this);
            // Initial state
            this.setState('idle');
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {

        },
        
        onKeyDown: function (event) {
            var pos = this.entity.getPosition();
            if (app.keyboard.isPressed(pc.KEY_LEFT)) {
                orientation = 1;
                if (orientation !== lastOrientation) {
                    if(lastOrientation === 4 ) {
                        this.entity.rotate(0,-90,0);
                    }
                    if(lastOrientation === 3 ) {
                        this.entity.rotate(0,90,0);
                    }
                    if(lastOrientation === 2 ) {
                        this.entity.rotate(0,180,0);
                    }
                    if(lastOrientation === 0 ) {
                        this.entity.rotate(0,-90,0);
                    }
                    lastOrientation = 1;
                }
                this.entity.setPosition(pos.x-step, pos.y, pos.z);
                step = step + 0.3*1.07;
            }
            if (app.keyboard.isPressed(pc.KEY_RIGHT)) {
                orientation = 2;
                if (orientation !== lastOrientation) {
                    if(lastOrientation === 4 ) {
                        this.entity.rotate(0,90,0);
                    }
                    if(lastOrientation === 3 ) {
                        this.entity.rotate(0,-90,0);
                    }
                    if(lastOrientation === 1 ) {
                        this.entity.rotate(0,180,0);
                    }
                    if(lastOrientation === 0 ) {
                        this.entity.rotate(0,90,0);
                    }
                    lastOrientation = 2;
                }
                this.entity.setPosition(pos.x+step, pos.y, pos.z);
                step = step + 0.3*1.07;
            }
            if (app.keyboard.isPressed(pc.KEY_UP)) {
                orientation = 3;
                if (orientation !== lastOrientation) {
                    if(lastOrientation === 4 ) {
                        this.entity.rotate(0,180,0);
                    }
                    if(lastOrientation === 2 ) {
                        this.entity.rotate(0,90,0);
                    }
                    if(lastOrientation === 1 ) {
                        this.entity.rotate(0,-90,0);
                    }
                    if(lastOrientation === 0 ) {
                        this.entity.rotate(0,180,0);
                    }
                    lastOrientation = 3;
                }
                this.entity.setPosition(pos.x, pos.y, pos.z-step);
                step = step + 0.3*1.07;
            }
            if (app.keyboard.isPressed(pc.KEY_DOWN)) {
                orientation = 4;
                if (orientation !== lastOrientation) {
                    if(lastOrientation === 3 ) {
                        this.entity.rotate(0,180,0);
                    }
                    if(lastOrientation === 2 ) {
                        this.entity.rotate(0,-90,0);
                    }
                    if(lastOrientation === 1 ) {
                        this.entity.rotate(0,90,0);
                    }
                    lastOrientation = 4;
                }
                this.entity.setPosition(pos.x, pos.y, pos.z+step);
                step = step + 0.3*1.07;
            }

            if (this.state !== 'running')
                this.setState('running');
            
            // When the space bar is pressed this scrolls the window.
            // Calling preventDefault() on the original browser event stops this.
            event.event.preventDefault();
        },
        
        onKeyUp: function (event) {
            // Resets orientation flag value
            orientation = 0;
            // Resets robot speed
            step = 0.5;
            if (this.state !== 'idle')
                   this.setState('idle');
        },
        
        setState: function (state) {
            this.state = state;
            // Set the current animation, taking 0.2 seconds to blend from
            // the current animation state to the start of the target animation.
            this.entity.animation.play(states[state].animation, 0.2);
            
        }
    };

    return RobotMovement;
});