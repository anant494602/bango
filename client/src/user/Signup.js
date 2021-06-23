import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Redirect , useHistory} from "react-router-dom";
import Layout from '../core/Layout';
import { signup } from '../auth';
import '../user/userCSS/signUp.css';

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword:'',
        error: '',
        success: false
    });
    const [validconfirmPassword,setconfirmPassword] = useState(true);
    const [apistatus,setapistatus] = useState(true);
    const history = useHistory()

    const { name, email, password, confirmPassword, success, error } = values;

    const handleChange = name => event => {
        setconfirmPassword(true);
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setapistatus(true)
        if (values.confirmPassword !== values.password) {
          setconfirmPassword(false);
          return false;
        }
        setValues({ ...values, error: false });
        signup({ name, email, password }).then(data => {
          try{
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword:'',
                    error: '',
                    success: true
                });
            }
          }
          catch(error){
            setapistatus(false)
          }
        });
    };

    const signUpForm = () => (
        <div className="container signUp">
        <div className="d-flex justify-content-center h-100">
          <div className="card">
            <div className="card-header">
              <h3>Sign Up</h3>
            </div>
            <div className="card-body">
              <form>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fas fa-user" /></span>
                  </div>
                  <input onChange={handleChange('name')} type="text" className="form-control" placeholder="Name"  value={name} />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fas fa-user" /></span>
                  </div>
                  <input onChange={handleChange('email')} type="email" className="form-control"  placeholder="Email"  value={email} />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fas fa-key" /></span>
                  </div>
                  <input onChange={handleChange('password')} type="password"  placeholder="password" className="form-control" value={password} />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fas fa-key" /></span>
                  </div>
                  <input onChange={handleChange('confirmPassword')} type="password"  placeholder="confirm password" className="form-control" value={confirmPassword} />
                </div>
                <div className="form-group">
                  <input type="submit" defaultValue="Login" onClick={clickSubmit} className="btn float-right btn-site-button" />
                </div>
                <div className='form-group'>
                <a href='#'>Already have a Account ? </a>
                <input  onClick={() => { history.push('/signin')}}  defaultValue="Login"  type="button" class="btn float-right btn-site-button"></input>

              </div>
              </form>
         
            </div>
          </div>
        </div>
      </div>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );
    const showErrorConfirmPassword = () => (
      <div className="alert alert-danger" style={{ display: !validconfirmPassword ? '' : 'none' }}>
          Password and confirm Password should match
      </div>
  );
  const apifallerror= () => (
    <div className="alert alert-danger" style={{ display: !apistatus ? '' : 'none' }}>
        We are facing issue in Sign up.. Please try after sometime.
    </div>
);

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            New account is created. Please <Link to="/signin">Signin</Link>
        </div>
    );

    return (
        <Layout
            title="Signup"
            description="Signup to Node React E-commerce App"
            className="container col-md-8 offset-md-2"
        >
            {showSuccess()}
            {showError()}
            {!validconfirmPassword ? showErrorConfirmPassword(): null}
            {!apistatus ? apifallerror(): null}
            {signUpForm()}
          
           
        </Layout>
        
    );
};

export default Signup;
