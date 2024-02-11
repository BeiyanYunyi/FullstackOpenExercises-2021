const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('../utils/blogs-helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.blogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe('blogs test', () => {
  test('blog GET test', async () => {
    const res = await api.get('/api/blogs');
    expect(res.body).toHaveLength(helper.blogs.length);
  });

  test('blog POST test', async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url:
        'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    };
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const res = await api.get('/api/blogs');
    const cont = res.body.map((r) => r.title);
    expect(res.body).toHaveLength(helper.blogs.length + 1);
    expect(cont).toContain('Go To Statement Considered Harmful');
  });

  test('blog DELETE test', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.blogs.length - 1);
    const contents = blogsAtEnd.map((r) => r.title);
    expect(contents).not.toContain(blogToDelete.title);
  });

  test('blog PUT test', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogsToUpdate = blogsAtStart[0];
    const blogsUpdated = {
      ...blogsToUpdate,
      likes: blogsToUpdate.likes + 1,
    };
    await api
      .put(`/api/blogs/${blogsToUpdate.id}`)
      .send(blogsUpdated)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    const blogsAtEnd = await helper.blogsInDb();
    const res = await api.get('/api/blogs');
    expect(res.body[0].likes).toEqual(blogsToUpdate.likes + 1);
    expect(blogsAtEnd[0].likes).toEqual(blogsToUpdate.likes + 1);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
