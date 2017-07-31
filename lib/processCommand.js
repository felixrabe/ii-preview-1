export default async (self, command, focus, cb) => {
  self.setState({
    error: null,
    isProcessingCommand: true,
  })

  try {
    const result = await self.props.onCommand(command)
    if (self._isMounted === false) {
      return
    }

    self.setState(prevState => Object.assign({
      error: null,
      isProcessingCommand: false,
    }, cb ? cb(result, prevState) : {}))
  } catch (err) {
    if (self._isMounted === false) {
      return
    }

    self.setState({
      error: err,
      isProcessingCommand: false,
    })
  }

  focus && self.focusToEnd()
}
