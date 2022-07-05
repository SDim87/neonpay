// eslint-disable-next-line import/prefer-default-export
export const popupSettings = classPopup => ({
  type: 'inline',
  fixedContentPos: false,
  removalDelay: 200,
  mainClass: 'mfp-zoom-in',
  items: {
    src: classPopup,
  },
  midClick: true,
})
