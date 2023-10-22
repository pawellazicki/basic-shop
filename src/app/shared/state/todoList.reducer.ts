import { createReducer, on } from '@ngrx/store';
import { add, remove } from './todoList.actions';
import { Todo } from '../model/todo.model';

interface TodosState {
  todoList: Todo[]
}

export const initialState: TodosState ={
  todoList: []
}

export const todosList = createReducer(
  initialState,
  on(add, (state, {todo}) => ({...state, todoList: [...state.todoList, todo!]})),
  on(remove, (state, {todo}) => ({...state, todoList: state.todoList.filter(item => item.id !== todo?.id)})),
);  