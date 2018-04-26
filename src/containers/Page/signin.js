import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from '../../components/uielements/input';
import Checkbox from '../../components/uielements/checkbox';
import Button from '../../components/uielements/button';
import IntlMessages from '../../components/utility/intlMessages';
import SignInStyleWrapper from './signin.style';
import { signInUser } from '../../redux-token-auth-config'
import Alert from "../../components/feedback/alert";

class SignIn extends Component {
  state = {
    redirectToReferrer: false,
  };


  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      submitted: false,
      loginFailure: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.facebookSignIn = this.facebookSignIn.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
  };

  componentWillReceiveProps(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  };

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleLogin = () => {
    const { signInUser } = this.props;
    const {
      email,
      password,
    } = this.state;

    signInUser({ email, password })
      .then( () => this.props.history.push('/dashboard'))
      .catch( () => this.setState({ loginFailure: true }));
  };

  facebookSignIn(e) {
    e.preventDefault();
    window.open(`${process.env.FB_LOGIN_URL}?omniauth_window_type=newWindow`, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
  }

  googleSignIn(e) {
    e.preventDefault();
    window.open(`${process.env.GOOGLE_OAUTH2_LOGIN_URL}?omniauth_window_type=newWindow`, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
  }

  render() {
    const from = { pathname: '/dashboard' };
    const { redirectToReferrer, email, password, loginFailure } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    const loginError = loginFailure ? <Alert
                  message="Your email or password is incorrect.  Please try again."
                  type="error"
                /> : '';

    return (
      <SignInStyleWrapper className="isoSignInPage">
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoLogoWrapper">
              <Link to="/dashboard">
                <IntlMessages id="page.signInTitle" />
              </Link>
            </div>

            <div className="isoSignInForm">
              {loginError}
              <div className="isoInputWrapper">
                <Input size="large" placeholder="Email Address" name="email" value={email} onChange={this.handleChange} />
              </div>

              <div className="isoInputWrapper">
                <Input size="large" type="password" placeholder="Password" name="password" value={password} onChange={this.handleChange} />
              </div>

              <div className="isoInputWrapper isoLeftRightComponent">
                <Checkbox>
                  <IntlMessages id="page.signInRememberMe" />
                </Checkbox>
                <Button type="primary" onClick={this.handleLogin}>
                  <IntlMessages id="page.signInButton" />
                </Button>
              </div>

              <div className="isoInputWrapper isoOtherLogin">
                <Button onClick={this.facebookSignIn} type="primary btnFacebook">
                  <IntlMessages id="page.signInFacebook" />
                </Button>
                <Button onClick={this.googleSignIn} type="primary btnGooglePlus">
                  <IntlMessages id="page.signInGooglePlus" />
                </Button>
              </div>
              <div className="isoCenterComponent isoHelperWrapper">
                <Link to="/forgotpassword" className="isoForgotPass">
                  <IntlMessages id="page.signInForgotPass" />
                </Link>
                <Link to="/signup">
                  <IntlMessages id="page.signInCreateAccount" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SignInStyleWrapper>
    );
  }
}

export default connect(
  state => ({
    isLoggedIn: state.reduxTokenAuth.currentUser.isSignedIn,
  }),
  { signInUser }
)(SignIn);
