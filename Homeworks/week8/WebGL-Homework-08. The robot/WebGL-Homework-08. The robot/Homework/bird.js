// Крило на птицата - много парчета
Wing = function(isLeft)
{
	this.isLeft = isLeft;
	this.segments = [];
	
	// 8 парчета за крилото
	for (var i = 0; i < 8; i++)
	{
		var seg = new Cuboid([0, 0, 0], [0.6, 0.05, 0.4 - i*0.04]);
		seg.color = [0.3, 0.3, 0.35];
		this.segments.push(seg);
	}
}

// Рисува крилото
Wing.prototype.draw = function(angle)
{
	var dir = this.isLeft ? -1 : 1;
	
	for (var i = 0; i < this.segments.length; i++)
	{
		pushMatrix();
		
		// Позиция според ъгъла
		var x = (i + 1) * 0.55;
		var y = -Math.sin(angle) * x * 0.4;
		var z = Math.cos(angle) * x * 0.15;
		
		// Водещ ръб
		var lead = Math.sin(angle) * (i + 1) * 0.15;
		
		translate([dir * x, y + lead, z]);
		zRotate(angle * (i + 1) * 0.5);
		
		this.segments[i].draw();
		popMatrix();
	}
}

// Птицата робот
Bird = function()
{
	// Тяло
	this.body = new Sphere([0, 0, 0], 1.0);
	this.body.color = [0.25, 0.25, 0.3];
	
	// Глава
	this.head = new Sphere([0, 0.8, 0.6], 0.5);
	this.head.color = [0.3, 0.3, 0.35];
	
	// Клюн
	this.beak = new Cone([0, 0.6, 1.0], 0.2, 0.5);
	this.beak.color = [0.8, 0.6, 0.1];
	
	// Очи
	this.eye1 = new Sphere([-0.2, 0.9, 0.9], 0.1);
	this.eye1.color = [0.1, 0.1, 0.1];
	this.eye2 = new Sphere([0.2, 0.9, 0.9], 0.1);
	this.eye2.color = [0.1, 0.1, 0.1];
	
	// Крила
	this.wingL = new Wing(true);
	this.wingR = new Wing(false);
	
	// Опашка
	this.tails = [];
	for (var i = 0; i < 5; i++)
	{
		var t = new Cuboid([0, 0, -1 - i*0.4], [0.8 - i*0.1, 0.05, 0.3]);
		t.color = [0.2, 0.2, 0.25];
		this.tails.push(t);
	}
}

// Рисува птицата
Bird.prototype.draw = function(frame)
{
	var wingAngle = Math.sin(frame * 0.08) * 0.6;
	var bodyRock = Math.sin(frame * 0.04) * 0.15;
	var headTurn = Math.sin(frame * 0.04) * 0.3;
	
	pushMatrix();
	zRotate(bodyRock);
	
	// Тяло
	this.body.draw();
	
	// Опашка
	for (var i = 0; i < this.tails.length; i++)
	{
		pushMatrix();
		translate([0, Math.sin(frame * 0.08 + i) * 0.1, -i*0.4]);
		this.tails[i].draw();
		popMatrix();
	}
	
	// Крила
	pushMatrix();
	translate([0.8, 0, 0]);
	this.wingL.draw(wingAngle);
	popMatrix();
	
	pushMatrix();
	translate([-0.8, 0, 0]);
	this.wingR.draw(wingAngle);
	popMatrix();
	
	// Глава
	pushMatrix();
	yRotate(headTurn);
	this.head.draw();
	this.eye1.draw();
	this.eye2.draw();
	this.beak.draw();
	popMatrix();
	
	popMatrix();
}
