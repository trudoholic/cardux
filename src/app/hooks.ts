import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import {useEffect, useRef} from "react";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function usePrevious<T>(value: T) {
    const ref = useRef<T>()
    useEffect(() => {
        ref.current = value
    }, [value])
    return ref.current
}

export function useChange<T>(value: T, f: Function, log?: Function) {
    const dispatch = useAppDispatch()
    const prev_value = usePrevious(value)
    useEffect(() => {
        log && dispatch(log(`Change: ${prev_value} -> ${value}`))
        if (null != prev_value) {
            dispatch(f([prev_value, value]))
        }
    }, [value])
}
