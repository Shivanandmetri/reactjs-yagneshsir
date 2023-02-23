import React, { forwardRef, memo } from 'react';
import PropTypes from 'prop-types';

const TodoForm = forwardRef(({ addTodo, addTodostate }, ref) => {
  console.log('todo form render');
  return (
    <form
      action=""
      className="todo__form"
      onSubmit={addTodo}
    >
      <div>
        <label htmlFor="todoText" className="sr-only">Todo Text</label>
        <input
          ref={ref}
          type="text"
          id="todoText"
          className="rounded-l-md"
        />
      </div>
      <button
        type="submit"
        disabled={addTodostate?.status === 'REQUEST'}
        className="btn rounded-r-md disabled:bg-slate-500 disabled:cursor-wait"
      >
        Add Todo

      </button>
    </form>
  );
});

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
  addTodostate: PropTypes.shape({
    type: PropTypes.oneOf(['ADD_TODO']).isRequired,
    status: PropTypes.oneOf(['REQUEST', 'ERROR']).isRequired,
  }),
};

TodoForm.defaultProps = {
  addTodostate: undefined,
};

export default memo(TodoForm);
