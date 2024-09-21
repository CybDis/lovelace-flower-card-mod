import { html, css } from 'lit';
import { customElement  } from 'lit/decorators.js';
import { DisplayType } from "./types/flower-card-types";
import { plantAttributes, default_show_bars } from "./utils/constants";
import EditorForm from "@marcokreeft/ha-editor-formbuilder";
import { FormControlType } from "@marcokreeft/ha-editor-formbuilder/dist/interfaces";
import { getEntitiesByDomain, getEntitiesByDeviceClass } from "@marcokreeft/ha-editor-formbuilder/dist/utils/entities";

//import EditorForm from "d:/work/GitHub/ha-editor-formbuilder-mod";
// import { FormControlType } from "d:/work/GitHub/ha-editor-formbuilder-mod/dist/interfaces";
// import { getEntitiesByDomain, getEntitiesByDeviceClass } from "d:/work/GitHub/ha-editor-formbuilder-mod/dist/utils/entities";

@customElement('flower-card-editor')
export class FlowerCardEditor extends EditorForm {

    render() {
        if (!this._hass || !this._config) {
            return html``;
        }

        if (!Object.prototype.hasOwnProperty.call(this._config, 'show_bars')) {
            // Enable all bars by default
            this._config.show_bars = default_show_bars;
        }

         const plantsList =  getEntitiesByDomain(this._hass, 'plant');
         const batteryList = getEntitiesByDeviceClass(this._hass, "sensor", "battery");

        return this.renderForm([
            { controls: [{ label: "Display Type", configValue: "display_type", type: FormControlType.Radio, items: [
                { label: 'Full', value: DisplayType.Full },
                { label: 'Compact', value: DisplayType.Compact },
            ] }] },
            { controls: [{ label: "Entity", configValue: "entity", type: FormControlType.Dropdown, items: plantsList }] },
            { controls: [{ label: "Name", configValue: "name", type: FormControlType.Textbox }] },
            { controls: [{ label: "Battery Sensor", configValue: "battery_sensor", type: FormControlType.Dropdown, items: batteryList }] },
            { controls: [{ label: "Show Bars", configValue: "show_bars", type: FormControlType.Checkboxes, items: plantAttributes }] },
            { controls: [{ label: "Hide Species", configValue: "hide_species", type: FormControlType.Switch }] }
        ]);
    }    

    static get styles() {
        return css`
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
        `;
    }
}
