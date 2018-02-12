import '/node_modules/@polymer/polymer/polymer.js'
import { Element } from '/node_modules/@polymer/polymer/polymer-element.js'
import { LegacyElementMixin } from '/node_modules/@polymer/polymer/lib/legacy/legacy-element-mixin.js'

const htmlTemplate = `
    <style include="slim-theme">
    :host { z-index: 10;width:100%;display: flex;
        flex-flow: column;
        align-items: flex-end;
    }
    p.dialogp { margin-top:24px;}
    paper-icon-button[disabled] { opacity:0.2 }
    paper-toolbar {width: 100%;background:var(--positive-highlight);opacity:0.9;display: flex;justify-content: space-between;}
    paper-input.reverse { 
        --paper-input-container-input-color:black;
        --paper-input-container-color:black;
        --paper-input-container-invalid-color:red;
        --paper-input-container-input-color: black;}
    .previewcontainer { width:100vw ;display:flex;align-items:center;justify-content:center;height:100vh;}
    .previewcontainer[hidden] { width:0vw ;display:none;align-items:center;justify-content:center;height:100vh;}
   </style>
    <!-- hidden canvas for image manipulation -->
    <input hidden="true" type="file" id="btnpic" accept="image/*" on-change="_loadPhoto">
    <canvas id="canvas" hidden width="0" height="0" style="z-index:111;">hier</canvas> 
    <div class="previewcontainer" hidden$="{{!preview}}">
        <div id="preview" hidden$="{{!preview}}" class="image" style$='background:url("{{photo}}") no-repeat center center;background-size: contain;height:480px;width:100vw;z-index:{{index}};background-color:#303030'></div>
    </div>

    <!-- image manipulation toolbar -->
    <paper-toolbar>
    <paper-icon-button on-tap="_takepicture" slot="top" hidden$="{{no_new}}"   icon="image:camera-alt"></paper-icon-button>
    <paper-icon-button slot="top" icon="undo" on-tap="_undo" disabled$="{{!enabled}}" hidden$="{{no_undo}}"></paper-icon-button>
    <paper-icon-button slot="top" icon="image:rotate-90-degrees-ccw" hidden$="{{no_rotate}}" disabled$="{{!enabled}}"on-tap="_rotate"></paper-icon-button>
    <paper-icon-button slot="top" icon="invert-colors" hidden$="{{no_gray}}"  disabled$="{{!enabled}}" on-tap="_grayscale"></paper-icon-button>
    <paper-icon-button slot="top" icon="delete" hidden$="{{no_delete}}" disabled$="{{!enabled}}"on-tap="_deleteConfirm"></paper-icon-button>
    <paper-icon-button on-tap="_save" hidden$="{{no_save}}" disabled$="{{!_saveEnabled(enabled,photo)}}" slot="top" icon="save">Foto toevoegen</paper-icon-button>
    </paper-toolbar>
   
    <!-- delete confirmation dialog -->
    <paper-dialog id="modal" modal on-iron-overlay-opened="_patchOverlay">
    <p class="dialogp">Weet u zeker dat u de foto wilt verwijderen? </p>
    <div class="buttons">
        <paper-button dialog-confirm autofocus on-tap="_delete">Ja, verwijder!</paper-button>
        <paper-button dialog-confirm autofocus>Annuleren</paper-button>
    </div>
    </paper-dialog>

    <!-- title  dialog -->
    <paper-dialog id="modalTitle" modal on-iron-overlay-opened="_patchOverlay">
    <p class="dialogp">Geef een titel op voor de foto </p>
    <paper-input class="reverse" id="title" required auto-validate error-message="Verplicht invoeren" label="titel" value="{{title}}"></paper-input>
    <div class="buttons">
        <paper-button dialog-confirm autofocus on-tap="_saveNew">Sla de foto op</paper-button>
        <paper-button dialog-confirm autofocus>Annuleren</paper-button>
    </div>
    </paper-dialog>

`

export class SlimImageControl extends LegacyElementMixin(Element) {
    static get template() { return htmlTemplate; }
    static get properties() {
        return {
            no_new: { type: Boolean, value: false, reflectToAttribute: true },
            no_rotate: { type: Boolean, value: false, reflectToAttribute: true },
            no_undo: { type: Boolean, value: false, reflectToAttribute: true },
            no_gray: { type: Boolean, value: false, reflectToAttribute: true },
            no_delete: { type: Boolean, value: false, reflectToAttribute: true },
            no_save: { type: Boolean, value: false, reflectToAttribute: true },
            enabled: { type: Boolean, value: true, reflectToAttribute: true },
            title: {
                type: String,
                value: ''
            },
            undostack: {
                type: Array,
                value: []
            },
            photo: {
                type: String,
                notify: true,
                observer: '_updateCanvas'
            },
            preview: {
                type: Boolean,
                value: false
            }
        }
    }

    _deleteConfirm() {
        this.$.modal.open();
    }
    _delete() {
        this.set('photo', '');
        this.set('undostack', []);
        this.fire('photo-delete', { photo: this.photo });
    }
    _save() {
        this.dispatchEvent(new CustomEvent('photo-save', { detail: { photo: this.photo }, bubbles: true, composed: true }));
    }
    _saveNew() {
        this.dispatchEvent(new CustomEvent('photo-save', { detail: { photo: { photo: this.$.canvas.toDataURL(), title: this.title } }, bubbles: true, composed: true }));
    }

    _saveEnabled() {
        return this.enabled && this.photo;
    }

    _takepicture() {
        this.$.btnpic.click();
    }
    _updateCanvas() {
        return;
        this.$.preview.hidden = !(this.photo != "" && this.preview);
        if (this.photo != "") {
            // this.set('undostack', []);
            setTimeout(() => {
                // this.$.canvas.getContext("2d").clearRect(0, 0, this.$.canvas.width, this.$.canvas.height);
                var img = document.createElement("img");
                img.onload = () => {
                    this._drawCanvas(img, 1);
                    this.$.preview.src = this.$.canvas.toDataURL();
                };
                img.src = this.photo;

            }, 10);
        }
    }
    _drawCanvas(img, scale) {
        this.$.preview.hidden = !(this.photo != "" && this.preview);
        var ctx = this.$.canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var width = img.width * scale;
        var height = img.height * scale;
        this.$.canvas.width = width;
        this.$.canvas.height = height;
        var ctx = this.$.canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
    }
    _loadPhoto(e) {
        var data = e.target.files[0];
        var reader = new FileReader();
        var img = document.createElement("img");
        reader.onload = function (evt) {
            img.src = reader.result;
            img.onload = () => {
                this._drawCanvas(img, 0.5);
                //this._updatePhoto();
                this.title = "";
                this.$.modalTitle.open();

            }
        }.bind(this);
        reader.readAsDataURL(data);
    }
    _grayscale() {
        if (!this.photo) { return; }
        var myCanvasContext = this.$.canvas.getContext("2d");
        var img = new Image();
        img.onload = () => {
            var imgWidth = img.width;
            var imgHeight = img.height;
            this.$.canvas.width = imgWidth;
            this.$.canvas.height = imgHeight;
            myCanvasContext.drawImage(img, 0, 0);
            var imageData = myCanvasContext.getImageData(0, 0, imgWidth, imgHeight);
            // This loop gets every pixels on the image and
            for (var i = 0; i < imageData.data.length; i += 4) {
                var redPx = imageData.data[i];
                var greenPx = imageData.data[i + 1];
                var bluePx = imageData.data[i + 2];
                var alphaPx = imageData.data[i + 3];
                var greyScale = redPx * .3 + greenPx * .59 + bluePx * .11;
                imageData.data[i] = greyScale;
                imageData.data[i + 1] = greyScale;
                imageData.data[i + 2] = greyScale;
                imageData.data[i + 3] = alphaPx;
            }
            myCanvasContext.putImageData(imageData, 0, 0);
            this._updatePhoto();
        }
        img.src = this.photo;
    }
    _rotate() {
        if (!this.photo) { return; }
        var ctx = this.$.canvas.getContext('2d');
        var img = new Image();
        img.onload = function () { //on image load do the following stuff
            var width = this.$.canvas.width == 0 ? img.width : this.$.canvas.width;
            var height = this.$.canvas.height == 0 ? img.height : this.$.canvas.height;
            this.$.canvas.width = height;
            this.$.canvas.height = width;
            // ctx.save(); //saves the state of canvas
            // translate to center-canvas 
            // the origin [0,0] is now center-canvas
            ctx.translate(this.$.canvas.width / 2, this.$.canvas.height / 2, ); //let's translate
            // roate the canvas by +90% (==Math.PI/2)
            ctx.rotate(Math.PI / 2);
            // draw the signature
            // since images draw from top-left offset the draw by 1/2 width & height
            ctx.drawImage(img, -(this.$.canvas.height / 2), -(this.$.canvas.width / 2), this.$.canvas.height, this.$.canvas.width);
            // un-rotate the canvas by -90% (== -Math.PI/2)
            ctx.rotate(-Math.PI / 2);
            // un-translate the canvas back to origin==top-left canvas
            ctx.translate(-(this.$.canvas.width / 2), -(this.$.canvas.height / 2));

            //ctx.restore(); //restore the state of canvas
            this._updatePhoto();
        }.bind(this);
        img.src = this.photo;
    }
    _updatePhoto() {
        this.push('undostack', this.photo);
        var stack = this.undostack;
        this.set('photo', this.$.canvas.toDataURL());
        this.undostack = stack; // reset the undostack 
        //  console.log('the undostack', this.undostack);
    }
    _undo() {
        if (this.undostack.length > 0) {
            var stack = this.undostack;
            this.set('photo', this.undostack[this.undostack.length - 1]);
            this.undostack = stack; // reset the undostack 
            this.splice('undostack', this.undostack.length - 1, 1);
        }
    }

    _patchOverlay(e) {
        if (e.target.withBackdrop) {
            e.target.parentNode.insertBefore(e.target.backdropElement, e.target);
        }
    }
}

customElements.define('slim-image-control', SlimImageControl);