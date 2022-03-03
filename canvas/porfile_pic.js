const porfile_pic = p => {
	p.setup = () => {
		p.createCanvas(180, 180)
		p.scale(0.36)
		p.background(0)
		
		let fog = p.color(p.random(50, 120), p.random(50, 120), p.random(50, 120), 20)
		
		for(let i = 0; i < 500; i++) {
			p.noStroke()
			p.fill(i / 3)
			p.rect(0, i, 500, 1)
		}
		
		p.translate(250, 400)
		for(let i = 0; i < 25; i++) {
			p.push()
			p.scale(1.5)
			for(let j = 0; j < 24 - i; j++) {
				p.scale(0.85)	
			}
			p.drawGround()
			p.drawStreet(1)
			p.drawStreet(-1)
			p.drawLight(1, p.random(1, 3))
			p.drawLight(-1, p.random(1, 3))
			if(p.random(5) < 1) p.drawLine(1)
			if(p.random(5) < 1) p.drawLine(-1)
			p.pop()
			p.blendMode(p.ADD)
			p.background(fog)
		}
	}

	p.drawStreet = (s) => {
		for(let i = 0; i < 18; i++) {
			p.push()
			p.colorMode(p.RGB)
			p.blendMode(p.MULTIPLY)
			if(p.random(10) < 1) p.blendMode(p.SOFT_LIGHT)
			p.fill(p.random(100, 255), p.random(100,200), p.random(150,200))
			p.rotate(p.random(-0.05, 0.05))
			p.rectMode(p.CENTER)
			p.rect(p.random(-p.width, -150) * s, p.random(-250, 50), p.random(30, 100), p.random(150, 400))
			p.pop()
		}
	}

	p.drawLight = (s, amount) => {
		for(let i = 0; i < amount; i++) {
			p.push()
			if(p.random(3) > 1) {
				p.blendMode(p.ADD)
				p.drawingContext.shadowColor = p.color(50, 50, 10)
				p.drawingContext.shadowBlur = 30
				p.fill(p.random(180, 255), p.random(150,230), p.random(150,255))
				p.rectMode(p.CENTER)
				p.rect(p.random(-150, -120) * s, p.random(-250, -30), p.random(10, 30), p.random(50, 100))
			} else if(p.random(2) > 1) {
				p.blendMode(p.DIFFERENCE)
				p.fill(p.random(180, 255), p.random(150,230), p.random(150,255))
				p.textAlign(p.CENTER, p.CENTER)
				p.translate(p.random(-150, -120) * s, p.random(-250, -10))
				p.rotate(p.HALF_PI + p.random(-0.08, 0.08))
				p.textSize(28)
				p.textStyle(p.BOLD)
				p.text(p.random(['HELLO', 'NIGHT', 'HAPPY', 'XD', 'SHOW', 'SEKAI']), 0, 0)
			} else {
				p.blendMode(p.DIFFERENCE)
				p.fill(p.random(180, 255), p.random(150,230), p.random(150,255))
				p.rectMode(p.CENTER)
				p.rect(p.random(-150, -120) * s, p.random(-250, -30), p.random(2, 5), p.random(60, 120))
			}
			p.pop()
		}
	}

	p.drawLine = (s) => {
		p.push()
		p.blendMode(p.ADD)
		p.stroke(p.random(180, 255), p.random(150,230), p.random(150,255))
		p.noFill()
		p.rotate(p.random(-0.08, 0.08))
		p.rectMode(p.CENTER)
		p.rect(p.random(-180, -150) * s, p.random(-250, -30),  p.random(30, 120), p.random(80, 200))
		p.pop()
	}

	p.drawGround = () => {
		p.push()
		p.blendMode(p.MULTIPLY)
		p.fill(120)
		p.rect(-p.width / 2 - 100, 50, p.width + 200, 100)
		p.pop()
	}
}

new p5(porfile_pic, 'porfile_pic')