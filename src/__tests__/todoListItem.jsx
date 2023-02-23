import { render, screen } from '@testing-library/react';
import TodoListItem from '../todoListItem';

test('should render TodoListItem', async () => { 
    render (
    <TodoListItem 
    item={
        {
            "text": "learn react",
            "isDone": true,
            "id": 1
          },
        }/> 
    )
 });
