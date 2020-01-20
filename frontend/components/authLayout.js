const layoutStyle = {
  padding: '3rem',
  boxShadow: '0 .125rem .25rem rgba(0,0,0,.075)',
  maxWidth: '400px',
  margin: '4rem auto',
  background: '#fff',
  borderRadius: 6,
}

export default function Layout(props) {
  return (
    <div style={layoutStyle}>
      <main>
        {props.children}
      </main>
      <style jsx global> {`
        ul {
          padding: 0;
          margin: 0;
        }
        ul li {
          list-style: none;
        }
        input:focus,
        button:focus {
          outline: none
        }

        .form-group {
          margin: 1rem 0;
          display: block;
        }
        .form-group .form-control {
          width: 93%;
          height: calc(1.5em + .75rem + 2px);
          padding: .375rem .75rem;
          font-size: 1rem;
          font-weight: 300;
          line-height: 1.5;
          color: #323c47;
          background-color: #f4f4f4;
          background-clip: padding-box;
          border: 1px solid #f4f4f4;
          border-radius: .25rem;
        }
        .btn-auth {
          background-color: #6d44ef;
          color: #fff;
          border-radius: 5px;
          cursor: pointer;
          padding: 1rem 2rem;
          margin: 1.3rem 0;
          font-size: 1rem;
          font-weight: 300;
          display: block;
          width: 100%;
          box-shadow: 0 0.5rem 1rem rgba(109,68,239,0.3);
          -webkit-transition: all 0.2s ease-in-out;
          transition: all 0.2s ease-in-out;
        }
        .btn-auth:hover,
        .btn-auth:focus {
          -webkit-transform: translateY(-3px);
          transform: translateY(-3px);
        }

        .error {
          margin: 0.5rem 0 0;
          display: none;
          color: brown;
        }
        .error.show {
          display: block;
        }
        .error.danger {
          color: #fff;
          background-color: #ee4444;
          padding: 0.7rem 1rem;
          border-radius: 5px;
        }
      `}
      </style>
    </div>
  )
}