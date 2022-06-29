const $navLink = $('.js-navigation__link')
const $header = $('.js-header')
const modOpen = 'is-opened'

// При click скрывает мобильное меню
$navLink.click((e) => {
  e.preventDefault()

  $header.find('.is-opened').removeClass(modOpen)
  $header.removeClass(modOpen)
})
