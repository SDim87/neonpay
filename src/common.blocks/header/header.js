const $scrollLine = $('.js-header__horizont-line')
const $blockPay = $('.js-header__pay')
const $blockFastBuy = $('.js-header__fast-buy')
const EXTRA_OFFSET = 700

// Возвращает высоту до блока сверху
function getOffsetFromBlock(block) {
  return Math.ceil(block.offset().top)
}

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

const pointHiddenBlock = () =>
  Math.ceil(getOffsetFromBlock($blockPay) - EXTRA_OFFSET)

// Движение horizontal-line
$(window).scroll(() => {
  getScrollOffset()
  getDocumentHeight()
  procentWidth()
  const coordHiddenBlock = pointHiddenBlock()

  if (coordHiddenBlock <= getScrollOffset()) {
    $blockFastBuy.addClass('is-none')
  } else {
    $blockFastBuy.removeClass('is-none')
  }

  $(window).resize(() => {
    getDocumentHeight()
    pointHiddenBlock()
  })

  $scrollLine.css('width', procentWidth())
})
