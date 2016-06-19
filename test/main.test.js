'use strict'

var test = require('tape')
var html = require('../')
var planet
var planets

test('html', function (t) {
  t.plan(6)

  planet = 'world'
  t.equal(
    html`<div>Hello ${planet}</div>`,
    '<div>Hello world</div>',
    'substitutes values'
  )

  planet = 'crazy<planet>'
  t.equal(
    html`<div>Hello ${planet}</div>`,
    '<div>Hello crazy&lt;planet&gt;</div>',
    'safe by default'
  )

  t.equal(
    html`<div>Hello !${planet}</div>`,
    '<div>Hello crazy<planet></div>',
    'override safety with a bang'
  )

  planets = ['a', 'b', 'c']
  t.equal(
    html`<div>${planets.map(planet => html`<b>${planet}</b>`)}</div>`,
    '<div><b>a</b><b>b</b><b>c</b></div>',
    'supports arrays'
  )

  t.equal(
    html`<div>Hello ${false}</div>`,
    '<div>Hello </div>',
    'ignores false'
  )

  t.equal(
    html`<div>Hello ${null}</div>`,
    '<div>Hello </div>',
    'ignores nullish'
  )
})
