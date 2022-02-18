const mouse_effect = p => {
	class particle {
		constructor(x, y) {
			this.pos = p.createVector(x + p.random(-20, 20), y + p.random(-20, 20))
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
		for(let item of p.particles) { item.update() }
		p.particles = p.particles.filter(item => item.time > 0)
	}

	p.mouseMoved = () => {
		if(p.frameCount % 2 == 1) return
		p.particles.push(new particle(p.mouseX, p.mouseY))
	}

	p.windowResized = () => {
		p.resizeCanvas(p.windowWidth, p.windowHeight)
	}
}

new p5(mouse_effect, 'mouse_effect')