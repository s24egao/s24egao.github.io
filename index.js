for(let card of gallery) {
	let media
	if(card.type == 'image') media = `<img src="${card.src}" alt="" draggable="false"${(card.link)? ` class="image-link"` : ``}">`
	if(card.type == 'video') media = `<video autoplay loop muted playsinline disablepictureinpicture${(card.link)? ` class="image-link"` : ``}><source src="${card.src}" type="video/mp4"></video>`
	$('#contents').append(`<div class="image ${card.class}"><a${(card.link)? ` href="${card.link}" target="_blank"` : ``}>${media}</a></div>`)
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

let filter1 = true
let filter2 = true
let filter3 = true
let filter4 = true

let filter_speed = 500

$('#filter1-button').click(() => {
	$('#filter1-button').css('color', (!filter1)? '#ffffff' : '#888888')
	if(filter1) $('.filter1').hide(filter_speed)
	else $('.filter1').show(filter_speed)
	filter1 = !filter1
})

$('#filter2-button').click(() => {
	$('#filter2-button').css('color', (!filter2)? '#ffffff' : '#888888')
	if(filter2) $('.filter2').hide(filter_speed)
	else $('.filter2').show(filter_speed)
	filter2 = !filter2
})

$('#filter3-button').click(() => {
	$('#filter3-button').css('color', (!filter3)? '#ffffff' : '#888888')
	if(filter3) $('.filter3').hide(filter_speed)
	else $('.filter3').show(filter_speed)
	filter3 = !filter3
})

$('#filter4-button').click(() => {
	$('#filter4-button').css('color', (!filter4)? '#ffffff' : '#888888')
	if(filter4) $('.filter4').hide(filter_speed)
	else $('.filter4').show(filter_speed)
	filter4 = !filter4
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