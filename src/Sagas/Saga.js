import { takeLatest, call, put } from "redux-saga/effects";

import axios from "axios";

function fetchNotes() {
  return axios({
    method: "get",
    url: process.env.REACT_APP_API_URL
  });
}
function postNotes(noteItems) {
  return axios({
    method: "post",
    url: process.env.REACT_APP_API_URL,
    data: noteItems
  });
}

function* workerSaga() {
  try {
    const response = yield call(fetchNotes);
    const notes = response.data.result;
    yield put({
      type: "FETCH_NOTES_SUCCESS",
      data: notes
    });
  } catch (error) {
    yield put({
      type: "FETCH_NOTES_ERROR",
      error: error.message
    });
  }
}

function* deleteSaga(action) {
  try {
    const noteItems = action.data;
    yield call(postNotes, noteItems);
    const notes = action.data;

    yield put({
      type: "DELETE_NOTES_SUCCESS",
      data: notes
    });
    // action.location.value.push("/")
  } catch (error) {
    yield put({
      type: "DELETE_NOTES_ERROR",
      error: error.message
    });
  }
}

function* editSaga(action) {
  try {
    yield call(postNotes, action.location.data);

    const notes = action.location.data;

    yield put({
      type: "EDIT_NOTES_SUCCESS",
      data: notes
    });
    action.location.value.push("/");
  } catch (error) {
    yield put({
      type: "EDIT_NOTES_ERROR",
      error: error.message
    });
  }
}

function* addSaga(action) {
  try {
    yield call(postNotes, action.location.data);
    const response = yield call(fetchNotes);
    const notes = response.data.result;

    yield put({
      type: "ADD_NOTES_SUCCESS",
      data: notes
    });
    action.location.value.push("/");
  } catch (error) {
    yield put({
      type: "ADD_NOTES_ERROR",
      error: error.message
    });
  }
}

export function* watcherSaga() {
  yield takeLatest("FETCH_NOTES", workerSaga);
}

export function* deleterSaga() {
  yield takeLatest("DELETE_NOTES", deleteSaga);
}
export function* editerSaga() {
  yield takeLatest("EDIT_NOTES", editSaga);
}

export function* addrSaga() {
  yield takeLatest("ADD_NOTES", addSaga);
}
