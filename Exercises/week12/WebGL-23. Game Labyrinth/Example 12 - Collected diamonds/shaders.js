var vShader =
	'uniform mat4 uProjectionMatrix;'+
	'uniform mat4 uViewMatrix;'+
	'uniform mat4 uModelMatrix;'+
	'uniform mat4 uNormalMatrix;'+
	'uniform bool uUseNormalMatrix;'+
	''+
	'uniform vec3 uAmbientColor;'+
	'uniform vec3 uDiffuseColor;'+
	''+
	'uniform vec3 uLightDir;'+
	''+
	'attribute vec3 aXYZ;'+
	'attribute vec2 aST;'+
	'attribute vec3 aColor;'+
	'attribute vec3 aNormal;'+
	''+
	'varying vec3 vST;'+
	'varying vec3 vColor;'+
	'varying float vW;'+
	''+
	'void main ()'+
	'{'+
	'	mat4 mvMatrix = uViewMatrix * uModelMatrix;'+
	'	gl_Position = uProjectionMatrix * mvMatrix * vec4(aXYZ,1);'+
	'	mat4 nMatrix = uUseNormalMatrix?uNormalMatrix:mvMatrix;'+
	'	vW = gl_Position.w;'+
	''+
	'	vST = vec3(aST,1);'+
	'	vColor = uAmbientColor*aColor;'+
	''+
	'	vec3 light = normalize(-uLightDir);'+
	'	vec3 normal = vec3(normalize(nMatrix*vec4(aNormal,0)));'+
	'	vColor += aColor*uDiffuseColor*abs(dot(normal,light));'+
	'}';
	
var fShader =
	'precision mediump float;'+
	'uniform sampler2D uSampler;'+
	'uniform mat3 uTexMatrix;'+
	'uniform bool uUseTexture;'+
	'uniform float uExplosion;'+
	''+
	'varying vec3 vST;'+
	'varying vec3 vColor;'+
	'varying float vW;'+
	'void main( )'+
	'{'+
	'	vec3 texCol = vec3(1);'+
	'   if (uUseTexture) texCol = vec3(texture2D(uSampler,(uTexMatrix*vST).st));'+
	'	float k = 1.0-vW/15.0;'+
	'	if (k<0.2) k=0.2;'+
	'	gl_FragColor = vec4(k*vColor*texCol+vec3(uExplosion),1.0);'+
	'}';
