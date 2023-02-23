import React, { memo } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

function TodoListItem({
  item, updateTodo, deleteTodo, updateTodostate, deleteTodostate,
}) {
  return (
    <div className="todo__list-item" key={item.id}>
      <input type="checkbox" className="disabled:bg-slate-500 disabled:cursor-wait" disabled={updateTodostate?.status === 'REQUEST'} checked={item.isDone} onChange={() => updateTodo(item)} />
      <p className={clsx('px-4 flex-1', { 'line-through': item.isDone })}>{item.text}</p>
      <button type="button" disabled={deleteTodostate?.status === 'REQUEST'} className="btn rounded-md disabled:bg-slate-500 disabled:cursor-wait" onClick={() => deleteTodo(item)}>Delete</button>
    </div>
  );
}

TodoListItem.propTypes = {
  item: PropTypes.exact({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    isDone: PropTypes.bool.isRequired,
  }).isRequired,
  updateTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  updateTodostate: PropTypes.shape({
    type: PropTypes.oneOf(['UPDATE_TODO']).isRequired,
    status: PropTypes.oneOf(['REQUEST', 'ERROR']).isRequired,
  }),
  deleteTodostate: PropTypes.shape({
    type: PropTypes.oneOf(['DELETE_TODO']).isRequired,
    status: PropTypes.oneOf(['REQUEST', 'ERROR']).isRequired,
  }),
};

TodoListItem.defaultProps = {
  updateTodostate: undefined,
  deleteTodostate: undefined,
};

export default memo(TodoListItem);
