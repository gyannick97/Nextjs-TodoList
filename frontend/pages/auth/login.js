import Layout from '../../components/authLayout'
import { login } from '../../utils/auth'
import { API_URL } from '../../utils/config'

class Login extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      submitted: false,
      error: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  async handleSubmit (e) {
    e.preventDefault();
    try {
      let _user = {
        email: this.state.email,
        password: this.state.password
      }
      const res = await fetch(`${API_URL}/v1/admin/login`, {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(_user)
      })

      if (res.ok) {
        const user = await res.json()
        await login(user)
      } else {
        const data = await res.json()
        this.setState({
          email: '',
          password: '',
          error: data.message 
        })
      }
    } catch(err) {
      console.log('err', err)
    }
  }

  render() {
    return (
      <Layout>
        <form onSubmit={this.handleSubmit}>
          <h1>Login</h1>
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
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="passwordinput">Password</label>
            <input 
              id="passwordinput"
              className="form-control"
              name="password"
              type="password"
              placeholder="Type your password"
              required
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <button className="btn-auth" type="submit">
            Submit
          </button>
          <small>Don't have an account? <a href="/auth/register">Register</a></small>
        </form>
      </Layout>
    );
  }
};

export default Login;
