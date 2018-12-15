module.exports = {
  "coverageDirectory": "./coverage/",
  "collectCoverage": process.env.CI === 'true',
  testPathIgnorePatterns: [
    "/node_modules",
    "/example"
  ]
}