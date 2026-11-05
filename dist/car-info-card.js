const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=new WeakMap;let r=class{constructor(t,e,n){if(this._$cssResult$=!0,n!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=n.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n.set(i,t))}return t}toString(){return this.cssText}};const s=(t,...e)=>{const n=1===t.length?t[0]:e.reduce((e,i,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1],t[0]);return new r(n,t,i)},o=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:a,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:h,getOwnPropertySymbols:d,getPrototypeOf:p}=Object,u=globalThis,f=u.trustedTypes,g=f?f.emptyScript:"",_=u.reactiveElementPolyfillSupport,m=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>!a(t,e),b={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(t,i,e);void 0!==n&&l(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){const{get:n,set:r}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:n,set(e){const s=n?.call(this);r?.call(this,e),this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const t=this.properties,e=[...h(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,n)=>{if(e)i.adoptedStyleSheets=n.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of n){const n=document.createElement("style"),r=t.litNonce;void 0!==r&&n.setAttribute("nonce",r),n.textContent=e.cssText,i.appendChild(n)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(void 0!==n&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(n):this.setAttribute(n,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,n=i._$Eh.get(t);if(void 0!==n&&this._$Em!==n){const t=i.getPropertyOptions(n),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=n;const s=r.fromAttribute(e,t.type);this[n]=s??this._$Ej?.get(n)??s,this._$Em=null}}requestUpdate(t,e,i,n=!1,r){if(void 0!==t){const s=this.constructor;if(!1===n&&(r=this[t]),i??=s.getPropertyOptions(t),!((i.hasChanged??$)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:n,wrapped:r},s){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),!0!==r||void 0!==s)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===n&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,n=this[e];!0!==t||this._$AL.has(e)||void 0===n||this.C(e,void 0,i,n)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[m("elementProperties")]=new Map,w[m("finalized")]=new Map,_?.({ReactiveElement:w}),(u.reactiveElementVersions??=[]).push("2.1.2");const v=globalThis,A=t=>t,x=v.trustedTypes,E=x?x.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+C,O=`<${k}>`,M=document,P=()=>M.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,H=Array.isArray,j="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,z=/>/g,T=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,I=/"/g,B=/^(?:script|style|textarea|title)$/i,D=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),W=D(1),V=D(2),F=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),J=new WeakMap,Z=M.createTreeWalker(M,129);function K(t,e){if(!H(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const G=(t,e)=>{const i=t.length-1,n=[];let r,s=2===e?"<svg>":3===e?"<math>":"",o=N;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,h=0;for(;h<i.length&&(o.lastIndex=h,l=o.exec(i),null!==l);)h=o.lastIndex,o===N?"!--"===l[1]?o=R:void 0!==l[1]?o=z:void 0!==l[2]?(B.test(l[2])&&(r=RegExp("</"+l[2],"g")),o=T):void 0!==l[3]&&(o=T):o===T?">"===l[0]?(o=r??N,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?T:'"'===l[3]?I:L):o===I||o===L?o=T:o===R||o===z?o=N:(o=T,r=void 0);const d=o===T&&t[e+1].startsWith("/>")?" ":"";s+=o===N?i+O:c>=0?(n.push(a),i.slice(0,c)+S+i.slice(c)+C+d):i+C+(-2===c?e:d)}return[K(t,s+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),n]};class Q{constructor({strings:t,_$litType$:e},i){let n;this.parts=[];let r=0,s=0;const o=t.length-1,a=this.parts,[l,c]=G(t,e);if(this.el=Q.createElement(l,i),Z.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(n=Z.nextNode())&&a.length<o;){if(1===n.nodeType){if(n.hasAttributes())for(const t of n.getAttributeNames())if(t.endsWith(S)){const e=c[s++],i=n.getAttribute(t).split(C),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:o[2],strings:i,ctor:"."===o[1]?it:"?"===o[1]?nt:"@"===o[1]?rt:et}),n.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:r}),n.removeAttribute(t));if(B.test(n.tagName)){const t=n.textContent.split(C),e=t.length-1;if(e>0){n.textContent=x?x.emptyScript:"";for(let i=0;i<e;i++)n.append(t[i],P()),Z.nextNode(),a.push({type:2,index:++r});n.append(t[e],P())}}}else if(8===n.nodeType)if(n.data===k)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=n.data.indexOf(C,t+1));)a.push({type:7,index:r}),t+=C.length-1}r++}}static createElement(t,e){const i=M.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,n){if(e===F)return e;let r=void 0!==n?i._$Co?.[n]:i._$Cl;const s=U(e)?void 0:e._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),void 0===s?r=void 0:(r=new s(t),r._$AT(t,i,n)),void 0!==n?(i._$Co??=[])[n]=r:i._$Cl=r),void 0!==r&&(e=X(t,r._$AS(t,e.values),r,n)),e}class Y{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,n=(t?.creationScope??M).importNode(e,!0);Z.currentNode=n;let r=Z.nextNode(),s=0,o=0,a=i[0];for(;void 0!==a;){if(s===a.index){let e;2===a.type?e=new tt(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new st(r,this,t)),this._$AV.push(e),a=i[++o]}s!==a?.index&&(r=Z.nextNode(),s++)}return Z.currentNode=M,n}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,n){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),U(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>H(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,n="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Q.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(e);else{const t=new Y(n,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=J.get(t.strings);return void 0===e&&J.set(t.strings,e=new Q(t)),e}k(t){H(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,n=0;for(const r of t)n===e.length?e.push(i=new tt(this.O(P()),this.O(P()),this,this.options)):i=e[n],i._$AI(r),n++;n<e.length&&(this._$AR(i&&i._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,n,r){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(t,e=this,i,n){const r=this.strings;let s=!1;if(void 0===r)t=X(this,t,e,0),s=!U(t)||t!==this._$AH&&t!==F,s&&(this._$AH=t);else{const n=t;let o,a;for(t=r[0],o=0;o<r.length-1;o++)a=X(this,n[i+o],e,o),a===F&&(a=this._$AH[o]),s||=!U(a)||a!==this._$AH[o],a===q?t=q:t!==q&&(t+=(a??"")+r[o+1]),this._$AH[o]=a}s&&!n&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class it extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class nt extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class rt extends et{constructor(t,e,i,n,r){super(t,e,i,n,r),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??q)===F)return;const i=this._$AH,n=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==q&&(i===q||n);n&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const ot=v.litHtmlPolyfillSupport;ot?.(Q,tt),(v.litHtmlVersions??=[]).push("3.3.3");const at=globalThis;let lt=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const n=i?.renderBefore??e;let r=n._$litPart$;if(void 0===r){const t=i?.renderBefore??null;n._$litPart$=r=new tt(e.insertBefore(P(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}};lt._$litElement$=!0,lt.finalized=!0,at.litElementHydrateSupport?.({LitElement:lt});const ct=at.litElementPolyfillSupport;ct?.({LitElement:lt}),(at.litElementVersions??=[]).push("4.2.2");const ht=1;let dt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};const pt="important",ut=" !"+pt,ft=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends dt{constructor(t){if(super(t),t.type!==ht||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const n=t[i];return null==n?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${n};`},"")}update(t,[e]){const{style:i}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const t of this.ft)null==e[t]&&(this.ft.delete(t),t.includes("-")?i.removeProperty(t):i[t]=null);for(const t in e){const n=e[t];if(null!=n){this.ft.add(t);const e="string"==typeof n&&n.endsWith(ut);t.includes("-")||e?i.setProperty(t,e?n.slice(0,-11):n,e?pt:""):i[t]=n}}return F}}),gt=s`
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
    width: min(100%, 220px);
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

  .window.open {
    fill: var(--error-color, #e53935);
    stroke: #b71c1c;
  }

  .window.interactive {
    cursor: pointer;
  }

  .window:focus-visible {
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
  }

  .taillight {
    fill: #ef9a9a;
    stroke: #c62828;
    stroke-width: 0.75;
  }

  .antenna {
    fill: #4e555c;
  }

  .window-alert,
  .window-key {
    margin: 0;
    font-size: 0.85rem;
    text-align: center;
    color: var(--secondary-text-color);
  }

  .window-alert {
    color: var(--error-color, #e53935);
    font-weight: 600;
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
`,_t=[{key:"front_left_window_entity",id:"front-left",label:"Front left window"},{key:"front_right_window_entity",id:"front-right",label:"Front right window"},{key:"rear_left_window_entity",id:"rear-left",label:"Rear left window"},{key:"rear_right_window_entity",id:"rear-right",label:"Rear right window"}],mt=new Set(["on","open","opened","down","true","yes","opening","closing","ajar","tilted","vent","partial"]),yt=new Set(["off","closed","up","false","no","shut","0"]);function $t(t){if(!t)return!1;const e=String(t.state).trim().toLowerCase();if(["unavailable","unknown","none",""].includes(e))return!1;if(mt.has(e))return!0;if(yt.has(e))return!1;const i=Number(e);return Number.isFinite(i)?i>0:!0===t.attributes?.window_open||!0===t.attributes?.open}function bt(t,e,i){const n=t.configured&&Boolean(t.stateObj),r=function(t){if(!t.configured)return"not configured";if(!t.stateObj)return"not found";const e=String(t.stateObj.state).trim().toLowerCase();return"unavailable"===e?"unavailable":"unknown"===e||"none"===e||""===e?"unknown":t.open?"down":"closed"}(t),s=`${t.label}, ${r}`,o=()=>{n&&i(t.entityId)};return V`
    <polygon
      class="window ${t.open?"open":""} ${n?"interactive":""}"
      points=${e}
      role=${n?"button":"img"}
      tabindex=${n?"0":q}
      aria-label=${s}
      @click=${o}
      @keydown=${t=>function(t,e){"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),e())}(t,o)}
    >
      <title>${s}</title>
    </polygon>
  `}const wt=[{name:"title",label:"Card title",selector:{text:{}}},{name:"car_icon",label:"Header icon",selector:{icon:{}}},{name:"battery_entity",label:"Battery / fuel level",selector:{entity:{domain:["sensor"]}}},{name:"battery_icon",label:"Battery / fuel icon",selector:{icon:{}}},{name:"range_entity",label:"Remaining range",selector:{entity:{domain:["sensor"]}}},{name:"range_icon",label:"Range icon",selector:{icon:{}}},{name:"location_entity",label:"Location",selector:{entity:{domain:["device_tracker","person","sensor"]}}},{name:"location_icon",label:"Location icon",selector:{icon:{}}},{name:"charging_entity",label:"Charging status",selector:{entity:{domain:["binary_sensor","sensor"]}}},{name:"charging_icon",label:"Charging icon",selector:{icon:{}}},{name:"front_left_window_entity",label:"Front left window",selector:{entity:{domain:["binary_sensor","sensor","cover"]}}},{name:"front_right_window_entity",label:"Front right window",selector:{entity:{domain:["binary_sensor","sensor","cover"]}}},{name:"rear_left_window_entity",label:"Rear left window",selector:{entity:{domain:["binary_sensor","sensor","cover"]}}},{name:"rear_right_window_entity",label:"Rear right window",selector:{entity:{domain:["binary_sensor","sensor","cover"]}}}],vt={battery_entity:"Numeric level. A progress bar is shown when the value is a percentage.",battery_icon:"Optional. Leave empty for an automatic battery or charging icon.",range_entity:"Remaining range sensor. The entity's own unit is displayed.",location_entity:"Device tracker, person, or location sensor. home and not_home are shown as Home and Away.",charging_entity:"On, charging, plugged in, or connected is treated as charging.",charging_icon:"Optional icon shown while the vehicle is charging.",front_left_window_entity:"Vehicle's front left, shown on the left of the plan. On, open, or a position above 0 turns that window red.",front_right_window_entity:"Vehicle's front right. On, open, or a position above 0 turns that window red.",rear_left_window_entity:"Vehicle's rear left. On, open, or a position above 0 turns that window red.",rear_right_window_entity:"Vehicle's rear right. On, open, or a position above 0 turns that window red."};class At extends lt{static get properties(){return{hass:{attribute:!1},_config:{attribute:!1}}}setConfig(t){if(!t||"object"!=typeof t||Array.isArray(t))throw new Error("Invalid card configuration");this._config={...t}}_computeLabel=t=>t.label||t.name;_computeHelper=t=>vt[t.name];_valueChanged(t){if(t.stopPropagation(),!this._config||!this.hass||!t.detail?.value)return;const e={...this._config,...t.detail.value};for(const[t,i]of Object.entries(e))""!==i&&null!=i||delete e[t];JSON.stringify(e)!==JSON.stringify(this._config)&&(this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0})))}render(){return this.hass&&this._config?W`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${wt}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:W``}static styles=s`
    :host {
      display: block;
    }

    ha-form {
      display: block;
      padding: 16px;
    }
  `}customElements.get("car-info-card-editor")||customElements.define("car-info-card-editor",At);const xt=new Set(["unavailable","unknown","none",""]),Et=new Set(["on","true","charging","plugged_in","plugged in","connected"]);function St(t){return"string"==typeof t?t.trim():""}function Ct(t){return!t||xt.has(String(t.state).trim().toLowerCase())}function kt(t){if(Ct(t))return!1;const e=String(t.state).trim().toLowerCase();return!!Et.has(e)||!0===t.attributes?.charging}function Ot(t){return String(t).replace(/[_-]+/g," ").trim().replace(/\b\w/g,t=>t.toUpperCase())}function Mt(t){if(!t)return"Not found";const e=String(t.state).trim().toLowerCase();return"unavailable"===e?"Unavailable":"unknown"===e||"none"===e||""===e?"Unknown":t.state}console.info("%c CAR-INFO-CARD %c 1.1.0 ","color: #fff; background: #03a9f4; font-weight: 700;","color: #03a9f4; background: #fff; font-weight: 700;");class Pt extends lt{static get properties(){return{hass:{attribute:!1},_config:{attribute:!1}}}static get styles(){return gt}static async getConfigElement(){return document.createElement("car-info-card-editor")}static getStubConfig(t){const e=t?.states??{},i=Object.keys(e),n=i.find(t=>t.startsWith("sensor.")&&/battery|fuel|soc/i.test(t)),r=i.find(t=>t.startsWith("sensor.")&&/range/i.test(t)&&t!==n),s=i.find(t=>t.startsWith("device_tracker.")||t.startsWith("person.")),o=i.find(t=>/charg/i.test(t)&&(t.startsWith("binary_sensor.")||t.startsWith("sensor."))),a=i.filter(t=>/window/i.test(t)),l=new Set,c={};for(const t of _t){const e=new RegExp(t.id.replace("-","[-_ ]"),"i"),i=a.find(t=>!l.has(t)&&e.test(t));i&&(l.add(i),c[t.key]=i)}return{title:"My Vehicle",car_icon:"mdi:car",...n?{battery_entity:n}:{},...r?{range_entity:r}:{},...s?{location_entity:s}:{},...o?{charging_entity:o}:{},...c}}setConfig(t){if(!t||"object"!=typeof t||Array.isArray(t))throw new Error("Card configuration must be an object");this._config={title:"My Vehicle",car_icon:"mdi:car",...t}}getCardSize(){return 6}_windowModels(){return _t.map(t=>{const e=this._resolve(this._config[t.key]);return{...t,...e,open:e.configured&&$t(e.stateObj)}})}_resolve(t){const e=St(t);return e?{configured:!0,entityId:e,stateObj:this.hass?.states?.[e]??null}:{configured:!1,entityId:"",stateObj:null}}_openMoreInfo(t){if(!t||!this.hass?.states?.[t])return;const e=new Event("hass-more-info",{bubbles:!0,composed:!0});e.detail={entityId:t},this.dispatchEvent(e)}_renderChargingIndicator(t){const e=kt(t),i=function(t){if(!t)return"Not found";const e=String(t.state).trim().toLowerCase();return"unavailable"===e?"Unavailable":"unknown"===e||"none"===e||""===e?"Unknown":kt(t)?"Charging":["off","false","not_charging","not charging","disconnected","unplugged","idle"].includes(e)?"Not charging":Ot(t.state)}(t),n=e?St(this._config.charging_icon)||"mdi:ev-station":"mdi:power-plug-off";return W`
      <span class="charge-indicator ${e?"charging":"not-charging"}" title=${i} role="img" aria-label=${i}>
        <ha-icon .icon=${n}></ha-icon>
        <span>${i}</span>
      </span>
    `}_renderBox(t,e){return t.configured?t.stateObj?W`
      <button class="info-box" type="button" @click=${()=>this._openMoreInfo(t.entityId)}>
        ${e}
      </button>
    `:W`<div class="info-box">${e}</div>`:q}_renderBattery(t,e){const i=St(this._config.battery_icon),n=function(t){if(Ct(t))return null;const e=Number(t.state);return Number.isFinite(e)?e:null}(t.stateObj),r=function(t,e){if(!Number.isFinite(e))return!1;const i=String(t?.attributes?.unit_of_measurement??"").trim().toLowerCase();return"%"===i||"percent"===i||""===i&&e>=0&&e<=100}(t.stateObj,n),s=r?Math.min(100,Math.max(0,n)):null,o=null==s?"":function(t,e){return e?"charging":t<=15?"low":t<=30?"medium":"high"}(s,e),a=i||function(t,e){if(!Number.isFinite(t))return e?"mdi:battery-charging":"mdi:battery";if(t<=5)return e?"mdi:battery-charging-outline":"mdi:battery-outline";if(t>=95)return e?"mdi:battery-charging-100":"mdi:battery";const i=Math.max(10,10*Math.round(t/10));return e?`mdi:battery-charging-${i}`:`mdi:battery-${i}`}(n,e),l=r?t.stateObj?.attributes?.unit_of_measurement||"%":t.stateObj?.attributes?.unit_of_measurement||"";return this._renderBox(t,W`
        <ha-icon class=${o} .icon=${a}></ha-icon>
        <span class="label">Battery / Fuel</span>
        <div class="value-container">
          <span class="value">${Mt(t.stateObj)}</span>
          ${l&&!Ct(t.stateObj)?W`<span class="unit">${l}</span>`:q}
        </div>
        ${null==s?q:W`
              <div
                class="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow=${s}
                aria-label="Battery or fuel level"
              >
                <div class="progress-fill ${o}" style=${ft({width:`${s}%`})}></div>
              </div>
            `}
      `)}_renderRange(t){const e=St(this._config.range_icon)||"mdi:map-marker-distance",i=Ct(t.stateObj)?"":t.stateObj?.attributes?.unit_of_measurement||"";return this._renderBox(t,W`
        <ha-icon .icon=${e}></ha-icon>
        <span class="label">Range</span>
        <div class="value-container">
          <span class="value">${Mt(t.stateObj)}</span>
          ${i?W`<span class="unit">${i}</span>`:q}
        </div>
      `)}_renderLocation(t){const e=St(this._config.location_icon)||"mdi:crosshairs-gps";return this._renderBox(t,W`
        <ha-icon .icon=${e}></ha-icon>
        <span class="label">Location</span>
        <div class="value-container">
          <span class="value location">${function(t){if(!t)return"Not found";const e=String(t.state).trim().toLowerCase();return"home"===e?"Home":"not_home"===e||"not home"===e?"Away":"unavailable"===e?"Unavailable":"unknown"===e||"none"===e||""===e?"Unknown":Ot(t.state)}(t.stateObj)}</span>
        </div>
      `)}render(){if(!this.hass||!this._config)return W``;const t=St(this._config.title)||"My Vehicle",e=St(this._config.car_icon)||"mdi:car",i=this._resolve(this._config.battery_entity),n=this._resolve(this._config.range_entity),r=this._resolve(this._config.location_entity),s=this._resolve(this._config.charging_entity),o=kt(s.stateObj),a=this._windowModels(),l=i.configured||n.configured||r.configured;return W`
      <ha-card>
        <div class="card-header">
          <div class="header-title">
            <ha-icon .icon=${e}></ha-icon>
            <span>${t}</span>
          </div>
          ${s.configured?this._renderChargingIndicator(s.stateObj):q}
        </div>
        ${function(t,e){const i=Object.fromEntries(t.map(t=>[t.id,t])),n=t.filter(t=>t.open).map(t=>t.label.replace(" window","")),r=n.length<2?n[0]||"":2===n.length?`${n[0]} and ${n[1]}`:`${n.slice(0,-1).join(", ")}, and ${n[n.length-1]}`,s=n.length?`${r} ${1===n.length?"is":"are"} down`:"All configured windows are closed";return W`
    <figure class="plan">
      <svg viewBox="0 0 220 400" role="img" aria-label="Top view of the vehicle, front at the top. ${s}">
        <g class="wheel">
          <rect x="6" y="112" width="30" height="64" rx="14"></rect>
          <rect class="rim" x="13" y="126" width="16" height="36" rx="6"></rect>
        </g>
        <g class="wheel">
          <rect x="184" y="112" width="30" height="64" rx="14"></rect>
          <rect class="rim" x="191" y="126" width="16" height="36" rx="6"></rect>
        </g>
        <g class="wheel">
          <rect x="8" y="248" width="30" height="64" rx="14"></rect>
          <rect class="rim" x="15" y="262" width="16" height="36" rx="6"></rect>
        </g>
        <g class="wheel">
          <rect x="182" y="248" width="30" height="64" rx="14"></rect>
          <rect class="rim" x="189" y="262" width="16" height="36" rx="6"></rect>
        </g>

        <path
          class="body"
          d="M78 30c18-14 46-14 64 0l16 26c24 16 36 42 34 74l-4 150c-2 40-14 74-34 94-16 14-76 14-92 0-20-20-32-54-34-94l-4-150c-2-32 10-58 34-74z"
        ></path>
        <path class="hood" d="M86 58h48l10 36H76z"></path>
        <ellipse class="badge" cx="110" cy="74" rx="7" ry="7"></ellipse>
        <path class="headlight" d="M62 58h16l6 16H58z"></path>
        <path class="headlight" d="M158 58h-16l-6 16h26z"></path>
        <path class="glass" d="M72 108h76l12 46H60z"></path>
        <path class="roof" d="M90 164h40v132H90z"></path>
        <path class="glass" d="M76 304h68l-8 34H84z"></path>
        <path class="taillight" d="M58 352h22l4 10H62z"></path>
        <path class="taillight" d="M162 352h-22l-4 10h22z"></path>
        <ellipse class="mirror" cx="18" cy="132" rx="14" ry="9"></ellipse>
        <ellipse class="mirror" cx="202" cy="132" rx="14" ry="9"></ellipse>
        <path class="antenna" d="M146 214h10v8h-10z"></path>

        ${bt(i["front-left"],"50,158 86,154 86,214 48,210",e)}
        ${bt(i["front-right"],"170,158 134,154 134,214 172,210",e)}
        ${bt(i["rear-left"],"48,224 86,220 86,300 46,296",e)}
        ${bt(i["rear-right"],"172,224 134,220 134,300 174,296",e)}
      </svg>
      ${n.length?W`<figcaption class="window-alert">${s}</figcaption>`:W`<figcaption class="window-key">Front is at the top. Open windows turn red.</figcaption>`}
    </figure>
  `}(a,t=>this._openMoreInfo(t))}
        ${l?W`
              <div class="grid-container">
                ${this._renderBattery(i,o)}
                ${this._renderRange(n)}
                ${this._renderLocation(r)}
              </div>
            `:W`<div class="empty">Choose a battery, range, or location entity in the card options.</div>`}
      </ha-card>
    `}}customElements.get("car-info-card")||customElements.define("car-info-card",Pt),window.customCards=window.customCards||[],window.customCards.some(t=>"car-info-card"===t.type)||window.customCards.push({type:"car-info-card",name:"Car Info Card",preview:!0,description:"Displays a vehicle plan, window status, battery or fuel level, range, location, and charging.",documentationURL:"https://github.com/davies1995/HA-Car-Card"});
