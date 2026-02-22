// става и кост - конструктор
Bone = function(size)
{	
	this.bone = new Cuboid([0,0,0],size);
	this.bone.color = [0.5,0.8,0.5];
	this.bone.offset = [0,0,0.5];
	this.rot = [0,0,0,0];
}

// става и кост - метод за рисуване
Bone.prototype.draw = function()
{	
	if (this.rot)
	{
		if (this.rot[0]) zRotate(this.rot[0]);	// хоризонтален ъгъл
		if (this.rot[1]) yRotate(this.rot[1]);	// вертикален ъгъл
		if (this.rot[2]) xRotate(this.rot[2]);	// вертикален ъгъл
		if (this.rot[3]) zRotate(this.rot[3]);	// осев ъгъл
	}
	if (this.offset) translate(this.offset); 
	this.bone.draw();
	translate([0,0,this.bone.size[2]]); // преместване в края на костта
}

// скелет - конструктор
Skeleton = function()
{	
	// торс
	this.tor1 = new Bone([0.5,0.2,0.2]);
	this.tor2 = new Bone([0.6,0.3,0.7]);
	this.tor3 = new Bone([0.7,0.4,0.4]);
	// глава
	this.head = new Bone([0.3,0.5,0.5]);
	this.head.offset = [0,0,0.2];
	
	// крака
	this.legR1 = new Bone([0.3,0.2,0.8]);
	this.legR2 = new Bone([0.2,0.2,0.8]);
	this.legR3 = new Bone([0.3,0.1,0.6]);
	this.legR3.offset = [0,0,-0.2];
	this.legL1 = new Bone([0.3,0.2,0.8]);
	this.legL2 = new Bone([0.2,0.2,0.8]);
	this.legL3 = new Bone([0.3,0.1,0.6]);
	this.legL3.offset = [0,0,-0.2];
	// ръце
	this.armR1 = new Bone([0.3,0.2,0.8]);
	this.armR2 = new Bone([0.2,0.2,0.6]);
	this.armR3 = new Bone([0.3,0.1,0.3]);
	this.armL1 = new Bone([0.3,0.2,0.8]);
	this.armL2 = new Bone([0.2,0.2,0.6]);
	this.armL3 = new Bone([0.3,0.1,0.3]);
}

// скелет - метод за рисуване
Skeleton.prototype.draw = function()
{
	pushMatrix();
		var mat0 = cloneMatrix(glmat);
		xRotate(180);
		this.tor1.draw();
		xRotate(-20);
		var mat = cloneMatrix(glmat);
		
		// ляв крак
		translate([-0.2,0,0]);
		this.legL1.draw();
		this.legL2.draw();
		this.legL3.draw();

		// десен крак
		glmat = cloneMatrix(mat);
		translate([0.2,0,0]);
		this.legR1.draw();
		this.legR2.draw();
		this.legR3.draw();
		
		// торс
		glmat = cloneMatrix(mat0);
		this.tor2.draw();
		this.tor3.draw();

		mat = cloneMatrix(glmat);
		this.head.draw();
		glmat = cloneMatrix(mat);

		xRotate(180);
		zRotate(180);
		mat = cloneMatrix(glmat);
		
		// лява ръка
		translate([0.6,0,0.1]);
		this.armL1.draw();
		this.armL2.draw();
		this.armL3.draw();

		// дясна ръка
		glmat = cloneMatrix(mat);
		translate([-0.6,0,0.1]);
		this.armR1.draw();
		this.armR2.draw();
		this.armR3.draw();
		
	popMatrix();
}
