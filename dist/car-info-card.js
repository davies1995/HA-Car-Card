const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let n=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(s,t,i)},o=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:a,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:h,getOwnPropertySymbols:d,getPrototypeOf:u}=Object,p=globalThis,g=p.trustedTypes,f=g?g.emptyScript:"",_=p.reactiveElementPolyfillSupport,m=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!a(t,e),b={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;let v=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);n?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const t=this.properties,e=[...h(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),n=t.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=s;const r=n.fromAttribute(e,t.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(void 0!==t){const r=this.constructor;if(!1===s&&(n=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??y)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==n||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};v.elementStyles=[],v.shadowRootOptions={mode:"open"},v[m("elementProperties")]=new Map,v[m("finalized")]=new Map,_?.({ReactiveElement:v}),(p.reactiveElementVersions??=[]).push("2.1.2");const A=globalThis,w=t=>t,x=A.trustedTypes,E=x?x.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,O="?"+C,P=`<${O}>`,U=document,k=()=>U.createComment(""),M=t=>null===t||"object"!=typeof t&&"function"!=typeof t,N=Array.isArray,H="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,j=/-->/g,T=/>/g,L=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),z=/'/g,I=/"/g,B=/^(?:script|style|textarea|title)$/i,D=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),W=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),q=new WeakMap,F=U.createTreeWalker(U,129);function J(t,e){if(!N(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const Z=(t,e)=>{const i=t.length-1,s=[];let n,r=2===e?"<svg>":3===e?"<math>":"",o=R;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,h=0;for(;h<i.length&&(o.lastIndex=h,c=o.exec(i),null!==c);)h=o.lastIndex,o===R?"!--"===c[1]?o=j:void 0!==c[1]?o=T:void 0!==c[2]?(B.test(c[2])&&(n=RegExp("</"+c[2],"g")),o=L):void 0!==c[3]&&(o=L):o===L?">"===c[0]?(o=n??R,l=-1):void 0===c[1]?l=-2:(l=o.lastIndex-c[2].length,a=c[1],o=void 0===c[3]?L:'"'===c[3]?I:z):o===I||o===z?o=L:o===j||o===T?o=R:(o=L,n=void 0);const d=o===L&&t[e+1].startsWith("/>")?" ":"";r+=o===R?i+P:l>=0?(s.push(a),i.slice(0,l)+S+i.slice(l)+C+d):i+C+(-2===l?e:d)}return[J(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class K{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,r=0;const o=t.length-1,a=this.parts,[c,l]=Z(t,e);if(this.el=K.createElement(c,i),F.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=F.nextNode())&&a.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=l[r++],i=s.getAttribute(t).split(C),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:o[2],strings:i,ctor:"."===o[1]?tt:"?"===o[1]?et:"@"===o[1]?it:Y}),s.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:n}),s.removeAttribute(t));if(B.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=x?x.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],k()),F.nextNode(),a.push({type:2,index:++n});s.append(t[e],k())}}}else if(8===s.nodeType)if(s.data===O)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)a.push({type:7,index:n}),t+=C.length-1}n++}}static createElement(t,e){const i=U.createElement("template");return i.innerHTML=t,i}}function G(t,e,i=t,s){if(e===W)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const r=M(e)?void 0:e._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),void 0===r?n=void 0:(n=new r(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=G(t,n._$AS(t,e.values),n,s)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??U).importNode(e,!0);F.currentNode=s;let n=F.nextNode(),r=0,o=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new X(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new st(n,this,t)),this._$AV.push(e),a=i[++o]}r!==a?.index&&(n=F.nextNode(),r++)}return F.currentNode=U,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),M(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>N(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(U.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=K.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Q(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new K(t)),e}k(t){N(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new X(this.O(k()),this.O(k()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Y{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,s){const n=this.strings;let r=!1;if(void 0===n)t=G(this,t,e,0),r=!M(t)||t!==this._$AH&&t!==W,r&&(this._$AH=t);else{const s=t;let o,a;for(t=n[0],o=0;o<n.length-1;o++)a=G(this,s[i+o],e,o),a===W&&(a=this._$AH[o]),r||=!M(a)||a!==this._$AH[o],a===V?t=V:t!==V&&(t+=(a??"")+n[o+1]),this._$AH[o]=a}r&&!s&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Y{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class et extends Y{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class it extends Y{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??V)===W)return;const i=this._$AH,s=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==V&&(i===V||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const nt=A.litHtmlPolyfillSupport;nt?.(K,X),(A.litHtmlVersions??=[]).push("3.3.3");const rt=globalThis;let ot=class extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new X(e.insertBefore(k(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}};ot._$litElement$=!0,ot.finalized=!0,rt.litElementHydrateSupport?.({LitElement:ot});const at=rt.litElementPolyfillSupport;at?.({LitElement:ot}),(rt.litElementVersions??=[]).push("4.2.2");const ct=1;let lt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};const ht="important",dt=" !"+ht,ut=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends lt{constructor(t){if(super(t),t.type!==ct||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const s=t[i];return null==s?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(t,[e]){const{style:i}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const t of this.ft)null==e[t]&&(this.ft.delete(t),t.includes("-")?i.removeProperty(t):i[t]=null);for(const t in e){const s=e[t];if(null!=s){this.ft.add(t);const e="string"==typeof s&&s.endsWith(dt);t.includes("-")||e?i.setProperty(t,e?s.slice(0,-11):s,e?ht:""):i[t]=s}}return W}}),pt=r`
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

  .empty {
    color: var(--secondary-text-color);
    font-size: 0.95rem;
    line-height: 1.4;
  }

  @media (prefers-reduced-motion: reduce) {
    .progress-fill {
      transition: none;
    }
  }
`,gt=[{name:"title",label:"Card title",selector:{text:{}}},{name:"car_icon",label:"Header icon",selector:{icon:{}}},{name:"battery_entity",label:"Battery / fuel level",selector:{entity:{domain:["sensor"]}}},{name:"battery_icon",label:"Battery / fuel icon",selector:{icon:{}}},{name:"range_entity",label:"Remaining range",selector:{entity:{domain:["sensor"]}}},{name:"range_icon",label:"Range icon",selector:{icon:{}}},{name:"location_entity",label:"Location",selector:{entity:{domain:["device_tracker","person","sensor"]}}},{name:"location_icon",label:"Location icon",selector:{icon:{}}},{name:"charging_entity",label:"Charging status",selector:{entity:{domain:["binary_sensor","sensor"]}}},{name:"charging_icon",label:"Charging icon",selector:{icon:{}}}],ft={battery_entity:"Numeric level. A progress bar is shown when the value is a percentage.",battery_icon:"Optional. Leave empty for an automatic battery or charging icon.",range_entity:"Remaining range sensor. The entity's own unit is displayed.",location_entity:"Device tracker, person, or location sensor. home and not_home are shown as Home and Away.",charging_entity:"On, charging, plugged in, or connected is treated as charging.",charging_icon:"Optional icon shown while the vehicle is charging."};class _t extends ot{static get properties(){return{hass:{attribute:!1},_config:{attribute:!1}}}setConfig(t){if(!t||"object"!=typeof t||Array.isArray(t))throw new Error("Invalid card configuration");this._config={...t}}_computeLabel=t=>t.label||t.name;_computeHelper=t=>ft[t.name];_valueChanged(t){if(t.stopPropagation(),!this._config||!this.hass||!t.detail?.value)return;const e={...this._config,...t.detail.value};for(const[t,i]of Object.entries(e))""!==i&&null!=i||delete e[t];JSON.stringify(e)!==JSON.stringify(this._config)&&(this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0})))}render(){return this.hass&&this._config?D`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${gt}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:D``}static styles=r`
    :host {
      display: block;
    }

    ha-form {
      display: block;
      padding: 16px;
    }
  `}customElements.get("car-info-card-editor")||customElements.define("car-info-card-editor",_t);const mt=new Set(["unavailable","unknown","none",""]),$t=new Set(["on","true","charging","plugged_in","plugged in","connected"]);function yt(t){return"string"==typeof t?t.trim():""}function bt(t){return!t||mt.has(String(t.state).trim().toLowerCase())}function vt(t){if(bt(t))return!1;const e=String(t.state).trim().toLowerCase();return!!$t.has(e)||!0===t.attributes?.charging}function At(t){return String(t).replace(/[_-]+/g," ").trim().replace(/\b\w/g,t=>t.toUpperCase())}function wt(t){if(!t)return"Not found";const e=String(t.state).trim().toLowerCase();return"unavailable"===e?"Unavailable":"unknown"===e||"none"===e||""===e?"Unknown":t.state}console.info("%c CAR-INFO-CARD %c 1.0.0 ","color: #fff; background: #03a9f4; font-weight: 700;","color: #03a9f4; background: #fff; font-weight: 700;");class xt extends ot{static get properties(){return{hass:{attribute:!1},_config:{attribute:!1}}}static get styles(){return pt}static async getConfigElement(){return document.createElement("car-info-card-editor")}static getStubConfig(t){const e=t?.states??{},i=Object.keys(e),s=i.find(t=>t.startsWith("sensor.")&&/battery|fuel|soc/i.test(t)),n=i.find(t=>t.startsWith("sensor.")&&/range/i.test(t)&&t!==s),r=i.find(t=>t.startsWith("device_tracker.")||t.startsWith("person.")),o=i.find(t=>/charg/i.test(t)&&(t.startsWith("binary_sensor.")||t.startsWith("sensor.")));return{title:"My Vehicle",car_icon:"mdi:car",...s?{battery_entity:s}:{},...n?{range_entity:n}:{},...r?{location_entity:r}:{},...o?{charging_entity:o}:{}}}setConfig(t){if(!t||"object"!=typeof t||Array.isArray(t))throw new Error("Card configuration must be an object");this._config={title:"My Vehicle",car_icon:"mdi:car",...t}}getCardSize(){return 3}_resolve(t){const e=yt(t);return e?{configured:!0,entityId:e,stateObj:this.hass?.states?.[e]??null}:{configured:!1,entityId:"",stateObj:null}}_openMoreInfo(t){if(!t||!this.hass?.states?.[t])return;const e=new Event("hass-more-info",{bubbles:!0,composed:!0});e.detail={entityId:t},this.dispatchEvent(e)}_renderChargingIndicator(t){const e=vt(t),i=function(t){if(!t)return"Not found";const e=String(t.state).trim().toLowerCase();return"unavailable"===e?"Unavailable":"unknown"===e||"none"===e||""===e?"Unknown":vt(t)?"Charging":["off","false","not_charging","not charging","disconnected","unplugged","idle"].includes(e)?"Not charging":At(t.state)}(t),s=e?yt(this._config.charging_icon)||"mdi:ev-station":"mdi:power-plug-off";return D`
      <span class="charge-indicator ${e?"charging":"not-charging"}" title=${i} role="img" aria-label=${i}>
        <ha-icon .icon=${s}></ha-icon>
        <span>${i}</span>
      </span>
    `}_renderBox(t,e){return t.configured?t.stateObj?D`
      <button class="info-box" type="button" @click=${()=>this._openMoreInfo(t.entityId)}>
        ${e}
      </button>
    `:D`<div class="info-box">${e}</div>`:V}_renderBattery(t,e){const i=yt(this._config.battery_icon),s=function(t){if(bt(t))return null;const e=Number(t.state);return Number.isFinite(e)?e:null}(t.stateObj),n=function(t,e){if(!Number.isFinite(e))return!1;const i=String(t?.attributes?.unit_of_measurement??"").trim().toLowerCase();return"%"===i||"percent"===i||""===i&&e>=0&&e<=100}(t.stateObj,s),r=n?Math.min(100,Math.max(0,s)):null,o=null==r?"":function(t,e){return e?"charging":t<=15?"low":t<=30?"medium":"high"}(r,e),a=i||function(t,e){if(!Number.isFinite(t))return e?"mdi:battery-charging":"mdi:battery";if(t<=5)return e?"mdi:battery-charging-outline":"mdi:battery-outline";if(t>=95)return e?"mdi:battery-charging-100":"mdi:battery";const i=Math.max(10,10*Math.round(t/10));return e?`mdi:battery-charging-${i}`:`mdi:battery-${i}`}(s,e),c=n?t.stateObj?.attributes?.unit_of_measurement||"%":t.stateObj?.attributes?.unit_of_measurement||"";return this._renderBox(t,D`
        <ha-icon class=${o} .icon=${a}></ha-icon>
        <span class="label">Battery / Fuel</span>
        <div class="value-container">
          <span class="value">${wt(t.stateObj)}</span>
          ${c&&!bt(t.stateObj)?D`<span class="unit">${c}</span>`:V}
        </div>
        ${null==r?V:D`
              <div
                class="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow=${r}
                aria-label="Battery or fuel level"
              >
                <div class="progress-fill ${o}" style=${ut({width:`${r}%`})}></div>
              </div>
            `}
      `)}_renderRange(t){const e=yt(this._config.range_icon)||"mdi:map-marker-distance",i=bt(t.stateObj)?"":t.stateObj?.attributes?.unit_of_measurement||"";return this._renderBox(t,D`
        <ha-icon .icon=${e}></ha-icon>
        <span class="label">Range</span>
        <div class="value-container">
          <span class="value">${wt(t.stateObj)}</span>
          ${i?D`<span class="unit">${i}</span>`:V}
        </div>
      `)}_renderLocation(t){const e=yt(this._config.location_icon)||"mdi:crosshairs-gps";return this._renderBox(t,D`
        <ha-icon .icon=${e}></ha-icon>
        <span class="label">Location</span>
        <div class="value-container">
          <span class="value location">${function(t){if(!t)return"Not found";const e=String(t.state).trim().toLowerCase();return"home"===e?"Home":"not_home"===e||"not home"===e?"Away":"unavailable"===e?"Unavailable":"unknown"===e||"none"===e||""===e?"Unknown":At(t.state)}(t.stateObj)}</span>
        </div>
      `)}render(){if(!this.hass||!this._config)return D``;const t=yt(this._config.title)||"My Vehicle",e=yt(this._config.car_icon)||"mdi:car",i=this._resolve(this._config.battery_entity),s=this._resolve(this._config.range_entity),n=this._resolve(this._config.location_entity),r=this._resolve(this._config.charging_entity),o=vt(r.stateObj),a=i.configured||s.configured||n.configured;return D`
      <ha-card>
        <div class="card-header">
          <div class="header-title">
            <ha-icon .icon=${e}></ha-icon>
            <span>${t}</span>
          </div>
          ${r.configured?this._renderChargingIndicator(r.stateObj):V}
        </div>
        ${a?D`
              <div class="grid-container">
                ${this._renderBattery(i,o)}
                ${this._renderRange(s)}
                ${this._renderLocation(n)}
              </div>
            `:D`<div class="empty">Choose a battery, range, or location entity in the card options.</div>`}
      </ha-card>
    `}}customElements.get("car-info-card")||customElements.define("car-info-card",xt),window.customCards=window.customCards||[],window.customCards.some(t=>"car-info-card"===t.type)||window.customCards.push({type:"car-info-card",name:"Car Info Card",preview:!0,description:"Displays battery or fuel level, range, location, and charging status for a vehicle.",documentationURL:"https://github.com/davies1995/HA-Car-Card"});
