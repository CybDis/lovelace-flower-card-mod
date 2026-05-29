import { css } from 'lit';

export const style = css`
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
`;
