/*! For license information please see flower-card.js.LICENSE.txt */
(()=>{"use strict";var t={153(t,e,s){var i,r,n;s.d(e,{fireEvent:()=>o}),(n=i||(i={})).language="language",n.system="system",n.comma_decimal="comma_decimal",n.decimal_comma="decimal_comma",n.space_comma="space_comma",n.none="none",function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(r||(r={})),new Set(["fan","input_boolean","light","switch","group","automation"]);var o=function(t,e,s,i){i=i||{},s=s??{};var r=new Event(e,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});return r.detail=s,t.dispatchEvent(r),r};new Set(["call-service","divider","section","weblink","cast","select"])},248(t,e,s){var i=this&&this.__decorate||function(t,e,s,i){var r,n=arguments.length,o=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(o=(n<3?r(o):n>3?r(e,s,o):r(e,s))||o);return n>3&&o&&Object.defineProperty(e,s,o),o},r=this&&this.__awaiter||function(t,e,s,i){return new(s||(s=Promise))(function(r,n){function o(t){try{h(i.next(t))}catch(t){n(t)}}function a(t){try{h(i.throw(t))}catch(t){n(t)}}function h(t){var e;t.done?r(t.value):(e=t.value,e instanceof s?e:new s(function(t){t(e)})).then(o,a)}h((i=i.apply(t,e||[])).next())})};Object.defineProperty(e,"__esModule",{value:!0});const n=s(263),o=s(251),a=s(800),h=s(854),l=s(330),c=s(429),d=s(139),p=s(135);console.info(`%c FLOWER-CARD %c ${l.version}`,"color: cyan; background: black; font-weight: bold;","color: darkblue; background: white; font-weight: bold;"),window.customCards=window.customCards||[],window.customCards.push({type:d.CARD_NAME,name:"Flower card",preview:!0,description:"Custom flower card for https://github.com/Olen/homeassistant-plant"});let u=class extends n.LitElement{connectedCallback(){super.connectedCallback(),this._freshnessTimer||(this._freshnessTimer=window.setInterval(()=>this.requestUpdate(),6e4))}disconnectedCallback(){super.disconnectedCallback(),this._freshnessTimer&&(window.clearInterval(this._freshnessTimer),this._freshnessTimer=void 0)}set hass(t){var e,s;this._hass=t,this.stateObj=(null===(e=this.config)||void 0===e?void 0:e.entity)?t.states[this.config.entity]:void 0,!(null===(s=this.config)||void 0===s?void 0:s.name)&&this.stateObj&&(this.config=Object.assign(Object.assign({},this.config),{name:this.stateObj.attributes.friendly_name})),this.previousFetchDate||(this.previousFetchDate=0),Date.now()>this.previousFetchDate+1e3&&(this.previousFetchDate=Date.now(),this.get_data(t).then(()=>{this.requestUpdate()}))}static getConfigForm(){return{schema:[{name:"display_type",selector:{select:{options:[{label:"Full",value:h.DisplayType.Full},{label:"Compact",value:h.DisplayType.Compact}]}}},{name:"entity",required:!0,selector:{entity:{domain:"plant"}}},{name:"name",selector:{text:{}}},{name:"battery_sensor",selector:{entity:{domain:"sensor",device_class:"battery"}}},{name:"show_bars",selector:{select:{multiple:!0,options:[{label:"Moisture",value:"moisture"},{label:"Conductivity",value:"conductivity"},{label:"Temperature",value:"temperature"},{label:"Illuminance",value:"illuminance"},{label:"Humidity",value:"humidity"},{label:"Daily Light Integral",value:"dli"}]}}},{name:"hide_species",selector:{boolean:{}}},{name:"hide_image",selector:{boolean:{}}}],computeLabel:t=>({display_type:"Display Type",entity:"Entity",name:"Name",battery_sensor:"Battery Sensor",show_bars:"Show Bars",hide_species:"Hide Species",hide_image:"Hide Image"}[t.name]||t.name)}}static getStubConfig(t){const e=Object.values(t.states).filter(t=>0===t.entity_id.indexOf("plant."));return{entity:e.length>0?e[0].entity_id:"plant.my_plant",battery_sensor:"sensor.myflower_battery",show_bars:d.default_show_bars}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");this.config=t}render(){var t;if(!this.config||!this._hass)return n.html``;if(!this.stateObj)return n.html`
                <hui-warning>
                Entity not available: ${this.config.entity}
                </hui-warning>
              `;const e=this.stateObj.attributes.species,s=void 0!==this.config.hide_species&&this.config.hide_species,i=null!==(t=this.config.hide_image)&&void 0!==t&&t,r=this.config.display_type===h.DisplayType.Compact?"header-compact":"header",o=this.config.display_type===h.DisplayType.Compact||i?"":"card-margin-top",a=i?" no-image":"",l=(0,c.renderBattery)(this),u=l.isStale,m=(0,c.renderSensorFreshness)(this),g="problem"===this.stateObj.state.toLowerCase(),f=`${o} ${g?"problem-state":u?"battery-warning-state":""}`.trim();return n.html`
            <ha-card class="${f}">
            <div class="${r}${a}" @click="${()=>(0,p.moreInfo)(this,this.stateObj.entity_id)}">
                ${i?"":n.html`<img src="${this.stateObj.attributes.entity_picture?this.stateObj.attributes.entity_picture:d.missingImage}">`}
                <span id="name"> ${this.config.name} <ha-icon .icon="mdi:${g?"alert-circle-outline":""}"></ha-icon>
                </span>
                <span id="sensor-freshness">${m.html}</span>
                <span id="battery">${l.html}</span>
                ${s?"":n.html`<span id="species">${e} </span>`}
            </div>
            <div class="divider"></div>
            ${(0,c.renderAttributes)(this)}
            </ha-card>
            `}get_data(t){return r(this,void 0,void 0,function*(){var e;try{this.plantinfo=yield t.callWS({type:"plant/get_info",entity_id:null===(e=this.config)||void 0===e?void 0:e.entity})}catch(t){this.plantinfo={result:{}}}})}getCardSize(){return 5}static get styles(){return a.style}};i([(0,o.property)()],u.prototype,"_hass",void 0),i([(0,o.property)()],u.prototype,"config",void 0),u=i([(0,o.customElement)(d.CARD_NAME)],u),e.default=u},800(t,e,s){e.style=void 0;const i=s(263);e.style=i.css`
.card-margin-top {
  margin-top: 32px;
}
.problem-state {
  background-color: rgba(244, 67, 54, 0.3) !important;
  border: 2px solid rgba(244, 67, 54, 0.8) !important;
  box-shadow: 0 0 8px rgba(244, 67, 54, 0.4) !important;
}
.battery-warning-state {
  background-color: rgba(255, 152, 0, 0.3) !important;
  border: 2px solid rgba(255, 152, 0, 0.8) !important;
  box-shadow: 0 0 8px rgba(255, 152, 0, 0.4) !important;
}
.attributes {
  display: flex;
  white-space: nowrap;
  padding: 8px;
}
.attributes.width-100 {
  padding: 2px;

}
.attribute ha-icon {
  margin-right: 10px;
  margin-left: 5px;
}
.attribute {
  white-space: nowrap;
  display: flex;  
  align-items: center;
  width: 50%;
}
#battery {
  position: absolute;
  right: 10px;
  top: 8px;
}
#sensor-freshness {
  position: absolute;
  right: 10px;
  top: 33px;
  z-index: 1;
}
.freshness-badge {
  font-size: 0.62rem;
  font-weight: 600;
  line-height: 1.3;
  padding: 1px 5px;
  border: 1px solid transparent;
  border-radius: 7px;
  white-space: nowrap;
  letter-spacing: 0.2px;
  color: #f5f5f5;
  background: rgba(0, 0, 0, 0.45);
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
}
/* Schriftfarbe bleibt statisch hell (gut lesbar); das Freshness-Level
   wird nur über die Randfarbe angezeigt, nicht über die Schrift. */
.freshness-badge.fresh {
  border-color: rgba(129, 199, 132, 0.55);
}
.freshness-badge.warn {
  border-color: rgba(255, 193, 7, 0.6);
}
.freshness-badge.stale {
  border-color: rgba(244, 67, 54, 0.65);
}
.freshness-badge.unknown {
  border-color: rgba(158, 158, 158, 0.45);
}
/* Lesbarkeit auf eingefärbten Karten (orange/rot) sicherstellen:
   dunkler Chip-Hintergrund, damit der farbige Text Kontrast behält
   (verhindert "orange auf orange" im Battery-Warning-State). */
.battery-warning-state .freshness-badge,
.problem-state .freshness-badge {
  background: rgba(0, 0, 0, 0.5);
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.45);
}
/* No-Image: Akku steht im Flex-Flow rechts oben; Badge absolut darunter ausrichten */
.header.no-image > #sensor-freshness {
  right: 16px;
  top: 40px;
}
.header-compact.no-image > #sensor-freshness {
  right: 16px;
  top: 32px;
}
/* Ausnahme: Kompakt + ohne Bild + ohne Species -> kein Platz darunter,
   Badge bleibt links neben dem Akku (im Flex-Flow). */
.header-compact.no-image:not(:has(#species)) > #sensor-freshness {
  position: static;
  right: auto;
  top: auto;
  margin-left: 0;
  margin-right: 3px;
  align-self: flex-start;
}
.header {
  padding-top: 8px;
  height: 72px;
  position: relative;
}
.header-compact {
  padding-top: 4px;
  height: 55px;
  position: relative;
}
.attribute .header, .attribute .header-compact {
  height: auto;
  padding-top: 0px;
}
.header > img {
  border-radius: 50%;
  width: 88px;
  height: 88px;
  object-fit: cover;
  margin-left: 16px;
  margin-right: 16px;
  margin-top: -32px;
  float: left;
  box-shadow: var( --ha-card-box-shadow, 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2) );
}
.header-compact > img {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-left: 8px;
  margin-right: 8px;
  margin-top: 4px;
  margin-top: 0px;
  float: left;
  box-shadow: var( --ha-card-box-shadow, 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2) );
}
.header.no-image {
  height: auto;
  padding: 16px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.header.no-image + .divider {
  margin-top: 0;
}
.header-compact.no-image {
  height: auto;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.header.no-image > #name,
.header-compact.no-image > #name {
  flex: 1;
  min-width: 0;
  width: auto;
  margin-top: 0;
  margin-left: 0;
}
.header.no-image > #battery,
.header-compact.no-image > #battery {
  position: static;
  margin-top: 0;
  margin-left: auto;
}
.header.no-image > #species,
.header-compact.no-image > #species {
  width: 100%;
  margin-top: 2px;
}
.header > #name {
  font-weight: bold;
  width: 100%;
  margin-top: 16px;
  text-transform: capitalize;
  display: block;
}
.header-compact > #name {
  font-weight: bold;
  width: 100%;
  margin-top: 8px;
  text-transform: capitalize;
  display: block;
  white-space: nowrap;
}
#name ha-icon {
    color: rgb(240, 163, 163);
}
.header > #species {
  text-transform: capitalize;
  color: #8c96a5;
  display: block;
}
.header-compact > #species {
  text-transform: capitalize;
  line-height: 85%;
  color: #8c96a5;
  font-size: 0.8em;
  margin-top: 0px;
  margin-right: 4px;
  opacity: 0.4;
  display: block;
}
.meter {
  height: 8px;
  background-color: #f1f1f1;
  border-radius: 2px;
  display: inline-grid;
  overflow: hidden;
}
.meter.red {
  flex-grow: 1;
  margin-right: 5px;
  max-width: 5%
}
.meter.green {
  flex-grow: 10;
  margin-right: 5px;
  max-width: 40%
}
.attribute.tooltip.width-100 .meter.green {
  max-width: 90%;
}
.attribute.tooltip.width-100 .header {
  
}
.meter > span {
  grid-row: 1;
  grid-column: 1;
  height: 100%;
}
.meter > .good {
  background-color: rgba(43,194,83,1);
}
.meter > .bad {
  background-color: rgba(240,163,163);
}
.meter > .unavailable {
  background-color: rgba(158,158,158,1);
}
.divider {
  height: 1px;
  background-color: #727272;
  opacity: 0.25;
  margin-left: 8px;
  margin-right: 8px;
}
.tooltip {
  position: relative;
}
.tooltip .tip {
  opacity: 0;
  visibility: hidden;
  position: absolute;
  padding: 6px 10px;
  top: 3.3em;
  left: 50%;
  -webkit-transform: translateX(-50%) translateY(-180%);
          transform: translateX(-50%) translateY(-180%);
  background: grey;
  color: white;
  white-space: nowrap;
  z-index: 2;
  border-radius: 2px;
  transition: opacity 0.2s cubic-bezier(0.64, 0.09, 0.08, 1), -webkit-transform 0.2s cubic-bezier(0.64, 0.09, 0.08, 1);
  transition: opacity 0.2s cubic-bezier(0.64, 0.09, 0.08, 1), transform 0.2s cubic-bezier(0.64, 0.09, 0.08, 1);
  transition: opacity 0.2s cubic-bezier(0.64, 0.09, 0.08, 1), transform 0.2s cubic-bezier(0.64, 0.09, 0.08, 1), -webkit-transform 0.2s cubic-bezier(0.64, 0.09, 0.08, 1);
}
.battery.tooltip .tip {
  top: 2em;
}
.tooltip:hover .tip, .tooltip:active .tip {
  display: block;
  opacity: 1;
  visibility: visible;
  -webkit-transform: translateX(-50%) translateY(-200%);
          transform: translateX(-50%) translateY(-200%);
}
.width-100 {
  width: 100%;    
  margin-bottom: 3px;
  margin-right: 5px;
}
.width-100 .header {
  
}
@media (max-width: 600px) {
  .header > .unit {
    display: none;
  }
  .freshness-badge {
    font-size: 0.55rem;
    padding: 1px 4px;
  }
}
`},854(t,e){var s;e.DisplayType=void 0,function(t){t.Full="full",t.Compact="compact"}(s||(e.DisplayType=s={}))},429(t,e,s){e.Rc=e.Ad=e.zc=e.renderAttributes=e.renderSensorFreshness=e.renderBattery=void 0;const i=s(854),r=s(263),n=s(782),o=s(139),a=s(135);e.renderBattery=t=>{if(!t.config.battery_sensor)return{html:r.html``,isStale:!1};const e=t._hass.states[t.config.battery_sensor];if(!e)return{html:r.html``,isStale:!1};const s=parseInt(e.state);let i=new Date(e.last_updated),n=!1;const o=t.config.battery_sensor;let h=o.replace(/_battery$/,"_updated");h===o&&(h=o.replace(/_batt(?:ery)?(?:_percent|_level)?$/,"_updated")),h===o&&(h=o.replace(/_[^_]+$/,"_updated"));const l=t._hass.states[h];if(l){const t=l.state,e=new Date(t),s=2e3;if(!isNaN(e.getTime())&&e.getFullYear()>=s)i=e;else{const t=new Date(l.last_changed);isNaN(t.getTime())||(i=t)}}const c=new Date;n=Math.floor((c.getTime()-i.getTime())/1e3/60)>540||"unavailable"===e.state||"unknown"===e.state;let{icon:d,color:p}=[{threshold:90,icon:"mdi:battery",color:"green"},{threshold:80,icon:"mdi:battery-90",color:"green"},{threshold:70,icon:"mdi:battery-80",color:"green"},{threshold:60,icon:"mdi:battery-70",color:"green"},{threshold:50,icon:"mdi:battery-60",color:"green"},{threshold:40,icon:"mdi:battery-50",color:"green"},{threshold:30,icon:"mdi:battery-40",color:"orange"},{threshold:20,icon:"mdi:battery-30",color:"orange"},{threshold:10,icon:"mdi:battery-20",color:"red"},{threshold:0,icon:"mdi:battery-10",color:"red"},{threshold:-1/0,icon:"mdi:battery-alert-variant-outline",color:"red"}].find(({threshold:t})=>s>t)||{icon:"mdi:battery-alert-variant-outline",color:"red"};return n&&(d="mdi:battery-alert",p="var(--warning-color, orange)"),{html:r.html`
            <div class="battery tooltip" @click="${e=>{e.stopPropagation(),(0,a.moreInfo)(t,t.config.battery_sensor)}}">
                <div class="tip" style="text-align:center;">${s}%</div>
                <ha-icon .icon="${d}" style="color: ${p}"></ha-icon>
            </div>
        `,isStale:n}},e.renderSensorFreshness=t=>{let e=null;if(t.config.battery_sensor){const s=t.config.battery_sensor;let i=s.replace(/_battery$/,"_updated");i===s&&(i=s.replace(/_batt(?:ery)?(?:_percent|_level)?$/,"_updated")),i===s&&(i=s.replace(/_[^_]+$/,"_updated"));const r=t._hass.states[i];if(r){const t=new Date(r.state),s=2e3;if(!isNaN(t.getTime())&&t.getFullYear()>=s)e=t.getTime();else{const t=new Date(r.last_changed).getTime();isNaN(t)||(e=t)}}if(null===e){const i=t._hass.states[s];if(i){const t=new Date(i.last_updated).getTime();isNaN(t)||(e=t)}}}else{const s=t.config.show_bars||o.default_show_bars,i=[];if(t.plantinfo&&t.plantinfo.result)for(const e of s){const s=t.plantinfo.result[e];s&&s.sensor&&i.push(String(s.sensor))}for(const s of i){const i=t._hass.states[s];if(!i)continue;const r=new Date(i.last_updated).getTime();isNaN(r)||(null===e||r>e)&&(e=r)}}if(null===e)return{html:r.html`<div class="freshness-badge unknown" title="Kein Update-Zeitstempel verfügbar">—</div>`};const s=Math.max(0,Math.floor((Date.now()-e)/6e4));let i;return i=s<=90?"fresh":s<=180?"warn":"stale",{html:r.html`<div class="freshness-badge ${i}" title="Letztes Sensor-Update vor ${s} min">${s}m</div>`}},e.renderAttributes=t=>{const s={},i={},r={},n={},a={},h={},l={},c=t.config.show_bars||o.default_show_bars;if(t.plantinfo&&t.plantinfo.result){const e=t.plantinfo.result;for(const t of c)if(e[t]){let{max:o,min:c,current:d,icon:p,sensor:u,unit_of_measurement:m}=e[t];o=Number(o),c=Number(c),p=String(p),u=String(u),d=Number(d),m=String(m),n[`max_${t}`]={max:o,min:c},a[t]=d,s[t]=p,h[t]=u,r[t]=m,i[t]=m,"dli"===t&&(r.dli="mol/d⋅m²",i.dli='<math style="display: inline-grid;" xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mfrac><mrow><mn>mol</mn></mrow><mrow><mn>d</mn><mn>⋅</mn><msup><mn>m</mn><mn>2</mn></msup></mrow></mfrac></mrow></math>'),l[t]={name:t,current:d,limits:n[`max_${t}`],icon:p,sensor:u,unit_of_measurement:m}}}return(0,e.Rc)(t,l)},e.zc=(t,e)=>{const{max:s,min:o}=e.limits,h=e.unit_of_measurement,l=e.icon||"mdi:help-circle-outline",c=e.current||0,d=!isNaN(c),p=100*Math.max(0,Math.min(1,(c-o)/(s-o))),u=d?`${e.name}: ${c} ${h}<br>(${o} ~ ${s} ${h})`:t._hass.localize("state.default.unavailable"),m="dli"===e.name?'<math style="display: inline-grid;" xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mfrac><mrow><mn>mol</mn></mrow><mrow><mn>d</mn><mn>⋅</mn><msup><mn>m</mn><mn>2</mn></msup></mrow></mfrac></mrow></math>':h,g="attribute tooltip "+(t.config.display_type===i.DisplayType.Compact?"width-100":"");return r.html`
        <div class="${g}" @click="${()=>(0,a.moreInfo)(t,e.sensor)}">
            <div class="tip" style="text-align:center;">${(0,n.unsafeHTML)(u)}</div>
            <ha-icon .icon="${l}"></ha-icon>
            <div class="meter red">
                <span class="${d?c<o||c>s?"bad":"good":"unavailable"}" style="width: 100%;"></span>
            </div>
            <div class="meter green">
                <span class="${d?c>s?"bad":"good":"unavailable"}" style="width:${d?p:"0"}%;"></span>
            </div>
            <div class="meter red">
                <span class="bad" style="width:${d?c>s?100:0:"0"}%;"></span>
            </div>
	    <div class="header"><span class="value">${c}</span>&nbsp;<span class='unit'>${(0,n.unsafeHTML)(m)}</span></div>
        </div>
    `},e.Ad=(t,e)=>Object.values(t).reduce((t,s,i)=>{const r=Math.floor(i/e);return t[r]||(t[r]=[]),t[r].push(s),t},[]),e.Rc=(t,s)=>{const n=(0,e.Ad)(s,t.config.display_type===i.DisplayType.Compact?1:2),o="attributes "+(t.config.display_type===i.DisplayType.Compact?"width-100":"");return n.map(s=>r.html`<div class="${o}">${s.map(s=>s?r.html`${(0,e.zc)(t,s)}`:"")}</div>`).flat()}},139(t,e){e.missingImage=e.default_show_bars=e.CARD_NAME=void 0,e.CARD_NAME="flower-card",e.default_show_bars=["moisture"],e.missingImage="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiIGZvY3VzYWJsZT0iZmFsc2UiIHJvbGU9ImltZyIgYXJpYS1oaWRkZW49InRydWUiIHZpZXdCb3g9IjAgMCAyNCAyNCI+CiAgICAgIDxnPgogICAgICA8IS0tP2xpdCQ0MTM0MjMxNjkkLS0+PHBhdGggZD0iTTMsMTNBOSw5IDAgMCwwIDEyLDIyQzEyLDE3IDcuOTcsMTMgMywxM00xMiw1LjVBMi41LDIuNSAwIDAsMSAxNC41LDhBMi41LDIuNSAwIDAsMSAxMiwxMC41QTIuNSwyLjUgMCAwLDEgOS41LDhBMi41LDIuNSAwIDAsMSAxMiw1LjVNNS42LDEwLjI1QTIuNSwyLjUgMCAwLDAgOC4xLDEyLjc1QzguNjMsMTIuNzUgOS4xMiwxMi41OCA5LjUsMTIuMzFDOS41LDEyLjM3IDkuNSwxMi40MyA5LjUsMTIuNUEyLjUsMi41IDAgMCwwIDEyLDE1QTIuNSwyLjUgMCAwLDAgMTQuNSwxMi41QzE0LjUsMTIuNDMgMTQuNSwxMi4zNyAxNC41LDEyLjMxQzE0Ljg4LDEyLjU4IDE1LjM3LDEyLjc1IDE1LjksMTIuNzVDMTcuMjgsMTIuNzUgMTguNCwxMS42MyAxOC40LDEwLjI1QzE4LjQsOS4yNSAxNy44MSw4LjQgMTYuOTcsOEMxNy44MSw3LjYgMTguNCw2Ljc0IDE4LjQsNS43NUMxOC40LDQuMzcgMTcuMjgsMy4yNSAxNS45LDMuMjVDMTUuMzcsMy4yNSAxNC44OCwzLjQxIDE0LjUsMy42OUMxNC41LDMuNjMgMTQuNSwzLjU2IDE0LjUsMy41QTIuNSwyLjUgMCAwLDAgMTIsMUEyLjUsMi41IDAgMCwwIDkuNSwzLjVDOS41LDMuNTYgOS41LDMuNjMgOS41LDMuNjlDOS4xMiwzLjQxIDguNjMsMy4yNSA4LjEsMy4yNUEyLjUsMi41IDAgMCwwIDUuNiw1Ljc1QzUuNiw2Ljc0IDYuMTksNy42IDcuMDMsOEM2LjE5LDguNCA1LjYsOS4yNSA1LjYsMTAuMjVNMTIsMjJBOSw5IDAgMCwwIDIxLDEzQzE2LDEzIDEyLDE3IDEyLDIyWiI+PC9wYXRoPgogICAgICA8L2c+Cjwvc3ZnPgo="},135(t,e,s){e.moreInfo=void 0;const i=s(153);s(139);e.moreInfo=(t,e)=>{(0,i.fireEvent)(t,"hass-more-info",{entityId:e},{bubbles:!1,composed:!0})}},251(t,e,s){s.d(e,{customElement:()=>i,property:()=>a});const i=t=>(e,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};var r=s(209);const n={attribute:!0,type:String,converter:r.W3,reflect:!1,hasChanged:r.Ec},o=(t=n,e,s)=>{const{kind:i,metadata:r}=s;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),o.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const r=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,r,t,!0,s)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const r=this[i];e.call(this,s),this.requestUpdate(i,r,t,!0,s)}}throw Error("Unsupported decorator location: "+i)};function a(t){return(e,s)=>"object"==typeof s?o(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}},782(t,e,s){s.d(e,{unsafeHTML:()=>o});var i=s(499);class r{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}class n extends r{constructor(t){if(super(t),this.it=i.s6,2!==t.type)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===i.s6||null==t)return this._t=void 0,this.it=t;if(t===i.c0)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const e=[t];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}}n.directiveName="unsafeHTML",n.resultType=1;const o=(a=n,(...t)=>({_$litDirective$:a,values:t}));var a},263(t,e,s){s.d(e,{LitElement:()=>dt,css:()=>h,html:()=>V}),s(209),s(499);const i=globalThis,r=i.ShadowRoot&&(void 0===i.ShadyCSS||i.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n=Symbol(),o=new WeakMap;class a{constructor(t,e,s){if(this._$cssResult$=!0,s!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(r&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&o.set(e,t))}return t}toString(){return this.cssText}}const h=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new a(s,t,n)},l=(t,e)=>{if(r)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of e){const e=document.createElement("style"),r=i.litNonce;void 0!==r&&e.setAttribute("nonce",r),e.textContent=s.cssText,t.appendChild(e)}},c=r?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new a("string"==typeof t?t:t+"",void 0,n))(e)})(t):t,{is:d,defineProperty:p,getOwnPropertyDescriptor:u,getOwnPropertyNames:m,getOwnPropertySymbols:g,getPrototypeOf:f}=Object,_=globalThis,y=_.trustedTypes,$=y?y.emptyScript:"",b=_.reactiveElementPolyfillSupport,v=(t,e)=>t,A={toAttribute(t,e){switch(e){case Boolean:t=t?$:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},w=(t,e)=>!d(t,e),x={attribute:!0,type:String,converter:A,reflect:!1,useDefault:!1,hasChanged:w};Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;class E extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&p(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:r}=u(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const n=i?.call(this);r?.call(this,e),this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=f(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...m(t),...g(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(c(t))}else void 0!==t&&e.push(c(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return l(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const r=(void 0!==s.converter?.toAttribute?s.converter:A).toAttribute(e,s.type);this._$Em=t,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:A;this._$Em=i;const n=r.fromAttribute(e,t.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(t,e,s,i=!1,r){if(void 0!==t){const n=this.constructor;if(!1===i&&(r=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??w)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==r||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}}E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[v("elementProperties")]=new Map,E[v("finalized")]=new Map,b?.({ReactiveElement:E}),(_.reactiveElementVersions??=[]).push("2.1.2");const S=globalThis,M=t=>t,C=S.trustedTypes,N=C?C.createPolicy("lit-html",{createHTML:t=>t}):void 0,T="$lit$",D=`lit$${Math.random().toFixed(9).slice(2)}$`,O="?"+D,U=`<${O}>`,L=document,P=()=>L.createComment(""),j=t=>null===t||"object"!=typeof t&&"function"!=typeof t,I=Array.isArray,k="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,R=/>/g,B=RegExp(`>|${k}(?:([^\\s"'>=/]+)(${k}*=${k}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),W=/'/g,F=/"/g,Q=/^(?:script|style|textarea|title)$/i,Z=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),V=Z(1),Y=(Z(2),Z(3),Symbol.for("lit-noChange")),q=Symbol.for("lit-nothing"),X=new WeakMap,J=L.createTreeWalker(L,129);function K(t,e){if(!I(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==N?N.createHTML(e):e}const G=(t,e)=>{const s=t.length-1,i=[];let r,n=2===e?"<svg>":3===e?"<math>":"",o=H;for(let e=0;e<s;e++){const s=t[e];let a,h,l=-1,c=0;for(;c<s.length&&(o.lastIndex=c,h=o.exec(s),null!==h);)c=o.lastIndex,o===H?"!--"===h[1]?o=z:void 0!==h[1]?o=R:void 0!==h[2]?(Q.test(h[2])&&(r=RegExp("</"+h[2],"g")),o=B):void 0!==h[3]&&(o=B):o===B?">"===h[0]?(o=r??H,l=-1):void 0===h[1]?l=-2:(l=o.lastIndex-h[2].length,a=h[1],o=void 0===h[3]?B:'"'===h[3]?F:W):o===F||o===W?o=B:o===z||o===R?o=H:(o=B,r=void 0);const d=o===B&&t[e+1].startsWith("/>")?" ":"";n+=o===H?s+U:l>=0?(i.push(a),s.slice(0,l)+T+s.slice(l)+D+d):s+D+(-2===l?e:d)}return[K(t,n+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class tt{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,n=0;const o=t.length-1,a=this.parts,[h,l]=G(t,e);if(this.el=tt.createElement(h,s),J.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=J.nextNode())&&a.length<o;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(T)){const e=l[n++],s=i.getAttribute(t).split(D),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:o[2],strings:s,ctor:"."===o[1]?nt:"?"===o[1]?ot:"@"===o[1]?at:rt}),i.removeAttribute(t)}else t.startsWith(D)&&(a.push({type:6,index:r}),i.removeAttribute(t));if(Q.test(i.tagName)){const t=i.textContent.split(D),e=t.length-1;if(e>0){i.textContent=C?C.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],P()),J.nextNode(),a.push({type:2,index:++r});i.append(t[e],P())}}}else if(8===i.nodeType)if(i.data===O)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=i.data.indexOf(D,t+1));)a.push({type:7,index:r}),t+=D.length-1}r++}}static createElement(t,e){const s=L.createElement("template");return s.innerHTML=t,s}}function et(t,e,s=t,i){if(e===Y)return e;let r=void 0!==i?s._$Co?.[i]:s._$Cl;const n=j(e)?void 0:e._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(t),r._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=r:s._$Cl=r),void 0!==r&&(e=et(t,r._$AS(t,e.values),r,i)),e}class st{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??L).importNode(e,!0);J.currentNode=i;let r=J.nextNode(),n=0,o=0,a=s[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new it(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new ht(r,this,t)),this._$AV.push(e),a=s[++o]}n!==a?.index&&(r=J.nextNode(),n++)}return J.currentNode=L,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class it{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=et(this,t,e),j(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==Y&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>I(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&j(this._$AH)?this._$AA.nextSibling.data=t:this.T(L.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=tt.createElement(K(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new st(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=X.get(t.strings);return void 0===e&&X.set(t.strings,e=new tt(t)),e}k(t){I(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new it(this.O(P()),this.O(P()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=M(t).nextSibling;M(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class rt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=q}_$AI(t,e=this,s,i){const r=this.strings;let n=!1;if(void 0===r)t=et(this,t,e,0),n=!j(t)||t!==this._$AH&&t!==Y,n&&(this._$AH=t);else{const i=t;let o,a;for(t=r[0],o=0;o<r.length-1;o++)a=et(this,i[s+o],e,o),a===Y&&(a=this._$AH[o]),n||=!j(a)||a!==this._$AH[o],a===q?t=q:t!==q&&(t+=(a??"")+r[o+1]),this._$AH[o]=a}n&&!i&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class nt extends rt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class ot extends rt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class at extends rt{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=et(this,t,e,0)??q)===Y)return;const s=this._$AH,i=t===q&&s!==q||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==q&&(s===q||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ht{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){et(this,t)}}const lt=S.litHtmlPolyfillSupport;lt?.(tt,it),(S.litHtmlVersions??=[]).push("3.3.3");const ct=globalThis;class dt extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let r=i._$litPart$;if(void 0===r){const t=s?.renderBefore??null;i._$litPart$=r=new it(e.insertBefore(P(),t),t,void 0,s??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Y}}dt._$litElement$=!0,dt.finalized=!0,ct.litElementHydrateSupport?.({LitElement:dt});const pt=ct.litElementPolyfillSupport;pt?.({LitElement:dt}),(ct.litElementVersions??=[]).push("4.2.2")},209(t,e,s){s.d(e,{W3:()=>v,Ec:()=>A});const i=globalThis,r=i.ShadowRoot&&(void 0===i.ShadyCSS||i.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n=Symbol(),o=new WeakMap;class a{constructor(t,e,s){if(this._$cssResult$=!0,s!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(r&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&o.set(e,t))}return t}toString(){return this.cssText}}const h=(t,e)=>{if(r)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of e){const e=document.createElement("style"),r=i.litNonce;void 0!==r&&e.setAttribute("nonce",r),e.textContent=s.cssText,t.appendChild(e)}},l=r?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new a("string"==typeof t?t:t+"",void 0,n))(e)})(t):t,{is:c,defineProperty:d,getOwnPropertyDescriptor:p,getOwnPropertyNames:u,getOwnPropertySymbols:m,getPrototypeOf:g}=Object,f=globalThis,_=f.trustedTypes,y=_?_.emptyScript:"",$=f.reactiveElementPolyfillSupport,b=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?y:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},A=(t,e)=>!c(t,e),w={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:A};Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;class x extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&d(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:r}=p(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const n=i?.call(this);r?.call(this,e),this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=g(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...u(t),...m(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return h(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const r=(void 0!==s.converter?.toAttribute?s.converter:v).toAttribute(e,s.type);this._$Em=t,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=i;const n=r.fromAttribute(e,t.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(t,e,s,i=!1,r){if(void 0!==t){const n=this.constructor;if(!1===i&&(r=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??A)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==r||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}}x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[b("elementProperties")]=new Map,x[b("finalized")]=new Map,$?.({ReactiveElement:x}),(f.reactiveElementVersions??=[]).push("2.1.2")},499(t,e,s){s.d(e,{c0:()=>x,s6:()=>E});const i=globalThis,r=t=>t,n=i.trustedTypes,o=n?n.createPolicy("lit-html",{createHTML:t=>t}):void 0,a="$lit$",h=`lit$${Math.random().toFixed(9).slice(2)}$`,l="?"+h,c=`<${l}>`,d=document,p=()=>d.createComment(""),u=t=>null===t||"object"!=typeof t&&"function"!=typeof t,m=Array.isArray,g="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,y=/>/g,$=RegExp(`>|${g}(?:([^\\s"'>=/]+)(${g}*=${g}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),b=/'/g,v=/"/g,A=/^(?:script|style|textarea|title)$/i,w=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),x=(w(1),w(2),w(3),Symbol.for("lit-noChange")),E=Symbol.for("lit-nothing"),S=new WeakMap,M=d.createTreeWalker(d,129);function C(t,e){if(!m(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==o?o.createHTML(e):e}const N=(t,e)=>{const s=t.length-1,i=[];let r,n=2===e?"<svg>":3===e?"<math>":"",o=f;for(let e=0;e<s;e++){const s=t[e];let l,d,p=-1,u=0;for(;u<s.length&&(o.lastIndex=u,d=o.exec(s),null!==d);)u=o.lastIndex,o===f?"!--"===d[1]?o=_:void 0!==d[1]?o=y:void 0!==d[2]?(A.test(d[2])&&(r=RegExp("</"+d[2],"g")),o=$):void 0!==d[3]&&(o=$):o===$?">"===d[0]?(o=r??f,p=-1):void 0===d[1]?p=-2:(p=o.lastIndex-d[2].length,l=d[1],o=void 0===d[3]?$:'"'===d[3]?v:b):o===v||o===b?o=$:o===_||o===y?o=f:(o=$,r=void 0);const m=o===$&&t[e+1].startsWith("/>")?" ":"";n+=o===f?s+c:p>=0?(i.push(l),s.slice(0,p)+a+s.slice(p)+h+m):s+h+(-2===p?e:m)}return[C(t,n+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class T{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,o=0;const c=t.length-1,d=this.parts,[u,m]=N(t,e);if(this.el=T.createElement(u,s),M.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=M.nextNode())&&d.length<c;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(a)){const e=m[o++],s=i.getAttribute(t).split(h),n=/([.?@])?(.*)/.exec(e);d.push({type:1,index:r,name:n[2],strings:s,ctor:"."===n[1]?P:"?"===n[1]?j:"@"===n[1]?I:L}),i.removeAttribute(t)}else t.startsWith(h)&&(d.push({type:6,index:r}),i.removeAttribute(t));if(A.test(i.tagName)){const t=i.textContent.split(h),e=t.length-1;if(e>0){i.textContent=n?n.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],p()),M.nextNode(),d.push({type:2,index:++r});i.append(t[e],p())}}}else if(8===i.nodeType)if(i.data===l)d.push({type:2,index:r});else{let t=-1;for(;-1!==(t=i.data.indexOf(h,t+1));)d.push({type:7,index:r}),t+=h.length-1}r++}}static createElement(t,e){const s=d.createElement("template");return s.innerHTML=t,s}}function D(t,e,s=t,i){if(e===x)return e;let r=void 0!==i?s._$Co?.[i]:s._$Cl;const n=u(e)?void 0:e._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(t),r._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=r:s._$Cl=r),void 0!==r&&(e=D(t,r._$AS(t,e.values),r,i)),e}class O{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??d).importNode(e,!0);M.currentNode=i;let r=M.nextNode(),n=0,o=0,a=s[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new U(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new k(r,this,t)),this._$AV.push(e),a=s[++o]}n!==a?.index&&(r=M.nextNode(),n++)}return M.currentNode=d,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class U{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=E,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=D(this,t,e),u(t)?t===E||null==t||""===t?(this._$AH!==E&&this._$AR(),this._$AH=E):t!==this._$AH&&t!==x&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>m(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==E&&u(this._$AH)?this._$AA.nextSibling.data=t:this.T(d.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=T.createElement(C(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new O(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=S.get(t.strings);return void 0===e&&S.set(t.strings,e=new T(t)),e}k(t){m(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new U(this.O(p()),this.O(p()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=r(t).nextSibling;r(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class L{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=E,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=E}_$AI(t,e=this,s,i){const r=this.strings;let n=!1;if(void 0===r)t=D(this,t,e,0),n=!u(t)||t!==this._$AH&&t!==x,n&&(this._$AH=t);else{const i=t;let o,a;for(t=r[0],o=0;o<r.length-1;o++)a=D(this,i[s+o],e,o),a===x&&(a=this._$AH[o]),n||=!u(a)||a!==this._$AH[o],a===E?t=E:t!==E&&(t+=(a??"")+r[o+1]),this._$AH[o]=a}n&&!i&&this.j(t)}j(t){t===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class P extends L{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===E?void 0:t}}class j extends L{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==E)}}class I extends L{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=D(this,t,e,0)??E)===x)return;const s=this._$AH,i=t===E&&s!==E||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==E&&(s===E||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class k{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){D(this,t)}}const H=i.litHtmlPolyfillSupport;H?.(T,U),(i.litHtmlVersions??=[]).push("3.3.3")},330(t){t.exports=JSON.parse('{"version":"2026.6.2-beta.1"}')}},e={};function s(i){var r=e[i];if(void 0!==r)return r.exports;var n=e[i]={exports:{}};return t[i].call(n.exports,n,n.exports,s),n.exports}s.d=(t,e)=>{for(var i in e)s.o(e,i)&&!s.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},s.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),s(248)})();