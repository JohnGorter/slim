import '/node_modules/@polymer/polymer/polymer.js'
import { Element } from '/node_modules/@polymer/polymer/polymer-element.js'

const htmlTemplate = `
    <section id="footer">
        <div class="md-2">
            <h1>Neem contact op</h1>
                <ul>
                    <li>Gerald van Dongen</li>
                    <li>+31 (0)6 101 517 41</li>
                    <li>info@s-l-i-m.nl</li>
                </ul>
        </div>
        <div class="social md-4">
                <ul>
                    <li><i class="fa fa-facebook fa-2x" aria-hidden="true"></i></li>
                    <li><i class="fa fa-linkedin fa-2x" aria-hidden="true"></i></li>
                    <li><i class="fa fa-youtube fa-2x" aria-hidden="true"></i></li>
                </ul>
        </div>
        <div class="md-2 footer-menu">
                <ul>
                    <li><a href="#">Sitemap</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">Diensten</a></li>
                </ul>
        </div>
    </section>
`

export class SlimFooter extends Element {
    static get template() {
        return htmlTemplate;
    }
}


customElements.define('slim-footer', SlimFooter);