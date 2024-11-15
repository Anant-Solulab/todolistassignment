import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/authcontext';
import { useNavigate } from "react-router-dom";
import "../style/auth.css"; // Import the CSS for styling

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required')
    }),
    onSubmit: (values) => {
      login(values.email, values.password);
      navigate('/todos');
    }
  });

  return (
   <div className="auth-form">
     <form onSubmit={formik.handleSubmit}>
      <div className="auth-form-field">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          placeholder="Enter your email"
        />
        {formik.touched.email && formik.errors.email ? <div className="error-message">{formik.errors.email}</div> : null}
      </div>

      <div className="auth-form-field">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          placeholder="Enter your password"
        />
        {formik.touched.password && formik.errors.password ? <div className="error-message">{formik.errors.password}</div> : null}
      </div>

      <button type="submit" className="auth-btn">Login</button>
    </form>
   </div>
  );
};

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required')
    }),
    onSubmit: (values) => {
      signup(values.email, values.password);
      navigate("/todos");
    }
  });

  return (
    <div className="auth-form">
      <form onSubmit={formik.handleSubmit}>
      <div className="auth-form-field">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          placeholder="Enter your email"
        />
        {formik.touched.email && formik.errors.email ? <div className="error-message">{formik.errors.email}</div> : null}
      </div>

      <div className="auth-form-field">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          placeholder="Enter your password"
        />
        {formik.touched.password && formik.errors.password ? <div className="error-message">{formik.errors.password}</div> : null}
      </div>

      <div className="auth-form-field">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          placeholder="Confirm your password"
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? <div className="error-message">{formik.errors.confirmPassword}</div> : null}
      </div>

      <button type="submit" className="auth-btn">Sign Up</button>
    </form>
    </div>
  );
};

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="wrapper center">
      <div className="form-wrapper">
      <div className="btn-select">
        <button className='selector-btn' style={{backgroundColor: isLogin?"violet":"white"} } onClick={()=>setIsLogin(true)}>Login</button>
        <button className='selector-btn'  style={{backgroundColor: !isLogin?"violet":"white"}} onClick={()=>setIsLogin(false)}>SignUp</button>
      </div>
      {isLogin? <Login/>: <Signup/>}
      </div>
    </div>
  );
}

export default Auth;
