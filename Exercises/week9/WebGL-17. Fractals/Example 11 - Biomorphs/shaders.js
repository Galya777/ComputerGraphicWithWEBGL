var vShader =
	'precision highp float;'+
	'uniform vec2 uCenter;'+
	'uniform float uScale;'+
	'attribute vec2 aXY;'+
	'varying vec2 vXY;'+
	''+
	'void main ()'+
	'{'+
	'	gl_Position = vec4(aXY,0,1);'+
	'	vXY = vec2(1.5,1)*(aXY*exp(-uScale)+uCenter);'+
	'}';
	
var fShader =
	'precision highp float;'+
	''+
	'uniform vec2 uC;'+
	'uniform float uN;'+
	'uniform float uK;'+
	'varying vec2 vXY;'+
	''+
	'void main( )'+
	'{'+
	'	vec2 z = vXY;'+
	'	gl_FragColor = vec4(0,0,0,1);'+
	'	for (int i=0; i<200; i++)'+
	'	{'+
	'		if( abs(z.x)>2.0 || abs(z.y)>2.0 )'+
	'		{'+
	'			gl_FragColor = vec4(1.0-abs(z.x),0,1.0-abs(z.y),1);'+
	'			break;'+
	'		}'+
	'		if( dot(z,z)>6.0 )'+
	'		{'+
	'			gl_FragColor = vec4(1,1,1,1);'+
	'			break;'+
	'		};'+
	'		float m = pow(z.x*z.x+z.y*z.y,uN/2.0);'+
	'		float t = abs(uN*atan(z.y/z.x));'+
	'		z = m*vec2(cos(t),sin(t))+uC;'+
	'		m = pow(z.x*z.x+z.y*z.y,uK/2.0);'+
	'		t = abs(uK*atan(z.y/z.x));'+
	'		z = m*vec2(cos(t),sin(t))+uC;'+
	'	}'+
	'}';
