import '../node_modules/@polymer/polymer/polymer.js'
import '/node_modules/@polymer/iron-pages/iron-pages.js'
import '/node_modules/@iconica/iconicaelements/ico-wizard.js' 
import './slim-photo-page.js'
import './slim-image-caroussel.js'
import { Element } from '../node_modules/@polymer/polymer/polymer-element.js'

const htmlTemplate = `
        <style>
            div.fullscreen { left:0px;top:60px;width:100vw;height:400px;background-color: #303030;}
            div.screen-header { text-shadow:2px 2px 0px #000000; align-self:center;margin-top:30px;padding:20px;display:flex;justify-content: center;align-items:center;flex-flow:column;width:70vw;min-width:300px;min-height:40vh;}
            div.diensten-container { display:flex;font-size:12px;flex-wrap:wrap;width:70vw;justify-content: space-between;align-content: center;}
            div.content-block-1{align-self:center;display:flex;justify-content: center;align-items:center;flex-flow:column;width:90vw;min-width:300px;min-height:30vh;}
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
            ico-wizard { z-index:50}
        </style>
       
<iron-pages selected="{{selectedpage}}">
    <!-- Begin home -->
    <div>
        <div class="screen-header">
            <h1>" Uw specialist in styling, restyling en schilderwerk in Gelderland en omstreken "</h1>
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
        
    </div>
    <!-- Einde Home -->
    <!-- Begin Diensten -->
    <section>
        <div class="screen-header">
            <h1>U bent vast benieuwd wat we voor u kunnen betekenen</h1>
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

    <section></section>
    <section>
            <div class="fullscreen">
           
               
                <ico-wizard id="gallery" progressballs showfinish swipeable on-step-changed="_changePhoto">
                <template is="dom-repeat" items="{{portfolio}}" on-dom-change="_updateUI">
                <div step$="{{index}}" class="image" alt$="{{item.title}}" style$='background:url("{{item.photo}}") no-repeat center center;background-size: contain;height:480px;width:100vw;z-index:{{index}};background-color:#303030'></div>
                 </template>
                 <div slot="nocontent">no photos available</div>
                </ico-wizard>

                <!-- image manipulation toolbar -->
                <template is="dom-if" if="{{user.isAdmin}}">
                       <slim-image-control photo="[[selectedPhoto.photo]]" title="" no_undo no_save no_new on-photo-delete="_delete" on-photo-changed="_save" enabled="{{_getItems(portfolio)}}"></slim-image-control>
               </template> 
                
        </div>
    </section>
    <section>
        <slim-photo-page>Photo page loading...</slim-photo-page>
    </section>

</iron-pages>
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
        console.log('s', s);
        this.selectedIndex = s.detail.value;
        this.selectedPhoto = this.portfolio[s.detail.value];
    }
    _getItems(portfolio){
        return portfolio.length;
    }

    _updateUI() { 
        this.$.gallery._setupUI(this.selectedIndex);
        // if (this.selectedIndex)
        //     this.selectedPhoto = this.portfolio[this.selectedIndex];
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

    showLast() {
        this.selectedpage = 3;
        this.selectedIndex = this.portfolio.length -1;
        this.selectedPhoto = this.portfolio[this.selectedIndex];
        this.$.gallery._setupUI(this.selectedIndex);
    }
}



customElements.define('slim-mobile-pages', SlimMobilePages);