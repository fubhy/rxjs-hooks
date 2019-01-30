import * as tslib_1 from 'tslib'
import { BehaviorSubject } from 'rxjs'
import { useState, useEffect, useMemo } from 'react'
export function useObservable(inputFactory, initialState, inputs) {
  var _a = tslib_1.__read(useState(typeof initialState !== 'undefined' ? initialState : null), 2),
    state = _a[0],
    setState = _a[1]
  var _b = useMemo(function() {
      var stateSubject$ = new BehaviorSubject(initialState)
      var inputSubject$ = new BehaviorSubject(inputs)
      return {
        state$: stateSubject$,
        inputs$: inputSubject$,
      }
    }, []),
    state$ = _b.state$,
    inputs$ = _b.inputs$
  useEffect(function() {
    inputs$.next(inputs)
  }, inputs || [])
  useEffect(function() {
    var output$
    if (inputs) {
      output$ = inputFactory(inputs$, state$)
    } else {
      output$ = inputFactory(state$)
    }
    var subscription = output$.subscribe(function(value) {
      state$.next(value)
      setState(value)
    })
    return function() {
      subscription.unsubscribe()
      inputs$.complete()
      state$.complete()
    }
  }, [])
  return state
}
//# sourceMappingURL=use-observable.js.map
