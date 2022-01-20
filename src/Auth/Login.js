import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../store/actions";
import "./Login.scss";
import { hanldeLogin } from "../services/loginSevice.js";
import { userLoginSuccess } from "../store/actions";

class Login extends Component {
  constructor(props) {
    super(props);
    // this.btnLogin = React.createRef();
    this.state = {
      username: "",
      password: "",
      isShowHideIcon: false,
      message: "",
    };
  }
  hanldeOnchangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };
  hanldeOnchangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  hanldeLogin = async () => {
    this.setState({
      message: "",
    });
    try {
      let data = await hanldeLogin(this.state.username, this.state.password);
      if (data && data.errorCode !== 0) {
        this.setState({
          message: data.message,
        });
      }
      if (data && data.errorCode === 0) {
        this.props.userLoginSuccess(data.user);
        console.log("login success");
      }
    } catch (error) {
      if (error?.response?.data) {
        this.setState({
          message: error?.response?.data.message,
        });
      }
      console.log(error);
    }
  };
  handleShowHideIcon = () => {
    this.setState({
      isShowHideIcon: !this.state.isShowHideIcon,
    });
  };

  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content">
            <div className="login-text">Login</div>
            <div className="form-group login-input">
              <label>Username:</label>
              <input
                type="text"
                placeholder="Enter your username:"
                className="form-control"
                value={this.state.username}
                onChange={(event) => this.hanldeOnchangeUsername(event)}
              />
            </div>
            <div className="form-group login-input">
              <label>Password:</label>
              <div className="custom-input-password">
                <input
                  type={this.state.isShowHideIcon ? "text" : "password"}
                  placeholder="Enter your username:"
                  className="form-control"
                  onChange={(event) => this.hanldeOnchangePassword(event)}
                />
                <span onClick={() => this.handleShowHideIcon()}>
                  <i
                    className={
                      this.state.isShowHideIcon
                        ? "far fa-eye"
                        : "far fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-12" style={{ color: "red" }}>
              {this.state.message}
            </div>
            <div className="col-12">
              <button
                className="btn-login"
                onClick={(event) => this.hanldeLogin(event)}
              >
                Login
              </button>
            </div>
            <div className="col-12 forgot-password">
              <span>Forgot your password</span>
            </div>
            <div className="col-12">
              <span>Login with other:</span>
            </div>
            <div className="col-12 login-socail">
              <i className="fab fa-google-plus-g google"></i>
              <i className="fab fa-facebook facebook"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginSuccess: (adminInfo) =>
      dispatch(actions.userLoginSuccess(adminInfo)),
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfor) =>
      dispatch(actions.userLoginSuccess(userInfor)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
