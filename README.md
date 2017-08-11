Sublime Text exclusion:

    -jspm_packages/,-node_modules/

Pieces from my CommandHistory that might be useful:

    = console.
    = console.log.
    = console.log('abc').

    cmdLine.cmdHistory.erase()
    localStorage.removeItem('history')

    gridLayout.setLayout([{  "w":10,"h":3,"x":0,"y":Infinity,"i":"cmdLine","minW":2,"minH":2,"moved":false,"static":false  }])

    localStorage.setItem('layout', JSON.stringify(gridLayout.getLayout()))
    gridLayout.setLayout(JSON.parse(localStorage.getItem('layout')))

    scope.import('Red')
    = Red

    import ColorPalette
    = ColorPalette
    pal = <ColorPalette />
    scope.set('pal', <ColorPalette />)
    scope.add('pal', <ColorPalette />)
    scope.delete('pal1')
    = pal .
    delete pal
    = pal

    ! const x = await Promise.resolve(1)

    await scope.import('I', 'immutable')

    window.app = app

    scope.set('x', 1, {x:4,w:2,h:2})
    scope.set('y', 2, {x:6,w:2,h:2})
    x = [React]

    const Red = await scope.import('Red') ; scope.set('red', <Red ref={r => scope.set('redref', r)} />) .
    const Red = await scope.import('lib/user/Red', 'default') ; scope.set('r', <Red ref={r => scope.set('red', r)} />) .
    = r.
    = red.
    = red.state.
    = red.state.color .
    = red.state.color.toString() .
    = red.setState({color: 'black'}) .

    scope.delete('palette') ; const Button = await scope.import('lib/user/Button', 'default') ; scope.set('btn', <Button text='reload' do={ async () => { const Button = await scope.import('lib/user/Button', 'default') ; scope.set('btn', <Button text={scope.get('btn').props.text} do={scope.get('btn').props.do} />); const Text = await scope.import('lib/user/Text', 'default') ; let count = 0; scope.set('text', <Text ref={r => scope.set('t', r, {x: 10, w: 2, h: 2})} editorState={ scope.has('t') && scope.get('t').state.editorState } onChange={txt => scope.set('txt', count++ + ' ' + txt)} />, {x: 4, w: 4}); } } />, {x: 8, w: 2, h: 2}) .

    const Button = await scope.import('lib/user/Button', 'default') ; scope.set('btn2', <Button text='plaintext' do={() => {console.log(scope.get('t').state.editorState.getCurrentContent().getPlainText())}} />, {x: 10, w: 2, h: 2}) .

    const Live = await scope.import('lib/user/Live', 'default') ; scope.set('live', <Live scope={scope} import='Button' text='live button'>bah</Live>) .

    app.reloadStyle()
    reloadId = setInterval(() => app.reloadStyle(), 1500)
    clearInterval(reloadId)

    scope.import('RGL', 'react-grid-layout')
    = Object.keys(RGL.utils).sort() .

    = await scope.import('RGL', 'react-grid-layout')
    = RGL.utils.getLayoutItem(gridLayout.getLayout(), 'React') .

    scope.set('red', React.cloneElement(<Red ref={r => scope.has('red') && scope.set('redRef_1', r)} />))

    let red; scope.set('red', React.cloneElement(red = <Red ref={r => scope.has('red') && scope.set('redRef_1', r)} />, { ref: r => { typeof red.ref === 'function' && red.ref(r); scope.has('red') && scope.set('redRef_2', r) } })) /* two refs - https://github.com/facebook/react/issues/8873#issuecomment-275423780 */ .

    System.config({map: {d3: '/jspm_packages/npm/d3@4.10.0'}})

    scope.import('d3', 'd3')

    d3.select('svg').select('circle').transition().attr('fill', '#e33').attr('r', 20)

    const S = await scope.import('lib/core/Serializer') ; console.log(S) ; console.log(S.fromJS(123)) .

    const S = await scope.import('lib/core/Serializer') ; const v = S ; console.log('') ; console.log('v --', v) ; console.log('fromJS(v) --', await S.fromJS(v)) ; console.log('toJS(fromJS(v)) --', await S.toJS(await S.fromJS(v))) ; console.log('equal?', await S.toJS(await S.fromJS(v)) === v) .

    set txt = <Text onChange={t => scope.getObjRef('txt2').childRef.setText(eval(scope.getObjRef('txt3').childRef.getText()))} /> .
