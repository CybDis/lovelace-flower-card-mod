import { DisplayType, DisplayedAttribute, DisplayedAttributes, Icons, Limits, UOM, UOMT } from "../types/flower-card-types";
import { TemplateResult, html } from "lit";
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { default_show_bars } from "./constants";
import { moreInfo } from "./utils";
import FlowerCard from "../flower-card";

// export const renderBattery = (config: FlowerCardConfig, hass: HomeAssistant) => {
export const renderBattery = (card: FlowerCard): { html: TemplateResult, isStale: boolean } => {
    if(!card.config.battery_sensor) return { html: html``, isStale: false };

    const battery_sensor = card._hass.states[card.config.battery_sensor];
    if(!battery_sensor) return { html: html``, isStale: false };

    const state = parseInt(battery_sensor.state);
    
    // Stale Data Detection (6 Stunden) - basierend auf Geräte-Update-Sensor
    let lastUpdated = new Date(battery_sensor.last_updated); // Fallback
    let isStale = false;
    
    // Ermittle den Geräte-Update-Sensor aus dem Batteriesensor-Namen
    // Unterstützt verschiedene Namenskonventionen:
    // "sensor.higrow10_battery" -> "sensor.higrow10_updated"
    // "sensor.espsensorsolar2_espsensorsolar2_batt_percent" -> "sensor.espsensorsolar2_espsensorsolar2_updated"
    const batteryEntityId = card.config.battery_sensor;
    let deviceUpdateEntityId = batteryEntityId.replace(/_battery$/, '_updated');
    
    // Fallback für andere Battery-Namenskonventionen
    if (deviceUpdateEntityId === batteryEntityId) {
        // Versuche _batt_percent, _battery_level, _bat_level, etc.
        deviceUpdateEntityId = batteryEntityId.replace(/_batt(?:ery)?(?:_percent|_level)?$/, '_updated');
    }
    
    // Wenn immer noch kein Match, versuche das letzte Wort durch "updated" zu ersetzen
    if (deviceUpdateEntityId === batteryEntityId) {
        deviceUpdateEntityId = batteryEntityId.replace(/_[^_]+$/, '_updated');
    }
    
    // Prüfe ob der Geräte-Update-Sensor existiert
    const deviceUpdateSensor = card._hass.states[deviceUpdateEntityId];
    if (deviceUpdateSensor) {
        // Verwende den ISO-8601 Timestamp aus dem Update-Sensor
        // Format: "2018-05-28T16:00:13Z"
        const deviceTimestamp = deviceUpdateSensor.state;
        const parsedDate = new Date(deviceTimestamp);
        // Wenn der Sensor den Timeserver nicht erreicht, meldet er das Zeit-Minimum
        // (1.1.1970). Ein unrealistisch altes Jahr gilt daher als ungültiger Wert.
        const EPOCH_YEAR_THRESHOLD = 2000;
        if (!isNaN(parsedDate.getTime()) && parsedDate.getFullYear() >= EPOCH_YEAR_THRESHOLD) {
            // Gültiger Zeitserver-Wert
            lastUpdated = parsedDate;
        } else {
            // Zeit-Minimum (1970) -> Wert verwerfen, stattdessen das Änderungsdatum
            // (last_changed) des _updated-Sensors verwenden
            const changed = new Date(deviceUpdateSensor.last_changed);
            if (!isNaN(changed.getTime())) {
                lastUpdated = changed;
            }
            // sonst: bestehender Fallback battery_sensor.last_updated bleibt
        }
    }
    
    // Berechne ob Daten veraltet sind (6 Stunden)
    const now = new Date();
    const timeSinceUpdate = Math.floor((now.getTime() - lastUpdated.getTime()) / 1000 / 60); // in Minuten
    isStale = timeSinceUpdate > 540 || battery_sensor.state === 'unavailable' || battery_sensor.state === 'unknown'; // 9 Stunden = 540 Minuten

    const levels = [
        { threshold: 90, icon: "mdi:battery", color: "green" },
        { threshold: 80, icon: "mdi:battery-90", color: "green" },
        { threshold: 70, icon: "mdi:battery-80", color: "green" },
        { threshold: 60, icon: "mdi:battery-70", color: "green" },
        { threshold: 50, icon: "mdi:battery-60", color: "green" },
        { threshold: 40, icon: "mdi:battery-50", color: "green" },
        { threshold: 30, icon: "mdi:battery-40", color: "orange" },
        { threshold: 20, icon: "mdi:battery-30", color: "orange" },
        { threshold: 10, icon: "mdi:battery-20", color: "red" },
        { threshold: 0, icon: "mdi:battery-10", color: "red" },
        { threshold: -Infinity, icon: "mdi:battery-alert-variant-outline", color: "red" },
    ];

    let { icon, color } = levels.find(({ threshold }) => state > threshold) ||  { icon: "mdi:battery-alert-variant-outline", color: "red" };
    
    // Überschreibe Icon und Farbe bei veralteten Daten
    if (isStale) {
        icon = "mdi:battery-alert";
        color = "var(--warning-color, orange)";
    }

    return {
        html: html`
            <div class="battery tooltip" @click="${(e: Event) => { e.stopPropagation(); moreInfo(card, card.config.battery_sensor)}}">
                <div class="tip" style="text-align:center;">${state}%</div>
                <ha-icon .icon="${icon}" style="color: ${color}"></ha-icon>
            </div>
        `,
        isStale: isStale
    };
}
export const renderSensorFreshness = (card: FlowerCard): { html: TemplateResult } => {
    let newest: number | null = null;

    // Wenn battery_sensor konfiguriert ist, dieselbe _updated-Sensor-Logik wie renderBattery verwenden
    if (card.config.battery_sensor) {
        const batteryEntityId = card.config.battery_sensor;
        let deviceUpdateEntityId = batteryEntityId.replace(/_battery$/, '_updated');
        if (deviceUpdateEntityId === batteryEntityId)
            deviceUpdateEntityId = batteryEntityId.replace(/_batt(?:ery)?(?:_percent|_level)?$/, '_updated');
        if (deviceUpdateEntityId === batteryEntityId)
            deviceUpdateEntityId = batteryEntityId.replace(/_[^_]+$/, '_updated');

        const deviceUpdateSensor = card._hass.states[deviceUpdateEntityId];
        if (deviceUpdateSensor) {
            const parsed = new Date(deviceUpdateSensor.state);
            // Wenn der Sensor den Timeserver nicht erreicht, meldet er das
            // Zeit-Minimum (1.1.1970). In dem Fall den Wert verwerfen und das
            // Änderungsdatum (last_changed) des _updated-Sensors verwenden.
            const EPOCH_YEAR_THRESHOLD = 2000;
            if (!isNaN(parsed.getTime()) && parsed.getFullYear() >= EPOCH_YEAR_THRESHOLD) {
                newest = parsed.getTime();
            } else {
                const changed = new Date(deviceUpdateSensor.last_changed).getTime();
                if (!isNaN(changed)) newest = changed;
            }
        }

        // Fallback: last_updated des Batteriesensors selbst
        if (newest === null) {
            const batterySensor = card._hass.states[batteryEntityId];
            if (batterySensor) {
                const t = new Date(batterySensor.last_updated).getTime();
                if (!isNaN(t)) newest = t;
            }
        }
    } else {
        // Ohne battery_sensor: neuesten last_updated über alle Pflanzensensoren
        const monitored = card.config.show_bars || default_show_bars;
        const sensorIds: string[] = [];
        if (card.plantinfo && card.plantinfo.result) {
            for (const elem of monitored) {
                const r = card.plantinfo.result[elem];
                if (r && r.sensor) sensorIds.push(String(r.sensor));
            }
        }
        for (const id of sensorIds) {
            const st = card._hass.states[id];
            if (!st) continue;
            const t = new Date(st.last_updated).getTime();
            if (isNaN(t)) continue;
            if (newest === null || t > newest) newest = t;
        }
    }

    // Fehlender oder ungültiger Zeitstempel -> neutrale graue Badge
    if (newest === null) {
        return {
            html: html`<div class="freshness-badge unknown" title="Kein Update-Zeitstempel verfügbar">—</div>`
        };
    }

    const minutes = Math.max(0, Math.floor((Date.now() - newest) / 60000));

    // Farblogik: bis 90 min dezent grün, 91-180 min Warnung, darüber veraltet
    let level: string;
    if (minutes <= 90) level = "fresh";
    else if (minutes <= 180) level = "warn";
    else level = "stale";

    return {
        html: html`<div class="freshness-badge ${level}" title="Letztes Sensor-Update vor ${minutes} min">${minutes}m</div>`
    };
};

export const renderAttributes = (card: FlowerCard): TemplateResult[] => {
    const icons: Icons = {};
    const uom: UOM = {};
    const uomt: UOMT = {};
    const limits: Record<string, Limits> = {};
    const curr: Record<string, number> = {};
    const sensors: Record<string, string> = {};
    const displayed: DisplayedAttributes = {};
    const monitored = card.config.show_bars || default_show_bars;

    if (card.plantinfo && card.plantinfo.result) {
        const result = card.plantinfo.result;
        for (const elem of monitored) {
            if (result[elem]) {
                let { max, min, current, icon, sensor, unit_of_measurement } = result[elem];
                max = Number(max);
                min = Number(min);
                icon = String(icon);
                sensor = String(sensor);
                current = Number(current);
                unit_of_measurement = String(unit_of_measurement);
                limits[`max_${elem}`] = { max, min };
                curr[elem] = current;
                icons[elem] = icon;
                sensors[elem] = sensor;
                uomt[elem] = unit_of_measurement;
                uom[elem] = unit_of_measurement;
                if (elem === "dli") {
                    uomt["dli"] = "mol/d⋅m²";
                    uom["dli"] = '<math style="display: inline-grid;" xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mfrac><mrow><mn>mol</mn></mrow><mrow><mn>d</mn><mn>⋅</mn><msup><mn>m</mn><mn>2</mn></msup></mrow></mfrac></mrow></math>';
                }
                displayed[elem] = { name: elem, current, limits: limits[`max_${elem}`], icon, sensor, unit_of_measurement };
            }
        }
    }

    return renderAttributeChunks(card, displayed);
}

export const renderAttribute = (card: FlowerCard, attr: DisplayedAttribute) => {
    const { max, min } = attr.limits;
    const unitTooltip = attr.unit_of_measurement;
    const icon = attr.icon || "mdi:help-circle-outline";
    const val = attr.current || 0;
    const aval = !isNaN(val);
    const pct = 100 * Math.max(0, Math.min(1, (val - min) / (max - min)));
    const toolTipText = aval ? `${attr.name}: ${val} ${unitTooltip}<br>(${min} ~ ${max} ${unitTooltip})` : card._hass.localize('state.default.unavailable');
    const label = attr.name === 'dli' ? '<math style="display: inline-grid;" xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mfrac><mrow><mn>mol</mn></mrow><mrow><mn>d</mn><mn>⋅</mn><msup><mn>m</mn><mn>2</mn></msup></mrow></mfrac></mrow></math>' : unitTooltip
    const attributeCssClass = `attribute tooltip ${card.config.display_type === DisplayType.Compact ? 'width-100' : ''}`;

    // console.debug(
    //    `%c FLOWER-CARD %c Attr: ${attr.name} Val: ${val} (${typeof(val)}), Max: ${max} (${typeof(max)}), Min: ${min} (${typeof(min)}), Available: ${aval}`,
    //    'color: cyan; background: black; font-weight: bold;',
    //    'color: darkblue; background: white; font-weight: bold;'
    // );
    return html`
        <div class="${attributeCssClass}" @click="${() => moreInfo(card, attr.sensor)}">
            <div class="tip" style="text-align:center;">${unsafeHTML(toolTipText)}</div>
            <ha-icon .icon="${icon}"></ha-icon>
            <div class="meter red">
                <span class="${
                    aval ? (val < min || val > max ? "bad" : "good") : "unavailable"
                }" style="width: 100%;"></span>
            </div>
            <div class="meter green">
                <span class="${
                    aval ? (val > max ? "bad" : "good") : "unavailable"
                }" style="width:${aval ? pct : "0"}%;"></span>
            </div>
            <div class="meter red">
                <span class="bad" style="width:${
                    aval ? (val > max ? 100 : 0) : "0"
                }%;"></span>
            </div>
	    <div class="header"><span class="value">${val}</span>&nbsp;<span class='unit'>${unsafeHTML(label)}</span></div>
        </div>
    `;
};

export const getChunkedDisplayed = (displayed: DisplayedAttributes, attributesPerRow: number) => {
    return Object.values(displayed).reduce((acc, curr, i) => {
      const index = Math.floor(i / attributesPerRow);
      if (!acc[index]) {
        acc[index] = [];
      }
      acc[index].push(curr);
      return acc;
    }, []);
}

export const renderAttributeChunks = (card: FlowerCard, displayed: DisplayedAttributes): TemplateResult[] => {
    const chunkedDisplayed = getChunkedDisplayed(displayed, card.config.display_type === DisplayType.Compact ? 1 : 2);
    const attributeCssClass = `attributes ${card.config.display_type === DisplayType.Compact ? 'width-100' : ''}`;

    return chunkedDisplayed.map((chunk) => {
      return html`<div class="${attributeCssClass}">${chunk.map((item: DisplayedAttribute) => {
        return item ? html`${renderAttribute(card, item)}` : '';
      })}</div>`;
    }).flat();
  }

