let filters_state = []
let filter_speed = 500

let i = 0
for(let card of gallery) {
	i++
	if($(`#${card.class}-contents`).length <= 0) {
		$(`#contents`).append(`<div class="filter-button" id="${card.class}-button">${card.tag}</div><br>`)
		$('#contents').append(`<div><div class="contents-block" id="${card.class}-contents"></div>`)
		$(`#${card.class}-contents`).append(`<div style="background: white; position: absolute; height: 100%; width: 2px;"></div>`)
		$(`#${card.class}-contents`).append(`<div style="background: white; opacity: 0.2; position: absolute; width: 100%; height: 100%"></div>`)
		filters_state[card.class] = true
		$(`#${card.class}-button`).click(() => {
			$(`#${card.class}-button`).css('background', (!filters_state[card.class])? 'white' : '#555555')
			if(filters_state[card.class]) $(`#${card.class}-contents`).hide(filter_speed)
			else $(`#${card.class}-contents`).show(filter_speed)
			filters_state[card.class] = !filters_state[card.class]
		})
		i = 1
	}
	let media
	let link = (card.link)? `<a href="${card.link}" target="_blank">Open in new tab</a>` : ``
	if(card.src.endsWith('.jpg')) media = `<img src="${card.src}" alt="" draggable="false"}">`
	if(card.src.endsWith('.mp4')) media = `<video autoplay loop muted playsinline disablepictureinpicture><source src="${card.src}" type="video/mp4"></video>`
	$(`#${card.class}-contents`).append(`<div class="image ${card.class} ${(card.link)? 'open-link' : ''}" style="animation: slide-up 0.5s ${i * 0.1}s backwards;">${media}${link}</div>`)
}

let info_page = 0

$('#info-text').click(() => {
	info_page++
	info_page %= $('#info-text-container').children().length
	$('#info-text-container').css('left', `${info_page * -260}px`)
})

let show_info = true
let swipe = false
let mouse_x

function touch_start(e) {
	if(window.innerWidth > 720) return
	swipe = true
	let position_x = (e.type.startsWith('touch'))? e.touches[0].clientX : e.clientX
	$('#info').css('transition-duration', '0s')
	$('#arrow-up').css('transform', 'rotate(90deg)')
	$('#arrow-down').css('transform', 'rotate(-90deg)')
	$('#arrow').css('animation', 'none')
	mouse_x = position_x - parseFloat($('#info').css('left'))
}

function touch_move(e) {
	if(!swipe || window.innerWidth > 720) return
	let position_x = (e.type.startsWith('touch'))? e.touches[0].clientX : e.clientX
	if(position_x - mouse_x >= 0) return
	$('#info').css('left', `${position_x - mouse_x}px`)
}

function touch_end(e) {
	if(!swipe || window.innerWidth > 720) return
	swipe = false
	let position_x = (e.type.startsWith('touch'))? e.changedTouches[0].clientX : e.clientX
	$('#info').css('transition-duration', '0.5s')
	$('#arrow-up').css('transform', 'rotate(60deg)')
	$('#arrow-down').css('transform', 'rotate(-60deg)')
	$('#arrow').css('animation', 'arrow 1s 0s infinite alternate-reverse')
	if((!show_info && position_x - mouse_x < -30)) $('#info').css('left', '-93%').css('opacity', '0.2')
	else $('#info').css('left', '0px').css('opacity', '1')
	show_info = !show_info
}

$(window).on('touchmove', touch_move)
$(window).on('mousemove', touch_move)
$(window).on('touchend', touch_end)
$(window).on('mouseup', touch_end)

$(window).resize(() => {
	if(window.innerWidth <= 720) return
	swipe = false
	show_info = true
	$('#info').css('transition-duration', '0.5s').css('left', '0px').css('opacity', '1')
})