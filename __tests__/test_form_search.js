/*global
describe
expect
it
jest
*/

jest.disableAutomock()

// Dependencies.
import React from 'react'
import T from 'react-addons-test-utils'

// UI components.
import Search from '../source/components/form_search'

// Describe `<Component/>` name.
describe('Search', function () {
  const buttonText = 'example_text'
  const defaultValue = 'example_value'
  const placeholder = 'example_placeholder'

  // Called from `responds to submit`.
  function handleSubmit (e, value) {
    expect(value).toBe(defaultValue)
  }

  // Insert the component into DOM.
  const el = T.renderIntoDocument(
    <Search
      buttonText={buttonText}
      defaultValue={defaultValue}
      placeholder={placeholder}

      handleSubmit={handleSubmit}
    />
  )

  // Get parent `<form>`.
  const form = T.findRenderedDOMComponentWithTag(el, 'form')

  // Get input.
  const input = form.querySelector('input')

  // Get button.
  const button = form.querySelector('button')

  // ===================
  // Test for existence.
  // ===================

  it('exists in the page', function () {
    expect(T.isCompositeComponent(el)).toBe(true)
  })

  // ================
  // Test for search.
  // ================

  it('has correct text', function () {
    const x = button.textContent

    expect(x).toBe('example_text')
  })

  it('has correct placeholder', function () {
    const x = input.getAttribute('placeholder')

    expect(x).toBe('example_placeholder')
  })

  // ================
  // Test for submit.
  // ================

  it('responds to submit', function () {
    T.Simulate.submit(form)
  })
})
