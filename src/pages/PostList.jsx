import { Form, Link, useLoaderData } from "react-router-dom"
import { PostCard } from "../components/PostCard"
import { useEffect, useRef } from "react"
import { FormGroup } from "../components/FormGroup"

export function PostList() {
  const {
    posts,
    users,
    searchParams: { query, userId },
  } = useLoaderData()
  const queryRef = useRef()
  const userIdRef = useRef()

  useEffect(() => {
    queryRef.current.value = query
  }, [query])

  useEffect(() => {
    userIdRef.current.value - userId
  }, [userId])

  return (
    <>
      <h1 className="page-title">
        Posts
        <div className="title-btns">
          <Link className="btn btn-outline" to="/posts/new">
            New
          </Link>
        </div>
      </h1>

      <Form action="/posts" className="form mb-4">
        <div className="form-row">
          <FormGroup>
            <label htmlFor="query">Query</label>
            <input type="search" name="query" id="query" ref={queryRef} />
          </FormGroup>
          <FormGroup>
            <label htmlFor="userId">Author</label>
            <select type="search" name="userId" id="userId" ref={userIdRef}>
              <option value="">Any</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </FormGroup>
          <button className="btn">Filter</button>
        </div>
      </Form>

      <div className="card-grid">
        {posts.map((post) => {
          return <PostCard key={post.id} {...post} />
        })}
      </div>
    </>
  )
}
