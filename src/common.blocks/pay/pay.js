import { v4 as uuidv4 } from 'uuid'
import { validateEmail } from '../../utils/validateEmail'
import { popupSettings } from '../popup/popup'

const $btns = $('.js-pay__btn')
const $codeBlock = $('.js_pay__code')
const PUBLIC_ID = 'pk_3cf110c929aef667311582ac09b23'

const getCost = (cost) => {
  switch (Number(cost)) {
    case 1000:
      return 1300
    case 2000:
      return 2600
    case 3000:
      return 3900

    default:
      return 0
  }
}

const pay = (amount, uuid, email, type) => {
  const widget = new cp.CloudPayments()
  widget.pay(
    'auth', // или 'charge'
    {
      // options
      publicId: PUBLIC_ID, // id из личного кабинета
      description: `Покупка сертификата ${type} рублей neonpay.ru`, // назначение
      amount, // сумма
      currency: 'RUB', // валюта
      accountId: email, // идентификатор плательщика (необязательно)
      // invoiceId: '1234567', // номер заказа  (необязательно)
      email, // email плательщика (необязательно)
      skin: 'mini', // дизайн виджета (необязательно)
      data: {
        uuid,
        email,
        type,
      },
    },
    {
      // eslint-disable-next-line no-unused-vars
      onFail(reason, options) {
        // действие при неуспешной оплате
        $.magnificPopup.open(popupSettings('#popup-error'))
      },
      onComplete(paymentResult, options) {
        // Вызывается как только виджет получает от api.cloudpayments
        // ответ с результатом транзакции.

        if (paymentResult.success) {
          // request to back
          fetch('https://neonpay.ru/getCert.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ ...options.data }),
          }).then((response) => {
            response.json().then((res) => {
              $codeBlock.text(res.cert)
            })
          })
        }
      },
      // eslint-disable-next-line no-unused-vars
      onSuccess(options) {
        // действие при успешной оплате
        $.magnificPopup.open(popupSettings('#popup-success'))
      },
    },
  )
}

$btns.on('click', (evt) => {
  evt.preventDefault()

  const {
    currentTarget: {
      dataset: { type },
    },
  } = evt

  const uuid = uuidv4()
  const fieldEmail = $(`#email${type}`)
  const emailValue = fieldEmail.val()
  const isValidEmail = validateEmail(emailValue)

  if (isValidEmail) {
    fieldEmail.removeClass('is-error')

    // проверим есть ли совпадения uuid
    fetch('https://neonpay.ru/setID.php', {
      method: 'POST',
      headers: {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      },
      body: JSON.stringify({ uuid }),
    }).then((response) => {
      if (response.ok) {
        console.log(response.ok)
        pay(getCost(type), uuid, emailValue, type)
      } else {
        $.magnificPopup.open(popupSettings('#popup-error'))
      }
    })
  } else {
    fieldEmail.addClass('is-error')
  }
})
