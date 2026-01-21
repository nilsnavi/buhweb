import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import contentReducer from './contentSlice';

// Импорты редьюсеров
const reducer = {
  content: contentReducer,
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: true,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Настройка слушателей для RTK Query
setupListeners(store.dispatch);

// Типизированные хуки для использования в компонентах
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
