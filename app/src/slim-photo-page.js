import '/node_modules/@polymer/polymer/polymer.js'
import { Element } from '/node_modules/@polymer/polymer/polymer-element.js'
import './slim-image-control.js';

const htmlTemplate = `
    <style>
        img  { fill: white;}
        div.screen {align-self:center;border-radius:7px;margin-top:60px;padding:0px;display:flex;justify-content: flex-start;align-items:center;flex-flow:column;width:80vw;min-width:400px;min-height:40vh;background-color: #303030;}

        :root {
            --paper-input-container-invalid-color: red;   
        }

        slim-image-control { position:fixed;bottom:0px;right:0px;height:100vh;}
        #titleinput { position:fixed;bottom:20px;left:20px;z-index:20}
    </style>
    <div class="screen">
        <slim-image-control id="imagecontrol" photo="{{data}}" preview no_rotate no_gray no_undo no_delete  on-photo-save="_save">
        <div hidden$="{{!data}}" slot="title" id="titleinput"><paper-input id="title" required auto-validate error-message="Verplicht invoeren" label="Voeg een titel toe aan de foto" value="{{title}}"></paper-input></div>
        </slim-image-control>
        <br/>
        <br/>
       
        
        <template is="dom-if" if="{{!_hasImage(data)}}">
            <div>Maak een foto door op het camera icoon <br/>
                te drukken. Geef de foto een titel en sla de foto vervolgens op door op het diskette icoon te drukken.</div>
            <!-- div that takes up no space but acts as a container to relative layout the arrows 
            // <div style="position: relative; width: 0; height: 0">
            // <img style="width:50px;height:100px;border:0px solid red;transform:rotateY(180deg);opacity:0.5;position:relative;top:-150px;left:-170px;" src="./images/arrow.svg"  />
            // <img style="width:50px;height:200px;border:0px solid red;opacity:0.5;position:relative;top:-300px;left:120px;" src="./images/arrow.svg"  />
            // </div>  -->
        </template>
        </div>
`
export class SlimPhotoPage extends Element {
    static get template() { return htmlTemplate; }
    static get properties() { 
        return {
            data:{
                type:String, 
                value:''
            }
        }
    }
    _hasImage(){
        return this.data != "";
    }
    _save(e){
        e.stopPropagation(); 
        e.preventDefault();
        

        if (this.$.title.validate())
        {
            var event = new CustomEvent('photo-save', {detail: { photo: { photo: this.data, title:this.title }}, bubbles: true, composed: true});
            this.dispatchEvent( event);
            this.data = "";
        }
    }
}

customElements.define('slim-photo-page', SlimPhotoPage);
