import {
  Navigate,
  createBrowserRouter,
  redirect,
  useRouteError,
} from "react-router-dom"
import { PostList } from "./pages/PostList"
import { TodoList } from "./pages/TodoList"
import { UserList } from "./pages/UserList"
import { Post } from "./pages/Post"
import { User } from "./pages/User"
import { RootLayout } from "./layouts/RootLayout"
import { createPost, getPost, getPosts, updatePost } from "./api/posts"
import { getTodos } from "./api/todos"
import { getUser, getUsers } from "./api/users"
import { getComments } from "./api/comments"
import { PostNew, postFormValidator } from "./pages/PostNew"
import { PostEdit } from "./pages/PostEdit"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Navigate to="/posts" /> },
          {
            path: "posts",
            children: [
              {
                index: true,
                loader: async ({ request: { signal, url } }) => {
                  const searchParams = new URL(url).searchParams
                  const query = searchParams.get("query")
                  const userId = searchParams.get("userId")
                  const params = { q: query }
                  if (userId !== "") params.userId = userId

                  const posts = getPosts({ signal, params })
                  const users = getUsers({ signal })
                  return {
                    posts: await posts,
                    users: await users,
                    searchParams: { query: query, userId: userId },
                  }
                },
                element: <PostList />,
              },
              {
                path: ":postId",
                children: [
                  {
                    index: true,
                    loader: async ({ params, request: { signal } }) => {
                      const comments = getComments(params.postId, { signal })
                      const post = await getPost(params.postId, { signal })
                      const user = getUser(post.userId)
                      return {
                        comments: await comments,
                        post,
                        user: await user,
                      }
                    },
                    element: <Post />,
                  },
                  {
                    path: "edit",
                    loader: async ({ params, request: { signal } }) => {
                      const post = getPost(params.postId, { signal })
                      const users = getUsers({ signal })
                      return { post: await post, users: await users }
                    },
                    action: async ({ params, request }) => {
                      const formData = await request.formData()
                      const title = formData.get("title")
                      const body = formData.get("body")
                      const userId = formData.get("userId")

                      const errors = postFormValidator({ title, body, userId })

                      if (Object.keys(errors).length > 0) {
                        return errors
                      }

                      const post = await updatePost(
                        params.postId,
                        { title, body, userId },
                        {
                          signal: request.signal,
                        }
                      )

                      return redirect(`/posts/${post.id}`)
                    },
                    element: <PostEdit />,
                  },
                ],
              },
              {
                path: "new",
                loader: ({ request: { signal } }) => {
                  return getUsers({ signal })
                },
                action: async ({ request }) => {
                  const formData = await request.formData()
                  const title = formData.get("title")
                  const body = formData.get("body")
                  const userId = formData.get("userId")

                  const errors = postFormValidator({ title, body, userId })

                  if (Object.keys(errors).length > 0) {
                    return errors
                  }

                  const post = await createPost(
                    { userId, title, body },
                    {
                      signal: request.signal,
                    }
                  )

                  return redirect(`/posts/${post.id}`)
                },
                element: <PostNew />,
              },
            ],
          },
          {
            path: "todos",
            loader: ({ request: { signal } }) => {
              return getTodos({ signal })
            },
            element: <TodoList />,
          },
          {
            path: "users",
            children: [
              {
                index: true,
                loader: ({ request: { signal } }) => {
                  return getUsers({ signal })
                },
                element: <UserList />,
              },
              {
                path: ":userId",
                loader: async ({ params, request: { signal } }) => {
                  const user = getUser(params.userId, { signal })
                  const posts = getPosts({
                    signal,
                    params: { userId: params.userId },
                  })
                  const todos = getTodos({
                    signal,
                    params: { userId: params.userId },
                  })

                  return {
                    user: await user,
                    posts: await posts,
                    todos: await todos,
                  }
                },
                element: <User />,
              },
            ],
          },
          { path: "*", element: <h1>404 - Page Not Found</h1> },
        ],
      },
    ],
  },
])

export function ErrorPage() {
  const error = useRouteError()

  return (
    <>
      <h1>Error - Something went wrong</h1>
      {import.meta.env.MODE !== "production" && (
        <>
          <pre>{error.message}</pre>
          <pre>{error.stack}</pre>
        </>
      )}
    </>
  )
}
