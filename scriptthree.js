
  // Fork of https://github.com/spite/THREE.MeshLine
  // https://github.com/Jeremboo/THREE.MeshLine
  (function(){"use strict";function t(){this.positions=[],this.previous=[],this.next=[],this.side=[],this.width=[],this.indices_array=[],this.uvs=[],this.counters=[],this.geometry=new r.BufferGeometry,this.widthCallback=null}function e(t,e,i,s,a){var r;if(t=t.subarray||t.slice?t:t.buffer,i=i.subarray||i.slice?i:i.buffer,t=e?t.subarray?t.subarray(e,a&&e+a):t.slice(e,a&&e+a):t,i.set)i.set(t,s);else for(r=0;r<t.length;r++)i[r+s]=t[r];return i}function i(t){function e(t,e){return void 0===t?e:t}var i=["precision highp float;","","attribute vec3 position;","attribute vec3 previous;","attribute vec3 next;","attribute float side;","attribute float width;","attribute vec2 uv;","attribute float counters;","","uniform mat4 projectionMatrix;","uniform mat4 modelViewMatrix;","uniform vec2 resolution;","uniform float lineWidth;","uniform vec3 color;","uniform float opacity;","uniform float near;","uniform float far;","uniform float sizeAttenuation;","","varying vec2 vUV;","varying vec4 vColor;","varying float vCounters;","","vec2 fix( vec4 i, float aspect ) {","","    vec2 res = i.xy / i.w;","    res.x *= aspect;","\t vCounters = counters;","    return res;","","}","","void main() {","","    float aspect = resolution.x / resolution.y;","\t float pixelWidthRatio = 1. / (resolution.x * projectionMatrix[0][0]);","","    vColor = vec4( color, opacity );","    vUV = uv;","","    mat4 m = projectionMatrix * modelViewMatrix;","    vec4 finalPosition = m * vec4( position, 1.0 );","    vec4 prevPos = m * vec4( previous, 1.0 );","    vec4 nextPos = m * vec4( next, 1.0 );","","    vec2 currentP = fix( finalPosition, aspect );","    vec2 prevP = fix( prevPos, aspect );","    vec2 nextP = fix( nextPos, aspect );","","\t float pixelWidth = finalPosition.w * pixelWidthRatio;","    float w = 1.8 * pixelWidth * lineWidth * width;","","    if( sizeAttenuation == 1. ) {","        w = 1.8 * lineWidth * width;","    }","","    vec2 dir;","    if( nextP == currentP ) dir = normalize( currentP - prevP );","    else if( prevP == currentP ) dir = normalize( nextP - currentP );","    else {","        vec2 dir1 = normalize( currentP - prevP );","        vec2 dir2 = normalize( nextP - currentP );","        dir = normalize( dir1 + dir2 );","","        vec2 perp = vec2( -dir1.y, dir1.x );","        vec2 miter = vec2( -dir.y, dir.x );","        //w = clamp( w / dot( miter, perp ), 0., 4. * lineWidth * width );","","    }","","    //vec2 normal = ( cross( vec3( dir, 0. ), vec3( 0., 0., 1. ) ) ).xy;","    vec2 normal = vec2( -dir.y, dir.x );","    normal.x /= aspect;","    normal *= .5 * w;","","    vec4 offset = vec4( normal * side, 0.0, 1.0 );","    finalPosition.xy += offset.xy;","","    gl_Position = finalPosition;","","}"],s=["#extension GL_OES_standard_derivatives : enable","precision mediump float;","","uniform sampler2D map;","uniform sampler2D alphaMap;","uniform float useMap;","uniform float useAlphaMap;","uniform float useDash;","uniform float dashArray;","uniform float dashOffset;","uniform float dashRatio;","uniform float visibility;","uniform float alphaTest;","uniform vec2 repeat;","","varying vec2 vUV;","varying vec4 vColor;","varying float vCounters;","","void main() {","","    vec4 c = vColor;","    if( useMap == 1. ) c *= texture2D( map, vUV * repeat );","    if( useAlphaMap == 1. ) c.a *= texture2D( alphaMap, vUV * repeat ).a;","    if( c.a < alphaTest ) discard;","    if( useDash == 1. ){","        c.a *= ceil(mod(vCounters + dashOffset, dashArray) - (dashArray * dashRatio));","    }","    gl_FragColor = c;","    gl_FragColor.a *= step(vCounters, visibility);","}"];r.Material.call(this),t=t||{},this.lineWidth=e(t.lineWidth,1),this.map=e(t.map,null),this.useMap=e(t.useMap,0),this.alphaMap=e(t.alphaMap,null),this.useAlphaMap=e(t.useAlphaMap,0),this.color=e(t.color,new r.Color(16777215)),this.opacity=e(t.opacity,1),this.resolution=e(t.resolution,new r.Vector2(1,1)),this.sizeAttenuation=e(t.sizeAttenuation,1),this.near=e(t.near,1),this.far=e(t.far,1),this.dashArray=e(t.dashArray,0),this.dashOffset=e(t.dashOffset,0),this.dashRatio=e(t.dashRatio,.5),this.useDash=0!==this.dashArray?1:0,this.visibility=e(t.visibility,1),this.alphaTest=e(t.alphaTest,0),this.repeat=e(t.repeat,new r.Vector2(1,1));var a=new r.RawShaderMaterial({uniforms:{lineWidth:{type:"f",value:this.lineWidth},map:{type:"t",value:this.map},useMap:{type:"f",value:this.useMap},alphaMap:{type:"t",value:this.alphaMap},useAlphaMap:{type:"f",value:this.useAlphaMap},color:{type:"c",value:this.color},opacity:{type:"f",value:this.opacity},resolution:{type:"v2",value:this.resolution},sizeAttenuation:{type:"f",value:this.sizeAttenuation},near:{type:"f",value:this.near},far:{type:"f",value:this.far},dashArray:{type:"f",value:this.dashArray},dashOffset:{type:"f",value:this.dashOffset},dashRatio:{type:"f",value:this.dashRatio},useDash:{type:"f",value:this.useDash},visibility:{type:"f",value:this.visibility},alphaTest:{type:"f",value:this.alphaTest},repeat:{type:"v2",value:this.repeat}},vertexShader:i.join("\r\n"),fragmentShader:s.join("\r\n")});return delete t.lineWidth,delete t.map,delete t.useMap,delete t.alphaMap,delete t.useAlphaMap,delete t.color,delete t.opacity,delete t.resolution,delete t.sizeAttenuation,delete t.near,delete t.far,delete t.dashArray,delete t.dashOffset,delete t.dashRatio,delete t.visibility,delete t.alphaTest,delete t.repeat,a.type="MeshLineMaterial",a.setValues(t),a}var s=this,a="undefined"!=typeof require,r=s.THREE||a&&require("three");if(!r)throw new Error("MeshLine requires three.js");t.prototype.setGeometry=function(t,e){if(this.widthCallback=e,this.positions=[],this.counters=[],t instanceof r.Geometry)for(s=0;s<t.vertices.length;s++){var i=t.vertices[s],e=s/t.vertices.length;this.positions.push(i.x,i.y,i.z),this.positions.push(i.x,i.y,i.z),this.counters.push(e),this.counters.push(e)}if(r.BufferGeometry,t instanceof Float32Array||t instanceof Array)for(var s=0;s<t.length;s+=3){e=s/t.length;this.positions.push(t[s],t[s+1],t[s+2]),this.positions.push(t[s],t[s+1],t[s+2]),this.counters.push(e),this.counters.push(e)}this.process()},t.prototype.compareV3=function(t,e){var i=6*t,s=6*e;return this.positions[i]===this.positions[s]&&this.positions[i+1]===this.positions[s+1]&&this.positions[i+2]===this.positions[s+2]},t.prototype.copyV3=function(t){var e=6*t;return[this.positions[e],this.positions[e+1],this.positions[e+2]]},t.prototype.process=function(){var t=this.positions.length/6;this.previous=[],this.next=[],this.side=[],this.width=[],this.indices_array=[],this.uvs=[];for(i=0;i<t;i++)this.side.push(1),this.side.push(-1);for(var e,i=0;i<t;i++)e=this.widthCallback?this.widthCallback(i/(t-1)):1,this.width.push(e),this.width.push(e);for(i=0;i<t;i++)this.uvs.push(i/(t-1),0),this.uvs.push(i/(t-1),1);var s;s=this.compareV3(0,t-1)?this.copyV3(t-2):this.copyV3(0),this.previous.push(s[0],s[1],s[2]),this.previous.push(s[0],s[1],s[2]);for(i=0;i<t-1;i++)s=this.copyV3(i),this.previous.push(s[0],s[1],s[2]),this.previous.push(s[0],s[1],s[2]);for(i=1;i<t;i++)s=this.copyV3(i),this.next.push(s[0],s[1],s[2]),this.next.push(s[0],s[1],s[2]);s=this.compareV3(t-1,0)?this.copyV3(1):this.copyV3(t-1),this.next.push(s[0],s[1],s[2]),this.next.push(s[0],s[1],s[2]);for(i=0;i<t-1;i++){var a=2*i;this.indices_array.push(a,a+1,a+2),this.indices_array.push(a+2,a+1,a+3)}this.attributes?(this.attributes.position.copyArray(new Float32Array(this.positions)),this.attributes.position.needsUpdate=!0,this.attributes.previous.copyArray(new Float32Array(this.previous)),this.attributes.previous.needsUpdate=!0,this.attributes.next.copyArray(new Float32Array(this.next)),this.attributes.next.needsUpdate=!0,this.attributes.side.copyArray(new Float32Array(this.side)),this.attributes.side.needsUpdate=!0,this.attributes.width.copyArray(new Float32Array(this.width)),this.attributes.width.needsUpdate=!0,this.attributes.uv.copyArray(new Float32Array(this.uvs)),this.attributes.uv.needsUpdate=!0,this.attributes.index.copyArray(new Uint16Array(this.indices_array)),this.attributes.index.needsUpdate=!0):this.attributes={position:new r.BufferAttribute(new Float32Array(this.positions),3),previous:new r.BufferAttribute(new Float32Array(this.previous),3),next:new r.BufferAttribute(new Float32Array(this.next),3),side:new r.BufferAttribute(new Float32Array(this.side),1),width:new r.BufferAttribute(new Float32Array(this.width),1),uv:new r.BufferAttribute(new Float32Array(this.uvs),2),index:new r.BufferAttribute(new Uint16Array(this.indices_array),1),counters:new r.BufferAttribute(new Float32Array(this.counters),1)},this.geometry.addAttribute("position",this.attributes.position),this.geometry.addAttribute("previous",this.attributes.previous),this.geometry.addAttribute("next",this.attributes.next),this.geometry.addAttribute("side",this.attributes.side),this.geometry.addAttribute("width",this.attributes.width),this.geometry.addAttribute("uv",this.attributes.uv),this.geometry.addAttribute("counters",this.attributes.counters),this.geometry.setIndex(this.attributes.index)},t.prototype.advance=function(t){var i=this.attributes.position.array,s=this.attributes.previous.array,a=this.attributes.next.array,r=i.length;e(i,0,s,0,r),e(i,6,i,0,r-6),i[r-6]=t.x,i[r-5]=t.y,i[r-4]=t.z,i[r-3]=t.x,i[r-2]=t.y,i[r-1]=t.z,e(i,6,a,0,r-6),a[r-6]=t.x,a[r-5]=t.y,a[r-4]=t.z,a[r-3]=t.x,a[r-2]=t.y,a[r-1]=t.z,this.attributes.position.needsUpdate=!0,this.attributes.previous.needsUpdate=!0,this.attributes.next.needsUpdate=!0},(i.prototype=Object.create(r.Material.prototype)).constructor=i,i.prototype.copy=function(t){return r.Material.prototype.copy.call(this,t),this.lineWidth=t.lineWidth,this.map=t.map,this.useMap=t.useMap,this.alphaMap=t.alphaMap,this.useAlphaMap=t.useAlphaMap,this.color.copy(t.color),this.opacity=t.opacity,this.resolution.copy(t.resolution),this.sizeAttenuation=t.sizeAttenuation,this.near=t.near,this.far=t.far,this.dashArray.copy(t.dashArray),this.dashOffset.copy(t.dashOffset),this.dashRatio.copy(t.dashRatio),this.useDash=t.useDash,this.visibility=t.visibility,this.alphaTest=t.alphaTest,this.repeat.copy(t.repeat),this},"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports={MeshLine:t,MeshLineMaterial:i}),exports.MeshLine=t,exports.MeshLineMaterial=i):(s.MeshLine=t,s.MeshLineMaterial=i)}).call(this);
