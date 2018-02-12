import '../node_modules/@polymer/polymer/polymer.js'
import '/node_modules/@polymer/iron-pages/iron-pages.js'
import '/node_modules/@iconica/iconicaelements/ico-wizard.js' 
import { Element } from '../node_modules/@polymer/polymer/polymer-element.js'

import './slim-image-control.js'

const htmlTemplate = `
        <style include="slim-theme">
            :root {
                --wizard-header-mixin: {
                    display:flex;justify-content:center;position:fixed;top:65px;
                };  
                --wizard-headertitle-mixin: {
                    text-shadow:2px 2px 0px #000000;
                    justify-self:center;
                };  
            }
            div.fullscreen { left:0px;top:60px;width:100vw;height:80vh; display:flex;align-items:center}
            div.bg { position:absolute;left:0px;top:0px;width:100vw;height:100vh;filter:blur(20px);background:no-repeat center;z-index:-1;}
            div.screen-header {background-image: url('images/bg.jpg');text-shadow:2px 2px 0px #000000;padding-left:30px;display:flex;justify-content: center;align-items:center;width:100vw;min-width:300px;min-height:60vh;}
            div.diensten-container {display:flex;font-size:12px;flex-wrap:wrap;}
            div.content-block-1{align-self:center;display:flex;justify-content: center;align-items:center;flex-flow:column;padding:40px;}
            div.content-block-2{align-self:center;display:flex;justify-content: center;align-items:center;flex-flow:column;width:90vw;min-width:300px;min-height:30vh;}
            .title { font-weight:bold;font-family: Tahoma}
            .screen img { width:75px;height:75px;border-radius:75px;}
            .screen .text-card { margin:10px;display:flex;flex-direction: column;justify-content:center;text-align:center;align-items: center}
            /* Cards */
            paper-card{--paper-card-header-color: var(--font-color-primary); max-width:90vw; z-index:-1; margin-bottom: 20px;};
            .card-content{color: var(--font-color-secondary)};

            /* Buttons */
            a {text-decoration: none;}
            paper-button {color: var(--font-color-primary); margin: 10px;}
            paper-button.btn-inverse{color: var(--font-color-secondary); margin: 10px;}
            paper-button.btn-primary {background-color: var(--positive-highlight);color: white; text-decoration:none;}
            paper-button.btn-secondary{background-color: var(--positive-highlight);color: white;}   

            div[slot="nocontent"] { height:60vh;display:flex;align-items:center;justify-content:center}
            slim-image-control { position:fixed;bottom:0px;}
            ico-wizard { z-index:5}
            .pricing-table{margin:10px;display:flex;flex-direction: column;flex-wrap: wrap;}
            .pricing-block{display:flex;flex-direction:column;justify-content:space-between;text-align:center;padding: 10px;min-width:300px;min-height:200px;background:var(--main-card-color);}
            .pricing-title{font-size:20px;color:#000;display:flex;justify-content:center;background:#ebebeb;padding:10px;}
            .undertitle{color:#000;font-size:24px;}

            ul {margin-left: -40px;color:#000;list-style: none;}
            ul li:before {content: '✓';}
            ul li{padding:2px}
        </style>
       
<iron-pages selected="{{selectedpage}}">
    <!-- Begin home -->
    <div>
        <div class="screen-header">
            <h2>"Uw specialist in styling, restyling en schilderwerk in Gelderland en omstreken"</h2>
        </div>
        <div class="content-block-1">
            <h2> Welkom bij S-L-I-M </h2>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, otam rem aperiam,
                eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae eaque ipsa quae ab illo inventore
                veritatis et quasi architecto beatae vitaeeaque ipsa quae ab illo inventore veritatis et quasi architecto
                beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
            <a href="#">
                <paper-button class="btn-primary">Neem contact op</paper-button>
            </a>
            <a href="#">
                <paper-button>meer informatie</paper-button>
            </a>
        </div> 
        <section id="diensten" name="diensten">
        <div class="text-center"><h2>Wij helpen u graag met:</h2></div>
        <div class="diensten-container">
            <div class="text-card">
                <div class="splatter"></div>
                <div class="text-card-top">
                    <img src="../images/dienst1.jpg"/>
                </div>
                <div class="text-card-bottom">
                    <h3> Styling </h3>
                    <p> Geef uw interieur een personal touch. Straal uit wie u bent! Van muurkleur tot meubelkeuze. </p>
                </div>
            </div>
            <div class="text-card">
                <div class="splatter"></div>
                <div class="text-card-top">
                    <img src="../images/dienst1.jpg"/>
                </div>
                <div class="text-card-bottom">
                    <h3> Restyling </h3>
                    <p> Met betaalbare en/of bestaande middelen uw leefomgeving een nieuwe persoonlijkheid geven. </p>
                </div>
            </div>
            <div class="text-card">
                <div class="splatter"></div>
                <div class="text-card-top">
                    <img src="../images/dienst1.jpg"/>
                </div>
                <div class="text-card-bottom">
                    <h3> Schilderwerk </h3>
                    <p> Zowel binnen- als buitenshuis mag goed schilderwerk gezien worden. En opvallen is niet erg! </p>
                </div>
            </div>
            <div class="text-card">
                <div class="splatter"></div>
                <div class="text-card-top">
                    <img src="../images/dienst1.jpg"/>
                </div>
                <div class="text-card-bottom">
                    <h3> Interieuradvies </h3>
                    <p> Spelen met licht? Bar of eethoek? Loungebank of loveseat? Vraag SLIM om advies! </p>
                </div>
            </div>
        </div>
</section>
    </div>
    <!-- Einde Home -->
    <!-- Begin Diensten -->
    <section>
        <div class="screen-header">
            <h2>Wat kunnen wij voor u betekenen?</h2>
        </div>
        <div class="content-block-1">
            <template is="dom-repeat" items="[[items]]">
                <paper-card heading="[[item.name]]" image="[[item.picture]]">
                    <div class="card-content">
                        [[item.description]]
                    </div>
                    <div class="card-actions">
                        <paper-button class="btn-secondary">Bel mij</paper-button>
                        <paper-button class="btn-inverse">Meer informatie</paper-button>
                    </div>
                </paper-card>
            </template>
        </div>
    </section>
    <!-- Einde Diensten -->
    <section>
    <div class="content-block-1">
    <h2>Hier onder vind je de prijzen die wij momenteel hanteren.</h2>
    <p> Prijzen voor onze diensten, vraag direct een offerte aan.</p>
    </div>
    <div class="pricing-table">
            <div class="pricing-title">
            Styling
        </div>
    <div class="pricing-block">
        <div class="checklist">
            <ul>
                <li>Wij doen dit</li>
                <li>Wij doen dit</li>
                <li>Wij doen dit</li>
                <li>Wij doen dit</li>
                <li>Wij doen dit</li>
            </ul>
        </div>
        <div class="undertitle">
            Vanaf €29,99
        </div>
        <div><a class= "btn-primary" href="#">Gratis offerte opvragen</a></div>
    </div>
    </div>
    <div class="pricing-table">
            <div class="pricing-title">
            Restyling
        </div>
    <div class="pricing-block">
        <div class="checklist">
            <ul>
                <li>Wij doen dit</li>
                <li>Wij doen dit</li>
                <li>Wij doen dit</li>
                <li>Wij doen dit</li>
                <li>Wij doen dit</li>
            </ul>
        </div>
        <div class="undertitle">
            Vanaf €29,99
        </div>
        <div><a class= "btn-primary" href="#">Gratis offerte opvragen</a></div>
    </div>
    </div>
    <div class="pricing-table">
            <div class="pricing-title">
            Schilderwerk
        </div>
    <div class="pricing-block">
        <div class="checklist">
            <ul>
                <li>Wij doen dit</li>
                <li>Wij doen dit</li>
                <li>Wij doen dit</li>
                <li>Wij doen dit</li>
                <li>Wij doen dit</li>
            </ul>
        </div>
        <div class="undertitle">
            Vanaf €29,99
        </div>
        <div><a class= "btn-primary" href="#">Gratis offerte opvragen</a></div>
    </div>
    </div>
    <div class="pricing-table">
            <div class="pricing-title">
            Interieuradvies
        </div>
    <div class="pricing-block">
        <div class="checklist">
            <ul>
                <li>Wij doen dit</li>
                <li>Wij doen dit</li>
                <li>Wij doen dit</li>
                <li>Wij doen dit</li>
                <li>Wij doen dit</li>
            </ul>
        </div>
        <div class="undertitle">
            Vanaf €29,99
        </div>
        <div><a class= "btn-primary" href="#">Gratis offerte opvragen</a></div>
    </div>
    </div>

    </section>
    <section>
            <div class="fullscreen" >
                 <div class="bg" id="bg" ></div>
               
                <ico-wizard id="gallery" progressballs showfinish swipeable on-step-changed="_changePhoto">
                <template is="dom-repeat" items="{{portfolio}}" on-dom-change="_updateUI">
                <div step$="{{index}}" class="image" title$="{{item.title}}" style$='background:url("{{item.photo}}") no-repeat center center;background-size: contain;height:100vh;width:100vw;z-index:{{index}};background-color:transparent'></div>
                 </template>
                 <div slot="nocontent">Er zijn op het moment nog geen fotos beschikbaar</div>
                </ico-wizard>

                <!-- image manipulation toolbar -->
                <template is="dom-if" if="{{user.isAdmin}}">
                       <slim-image-control photo="[[selectedPhoto.photo]]" title="" no_undo no_save on-photo-delete="_delete" on-photo-changed="_save" on-new-photo="_saveNew" enabled="{{_getItems(portfolio)}}"></slim-image-control>
               </template> 
                
        </div>
    </section>
    <section>
        <slim-photo-page>Photo page loading...</slim-photo-page>
    </section>

    <section>
    <div class="content-block-1">
        <h2>Contact</h2>
        <p>U hoeft enkel uw telefoonnummer achter te laten en wij bellen u zo snel mogelijk terug!</p>
        </div>
        <div class="content-block-1">
         <paper-input class="reverse" id="title" required auto-validate label="Telefoonnummer" placeholder="0653350661" value="{{title}}"></paper-input>
         <paper-button class="btn-secondary" role="button" tabindex="0" animated="" elevation="0" aria-disabled="false">Bel mij</paper-button>
         </div>
    </section>
</iron-pages>
<slim-footer> </slim-footer>
`
export class SlimMobilePages extends Element {
    static get template() {
        return htmlTemplate;
    }

    static get properties() { 
        return {
                key:{
                    type:String,
                    value:""
                },
                selectedpage: {
                    type: Number,
                    value: 0,
                    notify: true
                },
                portfolio: {
                    type: Array,
                    value: [],
                },
                items: {
                    type: Array,
                    value: [
                        { name: 'Styling', description: 'Geef uw interieur een personal touch. Straal uit wie u bent! Van muurkleur tot meubelkeuze.', picture: '../images/dienst1.jpg' },
                        { name: 'Restyling', description: 'Met betaalbare en/of bestaande middelen uw leefomgeving een nieuwe persoonlijkheid geven.', picture: '../images/dienst1.jpg' },
                        { name: 'Schilderwerk', description: 'Zowel binnen- als buitenshuis mag goed schilderwerk gezien worden. En opvallen is niet erg!', picture: '../images/dienst1.jpg' },
                        { name: 'Interieuradvies', description: 'Spelen met licht? Bar of eethoek? Loungebank of loveseat? Vraag SLIM om advies!', picture: '../images/dienst1.jpg' }
                    ]
                }
            }
    };

    _changePhoto(s) {
        this.selectedIndex = s.detail.value;
        this.selectedPhoto = this.portfolio[s.detail.value];
        if (this.selectedPhoto)
            this.$.bg.style.backgroundImage = 'url("' + this.selectedPhoto.photo + '")';
    }
    _getItems(portfolio){
        return portfolio.length;
    }

    _updateUI() { 
        this.$.gallery._setupUI(this.selectedIndex);
        this.selectedPhoto = this.portfolio[this.selectedIndex];
        if (this.selectedPhoto)
            this.$.bg.style.backgroundImage = 'url("' + this.selectedPhoto.photo + '")';
    }
    _delete(e){
        e.stopPropagation(); 
        e.preventDefault(); 

        if (!this.selectedPhoto)  this.selectedPhoto = this.portfolio[0];
        var event = new CustomEvent('photo-delete', {detail: { photo: this.selectedPhoto }, bubbles: true, composed: true});
        this.dispatchEvent( event);

        setTimeout(() => {
            if (this.portfolio.length == 0) this.$.gallery._setupUI(0);
            else 
                if (this.selectedIndex >= this.portfolio.length){
                    this.selectedIndex = this.portfolio.length -1 ;
                    this.selectedPhoto = this.portfolio[this.selectedIndex];
                    this.$.gallery.step = this.selectedIndex;
                }
        }, 100);
    }

    _save(e){
        e.stopPropagation(); 
        e.preventDefault();

        if (!this.selectedPhoto)  this.selectedPhoto = this.portfolio[0];
        this.selectedPhoto.photo = e.detail.value;
        var event = new CustomEvent('photo-save', {detail: { photo: this.selectedPhoto }, bubbles: true, composed: true});
        this.dispatchEvent( event);
    }

    _saveNew(e){
        e.stopPropagation(); 
        e.preventDefault();
        
        if (this.shadowRoot.querySelector("#title").validate())
        {
            var event = new CustomEvent('photo-save', {detail: { photo: { photo: e.detail.photo, title:this.title }}, bubbles: true, composed: true});
            this.dispatchEvent( event);
            this.data = "";
        }
    }

    showLast() {
        this.selectedpage = 3;
        this.selectedIndex = this.portfolio.length -1;
        this.selectedPhoto = this.portfolio[this.selectedIndex];
        this.$.gallery._setupUI(this.selectedIndex);
    }
}



customElements.define('slim-mobile-pages', SlimMobilePages);