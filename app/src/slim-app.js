import './slim-imports.js'
import { Element } from '../node_modules/@polymer/polymer/polymer-element.js'


const htmlTemplate = `
    <style include="slim-theme">
        :root { --iron-icon-fill-color:white;}
        .contact { align-self:center;display:flex;align-items:center;justify-content:center;background-color:#e0d405;border-radius:50%;width:100px;height:100px;}
        .contact-inner { display:flex;align-items:center;justify-content:center;background-color:#303030;border-radius:50%;width:90%;height:90%;}
        .main-screen { margin-top:45px;display:flex;align-items:flex-start;) center center;justify-content:center;}
        .footer ul { margin-top:60px;font-size:14px;margin-left:0px;}
        li { list-style: none;margin:15px;list-style-position:unset}
        app-header { opacity:0.9;z-index:20;}
        
    </style>

    <app-header fixed condenses effects="waterfall">
    <app-toolbar sticky$="[[_shouldStick(smallscreen)]]" class="toolbar"   >
    <paper-icon-button icon="menu" class="menu-btn" on-tap="toggle"></paper-icon-button>
    <div main-title style="display:flex;align-items:center;flex-direction:column;">
        <img class="navbar-logo" src="../images/logo.svg"/>  
    </div>
    <template is="dom-if" if="{{user.email}}">
    <paper-icon-button icon="lock-outline" class="menu-btn" on-tap="signout"></paper-icon-button>
    </template>
        <template is="dom-if" if="{{!user.email}}">
    <paper-icon-button icon="account-circle" class="menu-btn" on-tap="signin"></paper-icon-button>
    </template>
    </app-toolbar>
    <div sticky$="[[!_shouldStick(smallscreen)]]" hidden$="{{smallscreen}}">
        <section id="navbar">
            <div class="navbar-logo"><img class="full-height" src="../images/logo.svg">
            </div>
    <div class="navbar-menu">
            <ul>
                <template is="dom-repeat" items="{{categories}}">
                    <li on-tap="navigateTo">{{item}}</li>
                </template>
            </ul>
        </div>
    </section>

    </div>
    </app-header>
    <app-drawer id="drawer" swipe-open$="[[smallscreen]]" style="z-index:60;">
    <app-toolbar style="height:180px;">
    <div style="width:100vw;display:flex;align-items:center;justify-content:center;">
    <div main-title class="contact">
        <div class="contact-inner">
                <img class="navbar-logo small" src="../images/logo.svg"/>
        </div>
    </div>
        </div>
    </app-toolbar>

    <paper-listbox selected="{{selectedpage}}">
    <paper-item>Home</paper-item>
    <paper-item>Diensten</paper-item>
    <paper-item>Tarieven</paper-item>
    <paper-item>Portfolio</paper-item>
    </paper-listbox>
    <div class="footer">
    <ul style="padding:0px;text-align:center">
        <li>Gerald van Dongen</li>
        <li>+31 (0)6 101 517 41</li>
        <li>info@s-l-i-m.nl</li>
        <li>
        <a href="https://twitter.com/johngorter"><iron-icon on-tap="_twitter" icon="social:twitter" style="height:15px;"></iron-icon></a> 
        <iron-icon icon="social:facebook" style="height:15px;"></iron-icon>  
        <iron-icon icon="social:instagram" style="height:15px;"></iron-icon>  
        <iron-icon icon="social:linkedin" style="height:15px;"></iron-icon>  
        </li>
    </ul>
    </div>
    </app-drawer>

    <template is="dom-if" if="{{smallscreen}}"><br/>
        <div class="main-screen">
            <slim-mobile-pages 
                    id="mobilePages"
                    selectedpage="{{selectedpage}}" 
                    user="{{user}}" 
                    on-photo-delete="_delete" on-photo-save="_save" 
                    portfolio="{{portfolio}}"><img style="height:50px" src="./images/loading.svg"/>
            </slim-mobile-pages>
            <slim-overlay src="/images/header-splatters.svg"></slim-overlay>
        </div>
    </template>

    <template is="dom-if" if="{{!smallscreen}}"><br/><br/><br/><br/>
        <div style="height:100%">
            <slim-desktop-pages id="desktopPages">loading...</slim-desktop-pages>
        </div>
    </template>

    <!-- non visual components -->
    <slim-category-data categories="{{categories}}" on-categories-changed="log"></slim-category-data>
    <iron-media-query query="max-width: 767px" query-matches="{{smallscreen}}"></iron-media-query>
    <slim-authentication id="login" user="{{user}}"></slim-authentication>
`

export class SlimApp extends Element {
   static get template() {
       return htmlTemplate
   }
    
    static get observers() { 
        return ['_loadScreenComponent(smallscreen)', '_pageChanged(selectedpage)'];
    }

    static get properties() {
        return {
            selectedpage:{
                type:Number,
                value:0
            },
            user:{
                type:Object,
                value:{}
            },
            userprofile:{
                type:Object, 
                value: { isAdmin:false}
            }
        }
    }
         
    connectedCallback(){
        super.connectedCallback();
        var config = {
            apiKey: "AIzaSyAIrU1xKfGnsX2Pa40idv-9uGLnomiMyp4",
            authDomain: "rep-app-dcb15.firebaseapp.com",
            databaseURL: "https://rep-app-dcb15.firebaseio.com",
            projectId: "rep-app-dcb15",
            storageBucket: "rep-app-dcb15.appspot.com",
            messagingSenderId: "991032175500"
          };
        firebase.initializeApp(config);
        firebase.database().ref("photos").on('value', (snapshot) => {
            var photoarray = [];
            var objects = snapshot.val();
            if (objects) {
                var photos = Object.getOwnPropertyNames(objects);
                for (let key of photos){
                    photoarray.push(objects[key]);
                }
            } 
            this.portfolio = photoarray;
        });
    }

    _save(e){
        var photoid = e.detail.photo.id || firebase.database().ref().child('photos').push().key;
        firebase.database().ref('photos/' + photoid).set({
            photo: e.detail.photo.photo,
            title: e.detail.photo.title,
            id: photoid
          });
        if (!e.detail.photo.id) {
            this.shadowRoot.querySelector("#mobilePages").showLast(); 
        }
    }
    _delete(e) {
        let photoid = e.detail.photo.id;
        if (photoid)
            firebase.database().ref('photos/' + photoid).remove();
    }
    signin(){
        //this.set('userprofile.isAdmin',true);
        this.$.login.login();
    }
    signout(){
        if (this.$.login.signedIn) {
            this.$.login.logout();
        }
    }
    navigateTo(e){
        this.shadowRoot.querySelector("#desktopPages").scrollTo(e.model.item.toLowerCase());
    }
    toggle(){ this.$.drawer.toggle()}
    
    _pageChanged(){
        this.$.drawer.close();
    }
    
    _shouldStick(small){ return small; }
    _loadScreenComponent(){
        var component = 
        import (this.smallscreen ? '/src/slim-mobile-pages.js' : '/src/slim-desktop-pages.js');
        
    }

    _twitter() {
        
    }
    
}


customElements.define('slim-app', SlimApp);