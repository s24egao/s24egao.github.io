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

$('#info-click').click(() => {
	if(window.innerWidth > 720) return
	if(show_info) $('#info').css('left', '-95%').css('opacity', '0.2')
	else $('#info').css('left', '0%').css('opacity', '1')
	show_info = !show_info
})

$(window).resize(() => {
	if(show_info) return
	if(window.innerWidth <= 720) return
	show_info = true
	$('#info').css('left', '0%').css('opacity', '1')
})