const bg = p => {
	let vert = `
attribute vec3 aPosition;

void main() {
	vec4 pos = vec4(aPosition, 1.0);
	pos.xy = pos.xy * 2.0 - 1.0;
	gl_Position = pos;
}
	`

	let frag = `
precision mediump float;

uniform sampler2D mainTex;
uniform vec2 mouse;
uniform vec2 resolution;
uniform float time;

float random(float s) {
	return fract(sin(floor(s) * 123.45) * 48763.0);
}

float noise(float s) {
	return mix(random(s), random(s + 1.0), smoothstep(0.0, 1.0, fract(s)));
}

void main() {
	vec2 st = gl_FragCoord.xy / resolution;
	
	vec4 color = texture2D(mainTex, st + vec2(noise(st.x * 100.0) * 0.1, 0));
	gl_FragColor = color;
}
	`

	let graphics
	let particles = []
	let shader

	class particle {
		constructor() {
			this.x = p.random(0, p.width)
			this.y = p.random(0, p.height)
		}

		update() {
			graphics.line(this.x, p.noise(this.y, p.mouseX) * p.height, this.x + 3, p.noise(this.y, p.mouseX) * p.height)
			this.x += 3
			if(this.x > p.width) this.x = 0
		}
	}

	p.setup = () => {
		p.createCanvas(p.windowWidth - ((p.windowWidth > 720)? 400 : 0), p.windowHeight, p.WEBGL)
		graphics = p.createGraphics(p.windowWidth - ((p.windowWidth > 720)? 400 : 0), p.windowHeight)
		p.pixelDensity(1)
		graphics.pixelDensity(1)
		graphics.background(0)
		graphics.stroke(255)
		graphics.noiseDetail(2, 1)
		graphics.strokeWeight(2)
		for(let i = 0; i < 50; i++) { particles.push(new particle()) }
		shader = p.createShader(vert, frag)
	}

	p.draw = () => {
		if(!p.focused) return
		graphics.background(0, 8)
		for(let item of particles) { item.update() }
		p.shader(shader)
		shader.setUniform('mainTex', graphics)
		shader.setUniform('mouse', [p.constrain(p.map(p.mouseX, 0, p.width, 0, 1), 0, 1),
										p.constrain(p.map(p.mouseY, 0, p.height, 0, 1), 0, 1)])
		shader.setUniform('resolution', [p.width * p.pixelDensity(), p.height * p.pixelDensity()])
		shader.setUniform('time', p.frameCount)
		p.rect(-p.width / 2, -p.height / 2, p.width, p.height)
	}

	p.windowResized = () => {
		p.resizeCanvas(p.windowWidth - ((p.windowWidth > 720)? 400 : 0), p.windowHeight)
		graphics.w = p.width
		graphics.h = p.height
		for(let item of particles) { item.x = p.random(0, p.width) }
	}
}

new p5(bg, 'bg')