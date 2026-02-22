pc.script.create('robotMovement', function (app) {
    collisionDetected = 0;
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
        },
        dead: {
            animation: 'Playbot_die'
        },
        jump: {
            animation: 'Playbot_jump'
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
            // Reset game when you have won
            if (winPointCollision === 3) {
                this.entity.setPosition(0,0,Math.random()*50);
                winPointCollision = 0;
                collisionDetected = 0;
                this.setState('idle');
                this.audio = app.root.findByName('Audio Source');
                this.audio.audiosource.play("2014-06-08_Take_Down_2_-_David_Fesliyan");
            }
            
            // Reset game when you have lost
            if (bombCollision === 3) {
                this.entity.setPosition(0,0,Math.random()*50);
                bombCollision = 0;
                collisionDetected = 0;
                this.setState('idle');
                this.audio = app.root.findByName('Audio Source');
                this.audio.audiosource.play("2014-06-08_Take_Down_2_-_David_Fesliyan");
            }
            
            // If you lost the game play dead
            if ( bombCollision === 1 ) {
                this.entity.animation.loop = false;
                this.setState('dead');
                bombCollision = 2;
            }
            
            // If you won the game start celebrating
            if ( winPointCollision === 1 ) {
                this.entity.animation.loop = true;
                this.setState('jump');
                winPointCollision = 2;
            }

        },
        
        onKeyDown: function (event) {
            if (collisionDetected === 1) {
                return;
            }
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
                if (pos.x-step < -48) {
                    this.entity.setPosition(-48, pos.y, pos.z);
                    return;
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
                if (pos.x+step > 48) {
                    this.entity.setPosition(48, pos.y, pos.z);
                    return;
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
                if (pos.z-step < -48) {
                    this.entity.setPosition(pos.x, pos.y, -48);
                    return;
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
                if (pos.z+step > 48) {
                    this.entity.setPosition(pos.x, pos.y, 48);
                    return;
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
            // If you have lost or won don't play like had not
            if (collisionDetected === 1) {
                return;
            }
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