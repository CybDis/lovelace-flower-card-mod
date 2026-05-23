import { html, css, LitElement, TemplateResult } from 'lit';
import { customElement, state } from "lit/decorators.js";
import { DisplayType, FlowerCardConfig } from "./types/flower-card-types";
import { default_show_bars, plantAttributes } from "./utils/constants";
import { HomeAssistant } from "custom-card-helpers";

@customElement('flower-card-editor')
export class FlowerCardEditor extends LitElement {
    @state() private _hass?: HomeAssistant;
    @state() private _config?: FlowerCardConfig;

    set hass(hass: HomeAssistant) {
        this._hass = hass;
        this.requestUpdate();
    }

    setConfig(config: FlowerCardConfig): void {
        this._config = config;
    }

    private _valueChanged(ev: CustomEvent): void {
        if (!this._config || !this._hass) {
            return;
        }

        const target = ev.target as HTMLInputElement & { configValue?: string };
        const configValue = target.configValue || target.getAttribute('configValue');

        if (!configValue) {
            return;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let value: any;

        if (configValue === 'show_bars') {
            const currentBars = Array.isArray(this._config.show_bars)
                ? this._config.show_bars
                : [...default_show_bars];
            const checkboxValue = target.value;

            if (target.checked) {
                value = currentBars.includes(checkboxValue) ? currentBars : [...currentBars, checkboxValue];
            } else {
                value = currentBars.filter((bar: string) => bar !== checkboxValue);
            }
        } else if (ev.detail && ev.detail.value !== undefined) {
            value = ev.detail.value;
        } else if (target.checked !== undefined && target.type !== 'radio') {
            value = target.checked;
        } else {
            value = target.value;
        }

        if (value === '' || value === undefined) {
            const newConfig = { ...this._config };
            delete newConfig[configValue as keyof FlowerCardConfig];
            this._config = newConfig;
        } else {
            this._config = { ...this._config, [configValue]: value };
        }

        this.dispatchEvent(new CustomEvent('config-changed', {
            detail: { config: this._config },
            bubbles: true,
            composed: true,
        }));
    }

    protected render(): TemplateResult {
        if (!this._hass || !this._config) {
            return html``;
        }

        const showBars = this._config.show_bars || default_show_bars;

        return html`
            <div class="card-config">
                <div class="form-row">
                    <label>Display Type</label>
                    <div class="form-control">
                        <ha-radio
                            id="display_type_full"
                            name="display_type"
                            .checked="${this._config.display_type !== DisplayType.Compact}"
                            .configValue="${'display_type'}"
                            .value="${DisplayType.Full}"
                            @change="${this._valueChanged}"
                        ></ha-radio>
                        <label for="display_type_full">Full</label>
                        <ha-radio
                            id="display_type_compact"
                            name="display_type"
                            .checked="${this._config.display_type === DisplayType.Compact}"
                            .configValue="${'display_type'}"
                            .value="${DisplayType.Compact}"
                            @change="${this._valueChanged}"
                        ></ha-radio>
                        <label for="display_type_compact">Compact</label>
                    </div>
                </div>

                <div class="form-row">
                    <ha-entity-picker
                        label="Entity"
                        .hass=${this._hass}
                        .value=${this._config.entity || ''}
                        .configValue=${'entity'}
                        .includeDomains=${['plant']}
                        @value-changed=${this._valueChanged}
                        allow-custom-entity
                    ></ha-entity-picker>
                </div>

                <div class="form-row">
                    <ha-textfield
                        label="Name"
                        .value="${this._config.name || ''}"
                        .configValue="${'name'}"
                        @change="${this._valueChanged}"
                    ></ha-textfield>
                </div>

                <div class="form-row">
                    <ha-entity-picker
                        label="Battery Sensor"
                        .hass=${this._hass}
                        .value=${this._config.battery_sensor || ''}
                        .configValue=${'battery_sensor'}
                        .includeDomains=${['sensor']}
                        .includeDeviceClasses=${['battery']}
                        @value-changed=${this._valueChanged}
                        allow-custom-entity
                    ></ha-entity-picker>
                </div>

                <div class="form-row">
                    <div class="form-control">
                        <ha-switch
                            id="hide_species"
                            .checked="${this._config.hide_species || false}"
                            .configValue="${'hide_species'}"
                            @change="${this._valueChanged}"
                        ></ha-switch>
                        <label for="hide_species">Hide Species</label>
                    </div>
                </div>

                <div class="form-row">
                    <label>Show Bars</label>
                    ${plantAttributes.map(attr => html`
                        <div class="form-control">
                            <ha-checkbox
                                id="show_bars_${attr.value}"
                                .checked="${showBars.includes(attr.value)}"
                                .configValue="${'show_bars'}"
                                .value="${attr.value}"
                                @change="${this._valueChanged}"
                            ></ha-checkbox>
                            <label for="show_bars_${attr.value}">${attr.label}</label>
                        </div>
                    `)}
                </div>
            </div>
        `;
    }

    static styles = css`
        .card-config { padding: 16px; }
        .form-row { margin-bottom: 16px; }
        .form-row > label { display: block; margin-bottom: 8px; font-weight: 500; }
        .form-control { display: flex; align-items: center; margin-bottom: 8px; }
        .form-control label { margin-left: 8px; }
        ha-textfield, ha-entity-picker { width: 100%; }
    `;
}
