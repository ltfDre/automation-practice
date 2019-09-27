const assert = require('assert')

const mEmail = `example${+new Date()}@example.com`
const mPassword = `123456`
const mAlias = `home`
const mAddress = `Street address, P.O. Box, Company name`
const mPhone = `+1-202-555-0178`

let itemAmount, itemShipping, total

describe('Create an Account', () => {
  it('should navigate to automationpractice.com', () => {
    browser.url('http://automationpractice.com')
    const title = browser.getTitle()
    assert.strictEqual(title, 'My Store')
  })

  it('should navigate sign in', () => {
    const login = $('.login')
    login.waitForDisplayed(10000)
    login.click()

    const createAccount = $('#SubmitCreate')
    createAccount.waitForDisplayed(10000)
    assert.strictEqual(createAccount.isDisplayed(), true)
  })

  it('should throw error with an invalid email', () => {
    const createAccount = $('#SubmitCreate')
    const emailInput = $('#email_create')

    emailInput.setValue('abcde')
    createAccount.click()

    const error = $('#create_account_error')
    error.waitForDisplayed(10000)
    assert.strictEqual(error.isDisplayed(), true)
  })

  it('should redirect with an valid email', () => {
    const createAccount = $('#SubmitCreate')
    const emailInput = $('#email_create')

    emailInput.setValue(mEmail)
    createAccount.click()

    const submitAccount = $('#submitAccount')
    submitAccount.waitForDisplayed(10000)
    assert.strictEqual(submitAccount.isDisplayed(), true)
  })

  it('should fill form with an valid inputs', () => {
    const firstName = $('#customer_firstname')
    const lastName = $('#customer_lastname')
    const email = $('#email')
    const password = $('#passwd')
    const addressFirstName = $('#firstname')
    const addressLastName = $('#lastname')
    const address = $('#address1')
    const city = $('#city')
    const state = $('#id_state')
    const postcode = $('#postcode')
    const country = $('#id_country')
    const phone = $('#phone_mobile')
    const alias = $('#alias')

    firstName.setValue('John')
    lastName.setValue('Doe')
    email.setValue(mEmail)
    password.setValue(mPassword)
    addressFirstName.setValue('John')
    addressLastName.setValue('Doe')
    address.setValue(mAddress)
    city.setValue('New York')
    state.selectByAttribute('value', '32')
    postcode.setValue('34100')
    country.selectByAttribute('value', '21')
    phone.setValue(mPhone)
    alias.setValue(mAlias)

    const submitAccount = $('#submitAccount')
    submitAccount.click()

    const pageHeading = $('h1.page-heading')
    pageHeading.waitForDisplayed(10000)
    assert.strictEqual(pageHeading.getText(), 'MY ACCOUNT')
  })
})

describe('Add an Item to Cart', () => {
  it('should navigate to home', () => {
    const home = $('#header_logo a')
    home.click()

    const title = browser.getTitle()
    assert.strictEqual(title, 'My Store')
  })

  it('should add item to cart', () => {
    $('#homefeatured').scrollIntoView()
    $('#homefeatured li:first-child').moveTo()

    const firstItem = $('#homefeatured li:first-child .ajax_add_to_cart_button')
    firstItem.click()

    const proceedToCheckout = $('a[title="Proceed to checkout"]')
    proceedToCheckout.waitForDisplayed(10000)

    itemAmount = $('.ajax_block_products_total').getText()
    itemShipping = $('.layer_cart_row .ajax_cart_shipping_cost').getText()
    total = $('.layer_cart_row .ajax_block_cart_total').getText()

    assert.strictEqual(proceedToCheckout.isDisplayed(), true)

    proceedToCheckout.click()
  })

  it('should navigate to cart summary', () => {
    const orderStep = $('#order_step')
    orderStep.waitForDisplayed(10000)
    assert.strictEqual(orderStep.isDisplayed(), true)
  })
})

describe('Order', () => {
  it('should contain correct price', () => {
    const cartUnit = $('td.cart_unit')
    assert.strictEqual(cartUnit.getText().trim(), itemAmount)
  })

  it('should contain correct shipping cost', () => {
    const totalShipping = $('#total_shipping')
    assert.strictEqual(totalShipping.getText().trim(), itemShipping)
  })

  it('should contain correct delivery address', () => {
    const addressAlias = $$('.address_alias')[0]
    const address = $$('.address_address1')[0]
    const phone = $$('.address_phone_mobile')[0]

    assert.strictEqual(addressAlias.getText(), `(${mAlias.toUpperCase()})`)
    assert.strictEqual(address.getText(), mAddress)
    assert.strictEqual(phone.getText(), mPhone)
  })

  it('should navigate to checkout step', () => {
    $('.cart_navigation.clearfix').scrollIntoView()

    const proceedToCheckout = $('.cart_navigation.clearfix a:first-child')
    proceedToCheckout.waitForDisplayed(10000)
    assert.strictEqual(proceedToCheckout.isDisplayed(), true)
    proceedToCheckout.click()
  })

  it('should navigate to address step', () => {
    $('.cart_navigation.clearfix').scrollIntoView()

    const processAddress = $('.cart_navigation.clearfix button')
    processAddress.waitForDisplayed(10000)
    assert.strictEqual(processAddress.isDisplayed(), true)
    processAddress.click()
  })

  it('should navigate to shipping step', () => {
    $('.cart_navigation.clearfix').scrollIntoView()

    const terms = $('#cgv')
    terms.click()

    const processCarrier = $('.cart_navigation.clearfix button')
    processCarrier.waitForDisplayed(10000)
    assert.strictEqual(processCarrier.isDisplayed(), true)
    processCarrier.click()
  })

  it('should pay by check', () => {
    $('.cart_navigation.clearfix').scrollIntoView()

    const payByCheck = $('a[title="Pay by check."]')
    payByCheck.waitForDisplayed(10000)
    payByCheck.click()

    $('.cart_navigation.clearfix').scrollIntoView()

    const confirmOrder = $('#cart_navigation button[type="submit"]')
    confirmOrder.waitForDisplayed(10000)
    assert.strictEqual(confirmOrder.isDisplayed(), true)
  })

  it('should confirm the order', () => {
    const confirmOrder = $('#cart_navigation button[type="submit"]')
    confirmOrder.click()

    const successAlert = $('.alert.alert-success')
    successAlert.waitForDisplayed(10000)
    assert.strictEqual(successAlert.isDisplayed(), true)
    assert.strictEqual(successAlert.getText(), 'Your order on My Store is complete.')
  })
})
