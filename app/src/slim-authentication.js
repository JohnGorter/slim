import '/node_modules/@polymer/polymer/polymer.js'
import { Element } from '/node_modules/@polymer/polymer/polymer-element.js'



export class SlimAuthentication extends Element {

    //static get observers() { return ['_loginUser(username, password)'] }
    static get properties() { return {
          user:{
              type:Object,
              value:{},
              notify:true
          },
          username:{
              type:String,
              value:''
          },
          password:{
              type:String,
              value:''
          },
          signedIn: {
              type:Boolean,
              computed:'_isSignedIn(user)'

          }
      }
    }

    _isSignedIn(){
        return this.user && this.user.email;
    }
    connectedCallback(){
          this.provider = new firebase.auth.GoogleAuthProvider();
    }

    login(){
        firebase.auth().signInWithPopup(this.provider).then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
           
            // The signed-in user info.
            this.user = result.user;
            // check to see if the user is admin
            var userRef = firebase.database().ref('users/' + result.user.uid + '/isAdmin');
            userRef.on('value', (snapshot) => {
                var isAdmin = snapshot.val();
                this.set('user.isAdmin',isAdmin);
            });
            // ...
          }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            this.user = {};
            // ...
          });
    }
   
    logout() {
        firebase.auth().signOut().then((result) => {
           this.user = {};
        }).catch(function(error) {
        // An error happened.
        });
    }
}

customElements.define('slim-authentication', SlimAuthentication);