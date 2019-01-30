import { Observable } from 'rxjs'
import { RestrictArray } from './type'
export declare type InputFactory<State, Inputs = undefined> = Inputs extends undefined
  ? (state$: Observable<State>) => Observable<State>
  : (inputs$: Observable<RestrictArray<Inputs>>, state$: Observable<State>) => Observable<State>
export declare function useObservable<State>(inputFactory: InputFactory<State>): State | null
export declare function useObservable<State>(inputFactory: InputFactory<State>, initialState: State): State
export declare function useObservable<State, Inputs>(
  inputFactory: InputFactory<State, Inputs>,
  initialState: State,
  inputs: RestrictArray<Inputs>,
): State