const thousands = require('./数字千分位')

test('1234567 after thousands to be 1,234,567', () => {
  expect(thousands(1234567)).toBe('1,234,567')
})
