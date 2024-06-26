# Flower Card (Mod)

**This fork of the flower-card** (_originally by Olen_) depends on this Plant component:  
https://github.com/Olen/homeassistant-plant

The card can be set up from the GUI (requires version 3.0.0)

![image](https://github.com/Olen/lovelace-flower-card/assets/203184/a31ad564-9458-41b4-9c1f-9da13f84f2ae)

## YAML-config
You can also select what bars you want to show for each card

```yaml
type: custom:flower-card
entity: plant.my_plant
name: My Plant
hide_species: false
show_bars:
- illuminance
- humidity
- moisture
- conductivity
- temperature
- dli
battery_sensor: sensor.demo_battery
```
* Battery sensor

You can optionally add a battery sensor to be displayed in the card.

![image](https://user-images.githubusercontent.com/203184/190199923-6060efbf-7306-49e5-bbc4-26dc922d3180.png)

The sensor will change color based on the state of the battery:
* &gt;= 40%: Green
* 20 - 39%: Orange
* < 20%: Red

## Dependencies
1. Custom Plant integration (https://github.com/Olen/homeassistant-plant)

## Installation
[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=for-the-badge)](https://github.com/hacs/integration)

This can be installed manually or through HACS
### Via HACS
* Add this repo as a "Custom repository" with type "Lovelace"
  * Click HACS in your Home Assistnat
  * Click Frontend
  * Click the 3 dots in the top right corner and select "Custom Repositories"
  * Add the URL to this github repository and category "Lovelace"
* Click "Install" in the new "Flower Card" card in HACS.
* Wait for install to complete
* You should not need to restart Home Assistant, but will probably need to refresh the frontend and/or "shift-reload" to refresh the browser cache.

### Manual Installation
1: Download the file flower-card.js and add it to somewhere in your `<config>/www/` folder in HA 
 
2: Click your profile picture in the bottom left corner -> Turn on Advanced Mode.
 
3: Go to Configuration -> Lovelace Dashboards -> Resources -> press the + (lower right corner of screen) and add the following information:

```yaml
  Url: /local/<path to>/flower-card.js
  Resource type: JavaScript Module
```
![image](https://user-images.githubusercontent.com/45675902/80322223-ebd41880-8823-11ea-992d-7070d4197f8b.png)

4: Press *Create* afterwards to add the new resource.

5: You should not need to restart Home Assistant, but will probably need to refresh the frontend and/or "shift-reload" to refresh the browser cache.


### Disclaimer
I use this fork in my own home assistant to add some custom modifications and changes, not (yet) reflected in the original form from Olen.

<a href="https://www.buymeacoffee.com/cybdis" target="_blank">
  <img src="https://raw.githubusercontent.com/CybDis/CybDis/main/bmc-yellow-button.png" height="50px"/></a>
