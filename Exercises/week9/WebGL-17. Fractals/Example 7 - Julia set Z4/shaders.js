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
	'varying vec2 vXY;'+
	'uniform float uLimit;'+
	''+
	'void main( )'+
	'{'+
	'	vec2 z = vXY;'+
	'	gl_FragColor = vec4(0,0,0,1);'+
	'	for (int i=0; i<500; i++)'+
	'	{'+
	'		if( dot(z,z)<4.0 )'+
	'		{'+
	'			z = vec2(z.x*z.x-z.y*z.y,2.0*z.x*z.y);'+
	'			z = vec2(z.x*z.x-z.y*z.y,2.0*z.x*z.y)+uC;'+
	'		}'+
	'		else'+
	'		{'+
	'			float cr = 0.5+0.5*sin(1.0*float(i)/uLimit);'+
	'			float cg = 0.5+0.5*sin(1.5*float(i)/uLimit);'+
	'			float cb = 0.5+0.5*sin(2.0*float(i)/uLimit);'+
	'			gl_FragColor = vec4(cr,cg,cb,1);'+
	'			break;'+
	'		};'+
	'	}'+
	'}';
