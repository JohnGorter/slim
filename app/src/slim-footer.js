import '/node_modules/@polymer/polymer/polymer.js'
import { Element } from '/node_modules/@polymer/polymer/polymer-element.js'

const htmlTemplate = `
    <style include="slim-theme"> </style>
    <section id="footer">
    <div class="footer-content">
        <div class="footer-contact">
            <h1>Neem contact op</h1>
                <ul>
                    <li>Gerald van Dongen</li>
                    <li>+31 (0)6 101 517 41</li>
                    <li>info@s-l-i-m.nl</li>
                </ul>
        </div>

        <div class="footer-menu">
                <ul>
                    <li><a href="#">Sitemap</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">Diensten</a></li>
                </ul>
        </div>
        </div>
    </section>
`

export class SlimFooter extends Element {
    static get template() {
        return htmlTemplate;
    }
}


customElements.define('slim-footer', SlimFooter);