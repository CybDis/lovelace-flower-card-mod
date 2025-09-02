# Flower Card (Mod)

**This fork of the flower-card** (_originally by Olen_) depends on this Plant component:  
https://github.com/Olen/homeassistant-plant

The card can be set up from the GUI (requires version 3.0.0)

![image](https://github.com/Olen/lovelace-flower-card/assets/203184/a31ad564-9458-41b4-9c1f-9da13f84f2ae)

## New Features (Version 2025.9.3)

### Problem State UI Highlighting
The card now automatically highlights plants with problems using prominent visual indicators:
- **Red background highlighting** for plants outside optimal ranges
- **Enhanced visibility** with glow effects for dark mode compatibility
- **Dynamic styling** based on real-time plant condition

### Advanced Battery Monitoring
Sophisticated battery monitoring with intelligent stale data detection:
- **6-hour stale data threshold** - automatically detects when device data is outdated
- **Device-level timestamp monitoring** using `device-update-sensor` entities
- **Smart fallback** to battery sensor `last_updated` when device sensor unavailable
- **Visual indicators** - battery icon changes to "unknown" state when data is stale
- **HiGrow compatibility** - optimized for HiGrow and similar IoT plant sensors

### Enhanced Compatibility
- **ISO-8601 timestamp parsing** for modern IoT devices
- **Automatic device sensor detection** (e.g., `sensor.higrow_battery` → `sensor.higrow_updated`)
- **Improved error handling** and edge case coverage
- **Better Home Assistant integration** with enhanced state management

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

**New in 2025.9.3**: Advanced stale data detection - when device data is older than 6 hours, the battery icon automatically changes to an "unknown" state with warning color, helping you identify connectivity issues with your IoT plant sensors.

### Device Update Sensor Support
The card automatically detects device update sensors for enhanced monitoring:
- `sensor.higrow_battery` → automatically uses `sensor.higrow_updated` for precise timestamps
- Supports ISO-8601 timestamp format from modern IoT devices
- Falls back to battery sensor `last_updated` if device sensor unavailable

## Version History

### Version 2025.9.3 (September 2, 2025)
**Major release with UI enhancements and advanced battery monitoring**

#### New Features:
- **Problem State UI Highlighting**: Prominent red background for plants with problems
- **Advanced Battery Monitoring**: 6-hour stale data detection with device-level timestamps
- **Enhanced Visual Indicators**: Glow effects and improved dark mode compatibility
- **Device Sensor Integration**: Automatic detection of device-update-sensor entities

#### Bug Fixes:
- Fixed ISO-8601 timestamp parsing (was incorrectly using Unix format)
- Improved device sensor name derivation pattern matching
- Enhanced error handling for timestamp validation
- Better Home Assistant state management compatibility

#### Technical Improvements:
- Updated all dependencies to latest versions
- Enhanced TypeScript type safety and code organization
- Optimized Webpack build configuration for better performance
- Improved documentation and code maintainability

#### Compatibility:
- Home Assistant 2024.1+
- HiGrow and compatible IoT plant sensors
- Modern browsers with ES2020 support
- Backward compatible with existing configurations

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
