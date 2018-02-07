import '/node_modules/@polymer/polymer/polymer.js'
import { Element } from '/node_modules/@polymer/polymer/polymer-element.js'


const htmlTemplate = `
<style include="slim-theme">
</style>
<div class="slider-splatters"><h5>Huizen, Tuinen, Alles!</h5></div>`


export class SlimSplatters extends Element {
    static get template() { return htmlTemplate; }
}

customElements.define('slim-splatters', SlimSplatters);