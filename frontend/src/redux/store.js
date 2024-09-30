import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { authAPI } from './api/authAPI';
import { getMeAPI } from './api/getMeAPI';
import userReducer from './api/userSlice';
import { courseAPI } from './api/courseAPI';
import { studentAPI } from './api/studentAPI';
import { taskAPI } from './api/taskAPI';
import { taskSubmissionAPI } from './api/taskSubmissionAPI';
import { enrollmentAPI } from './api/enrollmentAPI';
import { attendanceAPI } from './api/attendanceAPI';
import { gradeWeightAPI } from './api/gradeWeightAPI';

export const store = configureStore({
    reducer: {
        [authAPI.reducerPath]: authAPI.reducer,
        [getMeAPI.reducerPath]: getMeAPI.reducer,
        [courseAPI.reducerPath]: courseAPI.reducer,
        [attendanceAPI.reducerPath]: attendanceAPI.reducer,
        [studentAPI.reducerPath]: studentAPI.reducer,
        [taskAPI.reducerPath]: taskAPI.reducer,
        [enrollmentAPI.reducerPath]: enrollmentAPI.reducer,
        [gradeWeightAPI.reducerPath]: gradeWeightAPI.reducer,
        [taskSubmissionAPI.reducerPath]: taskSubmissionAPI.reducer,
        userState: userReducer,
    },
    devTools: process.env.NODE_ENV === 'development',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat([
            authAPI.middleware,
            getMeAPI.middleware,
            courseAPI.middleware,
            studentAPI.middleware,
            taskAPI.middleware,
            enrollmentAPI.middleware,
            attendanceAPI.middleware,
            gradeWeightAPI.middleware,
            taskSubmissionAPI.middleware,
        ])
});

export var RootState = store.getState();
export var AppDispatch = store.dispatch;
export function useAppDispatch() {
    return useDispatch(AppDispatch);
}
export function useAppSelector(selector) {
    return useSelector(selector);
}