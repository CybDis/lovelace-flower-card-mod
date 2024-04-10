/*! For license information please see flower-card.js.LICENSE.txt */
(()=>{"use strict";var e={147:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0});const r=i(356),n=i(239),o=i(516),a=i(167);class s extends n.LitElement{constructor(){super(...arguments),this.controlRenderers={[o.FormControlType.Dropdown]:a.renderDropdown,[o.FormControlType.Radio]:a.renderRadio,[o.FormControlType.Checkboxes]:a.renderCheckboxes,[o.FormControlType.EntityDropdown]:a.renderDropdown,[o.FormControlType.Switch]:a.renderSwitch,[o.FormControlType.Textbox]:a.renderTextbox,[o.FormControlType.Filler]:a.renderFiller}}setConfig(e){this._config=e}set hass(e){this._hass=e}renderForm(e){return n.html`
            <div class="card-config">
                ${e.map((e=>{const t=e.cssClass?`form-row ${e.cssClass}`:"form-row";return e.hidden?"":n.html`
                        <div class="${t}">
                            <label>${e.label}</label>
                            ${e.controls.map((e=>this.renderControl(e)))}
                        </div>
                        `}))}            
            </div>
            `}renderControl(e){const t=this.controlRenderers[e.type];if(!t)throw new Error(`Unsupported control type: ${e.type}`);return t(this,e)}_valueChanged(e){if(!this._config||!this._hass)return;const t=e.target,i=e.detail;if("HA-CHECKBOX"===t.tagName){const e=this._config[t.configValue].indexOf(t.value);t.checked&&e<0?this._config[t.configValue]=[...this._config[t.configValue],t.value]:!t.checked&&e>-1&&(this._config[t.configValue]=[...this._config[t.configValue].slice(0,e),...this._config[t.configValue].slice(e+1)])}else if(t.configValue)if(t.configValue.indexOf(".")>-1){const[e,i]=t.configValue.split(".");this._config={...this._config,[e]:{...this._config[e],[i]:t.checked}}}else this._config={...this._config,[t.configValue]:void 0===t.checked&&(null==i?void 0:i.value)?t.checked||i.value:t.value||t.checked};(0,r.fireEvent)(this,"config-changed",{config:this._config},{bubbles:!0,composed:!0}),this.requestUpdate("_config")}static get styles(){return n.css`
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
        `}}t.default=s},516:(e,t)=>{var i;Object.defineProperty(t,"__esModule",{value:!0}),t.FormControlType=void 0,function(e){e.Dropdown="dropdown",e.Checkbox="checkbox",e.Checkboxes="checkboxes",e.Radio="radio",e.Switch="switch",e.Textbox="textbox",e.Filler="filler",e.EntityDropdown="entity-dropdown"}(i||(t.FormControlType=i={}))},167:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.renderCheckboxes=t.renderRadio=t.renderDropdown=t.renderSwitch=t.renderTextbox=t.renderEntityDropdown=t.renderFiller=void 0;const r=i(239),n=i(770);t.renderFiller=()=>r.html`<div class="form-control"></div>`,t.renderEntityDropdown=(e,t)=>{var i;return r.html`
    <div class="form-control">
        <ha-entity-picker
            label="${t.label}"
            .value="${null!==(i=e._config[t.configValue])&&void 0!==i?i:""}"
            .configValue="${t.configValue}"
            .hass="${e._hass}"
            domain-filter="${t.domain}"
            @change="${e._valueChanged}">
        </ha-entity-picker>
    </div>
    `},t.renderTextbox=(e,t)=>{var i;return r.html`
    <div class="form-control">
        <ha-textfield
            label="${t.label}"
            .value="${null!==(i=e._config[t.configValue])&&void 0!==i?i:""}"
            .configValue="${t.configValue}"
            @change="${e._valueChanged}">
        </ha-textfield>
    </div>
    `},t.renderSwitch=(e,t)=>r.html`
    <div class="form-control">
        <ha-switch
            id="${t.configValue}"
            name="${t.configValue}"
            .checked="${e._config[t.configValue]}"
            .configValue="${t.configValue}"
            @change="${e._valueChanged}"
        >
        </ha-switch>
        <label for="${t.configValue}">${t.label}</label>
    </div>
    `,t.renderDropdown=(e,t)=>{var i;const o=null!==(i=t.items)&&void 0!==i?i:(0,n.getEntitiesByDomain)(e._hass,t.domain);return r.html`  
    <div class="form-control">
        <ha-combo-box
            label="${t.label}"
            .value="${e._config[t.configValue]}"
            .configValue="${t.configValue}"
            .items="${o}"
            @value-changed="${e._valueChanged}"
            @change=${e._valueChanged}
        ></ha-combo-box>
    </div>
      `},t.renderRadio=(e,t)=>r.html`
        <div class="form-control">
            <label>${t.label}</label>
            ${t.items.map((i=>r.html`
                    <ha-radio
                        id="${t.configValue}_${i.value}"
                        name="${t.configValue}"
                        .checked="${e._config[t.configValue]===i.value}"
                        .configValue="${t.configValue}"
                        .value="${i.value}"
                        @change="${e._valueChanged}"
                    >
                    </ha-radio>
                    <label for="${t.configValue}_${i.value}">${i.label}</label>
                `))}
        </div>
      `,t.renderCheckboxes=(e,t)=>r.html`
        <label>${t.label}</label>
        ${t.items.map((i=>{var n;return r.html`                
            <div class="form-control">
                <ha-checkbox
                    id="${t.configValue}_${i.value}"
                    name="${t.configValue}[]"
                    .checked="${(null===(n=e._config[t.configValue])||void 0===n?void 0:n.indexOf(i.value))>-1}"
                    .configValue="${t.configValue}"
                    .value="${i.value}"
                    @change="${e._valueChanged}"
                >
                </ha-checkbox>
                <label for="${t.configValue}_${i.value}">${i.label}</label>
            </div>
            `}))}
      `},770:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getDropdownOptionsFromEnum=t.formatList=t.getEntitiesByDeviceClass=t.getEntitiesByDomain=void 0,t.getEntitiesByDomain=(e,i)=>Object.keys(e.states).filter((e=>e.substr(0,e.indexOf("."))===i)).map((i=>(0,t.formatList)(i,e))),t.getEntitiesByDeviceClass=(e,i,r)=>Object.keys(e.states).filter((t=>t.substr(0,t.indexOf("."))===i&&e.states[t].attributes.device_class===r)).map((i=>(0,t.formatList)(i,e))),t.formatList=(e,t)=>({label:t.states[e].attributes.friendly_name,value:e}),t.getDropdownOptionsFromEnum=e=>{const t=[];for(const[i,r]of Object.entries(e))t.push({value:r,label:i});return t}},356:(e,t,i)=>{i.r(t),i.d(t,{DEFAULT_DOMAIN_ICON:()=>J,DEFAULT_PANEL:()=>K,DEFAULT_VIEW_ENTITY_ID:()=>se,DOMAINS_HIDE_MORE_INFO:()=>te,DOMAINS_MORE_INFO_NO_HISTORY:()=>ie,DOMAINS_TOGGLE:()=>ne,DOMAINS_WITH_CARD:()=>G,DOMAINS_WITH_MORE_INFO:()=>ee,NumberFormat:()=>r,STATES_OFF:()=>re,TimeFormat:()=>n,UNIT_C:()=>oe,UNIT_F:()=>ae,applyThemesOnElement:()=>U,computeCardSize:()=>F,computeDomain:()=>P,computeEntity:()=>z,computeRTL:()=>H,computeRTLDirection:()=>V,computeStateDisplay:()=>Z,computeStateDomain:()=>B,createThing:()=>de,debounce:()=>he,domainIcon:()=>pe,evaluateFilter:()=>fe,fireEvent:()=>le,fixedIcons:()=>me,formatDate:()=>u,formatDateMonth:()=>y,formatDateMonthYear:()=>g,formatDateNumeric:()=>h,formatDateShort:()=>p,formatDateTime:()=>A,formatDateTimeNumeric:()=>M,formatDateTimeWithSeconds:()=>E,formatDateWeekday:()=>l,formatDateYear:()=>_,formatNumber:()=>X,formatTime:()=>D,formatTimeWeekday:()=>O,formatTimeWithSeconds:()=>T,forwardHaptic:()=>ge,getLovelace:()=>Me,handleAction:()=>we,handleActionConfig:()=>_e,handleClick:()=>$e,hasAction:()=>Ae,hasConfigOrEntityChanged:()=>xe,hasDoubleClick:()=>Ee,isNumericState:()=>W,navigate:()=>ve,numberFormatToLocale:()=>q,relativeTime:()=>j,round:()=>Q,stateIcon:()=>ke,timerTimeRemaining:()=>L,toggleEntity:()=>be,turnOnOffEntities:()=>Se,turnOnOffEntity:()=>ye});var r,n,o,a=function(){return a=Object.assign||function(e){for(var t,i=1,r=arguments.length;i<r;i++)for(var n in t=arguments[i])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e},a.apply(this,arguments)},s={second:45,minute:45,hour:22,day:5},l=function(e,t){return c(t).format(e)},c=function(e){return new Intl.DateTimeFormat(e.language,{weekday:"long",month:"long",day:"numeric"})},u=function(e,t){return d(t).format(e)},d=function(e){return new Intl.DateTimeFormat(e.language,{year:"numeric",month:"long",day:"numeric"})},h=function(e,t){return m(t).format(e)},m=function(e){return new Intl.DateTimeFormat(e.language,{year:"numeric",month:"numeric",day:"numeric"})},p=function(e,t){return f(t).format(e)},f=function(e){return new Intl.DateTimeFormat(e.language,{day:"numeric",month:"short"})},g=function(e,t){return v(t).format(e)},v=function(e){return new Intl.DateTimeFormat(e.language,{month:"long",year:"numeric"})},y=function(e,t){return b(t).format(e)},b=function(e){return new Intl.DateTimeFormat(e.language,{month:"long"})},_=function(e,t){return w(t).format(e)},w=function(e){return new Intl.DateTimeFormat(e.language,{year:"numeric"})};(o=r||(r={})).language="language",o.system="system",o.comma_decimal="comma_decimal",o.decimal_comma="decimal_comma",o.space_comma="space_comma",o.none="none",function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(n||(n={}));var $=function(e){if(e.time_format===n.language||e.time_format===n.system){var t=e.time_format===n.language?e.language:void 0,i=(new Date).toLocaleString(t);return i.includes("AM")||i.includes("PM")}return e.time_format===n.am_pm},A=function(e,t){return x(t).format(e)},x=function(e){return new Intl.DateTimeFormat(e.language,{year:"numeric",month:"long",day:"numeric",hour:$(e)?"numeric":"2-digit",minute:"2-digit",hour12:$(e)})},E=function(e,t){return S(t).format(e)},S=function(e){return new Intl.DateTimeFormat(e.language,{year:"numeric",month:"long",day:"numeric",hour:$(e)?"numeric":"2-digit",minute:"2-digit",second:"2-digit",hour12:$(e)})},M=function(e,t){return C(t).format(e)},C=function(e){return new Intl.DateTimeFormat(e.language,{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"2-digit",hour12:$(e)})},D=function(e,t){return k(t).format(e)},k=function(e){return new Intl.DateTimeFormat(e.language,{hour:"numeric",minute:"2-digit",hour12:$(e)})},T=function(e,t){return N(t).format(e)},N=function(e){return new Intl.DateTimeFormat(e.language,{hour:$(e)?"numeric":"2-digit",minute:"2-digit",second:"2-digit",hour12:$(e)})},O=function(e,t){return I(t).format(e)},I=function(e){return new Intl.DateTimeFormat(e.language,{hour:$(e)?"numeric":"2-digit",minute:"2-digit",second:"2-digit",hour12:$(e)})},j=function(e,t,i,r){void 0===r&&(r=!0);var n=function(e,t,i){void 0===t&&(t=Date.now()),void 0===i&&(i={});var r=a(a({},s),i||{}),n=(+e-+t)/1e3;if(Math.abs(n)<r.second)return{value:Math.round(n),unit:"second"};var o=n/60;if(Math.abs(o)<r.minute)return{value:Math.round(o),unit:"minute"};var l=n/3600;if(Math.abs(l)<r.hour)return{value:Math.round(l),unit:"hour"};var c=n/86400;if(Math.abs(c)<r.day)return{value:Math.round(c),unit:"day"};var u=new Date(e),d=new Date(t),h=u.getFullYear()-d.getFullYear();if(Math.round(Math.abs(h))>0)return{value:Math.round(h),unit:"year"};var m=12*h+u.getMonth()-d.getMonth();if(Math.round(Math.abs(m))>0)return{value:Math.round(m),unit:"month"};var p=n/604800;return{value:Math.round(p),unit:"week"}}(e,i);return r?function(e){return new Intl.RelativeTimeFormat(e.language,{numeric:"auto"})}(t).format(n.value,n.unit):Intl.NumberFormat(t.language,{style:"unit",unit:n.unit,unitDisplay:"long"}).format(Math.abs(n.value))};function L(e){var t,i=3600*(t=e.attributes.remaining.split(":").map(Number))[0]+60*t[1]+t[2];if("active"===e.state){var r=(new Date).getTime(),n=new Date(e.last_changed).getTime();i=Math.max(i-(r-n)/1e3,0)}return i}function R(){return(R=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r])}return e}).apply(this,arguments)}var U=function(e,t,i,r){void 0===r&&(r=!1),e._themes||(e._themes={});var n=t.default_theme;("default"===i||i&&t.themes[i])&&(n=i);var o=R({},e._themes);if("default"!==n){var a=t.themes[n];Object.keys(a).forEach((function(t){var i="--"+t;e._themes[i]="",o[i]=a[t]}))}if(e.updateStyles?e.updateStyles(o):window.ShadyCSS&&window.ShadyCSS.styleSubtree(e,o),r){var s=document.querySelector("meta[name=theme-color]");if(s){s.hasAttribute("default-content")||s.setAttribute("default-content",s.getAttribute("content"));var l=o["--primary-color"]||s.getAttribute("default-content");s.setAttribute("content",l)}}},F=function(e){return"function"==typeof e.getCardSize?e.getCardSize():4};function P(e){return e.substr(0,e.indexOf("."))}function z(e){return e.substr(e.indexOf(".")+1)}function H(e){var t,i=(null==e||null==(t=e.locale)?void 0:t.language)||"en";return e.translationMetadata.translations[i]&&e.translationMetadata.translations[i].isRTL||!1}function V(e){return H(e)?"rtl":"ltr"}function B(e){return P(e.entity_id)}var W=function(e){return!!e.attributes.unit_of_measurement||!!e.attributes.state_class},q=function(e){switch(e.number_format){case r.comma_decimal:return["en-US","en"];case r.decimal_comma:return["de","es","it"];case r.space_comma:return["fr","sv","cs"];case r.system:return;default:return e.language}},Q=function(e,t){return void 0===t&&(t=2),Math.round(e*Math.pow(10,t))/Math.pow(10,t)},X=function(e,t,i){var n=t?q(t):void 0;if(Number.isNaN=Number.isNaN||function e(t){return"number"==typeof t&&e(t)},(null==t?void 0:t.number_format)!==r.none&&!Number.isNaN(Number(e))&&Intl)try{return new Intl.NumberFormat(n,Y(e,i)).format(Number(e))}catch(t){return console.error(t),new Intl.NumberFormat(void 0,Y(e,i)).format(Number(e))}return"string"==typeof e?e:Q(e,null==i?void 0:i.maximumFractionDigits).toString()+("currency"===(null==i?void 0:i.style)?" "+i.currency:"")},Y=function(e,t){var i=R({maximumFractionDigits:2},t);if("string"!=typeof e)return i;if(!t||!t.minimumFractionDigits&&!t.maximumFractionDigits){var r=e.indexOf(".")>-1?e.split(".")[1].length:0;i.minimumFractionDigits=r,i.maximumFractionDigits=r}return i},Z=function(e,t,i,r){var n=void 0!==r?r:t.state;if("unknown"===n||"unavailable"===n)return e("state.default."+n);if(W(t)){if("monetary"===t.attributes.device_class)try{return X(n,i,{style:"currency",currency:t.attributes.unit_of_measurement})}catch(e){}return X(n,i)+(t.attributes.unit_of_measurement?" "+t.attributes.unit_of_measurement:"")}var o=B(t);if("input_datetime"===o){var a;if(void 0===r)return t.attributes.has_date&&t.attributes.has_time?(a=new Date(t.attributes.year,t.attributes.month-1,t.attributes.day,t.attributes.hour,t.attributes.minute),A(a,i)):t.attributes.has_date?(a=new Date(t.attributes.year,t.attributes.month-1,t.attributes.day),u(a,i)):t.attributes.has_time?((a=new Date).setHours(t.attributes.hour,t.attributes.minute),D(a,i)):t.state;try{var s=r.split(" ");if(2===s.length)return A(new Date(s.join("T")),i);if(1===s.length){if(r.includes("-"))return u(new Date(r+"T00:00"),i);if(r.includes(":")){var l=new Date;return D(new Date(l.toISOString().split("T")[0]+"T"+r),i)}}return r}catch(e){return r}}return"humidifier"===o&&"on"===n&&t.attributes.humidity?t.attributes.humidity+" %":"counter"===o||"number"===o||"input_number"===o?X(n,i):t.attributes.device_class&&e("component."+o+".state."+t.attributes.device_class+"."+n)||e("component."+o+".state._."+n)||n},J="mdi:bookmark",K="lovelace",G=["climate","cover","configurator","input_select","input_number","input_text","lock","media_player","scene","script","timer","vacuum","water_heater","weblink"],ee=["alarm_control_panel","automation","camera","climate","configurator","cover","fan","group","history_graph","input_datetime","light","lock","media_player","script","sun","updater","vacuum","water_heater","weather"],te=["input_number","input_select","input_text","scene","weblink"],ie=["camera","configurator","history_graph","scene"],re=["closed","locked","off"],ne=new Set(["fan","input_boolean","light","switch","group","automation"]),oe="°C",ae="°F",se="group.default_view",le=function(e,t,i,r){r=r||{},i=null==i?{}:i;var n=new Event(t,{bubbles:void 0===r.bubbles||r.bubbles,cancelable:Boolean(r.cancelable),composed:void 0===r.composed||r.composed});return n.detail=i,e.dispatchEvent(n),n},ce=new Set(["call-service","divider","section","weblink","cast","select"]),ue={alert:"toggle",automation:"toggle",climate:"climate",cover:"cover",fan:"toggle",group:"group",input_boolean:"toggle",input_number:"input-number",input_select:"input-select",input_text:"input-text",light:"toggle",lock:"lock",media_player:"media-player",remote:"toggle",scene:"scene",script:"script",sensor:"sensor",timer:"timer",switch:"toggle",vacuum:"toggle",water_heater:"climate",input_datetime:"input-datetime"},de=function(e,t){void 0===t&&(t=!1);var i=function(e,t){return r("hui-error-card",{type:"error",error:e,config:t})},r=function(e,t){var r=window.document.createElement(e);try{if(!r.setConfig)return;r.setConfig(t)}catch(r){return console.error(e,r),i(r.message,t)}return r};if(!e||"object"!=typeof e||!t&&!e.type)return i("No type defined",e);var n=e.type;if(n&&n.startsWith("custom:"))n=n.substr(7);else if(t)if(ce.has(n))n="hui-"+n+"-row";else{if(!e.entity)return i("Invalid config given.",e);var o=e.entity.split(".",1)[0];n="hui-"+(ue[o]||"text")+"-entity-row"}else n="hui-"+n+"-card";if(customElements.get(n))return r(n,e);var a=i("Custom element doesn't exist: "+e.type+".",e);a.style.display="None";var s=setTimeout((function(){a.style.display=""}),2e3);return customElements.whenDefined(e.type).then((function(){clearTimeout(s),le(a,"ll-rebuild",{},a)})),a},he=function(e,t,i){var r;return void 0===i&&(i=!1),function(){var n=[].slice.call(arguments),o=this,a=i&&!r;clearTimeout(r),r=setTimeout((function(){r=null,i||e.apply(o,n)}),t),a&&e.apply(o,n)}},me={alert:"mdi:alert",automation:"mdi:playlist-play",calendar:"mdi:calendar",camera:"mdi:video",climate:"mdi:thermostat",configurator:"mdi:settings",conversation:"mdi:text-to-speech",device_tracker:"mdi:account",fan:"mdi:fan",group:"mdi:google-circles-communities",history_graph:"mdi:chart-line",homeassistant:"mdi:home-assistant",homekit:"mdi:home-automation",image_processing:"mdi:image-filter-frames",input_boolean:"mdi:drawing",input_datetime:"mdi:calendar-clock",input_number:"mdi:ray-vertex",input_select:"mdi:format-list-bulleted",input_text:"mdi:textbox",light:"mdi:lightbulb",mailbox:"mdi:mailbox",notify:"mdi:comment-alert",person:"mdi:account",plant:"mdi:flower",proximity:"mdi:apple-safari",remote:"mdi:remote",scene:"mdi:google-pages",script:"mdi:file-document",sensor:"mdi:eye",simple_alarm:"mdi:bell",sun:"mdi:white-balance-sunny",switch:"mdi:flash",timer:"mdi:timer",updater:"mdi:cloud-upload",vacuum:"mdi:robot-vacuum",water_heater:"mdi:thermometer",weblink:"mdi:open-in-new"};function pe(e,t){if(e in me)return me[e];switch(e){case"alarm_control_panel":switch(t){case"armed_home":return"mdi:bell-plus";case"armed_night":return"mdi:bell-sleep";case"disarmed":return"mdi:bell-outline";case"triggered":return"mdi:bell-ring";default:return"mdi:bell"}case"binary_sensor":return t&&"off"===t?"mdi:radiobox-blank":"mdi:checkbox-marked-circle";case"cover":return"closed"===t?"mdi:window-closed":"mdi:window-open";case"lock":return t&&"unlocked"===t?"mdi:lock-open":"mdi:lock";case"media_player":return t&&"off"!==t&&"idle"!==t?"mdi:cast-connected":"mdi:cast";case"zwave":switch(t){case"dead":return"mdi:emoticon-dead";case"sleeping":return"mdi:sleep";case"initializing":return"mdi:timer-sand";default:return"mdi:z-wave"}default:return console.warn("Unable to find icon for domain "+e+" ("+t+")"),"mdi:bookmark"}}var fe=function(e,t){var i=t.value||t,r=t.attribute?e.attributes[t.attribute]:e.state;switch(t.operator||"=="){case"==":return r===i;case"<=":return r<=i;case"<":return r<i;case">=":return r>=i;case">":return r>i;case"!=":return r!==i;case"regex":return r.match(i);default:return!1}},ge=function(e){le(window,"haptic",e)},ve=function(e,t,i){void 0===i&&(i=!1),i?history.replaceState(null,"",t):history.pushState(null,"",t),le(window,"location-changed",{replace:i})},ye=function(e,t,i){void 0===i&&(i=!0);var r,n=P(t),o="group"===n?"homeassistant":n;switch(n){case"lock":r=i?"unlock":"lock";break;case"cover":r=i?"open_cover":"close_cover";break;default:r=i?"turn_on":"turn_off"}return e.callService(o,r,{entity_id:t})},be=function(e,t){var i=re.includes(e.states[t].state);return ye(e,t,i)},_e=function(e,t,i,r){if(r||(r={action:"more-info"}),!r.confirmation||r.confirmation.exemptions&&r.confirmation.exemptions.some((function(e){return e.user===t.user.id}))||(ge("warning"),confirm(r.confirmation.text||"Are you sure you want to "+r.action+"?")))switch(r.action){case"more-info":(i.entity||i.camera_image)&&le(e,"hass-more-info",{entityId:i.entity?i.entity:i.camera_image});break;case"navigate":r.navigation_path&&ve(0,r.navigation_path);break;case"url":r.url_path&&window.open(r.url_path);break;case"toggle":i.entity&&(be(t,i.entity),ge("success"));break;case"call-service":if(!r.service)return void ge("failure");var n=r.service.split(".",2);t.callService(n[0],n[1],r.service_data,r.target),ge("success");break;case"fire-dom-event":le(e,"ll-custom",r)}},we=function(e,t,i,r){var n;"double_tap"===r&&i.double_tap_action?n=i.double_tap_action:"hold"===r&&i.hold_action?n=i.hold_action:"tap"===r&&i.tap_action&&(n=i.tap_action),_e(e,t,i,n)},$e=function(e,t,i,r,n){var o;if(n&&i.double_tap_action?o=i.double_tap_action:r&&i.hold_action?o=i.hold_action:!r&&i.tap_action&&(o=i.tap_action),o||(o={action:"more-info"}),!o.confirmation||o.confirmation.exemptions&&o.confirmation.exemptions.some((function(e){return e.user===t.user.id}))||confirm(o.confirmation.text||"Are you sure you want to "+o.action+"?"))switch(o.action){case"more-info":(o.entity||i.entity||i.camera_image)&&(le(e,"hass-more-info",{entityId:o.entity?o.entity:i.entity?i.entity:i.camera_image}),o.haptic&&ge(o.haptic));break;case"navigate":o.navigation_path&&(ve(0,o.navigation_path),o.haptic&&ge(o.haptic));break;case"url":o.url_path&&window.open(o.url_path),o.haptic&&ge(o.haptic);break;case"toggle":i.entity&&(be(t,i.entity),o.haptic&&ge(o.haptic));break;case"call-service":if(!o.service)return;var a=o.service.split(".",2),s=a[0],l=a[1],c=R({},o.service_data);"entity"===c.entity_id&&(c.entity_id=i.entity),t.callService(s,l,c,o.target),o.haptic&&ge(o.haptic);break;case"fire-dom-event":le(e,"ll-custom",o),o.haptic&&ge(o.haptic)}};function Ae(e){return void 0!==e&&"none"!==e.action}function xe(e,t,i){if(t.has("config")||i)return!0;if(e.config.entity){var r=t.get("hass");return!r||r.states[e.config.entity]!==e.hass.states[e.config.entity]}return!1}function Ee(e){return void 0!==e&&"none"!==e.action}var Se=function(e,t,i){void 0===i&&(i=!0);var r={};t.forEach((function(t){if(re.includes(e.states[t].state)===i){var n=P(t),o=["cover","lock"].includes(n)?n:"homeassistant";o in r||(r[o]=[]),r[o].push(t)}})),Object.keys(r).forEach((function(t){var n;switch(t){case"lock":n=i?"unlock":"lock";break;case"cover":n=i?"open_cover":"close_cover";break;default:n=i?"turn_on":"turn_off"}e.callService(t,n,{entity_id:r[t]})}))},Me=function(){var e=document.querySelector("home-assistant");if(e=(e=(e=(e=(e=(e=(e=(e=e&&e.shadowRoot)&&e.querySelector("home-assistant-main"))&&e.shadowRoot)&&e.querySelector("app-drawer-layout partial-panel-resolver"))&&e.shadowRoot||e)&&e.querySelector("ha-panel-lovelace"))&&e.shadowRoot)&&e.querySelector("hui-root")){var t=e.lovelace;return t.current_view=e.___curView,t}return null},Ce={humidity:"mdi:water-percent",illuminance:"mdi:brightness-5",temperature:"mdi:thermometer",pressure:"mdi:gauge",power:"mdi:flash",signal_strength:"mdi:wifi"},De={binary_sensor:function(e,t){var i="off"===e;switch(null==t?void 0:t.attributes.device_class){case"battery":return i?"mdi:battery":"mdi:battery-outline";case"battery_charging":return i?"mdi:battery":"mdi:battery-charging";case"cold":return i?"mdi:thermometer":"mdi:snowflake";case"connectivity":return i?"mdi:server-network-off":"mdi:server-network";case"door":return i?"mdi:door-closed":"mdi:door-open";case"garage_door":return i?"mdi:garage":"mdi:garage-open";case"power":case"plug":return i?"mdi:power-plug-off":"mdi:power-plug";case"gas":case"problem":case"safety":case"tamper":return i?"mdi:check-circle":"mdi:alert-circle";case"smoke":return i?"mdi:check-circle":"mdi:smoke";case"heat":return i?"mdi:thermometer":"mdi:fire";case"light":return i?"mdi:brightness-5":"mdi:brightness-7";case"lock":return i?"mdi:lock":"mdi:lock-open";case"moisture":return i?"mdi:water-off":"mdi:water";case"motion":return i?"mdi:walk":"mdi:run";case"occupancy":case"presence":return i?"mdi:home-outline":"mdi:home";case"opening":return i?"mdi:square":"mdi:square-outline";case"running":return i?"mdi:stop":"mdi:play";case"sound":return i?"mdi:music-note-off":"mdi:music-note";case"update":return i?"mdi:package":"mdi:package-up";case"vibration":return i?"mdi:crop-portrait":"mdi:vibrate";case"window":return i?"mdi:window-closed":"mdi:window-open";default:return i?"mdi:radiobox-blank":"mdi:checkbox-marked-circle"}},cover:function(e){var t="closed"!==e.state;switch(e.attributes.device_class){case"garage":return t?"mdi:garage-open":"mdi:garage";case"door":return t?"mdi:door-open":"mdi:door-closed";case"shutter":return t?"mdi:window-shutter-open":"mdi:window-shutter";case"blind":return t?"mdi:blinds-open":"mdi:blinds";case"window":return t?"mdi:window-open":"mdi:window-closed";default:return pe("cover",e.state)}},sensor:function(e){var t=e.attributes.device_class;if(t&&t in Ce)return Ce[t];if("battery"===t){var i=Number(e.state);if(isNaN(i))return"mdi:battery-unknown";var r=10*Math.round(i/10);return r>=100?"mdi:battery":r<=0?"mdi:battery-alert":"hass:battery-"+r}var n=e.attributes.unit_of_measurement;return"°C"===n||"°F"===n?"mdi:thermometer":pe("sensor")},input_datetime:function(e){return e.attributes.has_date?e.attributes.has_time?pe("input_datetime"):"mdi:calendar":"mdi:clock"}},ke=function(e){if(!e)return"mdi:bookmark";if(e.attributes.icon)return e.attributes.icon;var t=P(e.entity_id);return t in De?De[t](e):pe(t,e.state)}},43:function(e,t,i){var r=this&&this.__decorate||function(e,t,i,r){var n,o=arguments.length,a=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,r);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(o<3?n(a):o>3?n(t,i,a):n(t,i))||a);return o>3&&a&&Object.defineProperty(t,i,a),a};Object.defineProperty(t,"__esModule",{value:!0}),t.FlowerCardEditor=void 0;const n=i(239),o=i(854),a=i(139),s=i(147),l=i(516),c=i(770),u=i(770);let d=class extends s.default{render(){if(!this._hass||!this._config)return n.html``;Object.prototype.hasOwnProperty.call(this._config,"show_bars")||(this._config.show_bars=a.default_show_bars);const e=(0,c.getEntitiesByDomain)(this._hass,"plant"),t=(0,u.getEntitiesByDeviceClass)(this._hass,"sensor","battery");return this.renderForm([{controls:[{label:"Display Type",configValue:"display_type",type:l.FormControlType.Radio,items:[{label:"Full",value:o.DisplayType.Full},{label:"Compact",value:o.DisplayType.Compact}]}]},{controls:[{label:"Entity",configValue:"entity",type:l.FormControlType.Dropdown,items:e}]},{controls:[{label:"Name",configValue:"name",type:l.FormControlType.Textbox}]},{controls:[{label:"Battery Sensor",configValue:"battery_sensor",type:l.FormControlType.Dropdown,items:t}]},{controls:[{label:"Hide Species",configValue:"hide_species",type:l.FormControlType.Switch}]},{controls:[{label:"Show Bars",configValue:"show_bars",type:l.FormControlType.Checkboxes,items:a.plantAttributes}]}])}};t.FlowerCardEditor=d,t.FlowerCardEditor=d=r([(0,n.customElement)("flower-card-editor")],d)},248:function(e,t,i){var r=this&&this.__decorate||function(e,t,i,r){var n,o=arguments.length,a=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,r);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(o<3?n(a):o>3?n(t,i,a):n(t,i))||a);return o>3&&a&&Object.defineProperty(t,i,a),a},n=this&&this.__awaiter||function(e,t,i,r){return new(i||(i=Promise))((function(n,o){function a(e){try{l(r.next(e))}catch(e){o(e)}}function s(e){try{l(r.throw(e))}catch(e){o(e)}}function l(e){var t;e.done?n(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(a,s)}l((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const o=i(239),a=i(800),s=i(854),l=i(330),c=i(429),u=i(139),d=i(135);console.info(`%c FLOWER-CARD %c ${l.version}`,"color: cyan; background: black; font-weight: bold;","color: darkblue; background: white; font-weight: bold;"),window.customCards=window.customCards||[],window.customCards.push({type:u.CARD_NAME,name:"Flower card",preview:!0,description:"Custom flower card for https://github.com/Olen/homeassistant-plant"});let h=class extends o.LitElement{set hass(e){var t,i;this._hass=e,this.stateObj=(null===(t=this.config)||void 0===t?void 0:t.entity)?e.states[this.config.entity]:void 0,!(null===(i=this.config)||void 0===i?void 0:i.name)&&this.stateObj&&(this.config=Object.assign(Object.assign({},this.config),{name:this.stateObj.attributes.friendly_name})),this.previousFetchDate||(this.previousFetchDate=0),Date.now()>this.previousFetchDate+1e3&&(this.previousFetchDate=Date.now(),this.get_data(e).then((()=>{this.requestUpdate()})))}static getConfigElement(){return n(this,void 0,void 0,(function*(){return yield Promise.resolve().then((()=>i(43))),document.createElement(u.CARD_EDITOR_NAME)}))}static getStubConfig(e){const t=Object.values(e.states).filter((e=>0===e.entity_id.indexOf("plant.")));return{entity:t.length>0?t[0].entity_id:"plant.my_plant",battery_sensor:"sensor.myflower_battery",show_bars:u.default_show_bars}}setConfig(e){if(!e.entity)throw new Error("You need to define an entity");this.config=e}render(){if(!this.config||!this._hass)return o.html``;if(!this.stateObj)return o.html`
                <hui-warning>
                Entity not available: ${this.config.entity}
                </hui-warning>
              `;const e=this.stateObj.attributes.species,t=void 0!==this.config.hide_species&&this.config.hide_species,i=this.config.display_type===s.DisplayType.Compact?"header-compact":"header",r=this.config.display_type===s.DisplayType.Compact?"":"card-margin-top";return o.html`
            <ha-card class="${r}">
            <div class="${i}" @click="${()=>(0,d.moreInfo)(this,this.stateObj.entity_id)}">
                <img src="${this.stateObj.attributes.entity_picture?this.stateObj.attributes.entity_picture:u.missingImage}">
                <span id="name"> ${this.config.name} <ha-icon .icon="mdi:${"problem"==this.stateObj.state.toLowerCase()?"alert-circle-outline":""}"></ha-icon>
                </span>
                <span id="battery">${(0,c.renderBattery)(this.config,this._hass)}</span>
                ${t?"":o.html`<span id="species">${e} </span>`}
            </div>
            <div class="divider"></div>
            ${(0,c.renderAttributes)(this)}
            </ha-card>
            `}get_data(e){return n(this,void 0,void 0,(function*(){var t;try{this.plantinfo=yield e.callWS({type:"plant/get_info",entity_id:null===(t=this.config)||void 0===t?void 0:t.entity})}catch(e){this.plantinfo={result:{}}}}))}getCardSize(){return 5}static get styles(){return a.style}};r([(0,o.property)()],h.prototype,"_hass",void 0),r([(0,o.property)()],h.prototype,"config",void 0),h=r([(0,o.customElement)(u.CARD_NAME)],h),t.default=h},800:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.style=void 0;const r=i(399);t.style=r.css`
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
`},854:(e,t)=>{var i;Object.defineProperty(t,"__esModule",{value:!0}),t.DisplayType=void 0,function(e){e.Full="full",e.Compact="compact"}(i||(t.DisplayType=i={}))},429:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.renderAttributeChunks=t.getChunkedDisplayed=t.renderAttribute=t.renderAttributes=t.renderBattery=void 0;const r=i(854),n=i(239),o=i(534),a=i(139),s=i(135);t.renderBattery=(e,t)=>{if(!e.battery_sensor)return n.html``;const i=t.states[e.battery_sensor];if(!i)return n.html``;const r=parseInt(i.state),{icon:o,color:a}=[{threshold:90,icon:"mdi:battery",color:"green"},{threshold:80,icon:"mdi:battery-90",color:"green"},{threshold:70,icon:"mdi:battery-80",color:"green"},{threshold:60,icon:"mdi:battery-70",color:"green"},{threshold:50,icon:"mdi:battery-60",color:"green"},{threshold:40,icon:"mdi:battery-50",color:"green"},{threshold:30,icon:"mdi:battery-40",color:"orange"},{threshold:20,icon:"mdi:battery-30",color:"orange"},{threshold:10,icon:"mdi:battery-20",color:"red"},{threshold:0,icon:"mdi:battery-10",color:"red"},{threshold:-1/0,icon:"mdi:battery-alert-variant-outline",color:"red"}].find((({threshold:e})=>r>e))||{icon:"mdi:battery-alert-variant-outline",color:"red"};return n.html`
        <div class="battery tooltip">
            <div class="tip" style="text-align:center;">${r}%</div>
            <ha-icon .icon="${o}" style="color: ${a}"></ha-icon>
        </div>
    `},t.renderAttributes=e=>{const i={},r={},n={},o={},s={},l={},c={},u=e.config.show_bars||a.default_show_bars;if(e.plantinfo&&e.plantinfo.result){const t=e.plantinfo.result;for(const e of u)if(t[e]){let{max:a,min:u,current:d,icon:h,sensor:m,unit_of_measurement:p}=t[e];a=Number(a),u=Number(u),d=Number(d),h=String(h),m=String(m),p=String(p),o[`max_${e}`]={max:a,min:u},s[e]=d,i[e]=h,l[e]=m,n[e]=p,r[e]=p,"dli"===e&&(n.dli="mol/d⋅m²",r.dli='<math style="display: inline-grid;" xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mfrac><mrow><mn>mol</mn></mrow><mrow><mn>d</mn><mn>⋅</mn><msup><mn>m</mn><mn>2</mn></msup></mrow></mfrac></mrow></math>'),c[e]={name:e,current:d,limits:o[`max_${e}`],icon:h,sensor:m,unit_of_measurement:p}}}return(0,t.renderAttributeChunks)(e,c)},t.renderAttribute=(e,t)=>{const{max:i,min:a}=t.limits,l=t.unit_of_measurement,c=t.icon||"mdi:help-circle-outline",u=t.current||0,d=!isNaN(u),h=100*Math.max(0,Math.min(1,(u-a)/(i-a))),m=d?`${t.name}: ${u} ${l}<br>(${a} ~ ${i} ${l})`:e._hass.localize("state.default.unavailable"),p="dli"===t.name?'<math style="display: inline-grid;" xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mfrac><mrow><mn>mol</mn></mrow><mrow><mn>d</mn><mn>⋅</mn><msup><mn>m</mn><mn>2</mn></msup></mrow></mfrac></mrow></math>':l,f="attribute tooltip "+(e.config.display_type===r.DisplayType.Compact?"width-100":"");return n.html`
        <div class="${f}" @click="${()=>(0,s.moreInfo)(e,t.sensor)}">
            <div class="tip" style="text-align:center;">${(0,o.unsafeHTML)(m)}</div>
            <ha-icon .icon="${c}"></ha-icon>
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
    `},t.getChunkedDisplayed=(e,t)=>Object.values(e).reduce(((e,i,r)=>{const n=Math.floor(r/t);return e[n]||(e[n]=[]),e[n].push(i),e}),[]),t.renderAttributeChunks=(e,i)=>{const o=(0,t.getChunkedDisplayed)(i,e.config.display_type===r.DisplayType.Compact?1:2),a="attributes "+(e.config.display_type===r.DisplayType.Compact?"width-100":"");return o.map((i=>n.html`<div class="${a}">${i.map((i=>i?n.html`${(0,t.renderAttribute)(e,i)}`:""))}</div>`)).flat()}},139:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.plantAttributes=t.missingImage=t.default_show_bars=t.CARD_EDITOR_NAME=t.CARD_NAME=void 0,t.CARD_NAME="flower-card",t.CARD_EDITOR_NAME=`${t.CARD_NAME}-editor`,t.default_show_bars=["moisture","conductivity","temperature","illuminance","humidity","dli"],t.missingImage="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiIGZvY3VzYWJsZT0iZmFsc2UiIHJvbGU9ImltZyIgYXJpYS1oaWRkZW49InRydWUiIHZpZXdCb3g9IjAgMCAyNCAyNCI+CiAgICAgIDxnPgogICAgICA8IS0tP2xpdCQ0MTM0MjMxNjkkLS0+PHBhdGggZD0iTTMsMTNBOSw5IDAgMCwwIDEyLDIyQzEyLDE3IDcuOTcsMTMgMywxM00xMiw1LjVBMi41LDIuNSAwIDAsMSAxNC41LDhBMi41LDIuNSAwIDAsMSAxMiwxMC41QTIuNSwyLjUgMCAwLDEgOS41LDhBMi41LDIuNSAwIDAsMSAxMiw1LjVNNS42LDEwLjI1QTIuNSwyLjUgMCAwLDAgOC4xLDEyLjc1QzguNjMsMTIuNzUgOS4xMiwxMi41OCA5LjUsMTIuMzFDOS41LDEyLjM3IDkuNSwxMi40MyA5LjUsMTIuNUEyLjUsMi41IDAgMCwwIDEyLDE1QTIuNSwyLjUgMCAwLDAgMTQuNSwxMi41QzE0LjUsMTIuNDMgMTQuNSwxMi4zNyAxNC41LDEyLjMxQzE0Ljg4LDEyLjU4IDE1LjM3LDEyLjc1IDE1LjksMTIuNzVDMTcuMjgsMTIuNzUgMTguNCwxMS42MyAxOC40LDEwLjI1QzE4LjQsOS4yNSAxNy44MSw4LjQgMTYuOTcsOEMxNy44MSw3LjYgMTguNCw2Ljc0IDE4LjQsNS43NUMxOC40LDQuMzcgMTcuMjgsMy4yNSAxNS45LDMuMjVDMTUuMzcsMy4yNSAxNC44OCwzLjQxIDE0LjUsMy42OUMxNC41LDMuNjMgMTQuNSwzLjU2IDE0LjUsMy41QTIuNSwyLjUgMCAwLDAgMTIsMUEyLjUsMi41IDAgMCwwIDkuNSwzLjVDOS41LDMuNTYgOS41LDMuNjMgOS41LDMuNjlDOS4xMiwzLjQxIDguNjMsMy4yNSA4LjEsMy4yNUEyLjUsMi41IDAgMCwwIDUuNiw1Ljc1QzUuNiw2Ljc0IDYuMTksNy42IDcuMDMsOEM2LjE5LDguNCA1LjYsOS4yNSA1LjYsMTAuMjVNMTIsMjJBOSw5IDAgMCwwIDIxLDEzQzE2LDEzIDEyLDE3IDEyLDIyWiI+PC9wYXRoPgogICAgICA8L2c+Cjwvc3ZnPgo=",t.plantAttributes=[{label:"Moisture",value:"moisture"},{label:"Conductivity",value:"conductivity"},{label:"Temperature",value:"temperature"},{label:"Illuminance",value:"illuminance"},{label:"Humidity",value:"humidity"},{label:"Daily Light Integral",value:"dli"}]},135:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.moreInfo=t.getStubConfig=t.getConfigElement=void 0;const r=i(356),n=i(139);t.getConfigElement=()=>document.createElement("flower-card-editor"),t.getStubConfig=e=>{const t=Object.values(e.states).filter((e=>0===e.entity_id.indexOf("plant.")));return{entity:t.length>0?t[0].entity_id:"plant.my_plant",battery_sensor:"sensor.myflower_battery",show_bars:n.default_show_bars}},t.moreInfo=(e,t)=>{(0,r.fireEvent)(e,"hass-more-info",{entityId:t},{bubbles:!1,composed:!0})}},842:(e,t,i)=>{i.d(t,{BO:()=>s,mN:()=>w,Rf:()=>u,AH:()=>c,W3:()=>v,sk:()=>d,Ec:()=>y,qM:()=>n,iz:()=>l});const r=window,n=r.ShadowRoot&&(void 0===r.ShadyCSS||r.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),a=new WeakMap;class s{constructor(e,t,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(n&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=a.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(t,e))}return e}toString(){return this.cssText}}const l=e=>new s("string"==typeof e?e:e+"",void 0,o),c=(e,...t)=>{const i=1===e.length?e[0]:t.reduce(((t,i,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[r+1]),e[0]);return new s(i,e,o)},u=(e,t)=>{n?e.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):t.forEach((t=>{const i=document.createElement("style"),n=r.litNonce;void 0!==n&&i.setAttribute("nonce",n),i.textContent=t.cssText,e.appendChild(i)}))},d=n?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return l(t)})(e):e;var h;const m=window,p=m.trustedTypes,f=p?p.emptyScript:"",g=m.reactiveElementPolyfillSupport,v={toAttribute(e,t){switch(t){case Boolean:e=e?f:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},y=(e,t)=>t!==e&&(t==t||e==e),b={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:y},_="finalized";class w extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),(null!==(t=this.h)&&void 0!==t?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,i)=>{const r=this._$Ep(i,t);void 0!==r&&(this._$Ev.set(r,i),e.push(r))})),e}static createProperty(e,t=b){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,r=this.getPropertyDescriptor(e,i,t);void 0!==r&&Object.defineProperty(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(r){const n=this[e];this[t]=r,this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||b}static finalize(){if(this.hasOwnProperty(_))return!1;this[_]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),void 0!==e.h&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(d(e))}else void 0!==e&&t.push(d(e));return t}static _$Ep(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach((e=>e(this)))}addController(e){var t,i;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])}))}createRenderRoot(){var e;const t=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return u(t,this.constructor.elementStyles),t}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)}))}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)}))}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=b){var r;const n=this.constructor._$Ep(e,i);if(void 0!==n&&!0===i.reflect){const o=(void 0!==(null===(r=i.converter)||void 0===r?void 0:r.toAttribute)?i.converter:v).toAttribute(t,i.type);this._$El=e,null==o?this.removeAttribute(n):this.setAttribute(n,o),this._$El=null}}_$AK(e,t){var i;const r=this.constructor,n=r._$Ev.get(e);if(void 0!==n&&this._$El!==n){const e=r.getPropertyOptions(n),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(i=e.converter)||void 0===i?void 0:i.fromAttribute)?e.converter:v;this._$El=n,this[n]=o.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,i){let r=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||y)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,i))):r=!1),!this.isUpdatePending&&r&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((e,t)=>this[t]=e)),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)})),this.update(i)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach((e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach(((e,t)=>this._$EO(t,this[t],e))),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}w[_]=!0,w.elementProperties=new Map,w.elementStyles=[],w.shadowRootOptions={mode:"open"},null==g||g({ReactiveElement:w}),(null!==(h=m.reactiveElementVersions)&&void 0!==h?h:m.reactiveElementVersions=[]).push("1.6.3")},239:(e,t,i)=>{i.r(t),i.d(t,{CSSResult:()=>r.BO,LitElement:()=>o.WF,ReactiveElement:()=>r.mN,UpdatingElement:()=>o.zd,_$LE:()=>o.Zm,_$LH:()=>n.ge,adoptStyles:()=>r.Rf,css:()=>r.AH,customElement:()=>c,decorateProperty:()=>l,defaultConverter:()=>r.W3,eventOptions:()=>p,getCompatibleStyle:()=>r.sk,html:()=>n.qy,legacyPrototypeMethod:()=>a,noChange:()=>n.c0,notEqual:()=>r.Ec,nothing:()=>n.s6,property:()=>h,query:()=>f,queryAll:()=>g,queryAssignedElements:()=>_,queryAssignedNodes:()=>w,queryAsync:()=>v,render:()=>n.XX,standardPrototypeMethod:()=>s,state:()=>m,supportsAdoptingStyleSheets:()=>r.qM,svg:()=>n.JW,unsafeCSS:()=>r.iz});var r=i(842),n=i(752),o=i(228);const a=(e,t,i)=>{Object.defineProperty(t,i,e)},s=(e,t)=>({kind:"method",placement:"prototype",key:t.key,descriptor:e}),l=({finisher:e,descriptor:t})=>(i,r)=>{var n;if(void 0===r){const r=null!==(n=i.originalKey)&&void 0!==n?n:i.key,o=null!=t?{kind:"method",placement:"prototype",key:r,descriptor:t(i.key)}:{...i,key:r};return null!=e&&(o.finisher=function(t){e(t,r)}),o}{const n=i.constructor;void 0!==t&&Object.defineProperty(i,r,t(r)),null==e||e(n,r)}},c=e=>t=>"function"==typeof t?((e,t)=>(customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:i,elements:r}=t;return{kind:i,elements:r,finisher(t){customElements.define(e,t)}}})(e,t),u=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(i){i.createProperty(t.key,e)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}},d=(e,t,i)=>{t.constructor.createProperty(i,e)};function h(e){return(t,i)=>void 0!==i?d(e,t,i):u(e,t)}function m(e){return h({...e,state:!0})}function p(e){return l({finisher:(t,i)=>{Object.assign(t.prototype[i],e)}})}function f(e,t){return l({descriptor:i=>{const r={get(){var t,i;return null!==(i=null===(t=this.renderRoot)||void 0===t?void 0:t.querySelector(e))&&void 0!==i?i:null},enumerable:!0,configurable:!0};if(t){const t="symbol"==typeof i?Symbol():"__"+i;r.get=function(){var i,r;return void 0===this[t]&&(this[t]=null!==(r=null===(i=this.renderRoot)||void 0===i?void 0:i.querySelector(e))&&void 0!==r?r:null),this[t]}}return r}})}function g(e){return l({descriptor:t=>({get(){var t,i;return null!==(i=null===(t=this.renderRoot)||void 0===t?void 0:t.querySelectorAll(e))&&void 0!==i?i:[]},enumerable:!0,configurable:!0})})}function v(e){return l({descriptor:t=>({async get(){var t;return await this.updateComplete,null===(t=this.renderRoot)||void 0===t?void 0:t.querySelector(e)},enumerable:!0,configurable:!0})})}var y;const b=null!=(null===(y=window.HTMLSlotElement)||void 0===y?void 0:y.prototype.assignedElements)?(e,t)=>e.assignedElements(t):(e,t)=>e.assignedNodes(t).filter((e=>e.nodeType===Node.ELEMENT_NODE));function _(e){const{slot:t,selector:i}=null!=e?e:{};return l({descriptor:r=>({get(){var r;const n="slot"+(t?`[name=${t}]`:":not([name])"),o=null===(r=this.renderRoot)||void 0===r?void 0:r.querySelector(n),a=null!=o?b(o,e):[];return i?a.filter((e=>e.matches(i))):a},enumerable:!0,configurable:!0})})}function w(e,t,i){let r,n=e;return"object"==typeof e?(n=e.slot,r=e):r={flatten:t},i?_({slot:n,flatten:t,selector:i}):l({descriptor:e=>({get(){var e,t;const i="slot"+(n?`[name=${n}]`:":not([name])"),o=null===(e=this.renderRoot)||void 0===e?void 0:e.querySelector(i);return null!==(t=null==o?void 0:o.assignedNodes(r))&&void 0!==t?t:[]},enumerable:!0,configurable:!0})})}console.warn("The main 'lit-element' module entrypoint is deprecated. Please update your imports to use the 'lit' package: 'lit' and 'lit/decorators.ts' or import from 'lit-element/lit-element.ts'. See https://lit.dev/msg/deprecated-import-path for more information.")},228:(e,t,i)=>{i.d(t,{AH:()=>o.AH,BO:()=>o.BO,Ec:()=>o.Ec,JW:()=>a.JW,Rf:()=>o.Rf,W3:()=>o.W3,WF:()=>l,XX:()=>a.XX,Zm:()=>u,c0:()=>a.c0,ge:()=>a.ge,iz:()=>o.iz,mN:()=>o.mN,qM:()=>o.qM,qy:()=>a.qy,s6:()=>a.s6,sk:()=>o.sk,zd:()=>s});var r,n,o=i(842),a=i(752);const s=o.mN;class l extends o.mN{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=(0,a.XX)(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return a.c0}}l.finalized=!0,l._$litElement$=!0,null===(r=globalThis.litElementHydrateSupport)||void 0===r||r.call(globalThis,{LitElement:l});const c=globalThis.litElementPolyfillSupport;null==c||c({LitElement:l});const u={_$AK:(e,t,i)=>{e._$AK(t,i)},_$AL:e=>e._$AL};(null!==(n=globalThis.litElementVersions)&&void 0!==n?n:globalThis.litElementVersions=[]).push("3.3.3")},752:(e,t,i)=>{var r;i.d(t,{JW:()=>S,XX:()=>W,c0:()=>M,ge:()=>V,qy:()=>E,s6:()=>C});const n=window,o=n.trustedTypes,a=o?o.createPolicy("lit-html",{createHTML:e=>e}):void 0,s="$lit$",l=`lit$${(Math.random()+"").slice(9)}$`,c="?"+l,u=`<${c}>`,d=document,h=()=>d.createComment(""),m=e=>null===e||"object"!=typeof e&&"function"!=typeof e,p=Array.isArray,f=e=>p(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]),g="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,y=/-->/g,b=/>/g,_=RegExp(`>|${g}(?:([^\\s"'>=/]+)(${g}*=${g}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),w=/'/g,$=/"/g,A=/^(?:script|style|textarea|title)$/i,x=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),E=x(1),S=x(2),M=Symbol.for("lit-noChange"),C=Symbol.for("lit-nothing"),D=new WeakMap,k=d.createTreeWalker(d,129,null,!1);function T(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==a?a.createHTML(t):t}const N=(e,t)=>{const i=e.length-1,r=[];let n,o=2===t?"<svg>":"",a=v;for(let t=0;t<i;t++){const i=e[t];let c,d,h=-1,m=0;for(;m<i.length&&(a.lastIndex=m,d=a.exec(i),null!==d);)m=a.lastIndex,a===v?"!--"===d[1]?a=y:void 0!==d[1]?a=b:void 0!==d[2]?(A.test(d[2])&&(n=RegExp("</"+d[2],"g")),a=_):void 0!==d[3]&&(a=_):a===_?">"===d[0]?(a=null!=n?n:v,h=-1):void 0===d[1]?h=-2:(h=a.lastIndex-d[2].length,c=d[1],a=void 0===d[3]?_:'"'===d[3]?$:w):a===$||a===w?a=_:a===y||a===b?a=v:(a=_,n=void 0);const p=a===_&&e[t+1].startsWith("/>")?" ":"";o+=a===v?i+u:h>=0?(r.push(c),i.slice(0,h)+s+i.slice(h)+l+p):i+l+(-2===h?(r.push(void 0),t):p)}return[T(e,o+(e[i]||"<?>")+(2===t?"</svg>":"")),r]};class O{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let n=0,a=0;const u=e.length-1,d=this.parts,[m,p]=N(e,t);if(this.el=O.createElement(m,i),k.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(r=k.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes()){const e=[];for(const t of r.getAttributeNames())if(t.endsWith(s)||t.startsWith(l)){const i=p[a++];if(e.push(t),void 0!==i){const e=r.getAttribute(i.toLowerCase()+s).split(l),t=/([.?@])?(.*)/.exec(i);d.push({type:1,index:n,name:t[2],strings:e,ctor:"."===t[1]?U:"?"===t[1]?P:"@"===t[1]?z:R})}else d.push({type:6,index:n})}for(const t of e)r.removeAttribute(t)}if(A.test(r.tagName)){const e=r.textContent.split(l),t=e.length-1;if(t>0){r.textContent=o?o.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],h()),k.nextNode(),d.push({type:2,index:++n});r.append(e[t],h())}}}else if(8===r.nodeType)if(r.data===c)d.push({type:2,index:n});else{let e=-1;for(;-1!==(e=r.data.indexOf(l,e+1));)d.push({type:7,index:n}),e+=l.length-1}n++}}static createElement(e,t){const i=d.createElement("template");return i.innerHTML=e,i}}function I(e,t,i=e,r){var n,o,a,s;if(t===M)return t;let l=void 0!==r?null===(n=i._$Co)||void 0===n?void 0:n[r]:i._$Cl;const c=m(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(o=null==l?void 0:l._$AO)||void 0===o||o.call(l,!1),void 0===c?l=void 0:(l=new c(e),l._$AT(e,i,r)),void 0!==r?(null!==(a=(s=i)._$Co)&&void 0!==a?a:s._$Co=[])[r]=l:i._$Cl=l),void 0!==l&&(t=I(e,l._$AS(e,t.values),l,r)),t}class j{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:r}=this._$AD,n=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:d).importNode(i,!0);k.currentNode=n;let o=k.nextNode(),a=0,s=0,l=r[0];for(;void 0!==l;){if(a===l.index){let t;2===l.type?t=new L(o,o.nextSibling,this,e):1===l.type?t=new l.ctor(o,l.name,l.strings,this,e):6===l.type&&(t=new H(o,this,e)),this._$AV.push(t),l=r[++s]}a!==(null==l?void 0:l.index)&&(o=k.nextNode(),a++)}return k.currentNode=d,n}v(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class L{constructor(e,t,i,r){var n;this.type=2,this._$AH=C,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cp=null===(n=null==r?void 0:r.isConnected)||void 0===n||n}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=I(this,e,t),m(e)?e===C||null==e||""===e?(this._$AH!==C&&this._$AR(),this._$AH=C):e!==this._$AH&&e!==M&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):f(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==C&&m(this._$AH)?this._$AA.nextSibling.data=e:this.$(d.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:r}=e,n="number"==typeof r?this._$AC(e):(void 0===r.el&&(r.el=O.createElement(T(r.h,r.h[0]),this.options)),r);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===n)this._$AH.v(i);else{const e=new j(n,this),t=e.u(this.options);e.v(i),this.$(t),this._$AH=e}}_$AC(e){let t=D.get(e.strings);return void 0===t&&D.set(e.strings,t=new O(e)),t}T(e){p(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const n of e)r===t.length?t.push(i=new L(this.k(h()),this.k(h()),this,this.options)):i=t[r],i._$AI(n),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cp=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class R{constructor(e,t,i,r,n){this.type=1,this._$AH=C,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=C}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,r){const n=this.strings;let o=!1;if(void 0===n)e=I(this,e,t,0),o=!m(e)||e!==this._$AH&&e!==M,o&&(this._$AH=e);else{const r=e;let a,s;for(e=n[0],a=0;a<n.length-1;a++)s=I(this,r[i+a],t,a),s===M&&(s=this._$AH[a]),o||(o=!m(s)||s!==this._$AH[a]),s===C?e=C:e!==C&&(e+=(null!=s?s:"")+n[a+1]),this._$AH[a]=s}o&&!r&&this.j(e)}j(e){e===C?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class U extends R{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===C?void 0:e}}const F=o?o.emptyScript:"";class P extends R{constructor(){super(...arguments),this.type=4}j(e){e&&e!==C?this.element.setAttribute(this.name,F):this.element.removeAttribute(this.name)}}class z extends R{constructor(e,t,i,r,n){super(e,t,i,r,n),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=I(this,e,t,0))&&void 0!==i?i:C)===M)return;const r=this._$AH,n=e===C&&r!==C||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,o=e!==C&&(r===C||n);n&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class H{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){I(this,e)}}const V={O:s,P:l,A:c,C:1,M:N,L:j,R:f,D:I,I:L,V:R,H:P,N:z,U,F:H},B=n.litHtmlPolyfillSupport;null==B||B(O,L),(null!==(r=n.litHtmlVersions)&&void 0!==r?r:n.litHtmlVersions=[]).push("2.8.0");const W=(e,t,i)=>{var r,n;const o=null!==(r=null==i?void 0:i.renderBefore)&&void 0!==r?r:t;let a=o._$litPart$;if(void 0===a){const e=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;o._$litPart$=a=new L(t.insertBefore(h(),e),e,void 0,null!=i?i:{})}return a._$AI(e),a}},534:(e,t,i)=>{i.r(t),i.d(t,{UnsafeHTMLDirective:()=>o,unsafeHTML:()=>a});var r=i(752);class n{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}class o extends n{constructor(e){if(super(e),this.et=r.s6,2!==e.type)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===r.s6||null==e)return this.ft=void 0,this.et=e;if(e===r.c0)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.et)return this.ft;this.et=e;const t=[e];return t.raw=t,this.ft={_$litType$:this.constructor.resultType,strings:t,values:[]}}}o.directiveName="unsafeHTML",o.resultType=1;const a=(s=o,(...e)=>({_$litDirective$:s,values:e}));var s},399:(e,t,i)=>{i.r(t),i.d(t,{CSSResult:()=>r.BO,LitElement:()=>r.WF,ReactiveElement:()=>r.mN,UpdatingElement:()=>r.zd,_$LE:()=>r.Zm,_$LH:()=>r.ge,adoptStyles:()=>r.Rf,css:()=>r.AH,defaultConverter:()=>r.W3,getCompatibleStyle:()=>r.sk,html:()=>r.qy,isServer:()=>n,noChange:()=>r.c0,notEqual:()=>r.Ec,nothing:()=>r.s6,render:()=>r.XX,supportsAdoptingStyleSheets:()=>r.qM,svg:()=>r.JW,unsafeCSS:()=>r.iz}),i(842),i(752);var r=i(228);const n=!1},330:e=>{e.exports=JSON.parse('{"name":"flower-card","version":"2024.1.1","description":"Custom flower card for https://github.com/Olen/homeassistant-plant","keywords":["home-assistant","homeassistant","lovelace","custom-cards"],"module":"flower-card.js","license":"MIT","dependencies":{"@marcokreeft/ha-editor-formbuilder":"^2023.10.6","babel-loader":"^9.1.3","compression-webpack-plugin":"^10.0.0","custom-card-helpers":"^1.9.0","home-assistant-js-websocket":"^8.0.1","lit":"^2.8.0","lit-element":"^3.3.3","lit-html":"^2.8.0","webpack":"^5.88.2","yarn":"^1.22.19"},"scripts":{"lint":"eslint src/**/*.ts","dev":"webpack -c webpack.config.js","build":"yarn lint && webpack -c webpack.config.js"},"devDependencies":{"@typescript-eslint/eslint-plugin":"^6.7.2","eslint":"^8.49.0","eslint-config-standard-with-typescript":"^39.0.0","eslint-plugin-import":"^2.28.1","eslint-plugin-n":"^16.1.0","eslint-plugin-promise":"^6.1.1","eslint-plugin-react":"^7.33.2","ts-loader":"^9.4.4","typescript":"^5.2.2","webpack-cli":"^5.1.4"}}')}},t={};function i(r){var n=t[r];if(void 0!==n)return n.exports;var o=t[r]={exports:{}};return e[r].call(o.exports,o,o.exports,i),o.exports}i.d=(e,t)=>{for(var r in t)i.o(t,r)&&!i.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i(248)})();