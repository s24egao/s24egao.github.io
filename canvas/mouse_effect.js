const mouse_effect = p => {
	class Particle {
		constructor(x, y) {
			this.pos = p.createVector(x + p.random(-10, 10), y + p.random(-10, 10))
			this.time = 25
			this.direction = p.random(p.TWO_PI)
			this.size = p.random(15, 50)
		}

		update() {
			this.time--
			p.push()
			p.translate(this.pos.x, this.pos.y)
			p.rotate(this.direction)
			p.stroke(255, this.time * 12)
			p.square((25 - this.time) * 2, 0, this.size * this.time / 25)
			p.pop()
		}
	}

	p.particles = []

	p.setup = () => {
		p.createCanvas(p.windowWidth, p.windowHeight)
		p.noFill()
		p.rectMode(p.CENTER)
		p.strokeWeight(3)
	}

	p.draw = () => {
		p.clear()
		if(p.mouseIsPressed || p.movedX != 0 || p.movedY != 0) {
			if(p.frameCount % 2 == 1) p.particles.push(new Particle(p.mouseX, p.mouseY))
		}
		for(let item of p.particles) { item.update() }
		p.particles = p.particles.filter(item => item.time > 0)
	}

	p.windowResized = () => {
		p.resizeCanvas(p.windowWidth, p.windowHeight)
	}
}

new p5(mouse_effect, 'mouse_effect')