import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/root.reducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/root.saga';

// 创建 redux-saga 中间件
const sagaMiddleware = createSagaMiddleware();

// createStore:创建 store 对象
// applyMiddleware:注册中间件(中间件在开发完成以后只有被注册才能在 Redux 的工作流程中生效)
export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// 启动 saga
sagaMiddleware.run(rootSaga)