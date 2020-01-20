import Link from 'next/link'
import { logout } from '../utils/auth'

export default function Header() {
  return (
    <div className="navbar">
      <div className="container">
        <h3 className="navbar-brand">Todo List</h3>
        <ul>
          <li>
            <Link href="/">
              <a><i className="fas fa-list-ul"></i> List</a>
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <a><i className="fas fa-address-card"></i> Profile</a>
            </Link>
          </li>
          <li>
            <button className="btn btn-primary" onClick={logout}>
              <i className="fas fa-power-off"></i> Logout
            </button>
          </li>
        </ul>
      </div>
      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .navbar-brand {
          display: inline-block;
          width: 20%;
          margin: 0;
        }
        .navbar {
          padding: 0.8rem;
          background-color: #fff;
        }
        .navbar ul {
          width: 80%;
          display: inline-block;
          margin: 0 0 0 auto;
          text-align: right;
        }
        .navbar ul li {
          display: inline-block;
        }
        .navbar ul li:not(:last-child) {
          margin-right: 1.4rem;
        }
        .navbar ul li a {
          font-weight: 400;
          color: #323c47;
          text-decoration: none;
        }
        .navbar ul li a:hover,
        .navbar ul li a:hover i {
          color: #6d44ee;
        }
        .navbar ul li a i {
          font-size: 0.875rem;
          color: #cac7c7;
        }
      `}</style>
    </div>
  )
}
