var vShader =
	'attribute vec3 aXYZ;'+
	'attribute vec3 aColor;'+
	'varying vec3 vColor;'+
	''+
	'void main ()'+
	'{'+
	'	gl_Position = vec4(aXYZ,1);'+
	'	vColor = aColor;'+
	'}';
	
var fShader =
	'precision mediump float;'+
	'varying vec3 vColor;'+
	''+
	'void main( )'+
	'{'+
	'	gl_FragColor = vec4(vColor,1.0);'+
	'}';
