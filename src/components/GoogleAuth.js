import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from './../actions';


class GoogleAuth extends React.Component {


    componentDidMount() {
        // loading google api with auth2 module
        window.gapi.load('client:auth2', () => {
            // then intializing the gapi clinet library
            window.gapi.client.init({
                clientId: "1087127232068-tgldm9pddljqnh0bug3eqc4hkj73h3h7.apps.googleusercontent.com",
                scope: "email"
            }).then(() => {
                // the above intialization is the promise
                // Once the async fn is done we create an object to auth reference
                // And then get the state of signed-in by calling the isSignedIn method  
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        });
    };

    onAuthChange = (isSignedIn) => {
        // this.setState({isSignedIn: this.auth.isSignedIn.get()})
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId())
        }
        else {
            this.props.signOut()
        }
    };

    onSignedInClick = () => {
        this.auth.signIn()
    };

    onSignedOutClick = () => {
        this.auth.signOut()
    };

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null
        }
        else if (this.props.isSignedIn) {
            return (
                <button className="ui red google button" onClick={this.onSignedOutClick}>
                    <i className="google icon" />
                    Sign out
                </button>
            )
        }
        else {
            return (
                <button className="ui red google button" onClick={this.onSignedInClick}>
                    <i className="google icon" />
                    Sign In with google
                </button>
            )
        }
    };

    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        )
    };

};

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);