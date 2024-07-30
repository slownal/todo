document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');

    const apiUrl = '/api/todos';

    function fetchTodos() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(todos => {
                list.innerHTML = '';
                todos.forEach(todo => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        ${todo.text} <button onclick="deleteTodo('${todo.id}')">Delete</button>
                        <button onclick="markAsDone('${todo.id}', ${todo.completed})">
                            ${todo.completed ? 'Undo' : 'Done'}
                        </button>
                    `;
                    list.appendChild(li);
                });
            })
            .catch(error => console.error('Error fetching todos:', error));
    }

    function addTodo(text) {
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        })
        .then(response => response.json())
        .then(() => {
            input.value = '';
            fetchTodos();
        })
        .catch(error => console.error('Error adding todo:', error));
    }

    function deleteTodo(id) {
        fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
            .then(() => fetchTodos())
            .catch(error => console.error('Error deleting todo:', error));
    }

    function markAsDone(id, completed) {
        fetch(`${apiUrl}/${id}/done`, { method: 'PATCH' })
            .then(() => fetchTodos())
            .catch(error => console.error('Error marking todo as done:', error));
    }

    form.addEventListener('submit', event => {
        event.preventDefault();
        const text = input.value.trim();
        if (text) {
            addTodo(text);
        }
    });

    fetchTodos();
});
