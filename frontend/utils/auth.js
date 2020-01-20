import { useEffect } from 'react'
import Router from 'next/router'
import cookie from 'js-cookie'
import nextCookie from 'next-cookies'

export const login = (data) => {
  console.log(data, 'user')
  cookie.set('token', data.user.token, { expires: 1 })
  cookie.set('userId', data.user._id, { expires: 1 })
  Router.push('/')
}

export const auth = ctx => {
  const { token } = nextCookie(ctx)

  // If there's no token, it means the user is not logged in.
  if (!token) {
    if (typeof window === 'undefined') {
      ctx.res.writeHead(302, { Location: '/auth/login' })
      ctx.res.end()
    } else {
      Router.push('/auth/login')
    }
  }

  return token
}

export const logout = () => {
  cookie.remove('token')
  cookie.remove('userId')
  // To support logging out from all windows
  window.localStorage.setItem('logout', Date.now())
  Router.push('/auth/login')
}

export const withAuthSync = WrappedComponent => {
  const Wrapper = props => {
    const syncLogout = event => {
      if (event.key === 'logout') {
        Router.push('/auth/login')
      }
    }

    useEffect(() => {
      window.addEventListener('storage', syncLogout)

      return () => {
        window.removeEventListener('storage', syncLogout)
        window.localStorage.removeItem('logout')
      }
    }, [])

    return <WrappedComponent {...props} />
  }

  Wrapper.getInitialProps = async ctx => {
    const token = auth(ctx)

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx))

    return { ...componentProps, token }
  }

  return Wrapper
}