// @author brunoimbrizi / http://brunoimbrizi.com

precision highp float;

attribute float pindex;
attribute vec3 position;
attribute vec3 offset;
attribute float layer;
attribute float ran;
attribute vec2 uv;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

uniform float uTime;
uniform float uDepth;
uniform float uSize;
uniform vec2 uTextureSize;
uniform sampler2D uTexture;
uniform float uPy;
uniform float uPx;
uniform float uPz;
uniform float uRadius;
uniform float uSpeed;
uniform float uMaxTime;

varying vec2 vPUv;
varying vec2 vUv;

#pragma glslify: snoise_1_2 = require( glsl-noise/simplex/2d );
#pragma glslify: ease = require( glsl-easings/quadratic-in );

float random(float n){
	return fract(sin(n)*43758.5453123);
}

void main(){
	vUv = uv;
	
	// particle uv
	vec2 puv = offset.xy / uTextureSize;
	vPUv = puv;
	
	// pixel color
	vec4 colA = texture2D( uTexture, puv);
	//float grey = colA.r *.21 + colA.g *.71 + colA.b * .17;
	
	// displacement
	vec3 displaced = offset;

	// center
	displaced.x -= uTextureSize[0] * .5;
	displaced.y -= uTextureSize[1] * .5;
	
	// random
	float rndz = snoise_1_2( vec2( pindex, uTime * uSpeed ) ) ;
	displaced.z += rndz * uDepth;

	float t = uTime / uMaxTime / layer;
	if(t > 1.0) t = 1.0;
	displaced.z += ease( 1.0 - t ) * ran;
	displaced.x += ease( 1.0 - t ) * ran * rndz * 0.1;
	displaced.y += ease( 1.0 - t ) * ran * rndz * 0.1;
	displaced.y += uPy * layer * 0.1;
	displaced.x += sin( rndz * 0.1 ) * layer * uPy;
	// particle size
	float psize = 1.0;
	
	
	// final position
	vec4 mvPosition = modelViewMatrix * vec4( displaced , 1.0 );
	mvPosition.xyz += position * psize;
	vec4 finalPosition = projectionMatrix * mvPosition;
	
	gl_Position = finalPosition;
}
