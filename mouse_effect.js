let canvasElement = document.createElement('canvas')
canvasElement.setAttribute('style', 'position: fixed; width: ${innerWidth}px; height: ${innerHeight}px; pointer-events: none; mix-blend-mode: difference; z-index: 2;')
canvasElement.setAttribute('id', 'mouse_effect')
document.body.append(canvasElement)

let canvas = document.getElementById('mouse_effect')
let c = canvas.getContext('2d')
let mouseX = 0, mouseY = 0, mouseIsPressed = false, pmouseX = 0, pmouseY = 0
let particles = []
let frame = 0

window.onresize = () => {
	canvas.setAttribute('style', `position: fixed; width: ${innerWidth}px; height: ${innerHeight}px; pointer-events: none; mix-blend-mode: difference; z-index: 2;`)
	canvas.width = innerWidth * devicePixelRatio
	canvas.height = innerHeight * devicePixelRatio
	c.scale(devicePixelRatio, devicePixelRatio)
	c.lineWidth = 3
}
window.addEventListener('mousemove' ,e => {
	mouseX = e.clientX
	mouseY = e.clientY
})
window.addEventListener('mousedown' ,() => {
	mouseIsPressed = true
})
window.addEventListener('mouseup' ,() => {
	mouseIsPressed = false
})
window.onresize()

class Particle {
	constructor(x, y) {
		this.x = x + Math.random() * 20 - 10
		this.y = y + Math.random() * 20 - 10
		this.time = 25
		this.direction = Math.random() * 6.28318
		this.size = Math.random() * 35 + 15
	}

	update() {
		this.time--
		let s = this.size * this.time / 25
		c.save()
		c.translate(this.x, this.y)
		c.rotate(this.direction)
		c.strokeStyle = `rgba(255, 255, 255, ${this.time * 12 / 255})`
		c.strokeRect((25 - this.time) * 2 - s / 2, -s / 2, s, s)
		c.restore()
	}
}

function draw() {
	requestAnimationFrame(draw)
	c.clearRect(0, 0, canvas.width, canvas.height)
	if(mouseIsPressed || mouseX != pmouseX || mouseY != pmouseY) {
		if(frame % 2 == 1) particles.push(new Particle(mouseX, mouseY))
	}
	for(let item of particles) { item.update() }
	particles = particles.filter(item => item.time > 0)
	frame++
	pmouseX = mouseX
	pmouseY = mouseY
}
draw()