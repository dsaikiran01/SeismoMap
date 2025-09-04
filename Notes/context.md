# 🌍 Earthquake Visualizer

An interactive web application that visualizes real-time global earthquake activity using the USGS Earthquake API. Designed for geography students like **Casey**, who want to explore seismic patterns and better understand recent tectonic events.

---

## 👩‍🎓 User Persona

**Name:** Casey
**Occupation:** Geography Student
**Goal:**

* Understand global seismic activity
* Visualize earthquake patterns in real time
* Filter and analyze earthquake data by magnitude and location

---

## 🧰 Tech Stack

| Technology              | Description                                   |
| ----------------------- | --------------------------------------------- |
| **React**               | Frontend framework                            |
| **Tailwind CSS**        | Utility-first CSS for responsive design       |
| **Material UI**         | UI components and theming                     |
| **React Leaflet**       | Map library integration (based on Leaflet.js) |
| **USGS Earthquake API** | Data source for recent global earthquakes     |
| **State Management**    | React hooks (`useState`, `useEffect`)         |

**USGS API Endpoint Used:**

```
https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson
```

---

## 🚀 Core Features

### 🗺️ 1. Interactive Map with Markers

* Plot global earthquakes using Leaflet markers
* Map zooms and pans interactively
* Earthquake markers include:

  * Magnitude
  * Location
  * Depth
  * Time
  * Link to USGS detail page

### 🎯 2. Magnitude-Based Styling

* Marker color and size vary by magnitude:

  * Green: < 3.0
  * Yellow: 3.0 - 5.0
  * Red: > 5.0

### 📊 3. Magnitude Filter (Slider)

* Material UI slider to filter earthquakes by min/max magnitude
* Live updates on map and list

### 🗒️ 4. Earthquake List View

* Scrollable list of recent quakes (sidebar/drawer)
* Click an item to zoom to its location on the map
* Sortable by magnitude, time, or depth

### 🔄 5. Real-Time Data Fetching

* Fetches new data every 5 minutes
* Manual refresh option available

### 🎨 6. Map Legend

* Explains marker color and magnitude meaning
* Uses Material UI `Card` or `Paper`

### 🌙 7. Dark Mode Support

* Toggle theme using Material UI theming
* Includes dark map tiles (if available)

### 📱 8. Mobile Responsive UI

* Tailwind CSS and Material UI Grid for layout
* Collapsible sidebar or drawer on mobile

### 🚧 9. Error & Loading Handling

* Material UI `CircularProgress` for loading
* Snackbar or alert for fetch errors

---

## 💡 Optional / Bonus Features

| Feature              | Description                                                           |
| -------------------- | --------------------------------------------------------------------- |
| 🔍 Date Range Filter | Filter by today, past 7 days, or 30 days (using other USGS endpoints) |
| 🌐 Search Location   | Enter a city or country and pan to it using geocoding                 |
| 📦 Cluster Markers   | Group nearby markers using `react-leaflet-markercluster`              |
| 🔥 Seismic Heatmap   | Show earthquake intensity using Leaflet heatmap overlay               |
| 📁 Export to CSV     | Allow user to export filtered data                                    |

---

## 🧭 UI Layout

```text
--------------------------------------------------
|   Top App Bar (Material UI)                    |
|   - Title: "Earthquake Visualizer"             |
|   - Magnitude Slider | Dark Mode Toggle        |
--------------------------------------------------
|   Sidebar / Drawer     |     Interactive Map   |
|   - Earthquake List    |     - Markers         |
|   - Click = Zoom       |     - Legend          |
--------------------------------------------------
```

---

## ✅ Accessibility

* Keyboard navigable UI
* Material UI components support screen readers
* Contrast-compliant color scheme (WCAG AA)

---

## 🕒 Refresh Strategy

* Earthquake data auto-refreshes every **5 minutes**
* User-initiated refresh button available

---

## 🚫 User Management

* Not required for this project
* Entire application is publicly accessible


