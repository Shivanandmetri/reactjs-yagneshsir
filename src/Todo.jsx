import React, { createRef, PureComponent } from 'react';
import './style.scss';
import './todo.scss';
import TodoForm from './todoForm';
import TodoList from './TodoList';
import TodoFilter from './TodoFilter';

const requestState = ({ appState, type, loadingId = -1 }) => [...appState, { type, status: 'REQUEST', loadingId }];

const successtState = ({ appState, type, loadingId = -1 }) => appState.filter(
  (x) => !(x.type === type && x.loadingId === loadingId),
);

const errorstate = ({
  appState, type, error, loadingId = -1,
}) => appState.map((x) => {
  if (x.type === type && x.loadingId === loadingId) {
    return { ...x, status: 'ERROR', message: error.message };
  }
  return x;
});
export default class Todo extends PureComponent {
  state = {
    todoList: [],
    filterStatus: 'all',
    appState: [],
  };

  todoTextRef = createRef();

  componentDidMount() {
    this.LoadTodo('all');
  }

  LoadTodo = async (filterStatus) => {
    const type = 'LOAD_TODO';
    try {
      this.setState(({ appState }) => ({ appState: requestState({ appState, type }) }));
      let url = 'http://localhost:3000/todoList';
      if (filterStatus !== 'all') {
        url += `?isDone=${filterStatus === 'completed'}`;
      }

      const res = await fetch(url);
      const json = await res.json();
      this.setState(({ appState }) => ({
        todoList: json,
        filterStatus,
        appState: successtState({ appState, type }),
      }));
    } catch (error) {
      this.setState(({ appState }) => ({
        appState: errorstate({ appState, type, error }),
      }));
    }
  };

  // changeText = (event) => {
  //   this.setState({ todoText: event.target.value });
  // };

  addTodo = async (event) => {
    const type = 'ADD_TODO';

    event.preventDefault();
    try {
      this.setState(({ appState }) => ({ appState: requestState({ appState, type }) }));
      const res = await fetch(
        'http://localhost:3000/todoList',
        {
          method: 'POST',
          body: JSON.stringify({
            text: this.todoTextRef.current.value,
            isDone: false,
          }),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );
      const json = await res.json();
      this.setState(({ todoList, appState }) => ({
        todoList: [...todoList, json],
        appState: successtState({ appState, type }),
      }), () => { this.todoTextRef.current.value = ''; });
    } catch (error) {
      this.setState(({ appState }) => ({
        appState: errorstate({ appState, type, error }),
      }));
    }
  };

  updateTodo = async (item) => {
    const type = 'UPDATE_TODO';
    const loadingId = item.id;
    // console.log(item);
    try {
      this.setState(({ appState }) => ({
        appState: requestState({
          appState,
          type,
          loadingId,
        }),
      }));

      const res = await fetch(
        `http://localhost:3000/todoList/${item.id}`,
        {
          method: 'PUT',
          body: JSON.stringify({
            ...item, isDone: !item.isDone,
          }),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );
      const json = await res.json();

      this.setState(({ todoList, appState }) => {
        const index = todoList.findIndex((x) => x.id === item.id);
        return {
          todoList: [
            ...todoList.slice(0, index),
            json,
            ...todoList.slice(index + 1),
          ],
          appState: successtState({ appState, type, loadingId }),
        };
      });
    } catch (error) {
      this.setState(({ appState }) => ({
        appState: errorstate({
          appState, type, error, loadingId,
        }),
      }));
    }
  };

  deleteTodo = async (item) => {
    const isConfirmed = confirm('Are you sure want to delete this item');
    if (isConfirmed) {
      const type = 'DELETE_TODO';
      const loadingId = item.id;

      // console.log(item);
      try {
        this.setState(({ appState }) => ({
          appState: requestState({
            appState,
            type,
            loadingId,
          }),
        }));
        await fetch(
          `http://localhost:3000/todoList/${item.id}`,
          {
            method: 'DELETE',
          },
        );

        this.setState(({ todoList, appState }) => {
          const index = todoList.findIndex((x) => x.id === item.id);
          return {
            todoList: [...todoList.slice(0, index), ...todoList.slice(index + 1)],
            appState: successtState({ appState, type, loadingId }),
          };
        });
      } catch (error) {
        this.setState(({ appState }) => ({
          appState: errorstate({
            appState, type, error, loadingId,
          }),
        }));
      }
    }
  };

  // filterTodo = (filterStatus) => {
  //   this.setState({ filterStatus });
  // };

  render() {
    const { todoList, filterStatus, appState } = this.state;//  destructuring
    // console.log(appState);
    const LoadTodoState = appState.find((x) => x.type === 'LOAD_TODO');
    const addTodostate = appState.find((x) => x.type === 'ADD_TODO');
    const updateTodostate = appState.filter((x) => x.type === 'UPDATE_TODO');
    const deleteTodostate = appState.filter((x) => x.type === 'DELETE_TODO');

    if (LoadTodoState?.status === 'REQUEST') {
      return <h1 className="text-red-500">Loading...</h1>;
    }
    if (LoadTodoState?.status === 'ERROR') {
      return <h1>{LoadTodoState.message}</h1>;
    }
    return (
      <div className="todo">
        <h1 className="todo__title">Todo App</h1>
        <TodoForm
          addTodo={this.addTodo}
          ref={this.todoTextRef}
          addTodostate={addTodostate}

        />
        <div className="todo__list">
          {todoList.length > 0 && (
          <TodoList
            todolist={todoList}
            updateTodo={this.updateTodo}
            deleteTodo={this.deleteTodo}
            updateTodostate={updateTodostate}
            deleteTodostate={deleteTodostate}
          />
          )}
        </div>
        <TodoFilter filterStatus={filterStatus} filterTodo={this.LoadTodo} />
      </div>

    );
  }
}
