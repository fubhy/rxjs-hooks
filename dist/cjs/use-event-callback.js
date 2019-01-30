'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
var tslib_1 = require('tslib')
var react_1 = require('react')
var rxjs_1 = require('rxjs')
function useEventCallback(callback, initialState, inputs) {
  var initialValue = typeof initialState !== 'undefined' ? initialState : null
  var inputSubject$ = new rxjs_1.BehaviorSubject(typeof inputs === 'undefined' ? null : inputs)
  var stateSubject$ = new rxjs_1.BehaviorSubject(initialValue)
  var _a = tslib_1.__read(react_1.useState(initialValue), 2),
    state = _a[0],
    setState = _a[1]
  var _b = tslib_1.__read(
      react_1.useState(function() {
        return rxjs_1.noop
      }),
      2,
    ),
    returnedCallback = _b[0],
    setEventCallback = _b[1]
  var _c = tslib_1.__read(react_1.useState(stateSubject$), 1),
    state$ = _c[0]
  var _d = tslib_1.__read(react_1.useState(inputSubject$), 1),
    inputs$ = _d[0]
  react_1.useEffect(function() {
    inputs$.next(inputs)
  }, inputs || [])
  react_1.useEffect(function() {
    var event$ = new rxjs_1.Subject()
    function eventCallback(e) {
      return event$.next(e)
    }
    setState(initialValue)
    setEventCallback(function() {
      return eventCallback
    })
    var value$
    if (!inputs) {
      value$ = callback(event$, state$)
    } else {
      value$ = callback(event$, inputs$, state$)
    }
    var subscription = value$.subscribe(function(value) {
      state$.next(value)
      setState(value)
    })
    return function() {
      subscription.unsubscribe()
      state$.complete()
      inputs$.complete()
      event$.complete()
    }
  }, [])
  return [returnedCallback, state]
}
exports.useEventCallback = useEventCallback
//# sourceMappingURL=use-event-callback.js.map
