import { createAction } from '@ngrx/store';
import { Todo } from '../model/todo.model';

export const add = createAction('[TodoList Component] Add', (todo: Todo | null = null) => ({ todo }));
export const remove = createAction('[TodoList Component] Remove', (todo: Todo | null = null) => ({ todo }));
