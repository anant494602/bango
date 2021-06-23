import React, { useState } from "react";
import { Redirect , useHistory} from "react-router-dom";
import '../user/userCSS/signIn.css';
import Layout from "../core/Layout";
import LoaderComponent from '../utils/LoadingComponent';
import { setUserId } from "../redux/action";
import {useDispatch} from 'react-redux';
import { signin, authenticate, isAuthenticated } from "../auth";

const Signin = () => {
    const [values, setValues] = useState({
        email: "test123456@gmail.com",
        password: "test123456",
        error: "",
        loading: false,
        redirectToReferrer: false
    });
    const [apistatus,setapistatus] = useState(true);
    const dispatch = useDispatch();
    const history = useHistory()

   

    const { email, password, loading, error, redirectToReferrer } = values;
    const { user } = isAuthenticated();

   

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setapistatus(true);
        setValues({ ...values, error: false, loading: true });
        signin({ email, password }).then(data => {
            try{
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                    
                    const token = isAuthenticated().token;
                    dispatch(setUserId(isAuthenticated().user));
                });
                const {
                  user: { _id, name, email, role }
                  } = isAuthenticated();

            }
        }
        catch(error){
            setapistatus(false);
        }
        });
    };

    const signInForm = () => (
      <>
        <div className="container signIn">
        <div className="d-flex justify-content-center h-100">
          <div className="card">
            <div className="card-header">
              <h3>Sign In</h3>
            </div>
            <div className="card-body">
              <form>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fas fa-user" /></span>
                  </div>
                  <input
                            onChange={handleChange("email")}
                            type="email"
                            className="form-control"
                            required
                            value={email}
                        />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fas fa-key" /></span>
                  </div>
                  <input
                            onChange={handleChange("password")}
                            type="password"
                            className="form-control"
                            value={password}
                        />
                </div>
                <div className="row align-items-center remember">
                  <input type="checkbox" />Remember Me
                </div>
                <div className="form-group">
                  <input type="submit" defaultValue="Login" onClick={clickSubmit}  className="btn float-right login_btn" />
                </div>
              </form>
            </div>
            <div className="card-footer">
              <div >
                <a href='#'>Don't have an account?</a>
                <button  onClick={() => { history.push('/signup')}} className="btn btn-site-button">Register</button>

              </div>
              <div className="d-flex justify-content-center">
                <a href="#">Forgot your password?</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>

        
       
    );

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );
    const apifallerror= () => (
      <div className="alert alert-danger" style={{ display: !apistatus ? '' : 'none' }}>
          We are facing issue in Sign up.. Please try after sometime.
      </div>
   );


    const showLoading = () =>
        loading &&(
            <div>
              <LoaderComponent />
            </div>
        );

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />;
            } else {
                return <Redirect to="/" />;
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    };

    return (
        <Layout
            title="Signin"
            description="Signin to Node React E-commerce App"
            className="container col-md-8 offset-md-2"
        >
            {showError()}
            {!apistatus ? apifallerror(): null}
            {(loading && apistatus ) ? showLoading(): signInForm()}
            
            {redirectUser()}
        </Layout>

    );
};

export default Signin;
