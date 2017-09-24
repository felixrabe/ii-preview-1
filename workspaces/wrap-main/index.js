module.exports = (main, ...aa) => {
  try {
    main(...aa)
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}
