const bg = p => {
	class particle {
		constructor() {
			this.x = p.random(0, p.width)
			this.y = p.random(0, p.height)
		}

		update() {
			p.line(this.x, p.noise(this.y, p.mouseX) * p.height, this.x + 2, p.noise(this.y, p.mouseX) * p.height)
			this.x += 2
			if(this.x > p.width) this.x = 0
		}
	}

	p.particles = []

	p.setup = () => {
		p.createCanvas(p.windowWidth - ((p.windowWidth > 720)? 400 : 0), p.windowHeight)
		p.background(0)
		p.rectMode(p.CENTER)
		p.stroke(255)
		p.noiseDetail(2, 1)
		for(let i = 0; i < 50; i++) { p.particles.push(new particle()) }
	}

	p.draw = () => {
		if(!p.focused) return
		p.background(0, 6)
		for(let item of p.particles) { item.update() }
	}

	p.windowResized = () => {
		p.resizeCanvas(p.windowWidth - ((p.windowWidth > 720)? 400 : 0), p.windowHeight)
		for(let item of p.particles) { item.x = p.random(0, p.width) }
	}
}

new p5(bg, 'bg')