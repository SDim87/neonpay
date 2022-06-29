let isFixed = false
const $header = $('.js-header')
const $nextBlock = $('.js-header__order')
const offset = 40 + $header.outerHeight(true)
const $btnBurger = $('.js-header__btn')
const $btnClose = $('.js-header__btn_close')
const $bropdown = $('.js-header__dropdown')
const $scrollLine = $('.js-header__horizont-line')
const mod = 'is-opened'

// Выпадающее шапка и добавление верхнего отступа
$(window).scroll(function switchHeader() {
  if ($(this).scrollTop() >= $header.offset().top + offset) {
    $header.addClass('is-fixed')
    $nextBlock.addClass('is-padded')
    isFixed = true
  }

  if ($(this).scrollTop() <= $nextBlock.offset().top + offset && isFixed) {
    $header.removeClass('is-fixed')
    $nextBlock.removeClass('is-padded')
    isFixed = false
  }
})

// Открытие мобильного меню
$btnBurger.click((evt) => {
  evt.preventDefault()

  if (!$btnBurger.hasClass(mod)) {
    $header.addClass(mod)
    $btnBurger.addClass(mod)
    $btnClose.addClass(mod)
    $bropdown.addClass(mod)
  }
})

// Закрытие мобильного меню
$btnClose.click((evt) => {
  evt.preventDefault()

  if ($btnClose.hasClass(mod)) {
    $header.removeClass(mod)
    $btnBurger.removeClass(mod)
    $btnClose.removeClass(mod)
    $bropdown.removeClass(mod)
  }
})

// Возвращает высоту скролл области
function getDocumentHeight() {
  return $(document).height() - window.innerHeight
}

// Возвращает смещение документа по Y
function getScrollOffset() {
  return $(window).scrollTop()
}

// Возвращает смещение window в %
function procentWidth() {
  return `${Math.round((getScrollOffset() / getDocumentHeight()) * 100)}%`
}

// Движение horizontal-line
$(window).scroll(() => {
  getDocumentHeight()
  getScrollOffset()
  procentWidth()

  $(window).resize(() => {
    getDocumentHeight()
  })

  $scrollLine.css('width', procentWidth())
})
