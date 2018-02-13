import '/node_modules/@polymer/polymer/polymer.js'
import { Element } from '/node_modules/@polymer/polymer/polymer-element.js'
import './slim-splatter.js'


const htmlTemplate = `
<style include="slim-theme">
</style>

<section id="slider" name="home"></section>

<section id="content">
<div class="content-2">
    <h1>Welkom bij S-L-I-M</h1>
    <p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
        otam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit. </p>
        <div><a class= "btn-primary" href="#">Ik wil contact opnemen</a></div>
        <div><a class= "text-link" href="#">meer informatie</a></div>
        </div>
</section>

<section id="diensten" name="diensten">
        <div class="text-center"> <h2> Waarmee kunnen wij u van dienst zijn? </h2> </div>
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

<section id="testimonials" name="testimonals">
    <div class= "quote">
        <p>Met oog voor detail. Zo kan ik het afgeleverde werk van 
S-L-I-M beschrijven. Niet alleen ons buitenschilderwerk werd professioneel onder handen genomen, ook de binnenkant van de kozijnen werd vakkundig afgewerkt. Ik ben erg tevreden met het resultaat! </p>
        <div><a class= "btn-primary" href="#">Ik wil contact opnemen</a></div>
    </div> 
</section>

<section id="tarieven" name="tarieven">
    <div class="content-block-1">
    <h2>Hier onder vind je de prijzen die wij momenteel hanteren.</h2>
    <p> Prijzen voor onze diensten, vraag direct een offerte aan.</p>
    </div>
    <div class="pricing-content">
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
    </div>
</section>

<section id="testimonials" name="portfolio">
    <div class= "quote">
        <p>Met oog voor detail. Zo kan ik het afgeleverde werk van 
S-L-I-M beschrijven. Niet alleen ons buitenschilderwerk werd professioneel onder handen genomen, ook de binnenkant van de kozijnen werd vakkundig afgewerkt. Ik ben erg tevreden met het resultaat! </p>
        <div><a class= "btn-primary" href="#">Ik wil contact opnemen</a></div>
    </div>
</section>

<section id="contact" name="contact">
    <div class="content-block-1">
        <h2>Contact</h2>
        <p>U hoeft enkel uw telefoonnummer en naam achter te laten en wij bellen u zo snel mogelijk terug!</p>
        </div>
        <div class="content-block-1">
        <paper-input class="reverse" id="title" required auto-validate label="Telefoonnummer" placeholder="0653350661" value="{{title}}"></paper-input>
         <paper-input class="reverse" id="title" required auto-validate label="Telefoonnummer" placeholder="0653350661" value="{{title}}"></paper-input>
         <paper-button class="btn-secondary" role="button" tabindex="0" animated="" elevation="0" aria-disabled="false">Bel mij</paper-button>
         </div>
</section>
<slim-splatters>no splatters</slim-splatters>
<slim-footer></slim-footer>
`

export class SlimDesktopPages extends Element {
    static get template() { return htmlTemplate; }
    scrollTo(name){
        var element = this.shadowRoot.querySelector("section[name=" + name + "]")
        if (element) element.scrollIntoView();
    }
}

customElements.define('slim-desktop-pages', SlimDesktopPages);
