var vShader =
	'attribute vec3 aXYZ;'+
	''+
	'void main ()'+
	'{'+
	'	gl_Position = vec4(aXYZ,1);'+
	'}';
	
var fShader =
	'precision mediump float;'+
	''+
	'void main( )'+
	'{'+
	'	gl_FragColor = vec4(1.0);'+
	'}';
