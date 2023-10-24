import { useActionData, useLoaderData, useNavigation } from "react-router-dom"
import { PostForm } from "../components/PostForm"

export function PostNew() {
  const users = useLoaderData()
  const errors = useActionData()

  const { state } = useNavigation()
  const isSubmitting = state === "submitting"

  return (
    <>
      <h1 className="page-title">New Post</h1>
      <PostForm isSubmitting={isSubmitting} users={users} errors={errors} />
    </>
  )
}

export function postFormValidator({ title, body, userId }) {
  const errors = {}

  if (title === "") {
    errors.title = "Required"
  }

  if (body === "") {
    errors.body = "Required"
  }

  if (userId === "") {
    errors.userId = "Required"
  }

  return errors
}
