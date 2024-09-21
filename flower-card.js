/*! For license information please see flower-card.js.LICENSE.txt */
(()=>{"use strict";var t={147:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0});const r=i(356),n=i(337),o=i(516),a=i(167);class s extends n.LitElement{constructor(){super(...arguments),this.controlRenderers={[o.FormControlType.Dropdown]:a.renderDropdown,[o.FormControlType.Radio]:a.renderRadio,[o.FormControlType.Checkboxes]:a.renderCheckboxes,[o.FormControlType.EntityDropdown]:a.renderDropdown,[o.FormControlType.Switch]:a.renderSwitch,[o.FormControlType.Textbox]:a.renderTextbox,[o.FormControlType.Filler]:a.renderFiller}}setConfig(t){this._config=t,this.requestUpdate("_config")}set hass(t){this._hass=t}renderForm(t){return n.html`
            <div class="card-config">
                ${t.map((t=>{const e=t.cssClass?`form-row ${t.cssClass}`:"form-row";return t.hidden?"":n.html`
                        <div class="${e}">
                            <label>${t.label}</label>
                            ${t.controls.map((t=>this.renderControl(t)))}
                        </div>
                        `}))}            
            </div>
            `}renderControl(t){const e=this.controlRenderers[t.type];if(!e)throw new Error(`Unsupported control type: ${t.type}`);return e(this,t)}_valueChanged(t){if(!this._config||!this._hass)return;const e=t.target,i=t.detail;if("HA-CHECKBOX"===e.tagName){const t=this._config[e.configValue].indexOf(e.value);e.checked&&t<0?this._config[e.configValue]=[...this._config[e.configValue],e.value]:!e.checked&&t>-1&&(this._config[e.configValue]=[...this._config[e.configValue].slice(0,t),...this._config[e.configValue].slice(t+1)])}else if(e.configValue)if(e.configValue.indexOf(".")>-1){const[t,i]=e.configValue.split(".");this._config={...this._config,[t]:{...this._config[t],[i]:e.checked}}}else this._config={...this._config,[e.configValue]:void 0===e.checked&&(null==i?void 0:i.value)?e.checked||i.value:e.value||e.checked};(0,r.fireEvent)(this,"config-changed",{config:this._config},{bubbles:!0,composed:!0}),this.requestUpdate("_config")}static get styles(){return n.css`
            .form-row {
                margin-bottom: 10px;
            }
            .form-control {
                display: flex;
                align-items: center;
            }
            ha-switch {
                padding: 16px 6px;
            }
            .side-by-side {
                display: flex;
                flex-flow: row wrap;
            }            
            .side-by-side > label {
                width: 100%;
            }
            .side-by-side > .form-control {
                width: 49%;
                padding: 2px;
            }
            ha-textfield { 
                width: 100%;
            }
        `}}e.default=s},516:(t,e)=>{var i;Object.defineProperty(e,"__esModule",{value:!0}),e.FormControlType=void 0,function(t){t.Dropdown="dropdown",t.Checkbox="checkbox",t.Checkboxes="checkboxes",t.Radio="radio",t.Switch="switch",t.Textbox="textbox",t.Filler="filler",t.EntityDropdown="entity-dropdown"}(i||(e.FormControlType=i={}))},167:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.renderCheckboxes=e.renderRadio=e.renderDropdown=e.renderSwitch=e.renderTextbox=e.renderEntityDropdown=e.renderFiller=void 0;const r=i(337),n=i(770);e.renderFiller=()=>r.html`<div class="form-control"></div>`,e.renderEntityDropdown=(t,e)=>{var i;return r.html`
    <div class="form-control">
        <ha-entity-picker
            label="${e.label}"
            .value="${null!==(i=t._config[e.configValue])&&void 0!==i?i:""}"
            .configValue="${e.configValue}"
            .hass="${t._hass}"
            domain-filter="${e.domain}"
            @change="${t._valueChanged}">
        </ha-entity-picker>
    </div>
    `},e.renderTextbox=(t,e)=>{var i;return r.html`
    <div class="form-control">
        <ha-textfield
            label="${e.label}"
            .value="${null!==(i=t._config[e.configValue])&&void 0!==i?i:""}"
            .configValue="${e.configValue}"
            @change="${t._valueChanged}">
        </ha-textfield>
    </div>
    `},e.renderSwitch=(t,e)=>r.html`
    <div class="form-control">
        <ha-switch
            id="${e.configValue}"
            name="${e.configValue}"
            .checked="${t._config[e.configValue]}"
            .configValue="${e.configValue}"
            @change="${t._valueChanged}"
        >
        </ha-switch>
        <label for="${e.configValue}">${e.label}</label>
    </div>
    `,e.renderDropdown=(t,e)=>{var i;const o=null!==(i=e.items)&&void 0!==i?i:(0,n.getEntitiesByDomain)(t._hass,e.domain);return r.html`  
    <div class="form-control">
        <ha-combo-box
            label="${e.label}"
            .value="${t._config[e.configValue]}"
            .configValue="${e.configValue}"
            .items="${o}"
            @value-changed="${t._valueChanged}"
            @change=${t._valueChanged}
        ></ha-combo-box>
    </div>
      `},e.renderRadio=(t,e)=>r.html`
        <div class="form-control">
            <label>${e.label}</label>
            ${e.items.map((i=>r.html`
                    <ha-radio
                        id="${e.configValue}_${i.value}"
                        name="${e.configValue}"
                        .checked="${t._config[e.configValue]===i.value}"
                        .configValue="${e.configValue}"
                        .value="${i.value}"
                        @change="${t._valueChanged}"
                    >
                    </ha-radio>
                    <label for="${e.configValue}_${i.value}">${i.label}</label>
                `))}
        </div>
      `,e.renderCheckboxes=(t,e)=>r.html`
        <label>${e.label}</label>
        ${e.items.map((i=>{var n;return r.html`                
            <div class="form-control">
                <ha-checkbox
                    id="${e.configValue}_${i.value}"
                    name="${e.configValue}[]"
                    .checked="${(null===(n=t._config[e.configValue])||void 0===n?void 0:n.indexOf(i.value))>-1}"
                    .configValue="${e.configValue}"
                    .value="${i.value}"
                    @change="${t._valueChanged}"
                >
                </ha-checkbox>
                <label for="${e.configValue}_${i.value}">${i.label}</label>
            </div>
            `}))}
      `},770:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.getDropdownOptionsFromEnum=e.formatList=e.getEntitiesByDeviceClass=e.getEntitiesByDomain=void 0,e.getEntitiesByDomain=(t,i)=>Object.keys(t.states).filter((t=>t.substr(0,t.indexOf("."))===i)).map((i=>(0,e.formatList)(i,t))),e.getEntitiesByDeviceClass=(t,i,r)=>Object.keys(t.states).filter((e=>e.substr(0,e.indexOf("."))===i&&t.states[e].attributes.device_class===r)).map((i=>(0,e.formatList)(i,t))),e.formatList=(t,e)=>({label:e.states[t].attributes.friendly_name,value:t}),e.getDropdownOptionsFromEnum=t=>{const e=[];for(const[i,r]of Object.entries(t))e.push({value:r,label:i});return e}},356:(t,e,i)=>{i.r(e),i.d(e,{DEFAULT_DOMAIN_ICON:()=>J,DEFAULT_PANEL:()=>G,DEFAULT_VIEW_ENTITY_ID:()=>st,DOMAINS_HIDE_MORE_INFO:()=>et,DOMAINS_MORE_INFO_NO_HISTORY:()=>it,DOMAINS_TOGGLE:()=>nt,DOMAINS_WITH_CARD:()=>K,DOMAINS_WITH_MORE_INFO:()=>tt,NumberFormat:()=>r,STATES_OFF:()=>rt,TimeFormat:()=>n,UNIT_C:()=>ot,UNIT_F:()=>at,applyThemesOnElement:()=>U,computeCardSize:()=>R,computeDomain:()=>F,computeEntity:()=>z,computeRTL:()=>H,computeRTLDirection:()=>V,computeStateDisplay:()=>Z,computeStateDomain:()=>B,createThing:()=>dt,debounce:()=>ht,domainIcon:()=>pt,evaluateFilter:()=>ft,fireEvent:()=>ct,fixedIcons:()=>mt,formatDate:()=>u,formatDateMonth:()=>b,formatDateMonthYear:()=>g,formatDateNumeric:()=>h,formatDateShort:()=>p,formatDateTime:()=>x,formatDateTimeNumeric:()=>E,formatDateTimeWithSeconds:()=>M,formatDateWeekday:()=>c,formatDateYear:()=>v,formatNumber:()=>Y,formatTime:()=>C,formatTimeWeekday:()=>N,formatTimeWithSeconds:()=>k,forwardHaptic:()=>gt,getLovelace:()=>Et,handleAction:()=>wt,handleActionConfig:()=>vt,handleClick:()=>$t,hasAction:()=>xt,hasConfigOrEntityChanged:()=>At,hasDoubleClick:()=>Mt,isNumericState:()=>W,navigate:()=>yt,numberFormatToLocale:()=>q,relativeTime:()=>j,round:()=>Q,stateIcon:()=>Tt,timerTimeRemaining:()=>L,toggleEntity:()=>_t,turnOnOffEntities:()=>St,turnOnOffEntity:()=>bt});var r,n,o,a=function(){return a=Object.assign||function(t){for(var e,i=1,r=arguments.length;i<r;i++)for(var n in e=arguments[i])Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t},a.apply(this,arguments)},s={second:45,minute:45,hour:22,day:5},c=function(t,e){return l(e).format(t)},l=function(t){return new Intl.DateTimeFormat(t.language,{weekday:"long",month:"long",day:"numeric"})},u=function(t,e){return d(e).format(t)},d=function(t){return new Intl.DateTimeFormat(t.language,{year:"numeric",month:"long",day:"numeric"})},h=function(t,e){return m(e).format(t)},m=function(t){return new Intl.DateTimeFormat(t.language,{year:"numeric",month:"numeric",day:"numeric"})},p=function(t,e){return f(e).format(t)},f=function(t){return new Intl.DateTimeFormat(t.language,{day:"numeric",month:"short"})},g=function(t,e){return y(e).format(t)},y=function(t){return new Intl.DateTimeFormat(t.language,{month:"long",year:"numeric"})},b=function(t,e){return _(e).format(t)},_=function(t){return new Intl.DateTimeFormat(t.language,{month:"long"})},v=function(t,e){return w(e).format(t)},w=function(t){return new Intl.DateTimeFormat(t.language,{year:"numeric"})};(o=r||(r={})).language="language",o.system="system",o.comma_decimal="comma_decimal",o.decimal_comma="decimal_comma",o.space_comma="space_comma",o.none="none",function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(n||(n={}));var $=function(t){if(t.time_format===n.language||t.time_format===n.system){var e=t.time_format===n.language?t.language:void 0,i=(new Date).toLocaleString(e);return i.includes("AM")||i.includes("PM")}return t.time_format===n.am_pm},x=function(t,e){return A(e).format(t)},A=function(t){return new Intl.DateTimeFormat(t.language,{year:"numeric",month:"long",day:"numeric",hour:$(t)?"numeric":"2-digit",minute:"2-digit",hour12:$(t)})},M=function(t,e){return S(e).format(t)},S=function(t){return new Intl.DateTimeFormat(t.language,{year:"numeric",month:"long",day:"numeric",hour:$(t)?"numeric":"2-digit",minute:"2-digit",second:"2-digit",hour12:$(t)})},E=function(t,e){return D(e).format(t)},D=function(t){return new Intl.DateTimeFormat(t.language,{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"2-digit",hour12:$(t)})},C=function(t,e){return T(e).format(t)},T=function(t){return new Intl.DateTimeFormat(t.language,{hour:"numeric",minute:"2-digit",hour12:$(t)})},k=function(t,e){return O(e).format(t)},O=function(t){return new Intl.DateTimeFormat(t.language,{hour:$(t)?"numeric":"2-digit",minute:"2-digit",second:"2-digit",hour12:$(t)})},N=function(t,e){return I(e).format(t)},I=function(t){return new Intl.DateTimeFormat(t.language,{hour:$(t)?"numeric":"2-digit",minute:"2-digit",second:"2-digit",hour12:$(t)})},j=function(t,e,i,r){void 0===r&&(r=!0);var n=function(t,e,i){void 0===e&&(e=Date.now()),void 0===i&&(i={});var r=a(a({},s),i||{}),n=(+t-+e)/1e3;if(Math.abs(n)<r.second)return{value:Math.round(n),unit:"second"};var o=n/60;if(Math.abs(o)<r.minute)return{value:Math.round(o),unit:"minute"};var c=n/3600;if(Math.abs(c)<r.hour)return{value:Math.round(c),unit:"hour"};var l=n/86400;if(Math.abs(l)<r.day)return{value:Math.round(l),unit:"day"};var u=new Date(t),d=new Date(e),h=u.getFullYear()-d.getFullYear();if(Math.round(Math.abs(h))>0)return{value:Math.round(h),unit:"year"};var m=12*h+u.getMonth()-d.getMonth();if(Math.round(Math.abs(m))>0)return{value:Math.round(m),unit:"month"};var p=n/604800;return{value:Math.round(p),unit:"week"}}(t,i);return r?function(t){return new Intl.RelativeTimeFormat(t.language,{numeric:"auto"})}(e).format(n.value,n.unit):Intl.NumberFormat(e.language,{style:"unit",unit:n.unit,unitDisplay:"long"}).format(Math.abs(n.value))};function L(t){var e,i=3600*(e=t.attributes.remaining.split(":").map(Number))[0]+60*e[1]+e[2];if("active"===t.state){var r=(new Date).getTime(),n=new Date(t.last_changed).getTime();i=Math.max(i-(r-n)/1e3,0)}return i}function P(){return(P=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(t[r]=i[r])}return t}).apply(this,arguments)}var U=function(t,e,i,r){void 0===r&&(r=!1),t._themes||(t._themes={});var n=e.default_theme;("default"===i||i&&e.themes[i])&&(n=i);var o=P({},t._themes);if("default"!==n){var a=e.themes[n];Object.keys(a).forEach((function(e){var i="--"+e;t._themes[i]="",o[i]=a[e]}))}if(t.updateStyles?t.updateStyles(o):window.ShadyCSS&&window.ShadyCSS.styleSubtree(t,o),r){var s=document.querySelector("meta[name=theme-color]");if(s){s.hasAttribute("default-content")||s.setAttribute("default-content",s.getAttribute("content"));var c=o["--primary-color"]||s.getAttribute("default-content");s.setAttribute("content",c)}}},R=function(t){return"function"==typeof t.getCardSize?t.getCardSize():4};function F(t){return t.substr(0,t.indexOf("."))}function z(t){return t.substr(t.indexOf(".")+1)}function H(t){var e,i=(null==t||null==(e=t.locale)?void 0:e.language)||"en";return t.translationMetadata.translations[i]&&t.translationMetadata.translations[i].isRTL||!1}function V(t){return H(t)?"rtl":"ltr"}function B(t){return F(t.entity_id)}var W=function(t){return!!t.attributes.unit_of_measurement||!!t.attributes.state_class},q=function(t){switch(t.number_format){case r.comma_decimal:return["en-US","en"];case r.decimal_comma:return["de","es","it"];case r.space_comma:return["fr","sv","cs"];case r.system:return;default:return t.language}},Q=function(t,e){return void 0===e&&(e=2),Math.round(t*Math.pow(10,e))/Math.pow(10,e)},Y=function(t,e,i){var n=e?q(e):void 0;if(Number.isNaN=Number.isNaN||function t(e){return"number"==typeof e&&t(e)},(null==e?void 0:e.number_format)!==r.none&&!Number.isNaN(Number(t))&&Intl)try{return new Intl.NumberFormat(n,X(t,i)).format(Number(t))}catch(e){return console.error(e),new Intl.NumberFormat(void 0,X(t,i)).format(Number(t))}return"string"==typeof t?t:Q(t,null==i?void 0:i.maximumFractionDigits).toString()+("currency"===(null==i?void 0:i.style)?" "+i.currency:"")},X=function(t,e){var i=P({maximumFractionDigits:2},e);if("string"!=typeof t)return i;if(!e||!e.minimumFractionDigits&&!e.maximumFractionDigits){var r=t.indexOf(".")>-1?t.split(".")[1].length:0;i.minimumFractionDigits=r,i.maximumFractionDigits=r}return i},Z=function(t,e,i,r){var n=void 0!==r?r:e.state;if("unknown"===n||"unavailable"===n)return t("state.default."+n);if(W(e)){if("monetary"===e.attributes.device_class)try{return Y(n,i,{style:"currency",currency:e.attributes.unit_of_measurement})}catch(t){}return Y(n,i)+(e.attributes.unit_of_measurement?" "+e.attributes.unit_of_measurement:"")}var o=B(e);if("input_datetime"===o){var a;if(void 0===r)return e.attributes.has_date&&e.attributes.has_time?(a=new Date(e.attributes.year,e.attributes.month-1,e.attributes.day,e.attributes.hour,e.attributes.minute),x(a,i)):e.attributes.has_date?(a=new Date(e.attributes.year,e.attributes.month-1,e.attributes.day),u(a,i)):e.attributes.has_time?((a=new Date).setHours(e.attributes.hour,e.attributes.minute),C(a,i)):e.state;try{var s=r.split(" ");if(2===s.length)return x(new Date(s.join("T")),i);if(1===s.length){if(r.includes("-"))return u(new Date(r+"T00:00"),i);if(r.includes(":")){var c=new Date;return C(new Date(c.toISOString().split("T")[0]+"T"+r),i)}}return r}catch(t){return r}}return"humidifier"===o&&"on"===n&&e.attributes.humidity?e.attributes.humidity+" %":"counter"===o||"number"===o||"input_number"===o?Y(n,i):e.attributes.device_class&&t("component."+o+".state."+e.attributes.device_class+"."+n)||t("component."+o+".state._."+n)||n},J="mdi:bookmark",G="lovelace",K=["climate","cover","configurator","input_select","input_number","input_text","lock","media_player","scene","script","timer","vacuum","water_heater","weblink"],tt=["alarm_control_panel","automation","camera","climate","configurator","cover","fan","group","history_graph","input_datetime","light","lock","media_player","script","sun","updater","vacuum","water_heater","weather"],et=["input_number","input_select","input_text","scene","weblink"],it=["camera","configurator","history_graph","scene"],rt=["closed","locked","off"],nt=new Set(["fan","input_boolean","light","switch","group","automation"]),ot="°C",at="°F",st="group.default_view",ct=function(t,e,i,r){r=r||{},i=null==i?{}:i;var n=new Event(e,{bubbles:void 0===r.bubbles||r.bubbles,cancelable:Boolean(r.cancelable),composed:void 0===r.composed||r.composed});return n.detail=i,t.dispatchEvent(n),n},lt=new Set(["call-service","divider","section","weblink","cast","select"]),ut={alert:"toggle",automation:"toggle",climate:"climate",cover:"cover",fan:"toggle",group:"group",input_boolean:"toggle",input_number:"input-number",input_select:"input-select",input_text:"input-text",light:"toggle",lock:"lock",media_player:"media-player",remote:"toggle",scene:"scene",script:"script",sensor:"sensor",timer:"timer",switch:"toggle",vacuum:"toggle",water_heater:"climate",input_datetime:"input-datetime"},dt=function(t,e){void 0===e&&(e=!1);var i=function(t,e){return r("hui-error-card",{type:"error",error:t,config:e})},r=function(t,e){var r=window.document.createElement(t);try{if(!r.setConfig)return;r.setConfig(e)}catch(r){return console.error(t,r),i(r.message,e)}return r};if(!t||"object"!=typeof t||!e&&!t.type)return i("No type defined",t);var n=t.type;if(n&&n.startsWith("custom:"))n=n.substr(7);else if(e)if(lt.has(n))n="hui-"+n+"-row";else{if(!t.entity)return i("Invalid config given.",t);var o=t.entity.split(".",1)[0];n="hui-"+(ut[o]||"text")+"-entity-row"}else n="hui-"+n+"-card";if(customElements.get(n))return r(n,t);var a=i("Custom element doesn't exist: "+t.type+".",t);a.style.display="None";var s=setTimeout((function(){a.style.display=""}),2e3);return customElements.whenDefined(t.type).then((function(){clearTimeout(s),ct(a,"ll-rebuild",{},a)})),a},ht=function(t,e,i){var r;return void 0===i&&(i=!1),function(){var n=[].slice.call(arguments),o=this,a=i&&!r;clearTimeout(r),r=setTimeout((function(){r=null,i||t.apply(o,n)}),e),a&&t.apply(o,n)}},mt={alert:"mdi:alert",automation:"mdi:playlist-play",calendar:"mdi:calendar",camera:"mdi:video",climate:"mdi:thermostat",configurator:"mdi:settings",conversation:"mdi:text-to-speech",device_tracker:"mdi:account",fan:"mdi:fan",group:"mdi:google-circles-communities",history_graph:"mdi:chart-line",homeassistant:"mdi:home-assistant",homekit:"mdi:home-automation",image_processing:"mdi:image-filter-frames",input_boolean:"mdi:drawing",input_datetime:"mdi:calendar-clock",input_number:"mdi:ray-vertex",input_select:"mdi:format-list-bulleted",input_text:"mdi:textbox",light:"mdi:lightbulb",mailbox:"mdi:mailbox",notify:"mdi:comment-alert",person:"mdi:account",plant:"mdi:flower",proximity:"mdi:apple-safari",remote:"mdi:remote",scene:"mdi:google-pages",script:"mdi:file-document",sensor:"mdi:eye",simple_alarm:"mdi:bell",sun:"mdi:white-balance-sunny",switch:"mdi:flash",timer:"mdi:timer",updater:"mdi:cloud-upload",vacuum:"mdi:robot-vacuum",water_heater:"mdi:thermometer",weblink:"mdi:open-in-new"};function pt(t,e){if(t in mt)return mt[t];switch(t){case"alarm_control_panel":switch(e){case"armed_home":return"mdi:bell-plus";case"armed_night":return"mdi:bell-sleep";case"disarmed":return"mdi:bell-outline";case"triggered":return"mdi:bell-ring";default:return"mdi:bell"}case"binary_sensor":return e&&"off"===e?"mdi:radiobox-blank":"mdi:checkbox-marked-circle";case"cover":return"closed"===e?"mdi:window-closed":"mdi:window-open";case"lock":return e&&"unlocked"===e?"mdi:lock-open":"mdi:lock";case"media_player":return e&&"off"!==e&&"idle"!==e?"mdi:cast-connected":"mdi:cast";case"zwave":switch(e){case"dead":return"mdi:emoticon-dead";case"sleeping":return"mdi:sleep";case"initializing":return"mdi:timer-sand";default:return"mdi:z-wave"}default:return console.warn("Unable to find icon for domain "+t+" ("+e+")"),"mdi:bookmark"}}var ft=function(t,e){var i=e.value||e,r=e.attribute?t.attributes[e.attribute]:t.state;switch(e.operator||"=="){case"==":return r===i;case"<=":return r<=i;case"<":return r<i;case">=":return r>=i;case">":return r>i;case"!=":return r!==i;case"regex":return r.match(i);default:return!1}},gt=function(t){ct(window,"haptic",t)},yt=function(t,e,i){void 0===i&&(i=!1),i?history.replaceState(null,"",e):history.pushState(null,"",e),ct(window,"location-changed",{replace:i})},bt=function(t,e,i){void 0===i&&(i=!0);var r,n=F(e),o="group"===n?"homeassistant":n;switch(n){case"lock":r=i?"unlock":"lock";break;case"cover":r=i?"open_cover":"close_cover";break;default:r=i?"turn_on":"turn_off"}return t.callService(o,r,{entity_id:e})},_t=function(t,e){var i=rt.includes(t.states[e].state);return bt(t,e,i)},vt=function(t,e,i,r){if(r||(r={action:"more-info"}),!r.confirmation||r.confirmation.exemptions&&r.confirmation.exemptions.some((function(t){return t.user===e.user.id}))||(gt("warning"),confirm(r.confirmation.text||"Are you sure you want to "+r.action+"?")))switch(r.action){case"more-info":(i.entity||i.camera_image)&&ct(t,"hass-more-info",{entityId:i.entity?i.entity:i.camera_image});break;case"navigate":r.navigation_path&&yt(0,r.navigation_path);break;case"url":r.url_path&&window.open(r.url_path);break;case"toggle":i.entity&&(_t(e,i.entity),gt("success"));break;case"call-service":if(!r.service)return void gt("failure");var n=r.service.split(".",2);e.callService(n[0],n[1],r.service_data,r.target),gt("success");break;case"fire-dom-event":ct(t,"ll-custom",r)}},wt=function(t,e,i,r){var n;"double_tap"===r&&i.double_tap_action?n=i.double_tap_action:"hold"===r&&i.hold_action?n=i.hold_action:"tap"===r&&i.tap_action&&(n=i.tap_action),vt(t,e,i,n)},$t=function(t,e,i,r,n){var o;if(n&&i.double_tap_action?o=i.double_tap_action:r&&i.hold_action?o=i.hold_action:!r&&i.tap_action&&(o=i.tap_action),o||(o={action:"more-info"}),!o.confirmation||o.confirmation.exemptions&&o.confirmation.exemptions.some((function(t){return t.user===e.user.id}))||confirm(o.confirmation.text||"Are you sure you want to "+o.action+"?"))switch(o.action){case"more-info":(o.entity||i.entity||i.camera_image)&&(ct(t,"hass-more-info",{entityId:o.entity?o.entity:i.entity?i.entity:i.camera_image}),o.haptic&&gt(o.haptic));break;case"navigate":o.navigation_path&&(yt(0,o.navigation_path),o.haptic&&gt(o.haptic));break;case"url":o.url_path&&window.open(o.url_path),o.haptic&&gt(o.haptic);break;case"toggle":i.entity&&(_t(e,i.entity),o.haptic&&gt(o.haptic));break;case"call-service":if(!o.service)return;var a=o.service.split(".",2),s=a[0],c=a[1],l=P({},o.service_data);"entity"===l.entity_id&&(l.entity_id=i.entity),e.callService(s,c,l,o.target),o.haptic&&gt(o.haptic);break;case"fire-dom-event":ct(t,"ll-custom",o),o.haptic&&gt(o.haptic)}};function xt(t){return void 0!==t&&"none"!==t.action}function At(t,e,i){if(e.has("config")||i)return!0;if(t.config.entity){var r=e.get("hass");return!r||r.states[t.config.entity]!==t.hass.states[t.config.entity]}return!1}function Mt(t){return void 0!==t&&"none"!==t.action}var St=function(t,e,i){void 0===i&&(i=!0);var r={};e.forEach((function(e){if(rt.includes(t.states[e].state)===i){var n=F(e),o=["cover","lock"].includes(n)?n:"homeassistant";o in r||(r[o]=[]),r[o].push(e)}})),Object.keys(r).forEach((function(e){var n;switch(e){case"lock":n=i?"unlock":"lock";break;case"cover":n=i?"open_cover":"close_cover";break;default:n=i?"turn_on":"turn_off"}t.callService(e,n,{entity_id:r[e]})}))},Et=function(){var t=document.querySelector("home-assistant");if(t=(t=(t=(t=(t=(t=(t=(t=t&&t.shadowRoot)&&t.querySelector("home-assistant-main"))&&t.shadowRoot)&&t.querySelector("app-drawer-layout partial-panel-resolver"))&&t.shadowRoot||t)&&t.querySelector("ha-panel-lovelace"))&&t.shadowRoot)&&t.querySelector("hui-root")){var e=t.lovelace;return e.current_view=t.___curView,e}return null},Dt={humidity:"mdi:water-percent",illuminance:"mdi:brightness-5",temperature:"mdi:thermometer",pressure:"mdi:gauge",power:"mdi:flash",signal_strength:"mdi:wifi"},Ct={binary_sensor:function(t,e){var i="off"===t;switch(null==e?void 0:e.attributes.device_class){case"battery":return i?"mdi:battery":"mdi:battery-outline";case"battery_charging":return i?"mdi:battery":"mdi:battery-charging";case"cold":return i?"mdi:thermometer":"mdi:snowflake";case"connectivity":return i?"mdi:server-network-off":"mdi:server-network";case"door":return i?"mdi:door-closed":"mdi:door-open";case"garage_door":return i?"mdi:garage":"mdi:garage-open";case"power":case"plug":return i?"mdi:power-plug-off":"mdi:power-plug";case"gas":case"problem":case"safety":case"tamper":return i?"mdi:check-circle":"mdi:alert-circle";case"smoke":return i?"mdi:check-circle":"mdi:smoke";case"heat":return i?"mdi:thermometer":"mdi:fire";case"light":return i?"mdi:brightness-5":"mdi:brightness-7";case"lock":return i?"mdi:lock":"mdi:lock-open";case"moisture":return i?"mdi:water-off":"mdi:water";case"motion":return i?"mdi:walk":"mdi:run";case"occupancy":case"presence":return i?"mdi:home-outline":"mdi:home";case"opening":return i?"mdi:square":"mdi:square-outline";case"running":return i?"mdi:stop":"mdi:play";case"sound":return i?"mdi:music-note-off":"mdi:music-note";case"update":return i?"mdi:package":"mdi:package-up";case"vibration":return i?"mdi:crop-portrait":"mdi:vibrate";case"window":return i?"mdi:window-closed":"mdi:window-open";default:return i?"mdi:radiobox-blank":"mdi:checkbox-marked-circle"}},cover:function(t){var e="closed"!==t.state;switch(t.attributes.device_class){case"garage":return e?"mdi:garage-open":"mdi:garage";case"door":return e?"mdi:door-open":"mdi:door-closed";case"shutter":return e?"mdi:window-shutter-open":"mdi:window-shutter";case"blind":return e?"mdi:blinds-open":"mdi:blinds";case"window":return e?"mdi:window-open":"mdi:window-closed";default:return pt("cover",t.state)}},sensor:function(t){var e=t.attributes.device_class;if(e&&e in Dt)return Dt[e];if("battery"===e){var i=Number(t.state);if(isNaN(i))return"mdi:battery-unknown";var r=10*Math.round(i/10);return r>=100?"mdi:battery":r<=0?"mdi:battery-alert":"hass:battery-"+r}var n=t.attributes.unit_of_measurement;return"°C"===n||"°F"===n?"mdi:thermometer":pt("sensor")},input_datetime:function(t){return t.attributes.has_date?t.attributes.has_time?pt("input_datetime"):"mdi:calendar":"mdi:clock"}},Tt=function(t){if(!t)return"mdi:bookmark";if(t.attributes.icon)return t.attributes.icon;var e=F(t.entity_id);return e in Ct?Ct[e](t):pt(e,t.state)}},43:function(t,e,i){var r=this&&this.__decorate||function(t,e,i,r){var n,o=arguments.length,a=o<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(n=t[s])&&(a=(o<3?n(a):o>3?n(e,i,a):n(e,i))||a);return o>3&&a&&Object.defineProperty(e,i,a),a};Object.defineProperty(e,"__esModule",{value:!0}),e.FlowerCardEditor=void 0;const n=i(337),o=i(924),a=i(854),s=i(139),c=i(147),l=i(516),u=i(770);let d=class extends c.default{render(){if(!this._hass||!this._config)return n.html``;Object.prototype.hasOwnProperty.call(this._config,"show_bars")||(this._config.show_bars=s.default_show_bars);const t=(0,u.getEntitiesByDomain)(this._hass,"plant"),e=(0,u.getEntitiesByDeviceClass)(this._hass,"sensor","battery");return this.renderForm([{controls:[{label:"Display Type",configValue:"display_type",type:l.FormControlType.Radio,items:[{label:"Full",value:a.DisplayType.Full},{label:"Compact",value:a.DisplayType.Compact}]}]},{controls:[{label:"Entity",configValue:"entity",type:l.FormControlType.Dropdown,items:t}]},{controls:[{label:"Name",configValue:"name",type:l.FormControlType.Textbox}]},{controls:[{label:"Battery Sensor",configValue:"battery_sensor",type:l.FormControlType.Dropdown,items:e}]},{controls:[{label:"Show Bars",configValue:"show_bars",type:l.FormControlType.Checkboxes,items:s.plantAttributes}]},{controls:[{label:"Hide Species",configValue:"hide_species",type:l.FormControlType.Switch}]}])}static get styles(){return n.css`
            .form-row {
                margin-bottom: 10px;
            }
            .form-control {
                display: flex;
                align-items: center;
            }
            ha-switch {
                padding: 16px 6px;
            }
            .side-by-side {
                display: flex;
                flex-flow: row wrap;
            }            
            .side-by-side > label {
                width: 100%;
            }
            .side-by-side > .form-control {
                width: 49%;
                padding: 2px;
            }
            ha-textfield { 
                width: 100%;
            }
            .hidden {
                display: none;
            }
        `}};e.FlowerCardEditor=d,e.FlowerCardEditor=d=r([(0,o.customElement)("flower-card-editor")],d)},248:function(t,e,i){var r=this&&this.__decorate||function(t,e,i,r){var n,o=arguments.length,a=o<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,r);else for(var s=t.length-1;s>=0;s--)(n=t[s])&&(a=(o<3?n(a):o>3?n(e,i,a):n(e,i))||a);return o>3&&a&&Object.defineProperty(e,i,a),a},n=this&&this.__awaiter||function(t,e,i,r){return new(i||(i=Promise))((function(n,o){function a(t){try{c(r.next(t))}catch(t){o(t)}}function s(t){try{c(r.throw(t))}catch(t){o(t)}}function c(t){var e;t.done?n(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(a,s)}c((r=r.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0});const o=i(337),a=i(924),s=i(800),c=i(854),l=i(330),u=i(429),d=i(139),h=i(135);console.info(`%c FLOWER-CARD %c ${l.version}`,"color: cyan; background: black; font-weight: bold;","color: darkblue; background: white; font-weight: bold;"),window.customCards=window.customCards||[],window.customCards.push({type:d.CARD_NAME,name:"Flower card",preview:!0,description:"Custom flower card for https://github.com/Olen/homeassistant-plant"});let m=class extends o.LitElement{set hass(t){var e,i;this._hass=t,this.stateObj=(null===(e=this.config)||void 0===e?void 0:e.entity)?t.states[this.config.entity]:void 0,!(null===(i=this.config)||void 0===i?void 0:i.name)&&this.stateObj&&(this.config=Object.assign(Object.assign({},this.config),{name:this.stateObj.attributes.friendly_name})),this.previousFetchDate||(this.previousFetchDate=0),Date.now()>this.previousFetchDate+1e3&&(this.previousFetchDate=Date.now(),this.get_data(t).then((()=>{this.requestUpdate()})))}static getConfigElement(){return n(this,void 0,void 0,(function*(){return yield Promise.resolve().then((()=>i(43))),document.createElement(d.CARD_EDITOR_NAME)}))}static getStubConfig(t){const e=Object.values(t.states).filter((t=>0===t.entity_id.indexOf("plant.")));return{entity:e.length>0?e[0].entity_id:"plant.my_plant",battery_sensor:"sensor.myflower_battery",show_bars:d.default_show_bars}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");this.config=t}render(){if(!this.config||!this._hass)return o.html``;if(!this.stateObj)return o.html`
                <hui-warning>
                Entity not available: ${this.config.entity}
                </hui-warning>
              `;const t=this.stateObj.attributes.species,e=void 0!==this.config.hide_species&&this.config.hide_species,i=this.config.display_type===c.DisplayType.Compact?"header-compact":"header",r=this.config.display_type===c.DisplayType.Compact?"":"card-margin-top";return o.html`
            <ha-card class="${r}">
            <div class="${i}" @click="${()=>(0,h.moreInfo)(this,this.stateObj.entity_id)}">
                <img src="${this.stateObj.attributes.entity_picture?this.stateObj.attributes.entity_picture:d.missingImage}">
                <span id="name"> ${this.config.name} <ha-icon .icon="mdi:${"problem"==this.stateObj.state.toLowerCase()?"alert-circle-outline":""}"></ha-icon>
                </span>
                <span id="battery">${(0,u.renderBattery)(this)}</span>
                ${e?"":o.html`<span id="species">${t} </span>`}
            </div>
            <div class="divider"></div>
            ${(0,u.renderAttributes)(this)}
            </ha-card>
            `}get_data(t){return n(this,void 0,void 0,(function*(){var e;try{this.plantinfo=yield t.callWS({type:"plant/get_info",entity_id:null===(e=this.config)||void 0===e?void 0:e.entity})}catch(t){this.plantinfo={result:{}}}}))}getCardSize(){return 5}static get styles(){return s.style}};r([(0,a.property)()],m.prototype,"_hass",void 0),r([(0,a.property)()],m.prototype,"config",void 0),m=r([(0,a.customElement)(d.CARD_NAME)],m),e.default=m},800:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.style=void 0;const r=i(337);e.style=r.css`
.card-margin-top {
  margin-top: 32px;
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
  float: right;
  margin-right: 16px;
  margin-top: -15px;
}
.header {
  padding-top: 8px;
  height: 72px;
}
.header-compact {
  padding-top: 4px;
  height: 55px;
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
}
`},854:(t,e)=>{var i;Object.defineProperty(e,"__esModule",{value:!0}),e.DisplayType=void 0,function(t){t.Full="full",t.Compact="compact"}(i||(e.DisplayType=i={}))},429:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.renderAttributeChunks=e.getChunkedDisplayed=e.renderAttribute=e.renderAttributes=e.renderBattery=void 0;const r=i(854),n=i(337),o=i(534),a=i(139),s=i(135);e.renderBattery=t=>{if(!t.config.battery_sensor)return n.html``;const e=t._hass.states[t.config.battery_sensor];if(!e)return n.html``;const i=parseInt(e.state),{icon:r,color:o}=[{threshold:90,icon:"mdi:battery",color:"green"},{threshold:80,icon:"mdi:battery-90",color:"green"},{threshold:70,icon:"mdi:battery-80",color:"green"},{threshold:60,icon:"mdi:battery-70",color:"green"},{threshold:50,icon:"mdi:battery-60",color:"green"},{threshold:40,icon:"mdi:battery-50",color:"green"},{threshold:30,icon:"mdi:battery-40",color:"orange"},{threshold:20,icon:"mdi:battery-30",color:"orange"},{threshold:10,icon:"mdi:battery-20",color:"red"},{threshold:0,icon:"mdi:battery-10",color:"red"},{threshold:-1/0,icon:"mdi:battery-alert-variant-outline",color:"red"}].find((({threshold:t})=>i>t))||{icon:"mdi:battery-alert-variant-outline",color:"red"};return n.html`
        <div class="battery tooltip" @click="${e=>{e.stopPropagation(),(0,s.moreInfo)(t,t.config.battery_sensor)}}">
            <div class="tip" style="text-align:center;">${i}%</div>
            <ha-icon .icon="${r}" style="color: ${o}"></ha-icon>
        </div>
    `},e.renderAttributes=t=>{const i={},r={},n={},o={},s={},c={},l={},u=t.config.show_bars||a.default_show_bars;if(t.plantinfo&&t.plantinfo.result){const e=t.plantinfo.result;for(const t of u)if(e[t]){let{max:a,min:u,current:d,icon:h,sensor:m,unit_of_measurement:p}=e[t];a=Number(a),u=Number(u),h=String(h),m=String(m),d=Number(d),p=String(p),o[`max_${t}`]={max:a,min:u},s[t]=d,i[t]=h,c[t]=m,n[t]=p,r[t]=p,"dli"===t&&(n.dli="mol/d⋅m²",r.dli='<math style="display: inline-grid;" xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mfrac><mrow><mn>mol</mn></mrow><mrow><mn>d</mn><mn>⋅</mn><msup><mn>m</mn><mn>2</mn></msup></mrow></mfrac></mrow></math>'),l[t]={name:t,current:d,limits:o[`max_${t}`],icon:h,sensor:m,unit_of_measurement:p}}}return(0,e.renderAttributeChunks)(t,l)},e.renderAttribute=(t,e)=>{const{max:i,min:a}=e.limits,c=e.unit_of_measurement,l=e.icon||"mdi:help-circle-outline",u=e.current||0,d=!isNaN(u),h=100*Math.max(0,Math.min(1,(u-a)/(i-a))),m=d?`${e.name}: ${u} ${c}<br>(${a} ~ ${i} ${c})`:t._hass.localize("state.default.unavailable"),p="dli"===e.name?'<math style="display: inline-grid;" xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mfrac><mrow><mn>mol</mn></mrow><mrow><mn>d</mn><mn>⋅</mn><msup><mn>m</mn><mn>2</mn></msup></mrow></mfrac></mrow></math>':c,f="attribute tooltip "+(t.config.display_type===r.DisplayType.Compact?"width-100":"");return n.html`
        <div class="${f}" @click="${()=>(0,s.moreInfo)(t,e.sensor)}">
            <div class="tip" style="text-align:center;">${(0,o.unsafeHTML)(m)}</div>
            <ha-icon .icon="${l}"></ha-icon>
            <div class="meter red">
                <span class="${d?u<a||u>i?"bad":"good":"unavailable"}" style="width: 100%;"></span>
            </div>
            <div class="meter green">
                <span class="${d?u>i?"bad":"good":"unavailable"}" style="width:${d?h:"0"}%;"></span>
            </div>
            <div class="meter red">
                <span class="bad" style="width:${d?u>i?100:0:"0"}%;"></span>
            </div>
	    <div class="header"><span class="value">${u}</span>&nbsp;<span class='unit'>${(0,o.unsafeHTML)(p)}</span></div>
        </div>
    `},e.getChunkedDisplayed=(t,e)=>Object.values(t).reduce(((t,i,r)=>{const n=Math.floor(r/e);return t[n]||(t[n]=[]),t[n].push(i),t}),[]),e.renderAttributeChunks=(t,i)=>{const o=(0,e.getChunkedDisplayed)(i,t.config.display_type===r.DisplayType.Compact?1:2),a="attributes "+(t.config.display_type===r.DisplayType.Compact?"width-100":"");return o.map((i=>n.html`<div class="${a}">${i.map((i=>i?n.html`${(0,e.renderAttribute)(t,i)}`:""))}</div>`)).flat()}},139:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.plantAttributes=e.missingImage=e.default_show_bars=e.CARD_EDITOR_NAME=e.CARD_NAME=void 0,e.CARD_NAME="flower-card",e.CARD_EDITOR_NAME=`${e.CARD_NAME}-editor`,e.default_show_bars=["moisture"],e.missingImage="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiIGZvY3VzYWJsZT0iZmFsc2UiIHJvbGU9ImltZyIgYXJpYS1oaWRkZW49InRydWUiIHZpZXdCb3g9IjAgMCAyNCAyNCI+CiAgICAgIDxnPgogICAgICA8IS0tP2xpdCQ0MTM0MjMxNjkkLS0+PHBhdGggZD0iTTMsMTNBOSw5IDAgMCwwIDEyLDIyQzEyLDE3IDcuOTcsMTMgMywxM00xMiw1LjVBMi41LDIuNSAwIDAsMSAxNC41LDhBMi41LDIuNSAwIDAsMSAxMiwxMC41QTIuNSwyLjUgMCAwLDEgOS41LDhBMi41LDIuNSAwIDAsMSAxMiw1LjVNNS42LDEwLjI1QTIuNSwyLjUgMCAwLDAgOC4xLDEyLjc1QzguNjMsMTIuNzUgOS4xMiwxMi41OCA5LjUsMTIuMzFDOS41LDEyLjM3IDkuNSwxMi40MyA5LjUsMTIuNUEyLjUsMi41IDAgMCwwIDEyLDE1QTIuNSwyLjUgMCAwLDAgMTQuNSwxMi41QzE0LjUsMTIuNDMgMTQuNSwxMi4zNyAxNC41LDEyLjMxQzE0Ljg4LDEyLjU4IDE1LjM3LDEyLjc1IDE1LjksMTIuNzVDMTcuMjgsMTIuNzUgMTguNCwxMS42MyAxOC40LDEwLjI1QzE4LjQsOS4yNSAxNy44MSw4LjQgMTYuOTcsOEMxNy44MSw3LjYgMTguNCw2Ljc0IDE4LjQsNS43NUMxOC40LDQuMzcgMTcuMjgsMy4yNSAxNS45LDMuMjVDMTUuMzcsMy4yNSAxNC44OCwzLjQxIDE0LjUsMy42OUMxNC41LDMuNjMgMTQuNSwzLjU2IDE0LjUsMy41QTIuNSwyLjUgMCAwLDAgMTIsMUEyLjUsMi41IDAgMCwwIDkuNSwzLjVDOS41LDMuNTYgOS41LDMuNjMgOS41LDMuNjlDOS4xMiwzLjQxIDguNjMsMy4yNSA4LjEsMy4yNUEyLjUsMi41IDAgMCwwIDUuNiw1Ljc1QzUuNiw2Ljc0IDYuMTksNy42IDcuMDMsOEM2LjE5LDguNCA1LjYsOS4yNSA1LjYsMTAuMjVNMTIsMjJBOSw5IDAgMCwwIDIxLDEzQzE2LDEzIDEyLDE3IDEyLDIyWiI+PC9wYXRoPgogICAgICA8L2c+Cjwvc3ZnPgo=",e.plantAttributes=[{label:"Moisture",value:"moisture"},{label:"Conductivity",value:"conductivity"},{label:"Temperature",value:"temperature"},{label:"Illuminance",value:"illuminance"},{label:"Humidity",value:"humidity"},{label:"Daily Light Integral",value:"dli"}]},135:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.moreInfo=e.getStubConfig=e.getConfigElement=void 0;const r=i(356),n=i(139);e.getConfigElement=()=>document.createElement("flower-card-editor"),e.getStubConfig=t=>{const e=Object.values(t.states).filter((t=>0===t.entity_id.indexOf("plant.")));return{entity:e.length>0?e[0].entity_id:"plant.my_plant",battery_sensor:"sensor.myflower_battery",show_bars:n.default_show_bars}},e.moreInfo=(t,e)=>{(0,r.fireEvent)(t,"hass-more-info",{entityId:e},{bubbles:!1,composed:!0})}},842:(t,e,i)=>{i.d(e,{BO:()=>s,mN:()=>S,Rf:()=>u,AH:()=>l,W3:()=>x,sk:()=>d,Ec:()=>A,qM:()=>n,iz:()=>c});const r=globalThis,n=r.ShadowRoot&&(void 0===r.ShadyCSS||r.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),a=new WeakMap;class s{constructor(t,e,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(n&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=a.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(e,t))}return t}toString(){return this.cssText}}const c=t=>new s("string"==typeof t?t:t+"",void 0,o),l=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[r+1]),t[0]);return new s(i,t,o)},u=(t,e)=>{if(n)t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const i of e){const e=document.createElement("style"),n=r.litNonce;void 0!==n&&e.setAttribute("nonce",n),e.textContent=i.cssText,t.appendChild(e)}},d=n?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return c(e)})(t):t,{is:h,defineProperty:m,getOwnPropertyDescriptor:p,getOwnPropertyNames:f,getOwnPropertySymbols:g,getPrototypeOf:y}=Object,b=globalThis,_=b.trustedTypes,v=_?_.emptyScript:"",w=b.reactiveElementPolyfillSupport,$=(t,e)=>t,x={toAttribute(t,e){switch(e){case Boolean:t=t?v:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},A=(t,e)=>!h(t,e),M={attribute:!0,type:String,converter:x,reflect:!1,hasChanged:A};Symbol.metadata??=Symbol("metadata"),b.litPropertyMetadata??=new WeakMap;class S extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=M){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,e);void 0!==r&&m(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){const{get:r,set:n}=p(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get(){return r?.call(this)},set(e){const o=r?.call(this);n.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??M}static _$Ei(){if(this.hasOwnProperty($("elementProperties")))return;const t=y(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($("properties"))){const t=this.properties,e=[...f(t),...g(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(d(t))}else void 0!==t&&e.push(d(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return u(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EC(t,e){const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(void 0!==r&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:x).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(r):this.setAttribute(r,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,r=i._$Eh.get(t);if(void 0!==r&&this._$Em!==r){const t=i.getPropertyOptions(r),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:x;this._$Em=r,this[r]=n.fromAttribute(e,t.type),this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??A)(this[t],e))return;this.P(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$ET())}P(t,e,i){this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t)!0!==i.wrapped||this._$AL.has(e)||void 0===this[e]||this.P(e,this[e],i)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(e)):this._$EU()}catch(e){throw t=!1,this._$EU(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EC(t,this[t]))),this._$EU()}updated(t){}firstUpdated(t){}}S.elementStyles=[],S.shadowRootOptions={mode:"open"},S[$("elementProperties")]=new Map,S[$("finalized")]=new Map,w?.({ReactiveElement:S}),(b.reactiveElementVersions??=[]).push("2.0.4")},752:(t,e,i)=>{i.d(e,{JW:()=>M,XX:()=>B,c0:()=>E,ej:()=>S,ge:()=>H,qy:()=>A,s6:()=>D});const r=globalThis,n=r.trustedTypes,o=n?n.createPolicy("lit-html",{createHTML:t=>t}):void 0,a="$lit$",s=`lit$${Math.random().toFixed(9).slice(2)}$`,c="?"+s,l=`<${c}>`,u=document,d=()=>u.createComment(""),h=t=>null===t||"object"!=typeof t&&"function"!=typeof t,m=Array.isArray,p=t=>m(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",g=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,y=/-->/g,b=/>/g,_=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),v=/'/g,w=/"/g,$=/^(?:script|style|textarea|title)$/i,x=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),A=x(1),M=x(2),S=x(3),E=Symbol.for("lit-noChange"),D=Symbol.for("lit-nothing"),C=new WeakMap,T=u.createTreeWalker(u,129);function k(t,e){if(!m(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==o?o.createHTML(e):e}const O=(t,e)=>{const i=t.length-1,r=[];let n,o=2===e?"<svg>":3===e?"<math>":"",c=g;for(let e=0;e<i;e++){const i=t[e];let u,d,h=-1,m=0;for(;m<i.length&&(c.lastIndex=m,d=c.exec(i),null!==d);)m=c.lastIndex,c===g?"!--"===d[1]?c=y:void 0!==d[1]?c=b:void 0!==d[2]?($.test(d[2])&&(n=RegExp("</"+d[2],"g")),c=_):void 0!==d[3]&&(c=_):c===_?">"===d[0]?(c=n??g,h=-1):void 0===d[1]?h=-2:(h=c.lastIndex-d[2].length,u=d[1],c=void 0===d[3]?_:'"'===d[3]?w:v):c===w||c===v?c=_:c===y||c===b?c=g:(c=_,n=void 0);const p=c===_&&t[e+1].startsWith("/>")?" ":"";o+=c===g?i+l:h>=0?(r.push(u),i.slice(0,h)+a+i.slice(h)+s+p):i+s+(-2===h?e:p)}return[k(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),r]};class N{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let o=0,l=0;const u=t.length-1,h=this.parts,[m,p]=O(t,e);if(this.el=N.createElement(m,i),T.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=T.nextNode())&&h.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(a)){const e=p[l++],i=r.getAttribute(t).split(s),n=/([.?@])?(.*)/.exec(e);h.push({type:1,index:o,name:n[2],strings:i,ctor:"."===n[1]?U:"?"===n[1]?R:"@"===n[1]?F:P}),r.removeAttribute(t)}else t.startsWith(s)&&(h.push({type:6,index:o}),r.removeAttribute(t));if($.test(r.tagName)){const t=r.textContent.split(s),e=t.length-1;if(e>0){r.textContent=n?n.emptyScript:"";for(let i=0;i<e;i++)r.append(t[i],d()),T.nextNode(),h.push({type:2,index:++o});r.append(t[e],d())}}}else if(8===r.nodeType)if(r.data===c)h.push({type:2,index:o});else{let t=-1;for(;-1!==(t=r.data.indexOf(s,t+1));)h.push({type:7,index:o}),t+=s.length-1}o++}}static createElement(t,e){const i=u.createElement("template");return i.innerHTML=t,i}}function I(t,e,i=t,r){if(e===E)return e;let n=void 0!==r?i.o?.[r]:i.l;const o=h(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(t),n._$AT(t,i,r)),void 0!==r?(i.o??=[])[r]=n:i.l=n),void 0!==n&&(e=I(t,n._$AS(t,e.values),n,r)),e}class j{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??u).importNode(e,!0);T.currentNode=r;let n=T.nextNode(),o=0,a=0,s=i[0];for(;void 0!==s;){if(o===s.index){let e;2===s.type?e=new L(n,n.nextSibling,this,t):1===s.type?e=new s.ctor(n,s.name,s.strings,this,t):6===s.type&&(e=new z(n,this,t)),this._$AV.push(e),s=i[++a]}o!==s?.index&&(n=T.nextNode(),o++)}return T.currentNode=u,r}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class L{get _$AU(){return this._$AM?._$AU??this.v}constructor(t,e,i,r){this.type=2,this._$AH=D,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this.v=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=I(this,t,e),h(t)?t===D||null==t||""===t?(this._$AH!==D&&this._$AR(),this._$AH=D):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):p(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==D&&h(this._$AH)?this._$AA.nextSibling.data=t:this.T(u.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,r="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=N.createElement(k(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(e);else{const t=new j(r,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=C.get(t.strings);return void 0===e&&C.set(t.strings,e=new N(t)),e}k(t){m(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const n of t)r===e.length?e.push(i=new L(this.O(d()),this.O(d()),this,this.options)):i=e[r],i._$AI(n),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this.v=t,this._$AP?.(t))}}class P{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,n){this.type=1,this._$AH=D,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=D}_$AI(t,e=this,i,r){const n=this.strings;let o=!1;if(void 0===n)t=I(this,t,e,0),o=!h(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else{const r=t;let a,s;for(t=n[0],a=0;a<n.length-1;a++)s=I(this,r[i+a],e,a),s===E&&(s=this._$AH[a]),o||=!h(s)||s!==this._$AH[a],s===D?t=D:t!==D&&(t+=(s??"")+n[a+1]),this._$AH[a]=s}o&&!r&&this.j(t)}j(t){t===D?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class U extends P{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===D?void 0:t}}class R extends P{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==D)}}class F extends P{constructor(t,e,i,r,n){super(t,e,i,r,n),this.type=5}_$AI(t,e=this){if((t=I(this,t,e,0)??D)===E)return;const i=this._$AH,r=t===D&&i!==D||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==D&&(i===D||r);r&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class z{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){I(this,t)}}const H={M:a,P:s,A:c,C:1,L:O,R:j,D:p,V:I,I:L,H:P,N:R,U:F,B:U,F:z},V=r.litHtmlPolyfillSupport;V?.(N,L),(r.litHtmlVersions??=[]).push("3.2.0");const B=(t,e,i)=>{const r=i?.renderBefore??e;let n=r._$litPart$;if(void 0===n){const t=i?.renderBefore??null;r._$litPart$=n=new L(e.insertBefore(d(),t),t,void 0,i??{})}return n._$AI(t),n}},924:(t,e,i)=>{i.r(e),i.d(e,{customElement:()=>r,eventOptions:()=>l,property:()=>s,query:()=>d,queryAll:()=>m,queryAssignedElements:()=>f,queryAssignedNodes:()=>g,queryAsync:()=>p,standardProperty:()=>a,state:()=>c});const r=t=>(e,i)=>{void 0!==i?i.addInitializer((()=>{customElements.define(t,e)})):customElements.define(t,e)};var n=i(842);const o={attribute:!0,type:String,converter:n.W3,reflect:!1,hasChanged:n.Ec},a=(t=o,e,i)=>{const{kind:r,metadata:n}=i;let a=globalThis.litPropertyMetadata.get(n);if(void 0===a&&globalThis.litPropertyMetadata.set(n,a=new Map),a.set(i.name,t),"accessor"===r){const{name:r}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(r,n,t)},init(e){return void 0!==e&&this.P(r,void 0,t),e}}}if("setter"===r){const{name:r}=i;return function(i){const n=this[r];e.call(this,i),this.requestUpdate(r,n,t)}}throw Error("Unsupported decorator location: "+r)};function s(t){return(e,i)=>"object"==typeof i?a(t,e,i):((t,e,i)=>{const r=e.hasOwnProperty(i);return e.constructor.createProperty(i,r?{...t,wrapped:!0}:t),r?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function c(t){return s({...t,state:!0,attribute:!1})}function l(t){return(e,i)=>{const r="function"==typeof e?e:e[i];Object.assign(r,t)}}const u=(t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i);function d(t,e){return(i,r,n)=>{const o=e=>e.renderRoot?.querySelector(t)??null;if(e){const{get:t,set:e}="object"==typeof r?i:n??(()=>{const t=Symbol();return{get(){return this[t]},set(e){this[t]=e}}})();return u(i,r,{get(){let i=t.call(this);return void 0===i&&(i=o(this),(null!==i||this.hasUpdated)&&e.call(this,i)),i}})}return u(i,r,{get(){return o(this)}})}}let h;function m(t){return(e,i)=>u(e,i,{get(){return(this.renderRoot??(h??=document.createDocumentFragment())).querySelectorAll(t)}})}function p(t){return(e,i)=>u(e,i,{async get(){return await this.updateComplete,this.renderRoot?.querySelector(t)??null}})}function f(t){return(e,i)=>{const{slot:r,selector:n}=t??{},o="slot"+(r?`[name=${r}]`:":not([name])");return u(e,i,{get(){const e=this.renderRoot?.querySelector(o),i=e?.assignedElements(t)??[];return void 0===n?i:i.filter((t=>t.matches(n)))}})}}function g(t){return(e,i)=>{const{slot:r}=t??{},n="slot"+(r?`[name=${r}]`:":not([name])");return u(e,i,{get(){const e=this.renderRoot?.querySelector(n);return e?.assignedNodes(t)??[]}})}}},534:(t,e,i)=>{i.r(e),i.d(e,{UnsafeHTMLDirective:()=>o,unsafeHTML:()=>a});var r=i(752);class n{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this.t=t,this._$AM=e,this.i=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}class o extends n{constructor(t){if(super(t),this.it=r.s6,2!==t.type)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===r.s6||null==t)return this._t=void 0,this.it=t;if(t===r.c0)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const e=[t];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}}o.directiveName="unsafeHTML",o.resultType=1;const a=(s=o,(...t)=>({_$litDirective$:s,values:t}));var s},337:(t,e,i)=>{i.r(e),i.d(e,{CSSResult:()=>r.BO,LitElement:()=>o,ReactiveElement:()=>r.mN,_$LE:()=>s,_$LH:()=>n.ge,adoptStyles:()=>r.Rf,css:()=>r.AH,defaultConverter:()=>r.W3,getCompatibleStyle:()=>r.sk,html:()=>n.qy,isServer:()=>c,mathml:()=>n.ej,noChange:()=>n.c0,notEqual:()=>r.Ec,nothing:()=>n.s6,render:()=>n.XX,supportsAdoptingStyleSheets:()=>r.qM,svg:()=>n.JW,unsafeCSS:()=>r.iz});var r=i(842),n=i(752);class o extends r.mN{constructor(){super(...arguments),this.renderOptions={host:this},this.o=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.o=(0,n.XX)(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this.o?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this.o?.setConnected(!1)}render(){return n.c0}}o._$litElement$=!0,o.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:o});const a=globalThis.litElementPolyfillSupport;a?.({LitElement:o});const s={_$AK:(t,e,i)=>{t._$AK(e,i)},_$AL:t=>t._$AL};(globalThis.litElementVersions??=[]).push("4.1.0");const c=!1},330:t=>{t.exports=JSON.parse('{"name":"flower-card","version":"2024.9.24","description":"Custom flower card for https://github.com/Olen/homeassistant-plant","keywords":["home-assistant","homeassistant","lovelace","custom-cards"],"module":"flower-card.js","license":"MIT","dependencies":{"@babel/preset-env":"^7.25.4","babel-loader":"^9.2.1","compression-webpack-plugin":"^11.1.0","custom-card-helpers":"^1.9.0","home-assistant-js-websocket":"^9.4.0","lit":"^3.2.0","webpack":"^5.94.0","yarn":"^1.22.22"},"scripts":{"lint":"eslint src/**/*.ts","dev":"webpack -c webpack.config.js","build":"yarn lint && webpack -c webpack.config.js"},"devDependencies":{"@typescript-eslint/eslint-plugin":"^8.6.0","eslint":"^9.10.0","ts-loader":"^9.5.1","typescript":"^5.6.2","webpack-cli":"^5.1.4"}}')}},e={};function i(r){var n=e[r];if(void 0!==n)return n.exports;var o=e[r]={exports:{}};return t[r].call(o.exports,o,o.exports,i),o.exports}i.d=(t,e)=>{for(var r in e)i.o(e,r)&&!i.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},i.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),i.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i(248)})();