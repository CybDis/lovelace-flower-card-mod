import { HassEntity } from 'home-assistant-js-websocket'; 
import { CSSResult, HTMLTemplateResult, LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import { style } from './styles';
import { DisplayType, FlowerCardConfig, HomeAssistantEntity, PlantInfo } from './types/flower-card-types';
import * as packageJson from '../package.json';
import { renderAttributes, renderBattery } from './utils/attributes';
import { CARD_EDITOR_NAME, CARD_NAME, default_show_bars, missingImage } from './utils/constants';
import { moreInfo } from './utils/utils';

console.info(
    `%c FLOWER-CARD %c ${packageJson.version}`,
    'color: cyan; background: black; font-weight: bold;',
    'color: darkblue; background: white; font-weight: bold;'
);

/* eslint-disable @typescript-eslint/no-explicit-any */
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
    type: CARD_NAME,
    name: 'Flower card',
    preview: true,
    description: 'Custom flower card for https://github.com/Olen/homeassistant-plant',
});
/* eslint-enable @typescript-eslint/no-explicit-any */

@customElement(CARD_NAME)
export default class FlowerCard extends LitElement {
    @property() _hass?: HomeAssistant;
    @property() config?: FlowerCardConfig;

    private stateObj: HomeAssistantEntity | undefined;
    private previousFetchDate: number;

    plantinfo: PlantInfo;
    set hass(hass: HomeAssistant) {
        this._hass = hass;
        this.stateObj = this.config?.entity ? hass.states[this.config.entity] : undefined;

        // if config.name is not set, set it to friendly_name
        if (!this.config?.name && this.stateObj) {
            this.config = {
                ...this.config,
                name: this.stateObj.attributes.friendly_name
            };
        }

        if (!this.previousFetchDate) {
            this.previousFetchDate = 0;
        }
        // Only fetch once every second at max.  HA is flooeded with websocket requests
        if (Date.now() > this.previousFetchDate + 1000) {
            this.previousFetchDate = Date.now();
            this.get_data(hass).then(() => {
                this.requestUpdate();
            });
        }
    }

    public static async getConfigElement(): Promise<LovelaceCardEditor> {
        await import("./editor");
        return document.createElement(CARD_EDITOR_NAME) as LovelaceCardEditor;
    }

    static getStubConfig(ha: HomeAssistant) {
        const supportedEntities: HassEntity[] = Object.values(ha.states).filter(
            (entity: HassEntity): entity is HassEntity => entity.entity_id.indexOf('plant.') === 0
        );
        const entity = supportedEntities.length > 0 ? supportedEntities[0].entity_id : 'plant.my_plant';

        return {
            entity: entity,
            battery_sensor: "sensor.myflower_battery",
            show_bars: default_show_bars
        }
    }

    setConfig(config: FlowerCardConfig): void {
        if (!config.entity) {
            throw new Error("You need to define an entity");
        }

        this.config = config;
    }

    render(): HTMLTemplateResult {
        if (!this.config || !this._hass) return html``;

        if (!this.stateObj) {
            return html`
                <hui-warning>
                Entity not available: ${this.config.entity}
                </hui-warning>
              `;
        }

        const species = this.stateObj.attributes.species;
        const hideSpecies = this.config.hide_species !== undefined ? this.config.hide_species : false;
        const headerCssClass = this.config.display_type === DisplayType.Compact ? "header-compact" : "header";
        const haCardCssClass = this.config.display_type === DisplayType.Compact ? "" : "card-margin-top";

        return html`
            <ha-card class="${haCardCssClass}">
            <div class="${headerCssClass}" @click="${() =>
                moreInfo(this, this.stateObj.entity_id)}">
                <img src="${this.stateObj.attributes.entity_picture
                ? this.stateObj.attributes.entity_picture
                : missingImage
            }">
                <span id="name"> ${this.config.name} <ha-icon .icon="mdi:${this.stateObj.state.toLowerCase() == "problem" 
                ? "alert-circle-outline"
                : ""
            }"></ha-icon>
                </span>
                <span id="battery">${renderBattery(this)}</span>
                ${!hideSpecies ? html`<span id="species">${species} </span>` : ''}
            </div>
            <div class="divider"></div>
            ${renderAttributes(this)}
            </ha-card>
            `;
    }

    async get_data(hass: HomeAssistant): Promise<void> {
        try {
            this.plantinfo = await hass.callWS({
                type: "plant/get_info",
                entity_id: this.config?.entity,
            });
        } catch  {
            this.plantinfo = { result: {} };
        }
    }

    getCardSize(): number {
        return 5;
    }

    static get styles(): CSSResult {
        return style;
    }
}
