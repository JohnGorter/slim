import '/node_modules/@polymer/polymer/polymer.js'
import { Element } from '/node_modules/@polymer/polymer/polymer-element.js'
import { LegacyElementMixin } from '/node_modules/@polymer/polymer/lib/legacy/legacy-element-mixin.js'


const htmlTemplate = `
        <style>
            h1.title { position:absolute;top:0px;text-align:left;margin-left:20px;align-self:flex-start;width:100vw;height:30px;color:white;z-index:99;font-family:'Roboto', 'Noto';font-size:21px;font-weight:700;text-shadow: 2px 2px black;font-variant-caps: small-caps;}
            h1.details { position:absolute;bottom:50px;text-align:right;padding-right:20px;align-self:flex-end;width:100vw;height:30px;color:white;z-index:99;font-family:tahoma;font-size:12px;font-weight:normal;}
            #container { position:fixed ;display:flex;align-items:flex-start;justify-content:flex-start;flex-flow:column;width:100vw;height:90vh;background-color:#303030}
            .image { position:absolute;-webkit-transform: translate3d(0,0,0);width:100vw;height:80vh;}
            .image.moving {position:absolute;width:100vw;height:500px;opacity:1}
            slim-image-control { bottom:0px;position:fixed;}
        </style>

        <div id="container">
            <!-- LOADING placeholder -->
            <template is="dom-if" if="{{!_isDone(renderedItemCount)}}">
                <img style="position:relative;height:50px;align-self:center;top:25%;" src="./images/loading.svg" />
            </template>
    
            <!-- image gallery container -->
            <template is="dom-repeat" items="{{images}}" rendered-item-count="{{renderedItemCount}}" initialCount="1">
                    <div class="image" alt$="{{item.title}}" style$='background:url("{{item.photo}}") no-repeat center center;background-size: contain;height:480px;width:100vw;z-index:{{index}};background-color:#303030'></div>
            </template>
           
             <!-- image manipulation toolbar -->
             <template is="dom-if" if="{{userprofile.isAdmin}}">
                    <slim-image-control photo="[[selectedPhoto.photo]]" title="" no_undo no_save no_new on-photo-delete="_delete" on-photo-changed="_save"></slim-image-control>
            </template> 

            <h1 class="title" id="title"></h1>
            <h1 class="details" id="details"></h1>
        </div>
`

export class SlimCaroussel extends LegacyElementMixin(Element) {
    static get template() { return htmlTemplate; }
    static get observers() { return ['_getImages(renderedItemCount)'] }
    static get properties() { return {
            key:{
                type:String, 
                value:""
            },
            selectedPhoto:{
                type:Object, 
                value:{},
                notify:true
            },
            images:{
                type:Array, 
                notify:true 
            }
        }
    }
    
    _delete(e){
        e.preventDefault();
        e.stopPropagation();
        this.fire('photo-delete', { photo: this.selectedPhoto});
    }
    ready() {
        super.ready();
        // let repeater finish...
        this.async(() => {
         this.listen(this, 'track', '_track');
        });
    }
    getImages(){
        this.a = [];
        var i = 0;
        const slot = this.shadowRoot.querySelectorAll(".image");
        slot.forEach(function(element) {
            if (element.nodeType == 1) {
                this.a.push(element);
            }
        }, this);
        this.selectedPhoto = this.images[this.images.length-1];
    }
    _getImages(){
        this.getImages();       
        this._updateDetails();     
    }
    _isDone(){
        return this.renderedItemCount != 0;
    }
    sortImages(){
        Array.prototype.slice.call(this.a).sort(function (a, b) {
            return a.style.zIndex > b.style.zIndex;
        });
    }
    addClass(elem, name) {
        if (!elem.classList.contains(name)){
            elem.className += " " + name;
        }
    }
    removeClass(elem, name) {
        elem.className = elem.className.replace(name, '');
    }
    _save(e){
        this.selectedPhoto.photo = e.detail.value;
        this.fire('photo-save', { photo: this.selectedPhoto });
    }
    _track(e){
        var element;
        if (e.path)
            element = e.path[0];
        else
            element = this._getTopMostImage();
        // only track images
        if (element.className.indexOf("image") < 0) return;

        if (e.detail.state == 'start'){
            this.origleft = element.style.left ?  element.style.left :0;
        }
        this.addClass(element, 'moving');
        this.newint = parseInt(this.origleft) + parseInt(e.detail.dx);
        element.style.left = `${this.newint}px`;
        if (e.detail.state == 'end'){
            this.completeGesture(element);
            this.removeClass(element, 'moving');
        }
    }

    completeGesture(elem){
        if (this.player != undefined) return;
        var center = (elem.getBoundingClientRect().width/2) + elem.getBoundingClientRect().left;
        var windowcenter = window.innerWidth /10;
        var elementcenter = (windowcenter * 5) - (elem.getBoundingClientRect().width/2);
        var direction = center < windowcenter ? -400: center > (windowcenter * 9) ? 1400: parseInt((elementcenter - elem.getBoundingClientRect().left));
        this.finishpos = direction == -400? -1: direction == 1400 ? 1 : 0;
        this.player = elem.animate([
            {transform:'translateX(0px)'},
            {transform:'translateX(' + direction + 'px)'}
        ], {
            duration: 400,
            iterations: 1,
            delay: 0,
        });

        this.player.onfinish = () => {
            this.player = undefined;
            var width = elem.getBoundingClientRect().width;
            elem.style.display = 'none';
            elem.style.left = this.finishpos < 0 ? '-400px' : this.finishpos > 0 ? '1400px': ((window.innerWidth/2) - (width/2)) + 'px';
            this.removeClass(elem,'moving');
            if (this.finishpos != 0) {
                this.sortImages();
                for (var i = 0; i < this.a.length; i++)
                {
                    this.a[i].style.zIndex = parseInt(this.a[i].style.zIndex) + 1;
                    this.a[i].style.left = ((window.innerWidth/2) - (width/2)) + 'px';
                }
                elem.style.zIndex = -1;
                var nextelement = this._getTopMostImage();
                this.selectedPhoto = nextelement.__templatizeInstance.item;
            }
            elem.style.display = 'block';
            
            this._updateDetails();
        };
    }
    _dumpInfo(){
        for (var e of a){
            console.log('e' + e.tagName, e.style.zIndex);
        }
    }
    _updateDetails(){
        var e = this._getTopMostImage();
        if (e && e.attributes && e.attributes["alt"]){
            this.$.title.innerHTML = e.attributes["alt"].value;
        } else {
            this.$.title.innerHTML = "";
        }
        this.$.details.innerHTML = "Foto " + (this.a.length - this.a.indexOf(e)) + " van " + this.a.length + "";// + e.attributes["alt"].value;
    }

    _getTopMostImage(){
        // get the highest zindex
        var e = this.a[0];
        for (var i = 1; i < this.a.length; i++)
            if (this.a[i].style.zIndex > e.style.zIndex) e = this.a[i];
        return e;
    }
}
  
customElements.define('slim-image-caroussel', SlimCaroussel);

console.log('image caroussel loaded!');