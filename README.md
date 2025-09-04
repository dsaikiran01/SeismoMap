# 🌍 SeismoMap

SeismoMap is an interactive web application that visualizes **real-time global earthquake activity** using the [USGS Earthquake API](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php).  
It is designed for geography students like **Casey** to explore seismic patterns, filter by magnitude, and better understand recent tectonic events.

---

## 🚀 Features

- **Interactive Map (Leaflet + React-Leaflet)**  
  Earthquakes displayed as markers on a world map.  
  Marker **color & size** based on magnitude:  
  - 🟢 Green: < 3.0  
  - 🟠 Orange: 3.0 – 5.0  
  - 🔴 Red: > 5.0  

- **Live Earthquake Data**  
  - Data from [USGS API (past 24h)](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson)  
  - Refreshes automatically every **5 minutes**

- **Magnitude Filter**  
  - Material UI **slider** to filter earthquakes by min/max magnitude  
  - Updates both map markers and the sidebar list

- **Sidebar List View**  
  - Drawer with scrollable earthquake list  
  - Each item shows magnitude, location, and time  
  - (Future) Clicking an item zooms map to its location

- **Dark Mode Support**  
  - Toggle between light/dark themes  
  - Switches map tiles & UI colors

- **Loading & Error States**  
  - Material UI `CircularProgress` for loading  
  - Snackbar/alerts for errors (planned)

---

## 🧰 Tech Stack

- **React + Vite** (frontend framework & bundler)
- **React-Leaflet** (map integration)
- **Leaflet** (map rendering)
- **Material UI** (UI components, theming)
- **Tailwind CSS** (responsive styling utilities)
- **USGS Earthquake API** (real-time earthquake data)

---

## 📐 UI Layout

```

---

\|  AppBar (MUI)                                  |
\|  - SeismoMap | Magnitude Slider | Dark Toggle  |
---------------------------------------------------

\|  Sidebar (Drawer)   |    Interactive Map       |
\|  - Earthquake List  |    - Markers             |
\|                     |    - Legend              |
---------------------------------------------------

````

---

## 📊 Data Example

```json
{
  "type": "Feature",
  "properties": {
    "mag": 4.5,
    "place": "114 km NE of Lospalos, Timor Leste",
    "time": 1756893103168,
    "url": "https://earthquake.usgs.gov/earthquakes/eventpage/us7000qtgb",
    "title": "M 4.5 - 114 km NE of Lospalos, Timor Leste"
  },
  "geometry": {
    "type": "Point",
    "coordinates": [127.6824, -7.7403, 133.38]
  }
}
````

---

## 🕒 Refresh Strategy

* Auto-refreshes every **5 minutes**
* Manual refresh option (planned)

---

## ✅ Accessibility

* Keyboard navigable UI
* Material UI components support screen readers
* WCAG AA compliant color scheme

---

## 📦 Deployment

SeismoMap is a static React app and can be hosted on:

* [Vercel](https://vercel.com)


