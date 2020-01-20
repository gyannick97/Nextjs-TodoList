import React from 'react'
import Router from 'next/router'
import fetch from 'isomorphic-unfetch'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'
import Layout from '../../components/appLayout'
import { withAuthSync } from '../../utils/auth'
import { API_URL } from '../../utils/config'

class Task extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      task: props.data.todo,
      description: '',
      password: '',
      token: cookie.get('token'),
      error: null
    }
    this.handleDone = this.handleDone.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  static async getInitialProps(ctx) {
    const { token } = nextCookie(ctx)  
    const redirectOnError = () =>
      typeof window !== 'undefined'
        ? Router.push('/auth/login')
        : ctx.res.writeHead(302, { Location: '/auth/login' }).end()
    try {
      const res = await fetch(`${API_URL}/v1/todo/getTodoById/${ctx.query.id}`, {
        method: 'get',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + token
        },
      })

      if (res.ok) {
        const data = await res.json()
        return { data }
      } else {
        return await redirectOnError()
      }
    } catch (error) {
      console.log(error, 'error')
      return redirectOnError()
    }
  }

  async handleDone (e, task) {
    try {
      this.setState({
        isChecked: !this.state.isChecked,
      });
      let currentCheck
      task.done === true ? currentCheck = false : currentCheck = true
      let updatedtask = {
        _id: task._id,
        done: currentCheck,
      }
      const res = await fetch(`${API_URL}/v1/todo/updateTodo`, {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + this.state.token
        },
        body: JSON.stringify(updatedtask)
      })

      if (res.ok) {
        const data = await res.json()
      } else {
        const data = await res.json()
        this.setState({ error: data.message })
      }
    } catch(err) {
      console.log('err', err)
    }
  }

  async handleDelete (currentTask) {
    let deletedtask = {
      _id: currentTask._id,
    }
    const res = await fetch(`${API_URL}/v1/todo/deleteTodo`, {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + this.state.token
      },
      body: JSON.stringify(deletedtask)
    })

    if (res.ok) {
      const data = await res.json()
      Router.push('/')
    } else {
      const data = await res.json()
      this.setState({ error: data.message })
    }
  }

  render () {
    const layoutStyle = {
      padding: '3rem',
      boxShadow: '0 .125rem .25rem rgba(0,0,0,.075)',
      maxWidth: '800px',
      margin: '4rem auto',
      background: '#fff',
      borderRadius: 6,
    }
    const task = this.state.task

    return (
      <Layout>
        <div style={layoutStyle}>
          {
            this.state.error ?
            <p className={this.state.error ? 'error show danger' : ''}>
              <i className="fas fa-exclamation-circle"></i> {this.state.error}
            </p> : null
          }

          <ul className="todo-list">
            <li 
              className="todo-items"
            >
              <label className="todo-check" htmlFor={`checkInput-${task._id}`}>
                <input 
                  id={`checkInput-${task._id}`}
                  type="checkbox"
                  defaultChecked={task.done}
                  onChange={(e) => {
                    this.handleDone(e, task)
                  }}
                />
                <span></span>
              </label>
              <span className="todo-text">{task.description}</span>
              <span className="float-right">
                <button className="btn text-danger"
                  onClick={(e) => {
                    this.handleDelete(task)
                  }}>
                  <i className="far fa-trash-alt ml-05"></i>
                </button>
              </span>
            </li>
          </ul>
        </div>
      </Layout>
    );
  }
};

export default withAuthSync(Task);
