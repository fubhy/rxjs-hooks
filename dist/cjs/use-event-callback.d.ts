import { Observable, BehaviorSubject } from 'rxjs'
import { RestrictArray } from './type'
export declare type EventCallbackState<EventValue, State, Inputs = void> = [
  (val: EventValue) => void,
  [State extends void ? null : State, BehaviorSubject<State | null>, BehaviorSubject<RestrictArray<Inputs> | null>]
]
export declare type ReturnedState<EventValue, State, Inputs> = [
  EventCallbackState<EventValue, State, Inputs>[0],
  EventCallbackState<EventValue, State, Inputs>[1][0]
]
export declare type EventCallback<EventValue, State, Inputs> = Inputs extends void
  ? (eventSource$: Observable<EventValue>, state$: Observable<State>) => Observable<State>
  : (
      eventSource$: Observable<EventValue>,
      inputs$: Observable<RestrictArray<Inputs>>,
      state$: Observable<State>,
    ) => Observable<State>
export declare function useEventCallback<EventValue, State = void>(
  callback: EventCallback<EventValue, State, void>,
): ReturnedState<EventValue, State | null, void>
export declare function useEventCallback<EventValue, State = void>(
  callback: EventCallback<EventValue, State, void>,
  initialState: State,
): ReturnedState<EventValue, State, void>
export declare function useEventCallback<EventValue, State = void, Inputs = void>(
  callback: EventCallback<EventValue, State, Inputs>,
  initialState: State,
  inputs: RestrictArray<Inputs>,
): ReturnedState<EventValue, State, Inputs>
