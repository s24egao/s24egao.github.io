const bg = p => {
	let objects = []
	let y = 0
	let ySpeed = 0
	let colors = ['#E56399', '#0D2648', '#035E7B', '#93C6D6']
	let background = '#000000'

	class Square {
		constructor() {
			this.x = p.random(0, p.width)
			this.y = p.random(y, y + p.height)
			this.s = p.random(5, 50)
			let n = p.floor(p.random(colors.length))
			this.c = colors[n]
			this.life = p.random(150, 300)
			this.r = Math.floor(p.random(0, 4)) * p.HALF_PI
			this.offset = p.random(50, 2000)
		}

		update() {
			if(this.life < 30) this.s *= 0.9
			this.offset *= 0.95
			p.push()
			p.translate(this.x, this.y)
			p.rotate(this.r)
			p.fill(this.c)
			p.square(this.offset, 0, this.s * 8)
			p.pop()
			this.life--
		}
	}

	class Ripple {
		constructor() {
			this.x = p.random(0, p.width)
			this.y = p.random(y, y + p.height)
			this.s = p.random(20, 30)
			this.s2 = p.random(200, 500)
			let n = p.floor(p.random(colors.length))
			this.c = (colors[n] != background)? colors[n] : colors[(n + p.floor(p.random(1, colors.length))) % colors.length]
			this.life = 30
		}

		update() {
			this.s = p.lerp(this.s, this.s2, 0.2)
			p.push()
			p.translate(this.x, this.y)
			p.stroke(this.c)
			p.strokeWeight(this.life / 3)
			p.ellipse(0, 0, this.s, this.s, 50)
			p.pop()
			this.life--
		}
	}

	class Line {
		constructor() {
			this.x = p.random(0, p.width)
			this.y = p.random(y, y + p.height)
			this.l = p.random(300, 1000)
			this.w = p.random(6, 12)
			let n = p.floor(p.random(colors.length))
			this.c = (colors[n] != background)? colors[n] : colors[(n + p.floor(p.random(1, colors.length))) % colors.length]
			this.life = 60
			this.r = Math.floor(p.random(0, 4)) * p.HALF_PI
		}

		update() {
			p.push()
			p.translate(this.x, this.y)
			p.rotate(this.r)
			p.stroke(this.c)
			p.strokeWeight(this.w)
			p.line(this.l * p.pow(0.85, p.max(30 - this.life / 2, 1)), 0,
			 this.l * p.pow(0.85, p.max(20 - this.life / 2, 1)), 0)
			p.pop()
			this.life--
		}
	}

	p.setup = () => {
		p.createCanvas(p.windowWidth, p.windowHeight)
		p.noStroke()
		p.noFill()
		p.rectMode(p.CENTER)
		p.ellipseMode(p.CENTER)
	}

	p.draw = () => {
		y += 1 + ySpeed
		ySpeed *= 0.9
		p.background(background)
		p.translate(0, -y, 0)
			
		for(let o of objects) { o.update() }

		if(p.frameCount % 10 == 0) objects.push(new Square())
		if(p.frameCount % 10 == 0) objects.push(new Line())
		if(p.frameCount % 20 == 0) objects.push(new Ripple())

		objects = objects.filter(o => o.life > 0)
	}

	p.windowResized = () => {
		p.resizeCanvas(p.windowWidth, p.windowHeight)
	}

	let gallery = document.getElementById('contents')
	let scrollY = gallery.scrollTop
	gallery.onscroll = event => {
		ySpeed += (gallery.scrollTop - scrollY) / 8
		scrollY = gallery.scrollTop
	}
}

new p5(bg, 'bg')