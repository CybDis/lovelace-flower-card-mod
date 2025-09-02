# Flower Card Mod - Enhanced Plant Monitoring for Home Assistant

## Version 2025.9.3 - Latest Release

The **Flower Card Mod** is an enhanced version of the original Flower Card for Home Assistant, featuring advanced plant monitoring capabilities and modern UI enhancements. This TypeScript-based custom card provides comprehensive plant health visualization with intelligent problem detection and sophisticated battery monitoring.

### What's New in 2025.9.3

#### Problem State UI Highlighting
- **Prominent Visual Indicators**: Plants with problems are automatically highlighted with red background and glow effects
- **Dark Mode Optimized**: Enhanced visibility in dark mode dashboards with 30% opacity backgrounds
- **Real-time Updates**: Dynamic styling based on current plant condition
- **Accessibility Improved**: Better visual feedback for plant health status

#### Advanced Battery Monitoring
- **Intelligent Stale Data Detection**: 6-hour threshold for detecting outdated IoT device data
- **Device-Level Timestamps**: Uses device-update-sensor entities for precise monitoring
- **Smart Fallback Logic**: Automatically falls back to battery sensor timestamps when needed
- **HiGrow Compatibility**: Optimized for HiGrow and similar IoT plant sensors
- **Visual Indicators**: Battery icon changes to "unknown" state when data is stale

#### Technical Enhancements
- **ISO-8601 Timestamp Support**: Proper parsing of modern IoT device timestamps (format: "2018-05-28T16:00:13Z")
- **Automatic Device Detection**: Smart sensor name derivation (e.g., `sensor.higrow_battery` → `sensor.higrow_updated`)
- **Enhanced Error Handling**: Robust validation and edge case coverage
- **Dependency Updates**: All packages updated to latest versions for security and performance

---

## Architecture and Structure

### **Technology Stack**
- **Frontend Framework**: Lit (Web Components)
- **Programming Language**: TypeScript
- **Build System**: Webpack 5
- **Styling**: CSS-in-JS with Lit
- **Linting**: ESLint with TypeScript support
- **Integration**: Home Assistant WebSocket API

### **Project Structure**
```
├── src/                          # Main source code
│   ├── flower-card.ts           # Main component (LitElement) with problem state detection
│   ├── editor.ts                # GUI configuration editor
│   ├── styles.ts                # CSS styling definitions with problem-state class
│   ├── types/                   # TypeScript type definitions
│   │   └── flower-card-types.ts
│   └── utils/                   # Utility functions
│       ├── attributes.ts        # Battery monitoring with stale data detection
│       ├── constants.ts         # Constants and configuration
│       └── utils.ts             # General utility functions
├── flower-card.js               # Compiled output file
├── package.json                 # NPM dependencies and scripts
├── webpack.config.js            # Build configuration
├── tsconfig.json                # TypeScript configuration
├── hacs.json                    # HACS integration metadata
└── .github/workflows/           # CI/CD automation
    └── release.yml              # Automatic release system
```

---

## Core Features and Functionality

### **1. Plant Health Visualization**
- **Sensor Bars**: Visual representation of measurements (moisture, conductivity, etc.)
- **Limit Indicators**: Color-coded bars (green = optimal, red = problematic)
- **Problem State Highlighting**: NEW - Automatic red background for plants with issues
- **Interactive Tooltips**: Detailed information on hover
- **Battery Display**: Optional with advanced stale data detection

### **2. Supported Measurements**
- **Moisture** (Soil moisture)
- **Conductivity** (Nutrients/fertility)
- **Temperature** (Ambient temperature)
- **Illuminance** (Light intensity)
- **Humidity** (Air humidity)
- **DLI** (Daily Light Integral)

### **3. Display Modes**
- **Full Mode**: Complete display with image and all details
- **Compact Mode**: Space-saving layout for smaller dashboards

### **4. Advanced Battery Monitoring**
```typescript
// Device sensor detection example
// "sensor.higrow10_battery" → "sensor.higrow10_updated"
const deviceUpdateEntityId = batteryEntityId.replace(/_battery$/, '_updated');

// ISO-8601 timestamp parsing
const parsedDate = new Date(deviceTimestamp); // "2018-05-28T16:00:13Z"

// 6-hour stale detection
const timeSinceUpdate = Math.floor((now.getTime() - lastUpdated.getTime()) / 1000 / 60);
isStale = timeSinceUpdate > 360; // 6 hours = 360 minutes
```

---

## 🔌 **Integration and Dependencies**

### **Home Assistant Integration**
```typescript
// WebSocket communication with Custom Plant Integration
this.plantinfo = await hass.callWS({
    type: "plant/get_info",
    entity_id: this.config?.entity,
});
```

### **External Dependencies**
1. **Required**: [Custom Plant Integration](https://github.com/Olen/homeassistant-plant)
   - Provides WebSocket API `plant/get_info`
   - Manages plant data and limits
   - Collects sensor data from various sources

2. **Optional**: Battery sensors for device monitoring
   - Standard battery sensors (e.g., `sensor.device_battery`)
   - Device update sensors (e.g., `sensor.device_updated`)

### **HACS Compatibility**
- Fully HACS compatible
- Automatic updates via HACS
- Easy installation as Custom Repository

---

## ⚙️ **Configuration**

### **YAML Configuration**
```yaml
type: custom:flower-card
entity: plant.my_plant              # Plant entity (required)
name: "My Plant"                    # Display name (optional)
battery_sensor: sensor.plant_battery # Battery sensor (optional)
display_type: full                  # "full" or "compact"
hide_species: false                 # Hide plant species
show_bars:                          # Measurements to display
  - moisture
  - conductivity
  - temperature
  - illuminance
  - humidity
  - dli
```

### **GUI Editor**
- **Form-based configuration** using `@marcokreeft/ha-editor-formbuilder`
- **Automatic entity detection** for Plant and Battery entities
- **Checkbox selection** for attributes to display
- **Real-time preview** of configuration changes

---

## UI/UX Design and Visual Features

### **Problem State Highlighting (NEW)**
```css
.problem-state {
    background-color: rgba(244, 67, 54, 0.3) !important;
    border: 2px solid rgba(244, 67, 54, 0.6) !important;
    box-shadow: 0 0 10px rgba(244, 67, 54, 0.4) !important;
}
```

### **Visual Design**
- **Material Design Icons** for sensors
- **Color-coded bars**: Green (optimal), Orange (warning), Red (critical)
- **Responsive layout**: Adapts to different screen sizes
- **Hover tooltips**: Additional information without space consumption
- **Dark mode optimization**: Enhanced visibility with glow effects

### **Battery Status Indicators**
- **Normal state**: Color-coded based on charge level (green/orange/red)
- **Stale data state**: Orange "unknown" icon when data > 6 hours old
- **Visual feedback**: Immediate recognition of connectivity issues

---

## Build Process and CI/CD

### **Local Development**
```bash
npm ci                    # Install dependencies
npm run dev              # Development build
npm run build            # Production build with linting
```

### **Automatic Release System**
GitHub Actions automates:
1. **Build artifacts**: Compilation on package.json changes
2. **Versioning**: Automatic tag creation
3. **Changelog**: Generation based on Git commits
4. **Release creation**: Distinction between stable/beta versions

### **Webpack Configuration**
- **TypeScript compilation** with ts-loader
- **Babel transformation** for browser compatibility
- **Code minification** for production builds
- **Compression**: Gzip compression of output files

---

## 📈 **Performance and Monitoring**

### **Performance Features**
- **Throttling**: Maximum one WebSocket request per second
- **Selective updates**: Only on actual data changes
- **Lazy loading**: Editor loaded only when needed
- **Bundle optimization**: Optimized output size

### **Error Handling and Debugging**
- **Graceful fallbacks**: For missing entities or data
- **User-friendly messages**: Understandable error messages
- **Debug information**: Detailed logs for developers
- **Console logging** with version information

---

## 🔐 **Security and Best Practices**

### **Code Quality**
- **TypeScript Strict Mode**: Maximum type safety
- **ESLint rules**: Consistent code style
- **Error handling**: Graceful degradation on errors
- **Input validation**: Secure configuration processing

### **Security Features**
- **Bundle size optimization**: Minimal attack surface
- **Dependency updates**: Latest security patches
- **Memory management**: Efficient DOM manipulation
- **WebSocket optimization**: Minimal API calls

---

## 🌟 **Key Differences from Original**

1. **Problem State Visualization**: NEW - Automatic highlighting of plant problems
2. **Advanced Battery Monitoring**: NEW - Sophisticated stale data detection
3. **Device-Level Timestamps**: NEW - Uses device update sensors for precise monitoring
4. **Enhanced Visual Design**: Improved dark mode compatibility and visual feedback
5. **Modern Tech Stack**: Latest versions of Lit and TypeScript
6. **Better Error Handling**: More robust and user-friendly error management

---

## Installation Methods

### **Via HACS (Recommended)**
1. Add custom repository: `https://github.com/CybDis/lovelace-flower-card-mod`
2. Install "Flower Card" from HACS
3. Add to Lovelace resources automatically

### **Manual Installation**
1. Download `flower-card.js` from releases
2. Place in `<config>/www/community/flower-card/`
3. Add to Lovelace resources manually

---

## Compatibility

- **Home Assistant**: 2024.1+
- **Browsers**: Modern browsers with ES2020 support
- **IoT Devices**: HiGrow, Xiaomi Plant Monitor, and compatible sensors
- **Plant Integration**: Custom Plant Integration by Olen required

---

**Version**: 2025.9.3  
**License**: MIT  
**Maintainer**: CybDis  
**Originally by**: Olen  

This enhanced Flower Card Mod provides a robust, extensible, and user-friendly solution for monitoring plant data in Home Assistant with cutting-edge web technology, intelligent problem detection, and advanced IoT device monitoring capabilities.
