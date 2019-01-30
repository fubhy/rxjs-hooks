import * as tslib_1 from 'tslib'
import { useEffect, useState } from 'react'
import { BehaviorSubject, Subject, noop } from 'rxjs'
export function useEventCallback(callback, initialState, inputs) {
  var initialValue = typeof initialState !== 'undefined' ? initialState : null
  var inputSubject$ = new BehaviorSubject(typeof inputs === 'undefined' ? null : inputs)
  var stateSubject$ = new BehaviorSubject(initialValue)
  var _a = tslib_1.__read(useState(initialValue), 2),
    state = _a[0],
    setState = _a[1]
  var _b = tslib_1.__read(
      useState(function() {
        return noop
      }),
      2,
    ),
    returnedCallback = _b[0],
    setEventCallback = _b[1]
  var _c = tslib_1.__read(useState(stateSubject$), 1),
    state$ = _c[0]
  var _d = tslib_1.__read(useState(inputSubject$), 1),
    inputs$ = _d[0]
  useEffect(function() {
    inputs$.next(inputs)
  }, inputs || [])
  useEffect(function() {
    var event$ = new Subject()
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
//# sourceMappingURL=use-event-callback.js.map
