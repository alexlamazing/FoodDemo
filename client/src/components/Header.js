import MaterializeJS from 'materialize-css/dist/js/materialize.js';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {

  componentDidMount() {
    MaterializeJS.AutoInit();
    const elem = document.querySelector('.sidenav');
    const options = {
      menuWidth: 300, // Default is 300
      edge: 'left', // Choose the horizontal origin
      closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true // Choose whether you can drag to open on touch screens
    };
    MaterializeJS.Sidenav.init(elem, options);
  }

  renderLoginButton() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <li><a href="/auth/google"><i className="material-icons">account_circle</i></a></li>;
      default:
        return <li><a href="/api/logout"><i className="material-icons">exit_to_app</i></a></li>;
    }
  }

  renderLoginButtonForMenu() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <li><a href="/auth/google"><i className="material-icons">account_circle</i>使用 Google 登入</a></li>;
      default:
        return <li><a href="/api/logout"><i className="material-icons">exit_to_app</i>登出</a></li>;
    }
  }

  render() {

    var displayName;
    var email;
    var avatarURL;

    if (this.props.auth && this.props.auth !== false) {
      displayName = this.props.auth.displayName;
      email = this.props.auth.emails[0];
      avatarURL = this.props.auth.avatarURL;
    }

    return (
      <div>

        <div className="navbar-fixed">
          <nav className="navbar-fixed">
            <div className="nav-wrapper orange">
              <a href="/" className="brand-logo" style={{ position: 'absolute', left: '100px'}}>Food</a>
              <a href="/" data-target="mobile-demo" className="sidenav-trigger show-on-large"><i className="material-icons">menu</i></a>
              <ul className="right hide-on-med-and-down">
                {this.renderLoginButton()}
              </ul>
            </div>
          </nav>
        </div>

        <ul id="mobile-demo" className="sidenav">
          <li className="sidenav-header orange">
            <div className="user-view" style={ styles.userView }>
              <div className="row valign-wrapper" style={{ margin: '0' }}>
                <div className="col s4 ">
                  <img src={avatarURL ? avatarURL : 'https://pixelmator-pro.s3.amazonaws.com/community/avatar_empty@2x.png'} alt="Profile pic" className="circle responsive-img" />
                </div>
                <div className="col s8 ">
                  <a href="#name"><span className="white-text name truncate" style={{ fontWeight:'bolder', fontSize: '1.1em' }}>{ displayName ? displayName : '' }</span></a>
                  <a href="#email"><span className="white-text email truncate">{ email ? email : '尚未登入' }</span></a>
                </div>
              </div>
            </div>
          </li>
          {this.renderLoginButtonForMenu()}
          <li><div className="divider"></div></li>
          <li className="white">
            <ul className="collapsible collapsible-accordion">
              <li>
                <a className="collapsible-header waves-effect waves-blue">
                  <i className="material-icons">restaurant</i>餐廳 <i className="material-icons right" style={{marginRight:0}}>arrow_drop_down</i>
                </a>
                <div className="collapsible-body">
                  <ul>
                    <li>
                      <a className="waves-effect waves-blue" href="/restaurants">
                        <i className="material-icons">restaurant_menu</i>全部餐廳
                      </a>
                    </li>
                    <li><div className="divider"></div></li>
                  </ul>
                </div>
              </li>
            </ul>
          </li>
          <li className="white">
            <ul className="collapsible collapsible-accordion">
              <li>
                <a className="collapsible-header waves-effect waves-blue">
                  <i className="material-icons">search</i>搜尋 <i className="material-icons right" style={{marginRight:0}}>arrow_drop_down</i>
                </a>
                <div className="collapsible-body">
                  <ul>
                    <li>
                      <a className="waves-effect waves-blue" href="/">
                        <i className="material-icons">search</i>
                        進階搜尋
                      </a>
                    </li>
                    <li><div className="divider"></div></li>
                  </ul>
                </div>
              </li>
            </ul>
          </li>
          <li><div className="divider"></div></li>
          <li><a className="subheader">Food</a></li>
          <li><a href="/"><i className="material-icons">business</i>關於我們</a></li>
        </ul>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

const styles = {
  userView: {
    padding: '16px'
  }
}

export default connect(mapStateToProps)(Header);
