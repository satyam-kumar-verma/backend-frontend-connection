import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import TaskList from '../TaskList'

import './index.css'

const stiringifiedTodoList = localStorage.getItem('todoList')
const parsedTodoList = JSON.parse(stiringifiedTodoList)

let initialTodoList = []

if (parsedTodoList === null) {
  initialTodoList = []
} else {
  initialTodoList = parsedTodoList
}

class TaskInput extends Component {
  state = {
    todoInput: '',
    todoList: initialTodoList,
  }

  onChangeInput = event => {
    this.setState({
      todoInput: event.target.value,
    })
  }

  onAddtodo = () => {
    const {todoInput} = this.state

    if (todoInput === '') {
      alert('Please enter something in input')
      return
    }

    const todoObj = {
      id: uuidv4(),
      todoInput,
      isChecked: false,
    }

    this.setState(prevState => ({
      todoList: [...prevState.todoList, todoObj],
      todoInput: '',
    }))
  }

  onChangeCheckbox = id => {
    this.setState(prevState => ({
      todoList: prevState.todoList.map(eachTodo => {
        if (eachTodo.id === id) {
          return {...eachTodo, isChecked: !eachTodo.isChecked}
        }
        return eachTodo
      }),
    }))
  }

  onDeleteTodo = id => {
    this.setState(prevState => ({
      todoList: prevState.todoList.filter(eachTodo => eachTodo.id !== id),
    }))
  }

  onSaveToLocalStorage = () => {
    const {todoList} = this.state

    localStorage.setItem('todoList', JSON.stringify(todoList))
  }

  render() {
    const {todoList, todoInput} = this.state
    return (
      <div className="todos-bg-container">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="todos-heading">Todos</h1>
              <h1 className="create-task-heading">
                Create <span className="create-task-heading-subpart">Task</span>
              </h1>
              <input
                type="text"
                id="todoUserInput"
                className="todo-user-input"
                placeholder="What needs to be done?"
                value={todoInput}
                onChange={this.onChangeInput}
              />
              <button
                className="add-todo-button"
                id="addTodoButton"
                onClick={this.onAddtodo}
              >
                Add
              </button>
              <h1 className="todo-items-heading">
                My <span className="todo-items-heading-subpart">Tasks</span>
              </h1>
              <ul className="todo-items-container" id="todoItemsContainer">
                {todoList.map(eachTodo => (
                  <TaskList
                    eachTodo={eachTodo}
                    onChangeCheckbox={this.onChangeCheckbox}
                    key={eachTodo.id}
                    onDeleteTodo={this.onDeleteTodo}
                  />
                ))}
              </ul>
              <button
                className="add-todo-button"
                id="saveTodoButton"
                onClick={this.onSaveToLocalStorage}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TaskInput
