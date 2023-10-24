export function TodoItem({ id, completed, title }) {
  return (
    <li key={id} className={completed ? "strike-through" : null}>
      {title}
    </li>
  )
}
