import React from 'react'
import Router from 'next/router'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'
import Layout from '../components/authLayout'
import { withAuthSync } from '../utils/auth'
import { API_URL } from '../utils/config'

class Task extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      user: props.data.user,
      newPassword: '',
      token: cookie.get('token'),
      error: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  static async getInitialProps(ctx) {
    const { token, userId } = nextCookie(ctx)
    
    const redirectOnError = () =>
      typeof window !== 'undefined'
        ? Router.push('/auth/login')
        : ctx.res.writeHead(302, { Location: '/auth/login' }).end()
    try {
      const res = await fetch(`${API_URL}/v1/admin/getUserById/${userId}`, {
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

  async handleSubmit (e) {
    e.preventDefault()
    this.setState({ error: '' })
    try {
      let user = {
        email: this.state.user.email,
        newPassword: this.state.newPassword
      }
      const res = await fetch(`${API_URL}/v1/admin/resetUserPassword`, {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + this.state.token
        },
        body: JSON.stringify(user)
      })

      if (res.ok) {
        const data = res
      } else {
        const data = res
        this.setState({ error: data.message })
      }
      this.setState({ newPassword: '' })
    } catch(err) {
      console.log('err', err)
    }
  }

  render () {
    return (
      <Layout>
        <form onSubmit={this.handleSubmit}>
          <h1>Reset your password</h1>
          { this.state.error ?
            <p className={this.state.error ? 'error show danger' : ''}>
              <i className="fas fa-exclamation-circle"></i> {this.state.error}
            </p> : null
          }
          <div className="form-group">
            <label htmlFor="emailinput">Email</label>
            <input
              id="emailinput"
              className="form-control"
              type="email"
              name="email"
              placeholder="Type your Email"
              required
              defaultValue={this.state.user.email}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="passwordinput">New Password</label>
            <input 
              id="passwordinput"
              className="form-control"
              name="newPassword"
              value={this.state.newPassword}
              type="password"
              placeholder="Change your new password"
              required
              onChange={e =>
                this.setState({ newPassword: e.target.value })
              }
            />
          </div>
          <button className="btn-auth" type="submit">
            Update
          </button>
          <Link href="/">
            <a>Go back to you board</a>
          </Link>
        </form>
      </Layout>
    );
  }
};

export default withAuthSync(Task);
