import React from 'react'
import fetch from 'isomorphic-unfetch'
import cookie from 'js-cookie'
import nextCookie from 'next-cookies'
import Link from 'next/link'
import Router from 'next/router'

import Layout from '../components/appLayout'
import { withAuthSync } from '../utils/auth'
import { API_URL } from '../utils/config'

class Board extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      tasks: props.data.todo,
      description: '',
      password: '',
      userId: cookie.get('userId'),
      token: cookie.get('token'),
      checkedItems: new Map(),
      draggedTask: {},
      error: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDone = this.handleDone.bind(this)
    this.handleDrag = this.handleDrag.bind(this)
    this.handleDrop = this.handleDrop.bind(this)
    this.handleAllowDrop = this.handleAllowDrop.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  
  static async getInitialProps(ctx) {
    const { token, userId } = nextCookie(ctx)  
    const redirectOnError = () =>
      typeof window !== 'undefined'
        ? Router.push('/auth/login')
        : ctx.res.writeHead(302, { Location: '/auth/login' }).end()
    try {
      const res = await fetch(`${API_URL}/v1/todo/getTodoByUser/${userId}`, {
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
      // Implementation or Network error
      console.log(error, 'error')
      return redirectOnError()
    }
  }ß

  async handleSubmit (e) {
    e.preventDefault()
    this.setState({ error: '' })
    const todo = {
      description: this.state.description,
      user: this.state.userId
    }

    try {
      const res = await fetch(`${API_URL}/v1/todo/createTodo`, {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + this.state.token
        },
        body: JSON.stringify(todo),
      })
      
      if (res.ok) {
        const data = await res.json()
        var newTodo = this.state.tasks.concat(data.todo);
        this.setState({ tasks: newTodo })
      } else {
        const data = await res.json()
        this.setState({ error: data.message })
      }
      this.setState({ description: '' })
    } catch (err) {
      console.log(err, 'err')
    }
  }

  async handleDone (e, task) {
    try {
      const item = e.target.name;
      const isChecked = e.target.checked;
      this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
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

  handleDrag (e, currentTask) {
    e.dataTransfer.setData("text/plain", currentTask)
    this.setState({ draggedTask: currentTask });
  }

  async handleDrop (e) {
    const data = e.dataTransfer.getData("text/plain");
    const { draggedTask, tasks } = this.state
    this.setState({
      tasks: tasks.filter(task => task._id !== draggedTask._id),
      draggedTask: {},
    });
    
    let deletedtask = {
      _id: draggedTask._id,
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
    } else {
      const data = await res.json()
      this.setState({ error: data.message })
    }
  }

  handleAllowDrop (e) {
    e.preventDefault();
  }

  async handleDelete (currentTask) {
    const { tasks } = this.state
    this.setState({
      tasks: tasks.filter(task => task._id !== currentTask._id),
    });
    
    let deletedtask = {
      _id: currentTask._id,
    }
    const res = await fetch(`${API_URL}/v1/todo/deleteTodo`, {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + this.state.token,
      },
      body: JSON.stringify(deletedtask)
    })

    if (res.ok) {
      const data = await res.json()
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

    return (
      <Layout>
        <div
          onDrop={e => this.handleDrop(e)}
          onDragOver={(e => this.handleAllowDrop(e))}
          >
          <div style={layoutStyle}>
            <form className="form-group" onSubmit={this.handleSubmit}>
              <input
                className="form-control" 
                type="text" 
                placeholder="Type something"
                value={this.state.description}
                required
                onChange={e =>
                  this.setState({ description: e.target.value })
                }
              />
              <button className="btn btn-primary btn-add" type="submit">
                <i className="fas fa-plus"></i>
              </button>
            </form>
    
            {
              this.state.error ?
              <p className={this.state.error ? 'error show danger' : ''}>
                <i className="fas fa-exclamation-circle"></i> {this.state.error}
              </p> : null
            }
          
            <ul className="todo-list">
              {
                this.state.tasks.map((task) => {
                  return (
                    <li 
                      key={task._id} 
                      className="todo-items"
                      draggable={true}
                      onDrag={(e) => {
                        this.handleDrag(e, task)
                      }}
                    >
                      <label className="todo-check" htmlFor={`checkInput-${task._id}`}>
                        <input 
                          id={`checkInput-${task._id}`}
                          type="checkbox"
                          defaultChecked={task.done}
                          checked={this.state.tasks.find((tk) => tk._is === task._id)}
                          onChange={(e) => {
                            this.handleDone(e, task)
                          }}
                        />
                        <span></span>
                      </label>
                      <span className="todo-text">{task.description}</span>
                      <span className="float-right">
                        <Link href="/task/[id]" as={`/task/${task._id}`}>
                          <a>
                            <i className="fas fa-eye text-primary"></i>
                          </a>
                        </Link>
                        <button className="btn text-danger"
                          onClick={(e) => {
                            this.handleDelete(task)
                          }}>
                          <i className="far fa-trash-alt ml-05"></i>
                        </button>
                      </span>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </Layout>
    );
  }
};

export default withAuthSync(Board);
