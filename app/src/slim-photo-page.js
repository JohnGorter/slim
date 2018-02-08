import '/node_modules/@polymer/polymer/polymer.js'
import { Element } from '/node_modules/@polymer/polymer/polymer-element.js'
import './slim-image-control.js';

const htmlTemplate = `
    <style>
        img  { fill: white;}
        div.screen {align-self:center;border-radius:7px;margin-top:60px;padding:0px;display:flex;justify-content: flex-start;align-items:center;flex-flow:column;width:80vw;min-width:400px;min-height:40vh;background-color: #303030;}
        div.screen-header { text-shadow:2px 2px 0px #000000; align-self:center;margin-top:30px;padding:20px;display:flex;justify-content: center;align-items:center;flex-flow:column;width:70vw;min-width:300px;min-height:40vh;}
        :root {
            --paper-input-container-invalid-color: red;   
        }

        slim-image-control { position:fixed;bottom:0px;right:0px;height:100vh;}
        #titleinput { position:fixed;bottom:20px;left:20px;z-index:20}
    </style>
    <div class="screen">
        <slim-image-control id="imagecontrol" photo="{{data}}" preview no_rotate no_gray no_undo no_delete  on-photo-save="_save">
    
        </slim-image-control>
        <div hidden$="{{!data}}" style="position:fixed;bottom:10px;left:20px;width:60vw;" id="titleinput"><paper-input id="title" required auto-validate error-message="Verplicht invoeren" label="Voeg een titel toe aan de foto" value="{{title}}"></paper-input></div>
       
        
        <template is="dom-if" if="{{!_hasImage(data)}}">
            <div class="screen-header">
                <h2>Maak een foto door op het camera icoon
                te drukken. Geef de foto een titel en sla 
                de foto vervolgens op door op het diskette 
                icoon te drukken.</h2>
            </div>
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
