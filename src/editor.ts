import { html } from 'lit';
import { customElement  } from 'lit/decorators.js';
//import { DisplayType } from "./types/flower-card-types";
import { plantAttributes } from "./utils/constants";
import EditorForm from "@marcokreeft/ha-editor-formbuilder";
import { FormControlType } from "@marcokreeft/ha-editor-formbuilder/dist/interfaces";
//import { getEntitiesByDomain, getEntitiesByDeviceClass } from "@marcokreeft/ha-editor-formbuilder/dist/utils/entities";
import {
    TemplateResult,
    css,
  } from "lit";

// @customElement('flower-card-editor')
// export class FlowerCardEditor extends EditorForm {

//     render() {
//         if (!this._hass || !this._config) {
//             return html``;
//         }

//         if (!Object.prototype.hasOwnProperty.call(this._config, 'show_bars')) {
//             // Enable all bars by default
//             this._config.show_bars = default_show_bars;
//         }

//          const plantsList =  getEntitiesByDomain(this._hass, 'plant');
//          const batteryList = getEntitiesByDeviceClass(this._hass, "sensor", "battery");

//         return this.renderForm([
//             { controls: [{ label: "Display Type", configValue: "display_type", type: FormControlType.Radio, items: [
//                 { label: 'Full', value: DisplayType.Full },
//                 { label: 'Compact', value: DisplayType.Compact },
//             ] }] },
//             { controls: [{ label: "Entity", configValue: "entity", type: FormControlType.Dropdown, items: plantsList }] },
//             { controls: [{ label: "Name", configValue: "name", type: FormControlType.Textbox }] },
//             { controls: [{ label: "Battery Sensor", configValue: "battery_sensor", type: FormControlType.Dropdown, items: batteryList }] },
//             { controls: [{ label: "Hide Species", configValue: "hide_species", type: FormControlType.Switch }] },
//             { controls: [{ label: "Show Bars", configValue: "show_bars", type: FormControlType.Checkboxes, items: plantAttributes }] }
//         ]);
//     }    
// }

@customElement('new-custom-editor')
export class NewCustomEditor extends EditorForm {

    protected render(): TemplateResult {
        if (!this._hass || !this._config) {
            return html``;
        }

        return this.renderForm([
            { controls: [{ label: "Card Type (Required)", configValue: "card_type", type: FormControlType.Dropdown, items: plantAttributes }] },
            { controls: [{ label: "Title", configValue: "title", type: FormControlType.Textbox }] },
            {
                label: "Basic configuration",
                cssClass: 'side-by-side',
                controls: [
                    { label: "Use F1 font", configValue: "f1_font", type: FormControlType.Switch },
                    { label: "Image clickable", configValue: "image_clickable", type: FormControlType.Switch },
                    { label: "Show carnumber", configValue: "show_carnumber", type: FormControlType.Switch },
                    { label: "Location clickable", configValue: "location_clickable", type: FormControlType.Switch },
                    { label: "Show race information", configValue: "show_raceinfo", type: FormControlType.Switch },
                    { label: "Hide track layout", configValue: "hide_tracklayout", type: FormControlType.Switch },
                    { label: "Hide race dates and times", configValue: "hide_racedatetimes", type: FormControlType.Switch },
                    { label: "Show last years result", configValue: "show_lastyears_result", type: FormControlType.Switch },
                    { label: "Only show date", configValue: "only_show_date", type: FormControlType.Switch }
                ]
            },    
            {
                label: "Countdown Type",
                cssClass: 'side-by-side',
                controls: [{ configValue: "countdown_type", type: FormControlType.Checkboxes, items: plantAttributes }]
            },
            {
                cssClass: 'side-by-side',
                controls: [
                    { label: "Next race delay", configValue: "next_race_delay", type: FormControlType.Textbox },
                    { label: "Row limit", configValue: "row_limit", type: FormControlType.Textbox },
                ]
            },
            { controls: [{ label: "Previous race", configValue: "previous_race", type: FormControlType.Dropdown, items: plantAttributes }] },
            {
                label: "Standings",
                cssClass: 'side-by-side',
                controls: [
                    { label: "Show team", configValue: "standings.show_team", type: FormControlType.Switch },
                    { label: "Show flag", configValue: "standings.show_flag", type: FormControlType.Switch },
                    { label: "Show teamlogo", configValue: "standings.show_teamlogo", type: FormControlType.Switch }
                ]
            }, 
            {
                cssClass: 'side-by-side',
                controls: [
                    { label: "Next race delay", configValue: "next_race_delay", type: FormControlType.Textbox },
                    { label: "Row limit", configValue: "row_limit", type: FormControlType.Textbox },
                ]
            },
            {
                label: "Weather",
                cssClass: 'side-by-side',
                controls: [
                    { label: "Show weather", configValue: "show_weather", type: FormControlType.Switch },
                    { type: FormControlType.Filler },
                    { label: "API key", configValue: "weather_options.api_key", type: FormControlType.Textbox },
                    { label: "Unit", configValue: "weather_options.unit", type: FormControlType.Dropdown, items: plantAttributes },
                    { label: "Show icon", configValue: "weather_options.show_icon", type: FormControlType.Switch },
                    { label: "Show precipitation", configValue: "weather_options.show_precipitation", type: FormControlType.Switch },
                    { label: "Show wind", configValue: "weather_options.show_wind", type: FormControlType.Switch },
                    { label: "Show temperature", configValue: "weather_options.show_temperature", type: FormControlType.Switch },
                    { label: "Show cloud coverage", configValue: "weather_options.show_cloud_cover", type: FormControlType.Switch },
                    { label: "Show visibility", configValue: "weather_options.show_visibility", type: FormControlType.Switch },
                    { label: "Show Icon", configValue: "weather_options.show_icon", type: FormControlType.Switch },
                    { label: "Show Icon", configValue: "weather_options.show_icon", type: FormControlType.Switch },
                ]
            }, 
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
