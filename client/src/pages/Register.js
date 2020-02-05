import React from "react";

const Register = () => {
  return (
    <div className="row">
      <form>
        <div class="form-group">
          <label for="first-name">First Name</label>
          <input
            type="text"
            class="form-control"
            id="register-fn"
            placeholder="Jane"
          />
        </div>
        <div class="form-group">
          <label for="email">Last Name</label>
          <input
            type="text"
            class="form-control"
            id="register-ln"
            placeholder="Johnson"
          />
        </div>
        <div class="form-group">
          <label for="email">Company Name</label>
          <input
            type="text"
            class="form-control"
            id="register-cn"
            placeholder="Baidu"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            id="register-password"
            placeholder="Password"
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
