import '../node_modules/@polymer/polymer/polymer.js'
import { Element } from '../node_modules/@polymer/polymer/polymer-element.js'

const htmlTemplate = `
<style>
    .overlay { z-index:90;position:fixed;bottom:-200px;left:-200px;height:450px;}
    .title { z-index:95;position:fixed;left:-20px;bottom:75px;display:flex;justify-content:center;width:250px;font-size:18px;}

    @media (max-width: 767px) {
        .overlay { position:fixed;bottom:-120px;left:-120px;height:250px;}
        .title { position:fixed;left:12px;bottom:8px;display:flex;justify-content:center;width:90px;font-size:20px}
    }

</style>
<img class="overlay" src$="{{src}}"/>
<div class="title">Huizen, Tuinen, Alles!</div>
`

export class SlimOverlay extends Element {
    static get htmlTemplate(){ return htmlTemplate; }
    static get properties() {
        return {
            src: { type:String }
        }
    }

}

customElements.define('slim-overlay', SlimOverlay);
