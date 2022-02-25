let gallery = [
	{ type: 'image', class: 'filter3', src: 'images/image1.jpg' },
	{ type: 'video', class: 'filter1', src: 'images/image2.mp4' },
	{ type: 'image', class: 'filter3', src: 'images/image3.jpg' },
	{ type: 'video', class: 'filter4', src: 'images/image4.mp4', link: 'https://openprocessing.org/sketch/1481895' },
	{ type: 'image', class: 'filter3', src: 'images/image5.jpg' },
	{ type: 'video', class: 'filter1', src: 'images/image6.mp4' },
	{ type: 'image', class: 'filter2', src: 'images/image7.jpg' },
	{ type: 'video', class: 'filter1', src: 'images/image8.mp4' },
	{ type: 'image', class: 'filter2', src: 'images/image9.jpg' },
	{ type: 'video', class: 'filter1', src: 'images/image10.mp4' },
	{ type: 'image', class: 'filter4', src: 'images/image11.jpg', link: 'https://openprocessing.org/sketch/1396172' },
	{ type: 'video', class: 'filter3', src: 'images/image12.mp4' },
	{ type: 'image', class: 'filter2', src: 'images/image13.jpg' },
	{ type: 'video', class: 'filter4', src: 'images/image14.mp4', link: 'https://openprocessing.org/sketch/1390398' },
	{ type: 'image', class: 'filter4', src: 'images/image15.jpg', link: 'https://openprocessing.org/sketch/1396172' },
	{ type: 'video', class: 'filter4', src: 'images/image16.mp4', link: 'https://openprocessing.org/sketch/1392682' },
	{ type: 'image', class: 'filter2', src: 'images/image17.jpg' },
	{ type: 'video', class: 'filter4', src: 'images/image18.mp4', link: 'https://openprocessing.org/sketch/1396105' },
	{ type: 'image', class: 'filter3', src: 'images/image19.jpg' },
	{ type: 'video', class: 'filter1', src: 'images/image20.mp4' },
	{ type: 'image', class: 'filter3', src: 'images/image21.jpg' },
	{ type: 'video', class: 'filter1', src: 'images/image22.mp4' },
	{ type: 'image', class: 'filter2', src: 'images/image23.jpg' },
	{ type: 'video', class: 'filter4', src: 'images/image24.mp4', link: 'https://openprocessing.org/sketch/1466763' },
	{ type: 'image', class: 'filter3', src: 'images/image25.jpg' },
	{ type: 'video', class: 'filter1', src: 'images/image26.mp4' },
	{ type: 'image', class: 'filter4', src: 'images/image27.jpg', link: 'https://openprocessing.org/sketch/1495466' },
	{ type: 'image', class: 'filter4', src: 'images/image28.jpg', link: 'https://openprocessing.org/sketch/1495466' },
	{ type: 'image', class: 'filter3', src: 'images/image29.jpg' },
	{ type: 'video', class: 'filter1', src: 'images/image30.mp4' },
]

for(let card of gallery) {
	let media
	if(card.type == 'image') media = `<img src="${card.src}" alt="" draggable="false"${(card.link)? ` class="image-link"` : ``}">`
	if(card.type == 'video') media = `<video autoplay loop muted playsinline disablepictureinpicture${(card.link)? ` class="image-link"` : ``}><source src="${card.src}" type="video/mp4"></video>`
	$('#images').append(`<div class="image ${card.class}"><a${(card.link)? ` href="${card.link}" target="_blank"` : ``}>${media}</a></div>`)
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