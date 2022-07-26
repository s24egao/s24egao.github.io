let i = 0
for(let item of gallery) {
	i++
	let delay = i * 0.1 + 0.2
	if(item.project) {
		$(`#contents`).append(`<div class="project" style="animation: slide-up 0.5s ${delay}s backwards;"><img src="${item.src}"><div></div><h1>${item.project}</h1><a href="${item.link}" target="_blank">Open</a></div>`)
	} else {
		let is_video = item.src.endsWith('.mp4')
		let link = (item.link)? `<a href="${item.link}" target="_blank">Open</a>` : ``
		let media = (!is_video)? `<img src="${item.src}" alt="" draggable="false"}">` : `<video autoplay loop muted playsinline disablepictureinpicture src="${item.src}"></video>`
		$(`#contents`).append(`<div id="image_${i}" class="image" style="opacity: 0;">${media}${link}</div>`)
		let mediaElement = document.getElementById(`image_${i}`).childNodes[0]
		if((!is_video)? mediaElement.complete : mediaElement.readyState > 0) {
			let aspect = (!is_video)? mediaElement.naturalWidth / mediaElement.naturalHeight : mediaElement.videoWidth / mediaElement.videoHeight
			mediaElement.parentElement.setAttribute('style', `animation: slide-up 0.5s ${delay}s backwards; flex: ${aspect * 10} 1 ${aspect * 175}px`)
		}
		else mediaElement.addEventListener((!is_video)? 'load' : 'loadeddata', () => { 
			let aspect = (!is_video)? mediaElement.naturalWidth / mediaElement.naturalHeight : mediaElement.videoWidth / mediaElement.videoHeight
			mediaElement.parentElement.setAttribute('style', `animation: slide-up 0.5s ${delay}s backwards; flex: ${aspect * 10} 1 ${aspect * 175}px`)
		})
	}
}
$(`#contents`).append(`<div class="image" style="flex: 1 1 300px; margin-top: 0px; margin-bottom: 0px;"></div>`)

let info_page = 0

$('#info-text').click(() => {
	info_page++
	info_page %= $('#info-text-container').children().length
	$('#info-text-container').css('left', `${info_page * -260}px`)
})

let show_info = true
let swipe = false
let mouse_y

function touch_start(e) {
	if(window.innerWidth > 720) return
	swipe = true
	let position_y = (e.type.startsWith('touch'))? e.touches[0].clientY : e.clientY
	$('#info').css('transition-duration', '0s')
	$('#arrow-up').css('transform', 'rotate(90deg)')
	$('#arrow-down').css('transform', 'rotate(-90deg)')
	$('#arrow').css('animation', 'none')
	mouse_y = position_y
}

function touch_move(e) {
	if(!swipe || window.innerWidth > 720) return
	let position_y = (e.type.startsWith('touch'))? e.touches[0].clientY : e.clientY
	if(position_y - mouse_y >= 0) return
	$('#info').css('top', `${position_y - mouse_y}px`)
}

function touch_end(e) {
	if(!swipe || window.innerWidth > 720) return
	swipe = false
	let position_y = (e.type.startsWith('touch'))? e.changedTouches[0].clientY : e.clientY
	$('#info').css('transition-duration', '0.5s')
	if((show_info && position_y - mouse_y < -30)) {
		$('#info').css('top', `-${innerHeight - 60}px`).css('background', 'rgba(255, 255, 255, 0.3)').css('backdrop-filter', 'blur(8px)')
		show_info = false
	} else {
		$('#arrow-up').css('transform', 'rotate(60deg)')
		$('#arrow-down').css('transform', 'rotate(-60deg)')
		$('#info').css('top', '0px').css('background', 'white')
		$('#arrow').css('animation', 'arrow 1s 0s infinite alternate-reverse')
		show_info = true
	}
}

$(window).on('touchmove', touch_move)
$(window).on('mousemove', touch_move)
$(window).on('touchend', touch_end)
$(window).on('mouseup', touch_end)

$(window).resize(() => {
	if(window.innerWidth <= 720) return
	swipe = false
	show_info = true
	$('#info').css('transition-duration', '0.5s').css('top', '0px').css('background', 'white')
})