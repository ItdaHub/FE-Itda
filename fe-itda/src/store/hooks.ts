import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// useDispatch에 타입 적용
export const useAppDispatch: () => AppDispatch = useDispatch;

// useSelector에 타입 적용
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
