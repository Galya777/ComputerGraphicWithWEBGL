/*{{ javascript("jslib/camera.js") }}*/
/*{{ javascript("jslib/floor.js") }}*/
/*{{ javascript("jslib/requesthandler.js") }}*/


	TurbulenzEngine.onload = function onloadFn() 
	{
	var intervalID;
	var gd = TurbulenzEngine.createGraphicsDevice({});
	var md = TurbulenzEngine.createMathDevice({}); //инстанция на математическото устройство

	var camera = Camera.create(md);      //инстанция на камера
	var floor = Floor.create(gd, md);    //строи линии в равнината XY
	var shader = null;
	var technique = null;
	var angle = 0; 
		
	var requestHandler = RequestHandler.create({}); 
	requestHandler.request({ //метод за зареждане на външния шейдър
		src: 'generic3D.cgfx.json',
		onload: function (shaderJSON)
		{
			var shaderParameters = JSON.parse(shaderJSON);
			shader = gd.createShader(shaderParameters);
			technique = shader.getTechnique('vertexColor3D'); //избор на техника за рисуване от шейдъра
		}
	});


var techniqueParameters = gd.createTechniqueParameters({}); //инстанция на параметри на рисуване
	
	var vertData = [];
	function addVerts(x,y,z,size,col1,col2,col3) //функция, която добавя върховете 
	{											 //на кубовете в масив
	size = size/2;
	var vertLBF = [ x-size, y-size,  z+size, col1, col2, col3, 1 ]; //върховете на куба
	var vertLTF = [ x-size, y+size,  z+size, col1, col2, col3, 1 ];
	var vertRTF = [ x+size, y+size,  z+size, col1, col2, col3, 1 ];
	var vertRBF = [ x+size, y-size,  z+size, col1, col2, col3, 1 ];
	var vertLBB = [ x-size, y-size,  z-size, col1, col2, col3, 1 ];
	var vertLTB = [ x-size, y+size,  z-size, col1, col2, col3, 1 ];
	var vertRTB = [ x+size, y+size,  z-size, col1, col2, col3, 1 ];
	var vertRBB = [ x+size, y-size,  z-size, col1, col2, col3, 1 ];
	vertData=vertData.concat(
		vertLTF, vertLBF, vertRTF, vertRTF, vertLBF, vertRBF,  // предна
		vertRTF, vertRBF, vertRTB, vertRTB, vertRBF, vertRBB,  // дясна
		vertLTB, vertLBB, vertLTF, vertLTF, vertLBB, vertLBF,  // лява
		vertRTB, vertRBB, vertLTB, vertLTB, vertRBB, vertLBB,  // задна
		vertLTB, vertLTF, vertRTB, vertRTB, vertLTF, vertRTF,  // горна
		vertLBF, vertLBB, vertRBF, vertRBF, vertLBB, vertRBB   // долна
	);
	};
	addVerts(0,0,0,3,1,1,1);
	addVerts(0,0,3,2,1,0,0.5);
	addVerts(0,0,-3,2,1,0.8,0);
	addVerts(3,0,0,2,0,1,0.5);
	addVerts(-3,0,0,2,0,0.5,1);
	
	var numVerts = vertData.length;
	var vertexBuffer = gd.createVertexBuffer({ //строим буфера за върховете
		numVertices: vertData.length,
		attributes: [gd.VERTEXFORMAT_FLOAT3, gd.VERTEXFORMAT_UBYTE4N],
		data: vertData,                       //взимаме информация от създадения масив с върхове
	});

	var semantics = gd.createSemantics([ gd.SEMANTIC_POSITION,
										 gd.SEMANTIC_COLOR ]);
	function tick()
	{
	  if (gd.beginFrame())
	  {
		angle += Math.PI / 720;
		gd.clear([0.0, 0.0, 0.0, 1.0], 1.0, 0.0);
		
		camera.lookAt(md.v3BuildZero(),  //на къде гледа камерата  
					md.v3Build(0, 1, 0), //посока нагоре за камерата
					md.v3Build(15*Math.cos(angle), 10, 15*Math.sin(angle)));//позиция на камерата
		camera.updateViewMatrix();			
		camera.updateViewProjectionMatrix();
		
		floor.render(gd, camera); //рисуване на "под"
	  
	  if (technique) //ако са заредени шейдъра и техниката
		{
		techniqueParameters.worldViewProjection = camera.viewProjectionMatrix;
		gd.setTechnique(technique);
		gd.setTechniqueParameters(techniqueParameters);
		gd.setStream(vertexBuffer, semantics);
		gd.draw(gd.PRIMITIVE_TRIANGLES, numVerts, 0);
		}
	  gd.endFrame();
	  }
	}
	  intervalID = TurbulenzEngine.setInterval(tick, 1000/60);
	};
