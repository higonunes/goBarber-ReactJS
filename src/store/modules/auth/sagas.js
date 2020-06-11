import { all, call, takeLatest, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { signInSuccess, signFailure } from './actions';
import history from '~/services/history';
import api from '~/services/api';

export function* signIn({ payload: { email, password } }) {
  try {
    const response = yield call(api.post, '/login', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (!user.provider) {
      toast.error('Usuário não é provedor de serviço');
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;
    yield put(signInSuccess(token, user));
    history.push('/dashboard');
  } catch (err) {
    yield put(signFailure());
    toast.warning('Falha na autenticação');
  }
}

export function* signUp({ payload: { name, email, password } }) {
  try {
    yield call(api.post, '/users', {
      name,
      email,
      password,
      provider: true,
    });

    history.push('/');
  } catch (err) {
    yield put(signFailure());
    toast.warning('Falha no cadastro, verifique seus dados');
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;
  api.defaults.headers.Authorization = `Bearer ${token}`;
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
