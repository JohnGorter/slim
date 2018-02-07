import '../node_modules/@polymer/polymer/polymer.js'
import '/node_modules/@polymer/iron-pages/iron-pages.js'
import { Element } from '../node_modules/@polymer/polymer/polymer-element.js'

export class SlimCategory extends Element {
    static get properties() {
        return { 
            categories:{
                type:Array,
                notify:true,
                value:["Home", "Diensten", "Tarieven", "Portfolio", "Contact"]
            }
        }
    }
}

customElements.define('slim-category-data', SlimCategory);
