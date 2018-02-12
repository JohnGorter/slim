import '../node_modules/@polymer/polymer/polymer.js'
import { Element } from '../node_modules/@polymer/polymer/polymer-element.js'


// custom style for pallete definition
const htmlTemplate = `
    <custom-style>
        <style>
            html { overscroll-behavior:none;overflow: hidden;height: 100%;}
            body { user-select: none;margin:0px;background-color:var(--background-color); font-family: 'Roboto', 'Noto';height: 100%; overflow: auto;}
            :root { 
                --dark-primary-color:#0A324E; 
                --default-primary-color:#136872;
                --light-primary-color: #ECECEC; 
                --text-primary-color: #FFFFFF; 
                --accent-color: #18C29C; 
                --primary-text-color: #000; 
                --secondary-text-color: #136872; 
                --divider-color: #BDBDBD;
                --background-color: #303030;
                --main-background-color:transparent;  
                --main-card-color: #fff;  
            }
        </style>
    </custom-style>
`

const div = document.createElement("div");
div.hidden = true; 
div.innerHTML = htmlTemplate; 
document.body.appendChild(div); 

// shared style for inclusion in shadow dom
const htmlSharedTemplate = `
<dom-module id="slim-theme">
    <template>
        <style>
              :root {
        --font-color-primary:       #fff;
        --font-color-secondary:     #000;
        --positive-highlight:       #BFC218;
        --primary-background-color: #fff;  
        --error-color: red;  
        --paper-dialog-color: #303030;   
           
        }

            h1 {
                margin-bottom: 10px;
                font-size: 48px;   
                font-weight: 200;
            }

            h2{
                margin-bottom: 10px;
                font-size: 24px;   
                font-weight: 200;
            }

            h3 {
                margin-bottom: 10px;
                font-size: 18px;   
                font-weight: 500;
            }

            h5 {
                font-size: 28px;
                font-weight: 600;
            }


            .full-height{
    height:100%;
}
/* Navbar */

#navbar {
    width: 100%;
    height: 89px;
    background-color: #232323;
    margin: 0;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    display: flex;
}

.navbar-logo {
    height: 110px;
    width: 75.0%;
    margin: 5px 0px 0px 75px;
}

.navbar-menu {
    height: 89px;
    width: 100vw;
    display: inline-block;
}

.navbar-menu ul {
    list-style-type: none;
    height: 89px; 
    position: auto; 
    overflow: auto;
    margin: 38px 0px 0px 0px;
    float: right;
}

.navbar-menu li{
    display: inline;
}

.navbar-menu li a{
    color: #f1f1f1;
    text-decoration: none;
    font-size: 14px;
    margin: 0px 40px 0px 0px;
}

.navbar-menu li a:hover{
    color: #BFC218;
    text-decoration: none;
}

.navbar-container{
    display: inline-flex;
}

            /* Slider */
            #header {
                background: #333333;
                width:100%;
            }

            /* Content */
            .slider-splatters{
                background: url(/images/header-splatters.svg) no-repeat;
                height: 550px;
                width: 700px;
                
                position:absolute;
                bottom:-350px;
                left:-180px;
               
            }
            .slider-splatters h5 { margin-left:200px;margin-top:135px;}

#slider{
    background: url(/images/bg.jpg) no-repeat center center fixed;
    height:100%;
    top:22px;
    position: relative; 
    z-index: -1;
}



            

      #content {
    background-color:none;
    margin: 150px;
    text-align:center;
}

           
.btn-primary{
    color: #fff;
    text-decoration: none;
    background-color:#BFC218;
    padding: 15px 25px 15px 25px;
    border-radius: 5px;
    font-size: 14px;
    display: inline-block;
    margin-top: 25px;
    font-weight: 700;
    text-align: center;
} 

.text-link {
    color: #fff;
}

#content p{
    line-height: 1.9;
}

p { margin:0px;}


            #content p{
                line-height: 1.9;
            }

            /* Diensten */

            #diensten {
                background: #232323;
                width: 100%;
                padding-top: 100px;
                padding-bottom: 100px;
            }

            .diensten-container{
                display: flex;flex-flow:wrap;justify-content: center;
            }

            .center {
                margin: auto;
                width: 75%;
            }

            .full-height{
                height:100%;
            }

           

.text-center {
    text-align: center;
}

.text-card {
    width: 220px;
    height: 300px;
    background:#fff;
    color: #333;
    margin:20px 20px 20px 20px;
    border-radius: 15px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.text-card:hover {
    background:#BFC218;
    color: #fff;
}

.splatter{
    display: none;
    background: url(../images/splatter.svg)no-repeat;
    margin-top: -20px;
    margin-left: -30px;
    width: 75px;
    height: 75px;
    position: absolute;
}
    
.text-card-top img{
    width:100%;
    border-radius: 15px 15px 0px 0px;
}

.text-card:hover .splatter {
    display: block;
}

.text-card-bottom{
    padding: 20px;
}

/* Testimonials */

#testimonials{
    background: url(/images/bg-testimonial.jpg) no-repeat center center;
    background-size:cover;
    height: 800px;
    display: flex;
    justify-content: flex-end;
}

.quote {
       background: url(/images/stripes.svg)no-repeat;
       height: 300px;
       width: 760px;
       padding: 90px 80px 100px 100px;
}

/* Footer */

  #footer {
    background-color: #232323;
    padding: 67px;
    display: flex;
    justify-content: flex-end;
    }

    .footer-content{
        display:flex;
        justify-content:space-between;
        max-width: 500px;
        flex-wrap: wrap;
    }

    @media only screen and (max-width: 500px) {
        .footer-content{
            justify-content: center;
        }
}

    #footer a {
        color: #fff;
        text-decoration: none;
    }

    #footer h1 {
        font-size: 20px;
        font-weight: 600;
    }

    #footer .social ul li { 
        display: inline; 
        margin: 0px 20px 0px 20px;    
    }

    #footer ul {
        font-size: 16px;
        font-weight: 100;
        list-style-type: none;
    }

    .footer-contact{
        min-width:300px;
        flex-wrap:wrap
    }

    .footer-menu {
        line-height: 2.5;
        min-width: 300px;
        flex-wrap:wrap
    }


            .toolbar {
                        height:100px;
                    }

            .menu-btn { display:none}

            app-header {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                background-color: var(--app-toolbar-background, white);
            }
            
      app-drawer {
        --app-drawer-content-container: {
          background-color: var(--app-toolbar-background, white);
        }
      }
      
        paper-listbox {
            --paper-listbox-background-color:var(--app-toolbar-background-light, white);
            --paper-listbox-color:var(--app-primary-color, white);
        }

        paper-dialog p { color:#303030;}

        .toolbar { height:0px;  }



            /* small screen */
                @media (max-width: 767px) {
                    :host {
                    padding-top: 64px;
                    }
                    .menu-btn {
                    display: block;
                    }
                    :host([page=detail]) .menu-btn {
                    display: none;
                    }
                    .navbar-menu {
                        display:none
                    }

                    .toolbar {
                        height:60px;
                    }
                    .navbar-logo {
                        height:40px; align-self:flex-center;margin:0px;
                    }
                    app-header {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height:60px;
                        background-color: var(--app-toolbar-background, white);
                    }
                }

                .call-me-form{
                    width: 300px;
                    justify-content: center;
                }



                /* @media (max-width: 425px) {
                            .navbar-logo {
                                        height:40px; align-self:flex-end;
                            }
                    } */

            :root { 

                --primary-text-color:white;
                --secondary-text-color:white;

                --app-toolbar-background:#303030;
                --app-toolbar-background-light:#303030;
                --paper-toolbar-background:#303030;

                --paper-input-container-color: var(--primary-text-color);
                --paper-input-container-focus-color: var(--primary-text-color);
                --paper-input-container-invalid-color: var(--primary-text-color);
                --paper-input-container-input-color: var(--primary-text-color);

            
            }


            </style>
    </template>
</dom-module>
`
const divShared = document.createElement("div");
divShared.hidden = true; 
divShared.innerHTML = htmlSharedTemplate; 
document.body.appendChild(divShared); 

