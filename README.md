Pieces from my CommandHistory that might be useful:

    = console.
    = console.log.
    = console.log('abc').

    cmdLine.cmdHistory.erase()
    localStorage.removeItem('history')

    gridLayout.setLayout([{  "w":10,"h":3,"x":0,"y":Infinity,"i":"cmdLine","minW":2,"minH":2,"moved":false,"static":false  }])

    localStorage.setItem('layout', JSON.stringify(gridLayout.getLayout()))
    gridLayout.setLayout(JSON.parse(localStorage.getItem('layout')))

    dir.import('Red')
    = Red

    import ColorPalette
    = ColorPalette
    pal = <ColorPalette />
    dir.set('pal', <ColorPalette />)
    dir.add('pal', <ColorPalette />)
    dir.delete('pal1')
    = pal .
    delete pal
    = pal

    ! const x = await Promise.resolve(1)

    await dir.import('I', 'immutable')

    window.app = app

    dir.set('x', 1, {x:4,w:2,h:2})
    dir.set('y', 2, {x:6,w:2,h:2})
    x = [React]

    const Red = await dir.import('Red') ; dir.set('red', <Red ref={r => dir.set('redref', r)} />) .
    const Red = await dir.import('lib/user/Red', 'default') ; dir.set('r', <Red ref={r => dir.set('red', r)} />) .
    = r.
    = red.
    = red.state.
    = red.state.color .
    = red.state.color.toString() .
    = red.setState({color: 'black'}) .

    dir.delete('palette') ; const Button = await dir.import('lib/user/Button', 'default') ; dir.set('btn', <Button text='reload' do={ async () => { const Button = await dir.import('lib/user/Button', 'default') ; dir.set('btn', <Button text={dir.get('btn').props.text} do={dir.get('btn').props.do} />); const Text = await dir.import('lib/user/Text', 'default') ; let count = 0; dir.set('text', <Text ref={r => dir.set('t', r, {x: 10, w: 2, h: 2})} editorState={ dir.has('t') && dir.get('t').state.editorState } onChange={txt => dir.set('txt', count++ + ' ' + txt)} />, {x: 4, w: 4}); } } />, {x: 8, w: 2, h: 2}) .

    const Button = await dir.import('lib/user/Button', 'default') ; dir.set('btn2', <Button text='plaintext' do={() => {console.log(dir.get('t').state.editorState.getCurrentContent().getPlainText())}} />, {x: 10, w: 2, h: 2}) .

    const Live = await dir.import('lib/user/Live', 'default') ; dir.set('live', <Live dir={dir} import='Button' text='live button'>bah</Live>) .

    app.reloadStyle()
    reloadId = setInterval(() => app.reloadStyle(), 1500)
    clearInterval(reloadId)

    dir.import('RGL', 'react-grid-layout')
    = Object.keys(RGL.utils).sort() .

    = await dir.import('RGL', 'react-grid-layout')
    = RGL.utils.getLayoutItem(gridLayout.getLayout(), 'React') .

    dir.set('red', React.cloneElement(<Red ref={r => dir.has('red') && dir.set('redRef_1', r)} />))

    let red; dir.set('red', React.cloneElement(red = <Red ref={r => dir.has('red') && dir.set('redRef_1', r)} />, { ref: r => { typeof red.ref === 'function' && red.ref(r); dir.has('red') && dir.set('redRef_2', r) } })) /* two refs - https://github.com/facebook/react/issues/8873#issuecomment-275423780 */ .

    System.config({map: {d3: '/jspm_packages/npm/d3@4.10.0'}})

    dir.import('d3', 'd3')

    d3.select('svg').select('circle').transition().attr('fill', '#e33').attr('r', 20)

    const S = await dir.import('lib/core/Serializer') ; console.log(S) ; console.log(S.fromJS(123)) .

    const S = await dir.import('lib/core/Serializer') ; const v = S ; console.log('') ; console.log('v --', v) ; console.log('fromJS(v) --', await S.fromJS(v)) ; console.log('toJS(fromJS(v)) --', await S.toJS(await S.fromJS(v))) ; console.log('equal?', await S.toJS(await S.fromJS(v)) === v) .
