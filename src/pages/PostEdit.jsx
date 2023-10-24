import { useActionData, useLoaderData, useNavigation } from "react-router-dom"
import { PostForm } from "../components/PostForm"

export function PostEdit() {
  const { post, users } = useLoaderData()
  const errors = useActionData()

  const { state } = useNavigation()
  const isSubmitting = state === "submitting"

  return (
    <>
      <h1 className="page-title">Edit Post</h1>
      <PostForm
        isSubmitting={isSubmitting}
        users={users}
        errors={errors}
        defaultValues={post}
      />
    </>
  )
}
