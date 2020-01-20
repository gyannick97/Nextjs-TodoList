import Header from './Header'

export default function Layout(props) {
  return (
    <div>
      <Header />
      <div>
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
          .btn {
            border-radius: 4px;
            cursor: pointer;
            border: 0;
            transition: all 0.2s ease-in-out;
          }
          .btn-primary {
            background-color: #6d44ef;
            color: #fff;
            padding: 0.5rem 0.8rem;
            border-radius: 4px;
            margin-left: 1rem;
          }
          .btn-primary:hover,
          .btn-primary:focus {
            -webkit-transform: translateY(-3px);
            transform: translateY(-3px);
          }
          .btn-add {
            border-radius: 50%;
            width: 54px;
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

          .form-group {
            margin: 1rem 0;
            display: flex
          }
          .form-group .form-control {
            width: 90%;
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
          .todo-list .todo-items {
            padding: 0.5rem 0;
            align-items: flex-start;
            display: flex;
            text-align: left;
          }
          .todo-list .todo-items:not(:last-child) {
            border-bottom: 1px dashed #EDECF0;
          }
          .todo-list .todo-items .todo-text {
            font-size: 1.1rem;
            padding-left: 1rem;
            -ms-flex: 1;
            flex: 1;
          }
          .todo-list .todo-items .todo-check {
            position: relative;
            margin-top: 0.5rem;
          }
          .todo-list .todo-items .todo-check input {
            display: none;
          }
          .todo-list .todo-items .todo-check span {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 2px solid #e8e4e4;
            display: block;
            cursor: pointer;
          }
          .todo-list .todo-items .todo-check input:checked + span:after {
            content: "\f00c";
            font-family: "Font Awesome 5 Free";
            font-weight: 900;
            position: absolute;
            top: 2px;
            left: 6px;
            font-size: 0.75rem;
            color: #0acf97;
          }

          .text-primary {
            color: #6d44ee;
          }

          .text-danger {
            color: #ee4444;
          }

          .ml-05 {
            margin-left: 0.5rem;
          }
        `}
        </style>
      </div>
    </div>
  )
}