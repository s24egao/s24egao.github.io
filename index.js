let filters_state = []
let filter_speed = 500

for(let card of gallery) {
	if($(`#${card.class}-contents`).length <= 0) {
		$(`#contents`).append(`<div class="filter-button" id="${card.class}-button">${card.name}</div><br>`)
		$('#contents').append(`<div id="${card.class}-contents" style="display: block; position: relative;"></div>`)
		$(`#${card.class}-contents`).append(`<div style="background: white; position: absolute; width: 100%; height: 1px"></div>`)
		$(`#${card.class}-contents`).append(`<div style="background: white; opacity: 0.2; position: absolute; width: 100%; height: 100%"></div>`)
		filters_state[card.class] = true
		$(`#${card.class}-button`).click(() => {
			$(`#${card.class}-button`).css('background', (!filters_state[card.class])? 'white' : '#555555')
			if(filters_state[card.class]) $(`#${card.class}-contents`).hide(filter_speed)
			else $(`#${card.class}-contents`).show(filter_speed)
			filters_state[card.class] = !filters_state[card.class]
		})
	}
	let media
	if(card.type == 'image') media = `<img src="${card.src}" alt="" draggable="false"${(card.link)? ` class="image-link"` : ``}">`
	if(card.type == 'video') media = `<video autoplay loop muted playsinline disablepictureinpicture${(card.link)? ` class="image-link"` : ``}><source src="${card.src}" type="video/mp4"></video>`
	$(`#${card.class}-contents`).append(`<div class="image ${card.class}"><a${(card.link)? ` href="${card.link}" target="_blank"` : ``}>${media}</a></div>`)
}

let callback = (entries, observer) => {
	entries.forEach(entry => {
		if(entry.isIntersecting) entry.target.play()
		else entry.target.pause()
	})
}

let observer = new IntersectionObserver(callback, { threshold: 0 })
document.querySelectorAll('video').forEach(element => {
	observer.observe(element)
})

let info_page = 0

$('#info-text').click(() => {
	info_page++
	info_page %= $('#info-text-container').children().length
	$('#info-text-container').css('left', `${info_page * -260}px`)
})

let show_info = true

$('#info-click').click(() => {
	if(window.innerWidth > 720) return
	if(show_info) $('#info').css('left', '-95%')
	else $('#info').css('left', '0%')
	show_info = !show_info
})

$(window).resize(() => {
	if(show_info) return
	if(window.innerWidth <= 720) return
	show_info = true
	$('#info').css('left', '0%')
})