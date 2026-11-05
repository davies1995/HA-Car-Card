const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;let o=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=r.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&r.set(i,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const r=1===t.length?t[0]:e.reduce((e,i,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[r+1],t[0]);return new o(r,t,i)},s=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:a,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:h,getOwnPropertySymbols:d,getPrototypeOf:p}=Object,u=globalThis,f=u.trustedTypes,g=f?f.emptyScript:"",m=u.reactiveElementPolyfillSupport,y=(t,e)=>t,_={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!a(t,e),$={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,e);void 0!==r&&l(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){const{get:r,set:o}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:r,set(e){const n=r?.call(this);o?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...h(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(s(t))}else void 0!==t&&e.push(s(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,r)=>{if(e)i.adoptedStyleSheets=r.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of r){const r=document.createElement("style"),o=t.litNonce;void 0!==o&&r.setAttribute("nonce",o),r.textContent=e.cssText,i.appendChild(r)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(void 0!==r&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:_).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,r=i._$Eh.get(t);if(void 0!==r&&this._$Em!==r){const t=i.getPropertyOptions(r),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:_;this._$Em=r;const n=o.fromAttribute(e,t.type);this[r]=n??this._$Ej?.get(r)??n,this._$Em=null}}requestUpdate(t,e,i,r=!1,o){if(void 0!==t){const n=this.constructor;if(!1===r&&(o=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??b)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:r,wrapped:o},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==o||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===r&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,r=this[e];!0!==t||this._$AL.has(e)||void 0===r||this.C(e,void 0,i,r)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[y("elementProperties")]=new Map,w[y("finalized")]=new Map,m?.({ReactiveElement:w}),(u.reactiveElementVersions??=[]).push("2.1.2");const v=globalThis,x=t=>t,A=v.trustedTypes,k=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+S,O=`<${C}>`,M=document,P=()=>M.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,j=Array.isArray,R="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,T=/>/g,z=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,B=/"/g,D=/^(?:script|style|textarea|title)$/i,L=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),F=L(1),V=L(2),W=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),X=new WeakMap,Y=M.createTreeWalker(M,129);function J(t,e){if(!j(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,r=[];let o,n=2===e?"<svg>":3===e?"<math>":"",s=H;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,h=0;for(;h<i.length&&(s.lastIndex=h,l=s.exec(i),null!==l);)h=s.lastIndex,s===H?"!--"===l[1]?s=N:void 0!==l[1]?s=T:void 0!==l[2]?(D.test(l[2])&&(o=RegExp("</"+l[2],"g")),s=z):void 0!==l[3]&&(s=z):s===z?">"===l[0]?(s=o??H,c=-1):void 0===l[1]?c=-2:(c=s.lastIndex-l[2].length,a=l[1],s=void 0===l[3]?z:'"'===l[3]?B:I):s===B||s===I?s=z:s===N||s===T?s=H:(s=z,o=void 0);const d=s===z&&t[e+1].startsWith("/>")?" ":"";n+=s===H?i+O:c>=0?(r.push(a),i.slice(0,c)+E+i.slice(c)+S+d):i+S+(-2===c?e:d)}return[J(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),r]};class Z{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let o=0,n=0;const s=t.length-1,a=this.parts,[l,c]=K(t,e);if(this.el=Z.createElement(l,i),Y.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=Y.nextNode())&&a.length<s;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(E)){const e=c[n++],i=r.getAttribute(t).split(S),s=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:s[2],strings:i,ctor:"."===s[1]?it:"?"===s[1]?rt:"@"===s[1]?ot:et}),r.removeAttribute(t)}else t.startsWith(S)&&(a.push({type:6,index:o}),r.removeAttribute(t));if(D.test(r.tagName)){const t=r.textContent.split(S),e=t.length-1;if(e>0){r.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)r.append(t[i],P()),Y.nextNode(),a.push({type:2,index:++o});r.append(t[e],P())}}}else if(8===r.nodeType)if(r.data===C)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=r.data.indexOf(S,t+1));)a.push({type:7,index:o}),t+=S.length-1}o++}}static createElement(t,e){const i=M.createElement("template");return i.innerHTML=t,i}}function G(t,e,i=t,r){if(e===W)return e;let o=void 0!==r?i._$Co?.[r]:i._$Cl;const n=U(e)?void 0:e._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(t),o._$AT(t,i,r)),void 0!==r?(i._$Co??=[])[r]=o:i._$Cl=o),void 0!==o&&(e=G(t,o._$AS(t,e.values),o,r)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??M).importNode(e,!0);Y.currentNode=r;let o=Y.nextNode(),n=0,s=0,a=i[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new tt(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new nt(o,this,t)),this._$AV.push(e),a=i[++s]}n!==a?.index&&(o=Y.nextNode(),n++)}return Y.currentNode=M,r}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,r){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),U(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>j(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,r="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(e);else{const t=new Q(r,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=X.get(t.strings);return void 0===e&&X.set(t.strings,e=new Z(t)),e}k(t){j(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const o of t)r===e.length?e.push(i=new tt(this.O(P()),this.O(P()),this,this.options)):i=e[r],i._$AI(o),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=x(t).nextSibling;x(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,o){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(t,e=this,i,r){const o=this.strings;let n=!1;if(void 0===o)t=G(this,t,e,0),n=!U(t)||t!==this._$AH&&t!==W,n&&(this._$AH=t);else{const r=t;let s,a;for(t=o[0],s=0;s<o.length-1;s++)a=G(this,r[i+s],e,s),a===W&&(a=this._$AH[s]),n||=!U(a)||a!==this._$AH[s],a===q?t=q:t!==q&&(t+=(a??"")+o[s+1]),this._$AH[s]=a}n&&!r&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class it extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class rt extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class ot extends et{constructor(t,e,i,r,o){super(t,e,i,r,o),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??q)===W)return;const i=this._$AH,r=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==q&&(i===q||r);r&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const st=v.litHtmlPolyfillSupport;st?.(Z,tt),(v.litHtmlVersions??=[]).push("3.3.3");const at=globalThis;let lt=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const r=i?.renderBefore??e;let o=r._$litPart$;if(void 0===o){const t=i?.renderBefore??null;r._$litPart$=o=new tt(e.insertBefore(P(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}};lt._$litElement$=!0,lt.finalized=!0,at.litElementHydrateSupport?.({LitElement:lt});const ct=at.litElementPolyfillSupport;ct?.({LitElement:lt}),(at.litElementVersions??=[]).push("4.2.2");const ht=1;let dt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};const pt="important",ut=" !"+pt,ft=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends dt{constructor(t){if(super(t),t.type!==ht||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const r=t[i];return null==r?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`},"")}update(t,[e]){const{style:i}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const t of this.ft)null==e[t]&&(this.ft.delete(t),t.includes("-")?i.removeProperty(t):i[t]=null);for(const t in e){const r=e[t];if(null!=r){this.ft.add(t);const e="string"==typeof r&&r.endsWith(ut);t.includes("-")||e?i.setProperty(t,e?r.slice(0,-11):r,e?pt:""):i[t]=r}}return W}}),gt=n`
  :host {
    display: block;
  }

  ha-card {
    padding: 16px;
    position: relative;
    overflow: hidden;
    height: 100%;
    box-sizing: border-box;
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 16px;
    color: var(--primary-text-color);
  }

  .header-title {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }

  .header-title span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .header-title ha-icon {
    color: var(--primary-color);
    --mdc-icon-size: 24px;
  }

  .charge-indicator {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    flex: 0 0 auto;
    font-size: 0.85rem;
    font-weight: 500;
  }

  .charge-indicator.charging {
    color: var(--success-color, var(--green-color, #4caf50));
  }

  .charge-indicator.not-charging {
    color: var(--disabled-text-color, var(--secondary-text-color));
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    gap: 12px;
  }

  .info-box {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
    border-radius: 8px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
    color: inherit;
    font: inherit;
    text-align: left;
  }

  button.info-box {
    appearance: none;
    border: none;
    margin: 0;
    width: 100%;
    cursor: pointer;
  }

  button.info-box:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }

  .info-box ha-icon {
    color: var(--primary-color);
    margin-bottom: 4px;
    --mdc-icon-size: 22px;
  }

  .info-box ha-icon.low {
    color: var(--error-color, var(--state-sensor-battery-low-color, #f44336));
  }

  .info-box ha-icon.medium {
    color: var(--warning-color, var(--state-sensor-battery-medium-color, #ff9800));
  }

  .info-box ha-icon.charging {
    color: var(--success-color, var(--green-color, #4caf50));
  }

  .label {
    font-size: 0.8rem;
    color: var(--secondary-text-color);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .value-container {
    display: flex;
    align-items: baseline;
    gap: 4px;
    min-width: 0;
  }

  .value {
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--primary-text-color);
    overflow-wrap: anywhere;
  }

  .value.location {
    font-size: 1rem;
  }

  .unit {
    font-size: 0.85rem;
    color: var(--secondary-text-color);
  }

  .progress-bar {
    width: 100%;
    height: 6px;
    background-color: var(--divider-color, #e0e0e0);
    border-radius: 3px;
    margin-top: 6px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background-color: var(--primary-color);
    border-radius: 3px;
    transition: width 0.3s ease-in-out;
  }

  .progress-fill.low {
    background-color: var(--error-color, var(--state-sensor-battery-low-color, #f44336));
  }

  .progress-fill.medium {
    background-color: var(--warning-color, var(--state-sensor-battery-medium-color, #ff9800));
  }

  .progress-fill.high {
    background-color: var(--primary-color);
  }

  .progress-fill.charging {
    background-color: var(--success-color, var(--state-sensor-battery-high-color, #4caf50));
  }

  .plan {
    margin: 0 0 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .plan svg {
    width: min(100%, 280px);
    height: auto;
    display: block;
  }

  .body {
    fill: #f7f8fa;
    stroke: #3e474f;
    stroke-width: 2;
    stroke-linejoin: round;
  }

  .hood {
    fill: #eef1f4;
    stroke: #9aa3ab;
    stroke-width: 1;
  }

  .badge {
    fill: #dfe5ea;
    stroke: #6d7780;
    stroke-width: 1;
  }

  .glass,
  .window {
    fill: #c5d8e8;
    stroke: #5f7280;
    stroke-width: 1.4;
    stroke-linejoin: round;
  }

  .window {
    transition: fill 0.2s ease;
  }

  .window.is-open {
    fill: var(--error-color, #e53935);
    stroke: #b71c1c;
  }

  .door-panel {
    fill: #f7f8fa;
    stroke: #3e474f;
    stroke-width: 1.6;
    stroke-linejoin: round;
  }

  .aperture {
    fill: #2c3136;
    stroke: none;
  }

  .boot {
    fill: #f7f8fa;
    stroke: #3e474f;
    stroke-width: 1.6;
    stroke-linejoin: round;
  }

  .boot.is-open {
    fill: var(--warning-color, #fb8c00);
    stroke: #e65100;
  }

  .window.interactive,
  .door-panel.interactive,
  .boot.interactive {
    cursor: pointer;
  }

  .window:focus-visible,
  .door-panel:focus-visible,
  .boot:focus-visible {
    outline: none;
    stroke: var(--primary-color);
    stroke-width: 2.5;
  }

  .roof {
    fill: #6d747c;
    stroke: #555c63;
    stroke-width: 1;
  }

  .wheel rect {
    fill: #2c3136;
  }

  .wheel .rim {
    fill: #a3acb4;
  }

  .mirror {
    fill: #eceff1;
    stroke: #3e474f;
    stroke-width: 1.5;
  }

  .headlight {
    fill: #e7eef3;
    stroke: #90a0aa;
    stroke-width: 1;
    stroke-linejoin: round;
  }

  .headlight.is-open {
    fill: #fff3b0;
    stroke: #e6c85a;
  }

  .headlight.interactive {
    cursor: pointer;
  }

  .taillight {
    fill: #ef9a9a;
    stroke: #c62828;
    stroke-width: 0.75;
  }

  .antenna {
    fill: #4e555c;
  }

  .plan-alert,
  .plan-key {
    margin: 0;
    font-size: 0.85rem;
    text-align: center;
    color: var(--secondary-text-color);
  }

  .plan-alert {
    color: var(--error-color, #e53935);
    font-weight: 600;
  }

  .battery {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    margin-bottom: 12px;
    padding: 12px;
    border: none;
    border-radius: 8px;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
    color: inherit;
    font: inherit;
    text-align: left;
  }

  button.battery {
    cursor: pointer;
  }

  .battery ha-icon {
    --mdc-icon-size: 32px;
    color: var(--primary-color);
  }

  .battery ha-icon.low {
    color: var(--error-color, #f44336);
  }

  .battery ha-icon.medium {
    color: var(--warning-color, #ff9800);
  }

  .battery-copy {
    flex: 1;
    min-width: 0;
  }

  .empty {
    color: var(--secondary-text-color);
    font-size: 0.95rem;
    line-height: 1.4;
  }

  @media (prefers-reduced-motion: reduce) {
    .progress-fill,
    .window {
      transition: none;
    }
  }
`,mt=[{key:"front_left_door_entity",id:"front-left",label:"Front left door",short:"Front left"},{key:"front_right_door_entity",id:"front-right",label:"Front right door",short:"Front right"},{key:"rear_left_door_entity",id:"rear-left",label:"Rear left door",short:"Rear left"},{key:"rear_right_door_entity",id:"rear-right",label:"Rear right door",short:"Rear right"}],yt=[{key:"front_left_window_entity",id:"front-left",label:"Front left window",short:"Front left"},{key:"front_right_window_entity",id:"front-right",label:"Front right window",short:"Front right"},{key:"rear_left_window_entity",id:"rear-left",label:"Rear left window",short:"Rear left"},{key:"rear_right_window_entity",id:"rear-right",label:"Rear right window",short:"Rear right"}],_t={key:"boot_entity",id:"boot",label:"Boot",short:"Boot"},bt={key:"headlights_entity",id:"headlights",label:"Headlights",short:"Headlights"},$t=[{value:"mi",label:"Miles"},{value:"km",label:"Kilometres"}],wt=new Set(["on","open","opened","down","true","yes","opening","closing","ajar","tilted","vent","partial"]),vt=new Set(["off","closed","up","false","no","shut","0"]);function xt(t){if(!t)return!1;const e=String(t.state).trim().toLowerCase();if(["unavailable","unknown","none",""].includes(e))return!1;if(wt.has(e))return!0;if(vt.has(e))return!1;const i=Number(e);return Number.isFinite(i)?i>0:!0===t.attributes?.open}const At=1.609344;function kt(t){const e=String(t??"").trim().toLowerCase();return["mi","mile","miles"].includes(e)?"mi":["km","kilometer","kilometre","kilometers","kilometres"].includes(e)?"km":""}function Et(t){return new Intl.NumberFormat("en-GB",{maximumFractionDigits:0}).format(Math.round(t))}function St(t){return"km"===kt(t)?"km":"mi"}const Ct={"front-left":{hingeX:142,hingeY:168,angle:-64,panel:"108,168 142,168 140,252 106,250",window:"114,182 134,180 133,236 113,234",mirror:{cx:98,cy:186,rx:13,ry:8}},"front-right":{hingeX:178,hingeY:168,angle:64,panel:"178,168 212,168 214,250 180,252",window:"186,180 206,182 207,234 187,236",mirror:{cx:222,cy:186,rx:13,ry:8}},"rear-left":{hingeX:142,hingeY:262,angle:-64,panel:"108,260 142,260 140,346 106,344",window:"114,274 134,272 133,328 113,326"},"rear-right":{hingeX:178,hingeY:262,angle:64,panel:"178,260 212,260 214,344 180,346",window:"186,272 206,274 207,326 187,328"}};function Ot(t,e,i,r,o){const n=t.configured&&Boolean(t.stateObj),s=t.configured?t.stateObj?t.open?r:"closed":"not found":"not configured",a=`${t.label}, ${s}`,l=()=>{n&&o(t.entityId)};return V`
    <polygon
      class="${e} ${t.open?"is-open":""} ${n?"interactive":""}"
      points=${i}
      role=${n?"button":"img"}
      tabindex=${n?"0":q}
      aria-label=${a}
      @click=${l}
      @keydown=${t=>function(t,e){"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),e())}(t,l)}
    >
      <title>${a}</title>
    </polygon>
  `}function Mt(t,e,i,r){const o=Ct[t],n=e[t],s=i[t],a=n.open?`rotate(${o.angle} ${o.hingeX} ${o.hingeY})`:"rotate(0 0 0)";return V`
    <g class="door" transform=${a}>
      ${Ot(n,"door-panel",o.panel,"open",r)}
      ${Ot(s,"window",o.window,"down",r)}
      ${o.mirror?V`<ellipse class="mirror" cx=${o.mirror.cx} cy=${o.mirror.cy} rx=${o.mirror.rx} ry=${o.mirror.ry}></ellipse>`:q}
    </g>
  `}const Pt={hatchback:{id:"hatchback",label:"Hatchback",render:function({doors:t,windows:e,boot:i,headlights:r,summary:o,onSelect:n}){const s=i.open?"translate(0 22)":"translate(0 0)";return V`
    <svg viewBox="0 0 320 540" role="img" aria-label="Top view of the hatchback, front at the top. ${o}">
      <g class="wheel"><rect x="78" y="146" width="30" height="68" rx="14"></rect><rect class="rim" x="85" y="162" width="16" height="36" rx="6"></rect></g>
      <g class="wheel"><rect x="212" y="146" width="30" height="68" rx="14"></rect><rect class="rim" x="219" y="162" width="16" height="36" rx="6"></rect></g>
      <g class="wheel"><rect x="80" y="328" width="30" height="68" rx="14"></rect><rect class="rim" x="87" y="344" width="16" height="36" rx="6"></rect></g>
      <g class="wheel"><rect x="210" y="328" width="30" height="68" rx="14"></rect><rect class="rim" x="217" y="344" width="16" height="36" rx="6"></rect></g>

      <path class="body" d="M132 46c16-16 40-16 56 0l18 28c22 16 34 44 32 74l-4 214c-2 42-16 78-38 96-14 12-58 12-72 0-22-18-36-54-38-96l-4-214c-2-30 10-58 32-74z"></path>
      <polygon class="aperture" points="112,174 138,174 136,248 110,246"></polygon>
      <polygon class="aperture" points="182,174 208,174 210,246 184,248"></polygon>
      <polygon class="aperture" points="112,264 138,264 136,342 110,340"></polygon>
      <polygon class="aperture" points="182,264 208,264 210,340 184,342"></polygon>
      <polygon class="aperture" points="140,404 180,404 174,446 146,446"></polygon>

      ${Mt("front-left",t,e,n)}
      ${Mt("front-right",t,e,n)}
      ${Mt("rear-left",t,e,n)}
      ${Mt("rear-right",t,e,n)}

      <path class="hood" d="M138 72h44l8 34h-60z"></path>
      <ellipse class="badge" cx="160" cy="88" rx="7" ry="7"></ellipse>
      ${Ot(r,"headlight","114,68 136,68 140,86 110,86","on",n)}
      ${Ot(r,"headlight","206,68 184,68 180,86 210,86","on",n)}
      <path class="glass" d="M126 118h68l8 42h-84z"></path>
      <path class="roof" d="M146 176h28v156h-28z"></path>

      <g class="boot-lid" transform=${s}>
        ${Ot(i,"boot","132,400 188,400 180,450 140,450","open",n)}
        <path class="taillight" d="M138 436h16l2 8h-16z"></path>
        <path class="taillight" d="M182 436h-16l-2 8h16z"></path>
      </g>
    </svg>
  `}}};const Ut=["binary_sensor","sensor","cover"];function jt(t,e,i){return{name:t,label:e,helper:i,selector:{entity:{domain:Ut}}}}function Rt(t,e,i){return{name:t,label:e,helper:i,selector:{select:{mode:"dropdown",options:$t}}}}function Ht(t,e){return{type:"expandable",name:"",flatten:!0,title:t,schema:e}}const Nt=[Ht("Vehicle",[{name:"title",label:"Card title",selector:{text:{}}},{name:"car_model",label:"Vehicle plan",helper:"Top-down view drawn on the card. More vehicles can be added here later.",selector:{select:{mode:"dropdown",options:[{value:"hatchback",label:"Hatchback"}]}}}]),Ht("Doors",mt.map(t=>jt(t.key,t.label,"On or open swings this door out. Left and right are the vehicle's own sides, with the front of the plan at the top."))),Ht("Windows",yt.map(t=>jt(t.key,t.label,"On, open, down, or a position above 0 turns this window red, with the door open or shut."))),Ht("Boot",[jt(_t.key,_t.label,"On or open highlights the boot and shows it ajar.")]),Ht("Headlights",[jt(bt.key,bt.label,"On turns both headlights pale yellow.")]),Ht("Battery",[{name:"battery_entity",label:"State of charge",helper:"Battery percentage. The icon changes with the level.",selector:{entity:{domain:["sensor"]}}}]),Ht("Mileage and range",[{name:"mileage_entity",label:"Mileage",helper:"Odometer entity.",selector:{entity:{domain:["sensor"]}}},Rt("mileage_unit","Mileage entity unit","Unit the mileage entity reports."),{name:"range_entity",label:"Range",helper:"Estimated range remaining.",selector:{entity:{domain:["sensor"]}}},Rt("range_unit","Range entity unit","Unit the range entity reports."),Rt("display_unit","Display unit","Mileage and range are converted into this unit.")])],Tt=Object.fromEntries(Nt.flatMap(t=>t.schema).filter(t=>t.helper).map(t=>[t.name,t.helper]));class zt extends lt{static get properties(){return{hass:{attribute:!1},_config:{attribute:!1}}}setConfig(t){if(!t||"object"!=typeof t||Array.isArray(t))throw new Error("Invalid card configuration");this._config={...t}}_computeLabel=t=>t.label||t.name;_computeHelper=t=>Tt[t.name];_valueChanged(t){if(t.stopPropagation(),!this._config||!this.hass||!t.detail?.value)return;const e={...this._config,...t.detail.value};for(const[t,i]of Object.entries(e))""!==i&&null!=i||delete e[t];JSON.stringify(e)!==JSON.stringify(this._config)&&(this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0})))}render(){return this.hass&&this._config?F`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Nt}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:F``}static styles=n`
    :host {
      display: block;
    }

    ha-form {
      display: block;
      padding: 16px;
    }
  `}customElements.get("car-info-card-editor")||customElements.define("car-info-card-editor",zt);const It=new Set(["unavailable","unknown","none",""]);function Bt(t){return"string"==typeof t?t.trim():""}function Dt(t){if(function(t){return!t||It.has(String(t.state).trim().toLowerCase())}(t))return null;const e=Number(t.state);return Number.isFinite(e)?e:null}function Lt(t){if(!t)return"Not found";const e=String(t.state).trim().toLowerCase();return"unavailable"===e?"Unavailable":"unknown"===e||"none"===e||""===e?"Unknown":t.state}function Ft(t,e,i){return kt(t)||function(t){return kt(t?.attributes?.unit_of_measurement)}(e)||kt(i)||"mi"}console.info("%c CAR-INFO-CARD %c 1.3.0 ","color: #fff; background: #03a9f4; font-weight: 700;","color: #03a9f4; background: #fff; font-weight: 700;");class Vt extends lt{static get properties(){return{hass:{attribute:!1},_config:{attribute:!1}}}static get styles(){return gt}static async getConfigElement(){return document.createElement("car-info-card-editor")}static getStubConfig(t){const e=Object.keys(t?.states??{}),i=t=>e.find(e=>t.test(e)),r={title:"My Vehicle",car_model:"hatchback",mileage_unit:"mi",range_unit:"mi",display_unit:"mi"},o=i(/^sensor\..*(battery|soc)/i),n=i(/^sensor\..*(odometer|mileage|total_distance)/i),s=i(/^sensor\..*range/i),a=i(/(boot|trunk|tailgate)/i),l=i(/headlight|main_light|lights/i);o&&(r.battery_entity=o),n&&(r.mileage_entity=n),s&&s!==n&&(r.range_entity=s),a&&(r.boot_entity=a),l&&(r.headlights_entity=l);for(const t of[...mt,...yt]){const i=new RegExp(t.id.replace("-","[-_ ]"),"i"),o=t.key.includes("door")?"door":"window",n=e.find(t=>i.test(t)&&new RegExp(o,"i").test(t));n&&(r[t.key]=n)}return r}setConfig(t){if(!t||"object"!=typeof t||Array.isArray(t))throw new Error("Card configuration must be an object");this._config={title:"My Vehicle",car_model:"hatchback",mileage_unit:"mi",range_unit:"mi",display_unit:"mi",...t}}getCardSize(){return 7}_resolve(t){const e=Bt(t);return e?{configured:!0,entityId:e,stateObj:this.hass?.states?.[e]??null}:{configured:!1,entityId:"",stateObj:null}}_panel(t){const e=this._resolve(this._config[t.key]);return{...t,...e,open:e.configured&&xt(e.stateObj)}}_openMoreInfo(t){if(!t||!this.hass?.states?.[t])return;const e=new Event("hass-more-info",{bubbles:!0,composed:!0});e.detail={entityId:t},this.dispatchEvent(e)}_distance(t,e){const i=this._resolve(this._config[t]),r=kt(this._config.display_unit)||"mi";if(!i.configured)return{...i,text:"",unit:St(r)};const o=Dt(i.stateObj);if(null==o)return{...i,text:Lt(i.stateObj),unit:""};const n=function(t,e,i){const r=kt(e),o=kt(i);return Number.isFinite(t)&&r&&o&&r!==o?"mi"===r&&"km"===o?t*At:t/At:t}(o,Ft(this._config[e],i.stateObj,r),r);return{...i,text:Et(n),unit:St(r)}}_renderDistance(t,e){if(!e.configured)return q;const i=F`
      <span class="label">${t}</span>
      <div class="value-container">
        <span class="value">${e.text}</span>
        ${e.unit?F`<span class="unit">${e.unit}</span>`:q}
      </div>
    `;return e.stateObj?F`
      <button class="info-box" type="button" @click=${()=>this._openMoreInfo(e.entityId)}>
        ${i}
      </button>
    `:F`<div class="info-box">${i}</div>`}_renderBattery(t){if(!t.configured)return q;const e=Dt(t.stateObj),i=null==e?null:Math.min(100,Math.max(0,e)),r=null==i?"":function(t){return t<=15?"low":t<=30?"medium":"high"}(i),o=F`
      <ha-icon class=${r} .icon=${function(t){return Number.isFinite(t)?t<=5?"mdi:battery-outline":t>=95?"mdi:battery":`mdi:battery-${Math.max(10,10*Math.round(t/10))}`:"mdi:battery-unknown"}(e)}></ha-icon>
      <div class="battery-copy">
        <span class="label">Battery</span>
        <div class="value-container">
          <span class="value">${null==i?Lt(t.stateObj):Et(i)}</span>
          ${null==i?q:F`<span class="unit">%</span>`}
        </div>
        ${null==i?q:F`
              <div
                class="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow=${i}
                aria-label="Battery state of charge"
              >
                <div class="progress-fill ${r}" style=${ft({width:`${i}%`})}></div>
              </div>
            `}
      </div>
    `;return t.stateObj?F`
      <button class="battery" type="button" @click=${()=>this._openMoreInfo(t.entityId)}>
        ${o}
      </button>
    `:F`<div class="battery">${o}</div>`}render(){if(!this.hass||!this._config)return F``;const t=Bt(this._config.title)||"My Vehicle",e=Object.fromEntries(mt.map(t=>[t.id,this._panel(t)])),i=Object.fromEntries(yt.map(t=>[t.id,this._panel(t)])),r=this._panel(_t),o=this._panel(bt),n=[...Object.values(e).filter(t=>t.open).map(t=>`${t.short} door open`),...Object.values(i).filter(t=>t.open).map(t=>`${t.short} window down`),...r.open?["Boot open"]:[],...o.open?["Headlights on"]:[]],s=n.length?n.join(", "):"Everything reported is closed",a=(l=this._config.car_model,Pt[l]||Pt.hatchback);var l;const c=this._resolve(this._config.battery_entity),h=this._distance("mileage_entity","mileage_unit"),d=this._distance("range_entity","range_unit"),p=h.configured||d.configured;return F`
      <ha-card>
        <div class="card-header">
          <div class="header-title">
            <span>${t}</span>
          </div>
        </div>
        <figure class="plan">
          ${a.render({doors:e,windows:i,boot:r,headlights:o,summary:s,onSelect:t=>this._openMoreInfo(t)})}
          <figcaption class=${n.length?"plan-alert":"plan-key"}>
            ${n.length?s:"Front is at the top. Open windows turn red."}
          </figcaption>
        </figure>
        ${this._renderBattery(c)}
        ${p?F`<div class="grid-container">${this._renderDistance("Mileage",h)}${this._renderDistance("Range",d)}</div>`:q}
      </ha-card>
    `}}customElements.get("car-info-card")||customElements.define("car-info-card",Vt),window.customCards=window.customCards||[],window.customCards.some(t=>"car-info-card"===t.type)||window.customCards.push({type:"car-info-card",name:"Car Info Card",preview:!0,description:"Top-down vehicle plan with doors, windows, boot, battery, mileage, and range.",documentationURL:"https://github.com/davies1995/HA-Car-Card"});
