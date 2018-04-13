import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Form from '../../components/uielements/form';
import { Input } from 'antd';
import Checkbox from '../../components/uielements/checkbox';
import Button from '../../components/uielements/button';
import authAction from '../../redux/auth/actions';
import IntlMessages from '../../components/utility/intlMessages';
import SignUpStyleWrapper from './signup.style';
import { registerUser } from '../../redux-token-auth-config';
import Facebook from '../../helpers/oauth/facebook';
import { verifyCredentials } from '../../redux-token-auth-config';
import { store } from '../../redux/store';

const FormItem = Form.Item;

const { login } = authAction;


const authKeys = {
  'access-token': 'auth_token',
  'client': 'client_id',
  'expiry': 'expiry',
  'uid': 'uid'
};

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.facebookSignup = this.facebookSignup.bind(this);
    this.googleSignup = this.googleSignup.bind(this);

    window.addEventListener('message', this.receiveMessage);
  }

  receiveMessage(event) {
    switch(event.data.message) {
      case 'deliverCredentials':
        for (var key in authKeys) {
          let value = authKeys[key];
          localStorage.setItem(key, event.data[value])
        };
        localStorage['token-type'] = 'Bearer';
        verifyCredentials(store);
        window.location.replace('/dashboard');
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const form = this.props.form;
    const { registerUser } = this.props

    form.validateFields((err, values) => {
      if (!err) {
        registerUser(values)
          .then( () => this.props.history.push('/dashboard'))
          .catch( () => this.setState({ registrationFailure: true }));
      }
    });
  }

  facebookSignup(e) {
    e.preventDefault();
    window.open(`${process.env.FB_LOGIN_URL}?omniauth_window_type=newWindow`, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
  }

  googleSignup(e) {
    e.preventDefault();
    window.open(`${process.env.GOOGLE_OAUTH2_LOGIN_URL}?omniauth_window_type=newWindow`, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
  }

  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Your password confirmation must match your password.');
    } else {
      callback();
    }
  };
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <SignUpStyleWrapper className="isoSignUpPage">
        <div className="isoSignUpContentWrapper">
          <div className="isoSignUpContent">
            <div className="isoLogoWrapper">
              <Link to="/dashboard">
                <IntlMessages id="page.signUpTitle" />
              </Link>
            </div>

            <Form onSubmit={this.handleSubmit}>
              <div className="isoSignUpForm">
                <div className="isoInputWrapper isoLeftRightComponent">
                  <FormItem>
                    {getFieldDecorator('firstName', {
                      rules: [
                        {
                          required: true,
                          message: 'Please enter your first name.',
                        },
                      ],
                    })(<Input size="large" placeholder="First name" />)}
                  </FormItem>

                  <FormItem>
                    {getFieldDecorator('lastName', {
                      rules: [
                        {
                          required: true,
                          message: 'Please enter your last name(s).',
                        },
                      ],
                    })(<Input size="large" placeholder="Last name" />)}
                  </FormItem>
                </div>

                <FormItem hasFeedback>
                  {getFieldDecorator('email', {
                    rules: [
                      {
                        type: 'email',
                        message: 'The input is not a valid E-mail.',
                      },
                      {
                        required: true,
                        message: 'Please enter your E-mail.',
                      },
                    ],
                  })(
                    <Input size="large" placeholder="Email" />
                  )}
                </FormItem>

                <FormItem hasFeedback>
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: 'Please enter your password.',
                      },
                      {
                        validator: this.checkConfirm,
                      },
                    ],
                  })(
                    <Input size="large" type="password" placeholder="Password" />
                  )}
                </FormItem>
                <FormItem hasFeedback>
                  {getFieldDecorator('confirm', {
                    rules: [
                      {
                        required: true,
                        message: 'Please confirm your password.',
                      },
                      {
                        validator: this.checkPassword,
                      },
                    ],
                  })(
                    <Input
                      size="large"
                      type="password"
                      placeholder="Confirm Password"
                    />
                  )}
                </FormItem>

                <div className="isoInputWrapper" style={{ marginBottom: '50px' }}>
                  <Checkbox>
                    <IntlMessages id="page.signUpTermsConditions" />
                  </Checkbox>
                </div>

                <div className="isoInputWrapper">
                  <FormItem>
                    <Button type="primary" htmlType="submit">
                      <IntlMessages id="page.signUpButton" />
                    </Button>
                  </FormItem>
                </div>
                <div className="isoInputWrapper isoOtherLogin">
                  <Button type="primary btnFacebook" onClick={this.facebookSignup}>
                    <IntlMessages id="page.signUpFacebook" />
                  </Button>
                  <Button type="primary btnGooglePlus" onClick={this.googleSignup}>
                    <IntlMessages id="page.signUpGooglePlus" />
                  </Button>
                </div>
                <div className="isoInputWrapper isoCenterComponent isoHelperWrapper">
                  <Link to="/signin">
                    <IntlMessages id="page.signUpAlreadyAccount" />
                  </Link>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </SignUpStyleWrapper>
    );
  }
}

const WrappedSignup = Form.create()(SignUp);

export default connect(
  state => ({
    isLoggedIn: state.reduxTokenAuth.currentUser.isSignedIn
  }),
  { login, registerUser }
)(WrappedSignup);


