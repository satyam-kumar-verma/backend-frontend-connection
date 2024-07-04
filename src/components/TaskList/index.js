import './index.css'

const TaskList = props => {
  const {eachTodo, onChangeCheckbox, onDeleteTodo} = props
  const {id, todoInput, isChecked} = eachTodo

  const onClickCheckbox = () => {
    onChangeCheckbox(id)
  }

  const onClickDelete = () => {
    onDeleteTodo(id)
  }

  const isCheckedStyle = isChecked ? 'checked' : ''
  return (
    <li className="todo-item-container">
      <input
        type="checkbox"
        className="checkbox-input"
        id={id}
        checked={isChecked}
        onClick={onClickCheckbox}
      />
      <div className="label-container">
        <label
          className={`checkbox-label ${isCheckedStyle}`}
          htmlFor={id}
        >
          {todoInput}
        </label>
        <button className="delete-icon-container" onClick={onClickDelete}>
          <i className="far fa-trash-alt delete-icon">{}</i>
        </button>
      </div>
    </li>
  )
}

export default TaskList
