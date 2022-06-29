import heightHeader from '../../helpers/heightHeader'

$('.js-scroll-block').click(function clickHandler(event) {
  // отменяем стандартную обработку нажатия по ссылке
  event.preventDefault()

  // console.log('heightHeader', heightHeader());
  // забираем идентификатор блока с атрибута href
  const id = $(this).attr('href')

  // узнаем высоту от начала страницы до блока на который ссылается якорь
  const top = $(id).offset().top - heightHeader()

  // анимируем переход на расстояние - top за 700 мс
  $('body,html').animate({ scrollTop: top }, 700)
})
