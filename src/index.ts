import { Hono } from 'hono'
import { handle } from 'hono/aws-lambda'

const app = new Hono()
console.log (process.env.DATABASE_NAME)
app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export const handler = handle(app)
