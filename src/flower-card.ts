import { HassEntity } from 'home-assistant-js-websocket';
import { CSSResult, HTMLTemplateResult, LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { HomeAssistant } from 'custom-card-helpers';
import { style } from './styles';
import { DisplayType, FlowerCardConfig, HomeAssistantEntity, PlantInfo } from './types/flower-card-types';
import * as packageJson from '../package.json';
import { renderAttributes, renderBattery, renderSensorFreshness } from './utils/attributes';
import { CARD_NAME, default_show_bars, missingImage } from './utils/constants';
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
    private _freshnessTimer?: number;

    plantinfo: PlantInfo;

    connectedCallback(): void {
        super.connectedCallback();
        // Minutenanzeige fortlaufend aktualisieren, auch ohne neue Sensordaten
        if (!this._freshnessTimer) {
            this._freshnessTimer = window.setInterval(() => this.requestUpdate(), 60000);
        }
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        if (this._freshnessTimer) {
            window.clearInterval(this._freshnessTimer);
            this._freshnessTimer = undefined;
        }
    }
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static getConfigForm(): any {
        return {
            schema: [
                {
                    name: "display_type",
                    selector: {
                        select: {
                            options: [
                                { label: "Full", value: DisplayType.Full },
                                { label: "Compact", value: DisplayType.Compact },
                            ]
                        }
                    }
                },
                { name: "entity", required: true, selector: { entity: { domain: "plant" } } },
                { name: "name", selector: { text: {} } },
                { name: "battery_sensor", selector: { entity: { domain: "sensor", device_class: "battery" } } },
                {
                    name: "show_bars",
                    selector: {
                        select: {
                            multiple: true,
                            options: [
                                { label: "Moisture", value: "moisture" },
                                { label: "Conductivity", value: "conductivity" },
                                { label: "Temperature", value: "temperature" },
                                { label: "Illuminance", value: "illuminance" },
                                { label: "Humidity", value: "humidity" },
                                { label: "Daily Light Integral", value: "dli" },
                            ]
                        }
                    }
                },
                { name: "hide_species", selector: { boolean: {} } },
                { name: "hide_image", selector: { boolean: {} } },
            ],
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            computeLabel: (schema: any) => {
                const labels: Record<string, string> = {
                    display_type: "Display Type",
                    entity: "Entity",
                    name: "Name",
                    battery_sensor: "Battery Sensor",
                    show_bars: "Show Bars",
                    hide_species: "Hide Species",
                    hide_image: "Hide Image",
                };
                return labels[schema.name] || schema.name;
            }
        };
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
        const hideImage = this.config.hide_image ?? false;
        const headerCssClass = this.config.display_type === DisplayType.Compact ? "header-compact" : "header";
        const baseCardClass = (this.config.display_type === DisplayType.Compact || hideImage) ? "" : "card-margin-top";
        const noImageClass = hideImage ? " no-image" : "";
        
        // Prüfe Battery-Status für Problem-State
        const batteryResult = renderBattery(this);
        const isBatteryStale = batteryResult.isStale;

        // Aktualitäts-Badge (Minuten seit letztem Sensor-Update)
        const freshnessResult = renderSensorFreshness(this);
        
        // Problem-State wenn Plant-State "problem" ist ODER Battery stale ist
        const hasPlantProblem = this.stateObj.state.toLowerCase() === "problem";
        const hasBatteryProblem = isBatteryStale;
        // Pflanzenproblem hat Vorrang (rötlich); reines Batterieproblem -> orangelich
        const problemClass = hasPlantProblem
            ? "problem-state"
            : (hasBatteryProblem ? "battery-warning-state" : "");
        const haCardCssClass = `${baseCardClass} ${problemClass}`.trim();

        return html`
            <ha-card class="${haCardCssClass}">
            <div class="${headerCssClass}${noImageClass}" @click="${() =>
                moreInfo(this, this.stateObj.entity_id)}">
                ${!hideImage ? html`<img src="${this.stateObj.attributes.entity_picture ? this.stateObj.attributes.entity_picture : missingImage}">` : ''}
                <span id="name"> ${this.config.name} <ha-icon .icon="mdi:${hasPlantProblem 
                ? "alert-circle-outline" : ""
            }"></ha-icon>
                </span>
                <span id="sensor-freshness">${freshnessResult.html}</span>
                <span id="battery">${batteryResult.html}</span>
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
