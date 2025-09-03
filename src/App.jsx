// src/App.jsx
import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Drawer,
  CircularProgress,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";

// Default Leaflet marker fix (since icons may not show correctly with React)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [earthquakes, setEarthquakes] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(true);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const toggleTheme = () => setDarkMode(!darkMode);

  // Fetch earthquake data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
        );
        const data = await res.json();
        setEarthquakes(data.features);
        setLastUpdated(new Date(data.metadata.generated));
      } catch (err) {
        console.error("Error fetching earthquake data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Marker color by magnitude
  const getMarkerColor = (mag) => {
    if (mag < 3) return "green";
    if (mag < 5) return "orange";
    return "red";
  };

  const customIcon = (mag) =>
    L.divIcon({
      className: "custom-marker",
      html: `<div style="
        background:${getMarkerColor(mag)};
        width:${10 + mag * 3}px;
        height:${10 + mag * 3}px;
        border-radius:50%;
        border:2px solid white;
      "></div>`,
    });

  return (
    <Box
      className={darkMode ? "dark bg-gray-900 text-white" : ""}
      sx={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column" }}
    >
      {/* Top App Bar */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            SeismoMap
          </Typography>
          {lastUpdated && (
            <Typography variant="body2" sx={{ mr: 2 }}>
              Last Updated: {lastUpdated.toLocaleTimeString()}
            </Typography>
          )}
          <IconButton color="inherit" onClick={toggleTheme}>
            <Brightness4Icon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main Layout */}
      <Box sx={{ flex: 1, display: "flex" }}>
        {/* Sidebar (Drawer) */}
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer}
          sx={{ "& .MuiDrawer-paper": { width: 320, padding: 2 } }}
        >
          <Typography variant="h6" gutterBottom>
            Earthquake List
          </Typography>
          {loading ? (
            <CircularProgress />
          ) : (
            <Box sx={{ overflowY: "auto", maxHeight: "90vh" }}>
              {earthquakes.map((eq) => (
                <Box
                  key={eq.id}
                  sx={{
                    borderBottom: "1px solid #ddd",
                    padding: "8px 0",
                  }}
                >
                  <Typography variant="subtitle1">
                    M {eq.properties.mag} – {eq.properties.place}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(eq.properties.time).toLocaleString()}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Drawer>

        {/* Map Area */}
        <Box sx={{ flex: 1 }}>
          {loading ? (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <MapContainer
              center={[20, 0]} // world view
              zoom={2}
              style={{ height: "100%", width: "100%" }}
              worldCopyJump={false} // prevent jumping
              maxBounds={[[-90, -180], [90, 180]]} // constrain map view
              maxBoundsViscosity={1.0} // strongly restricts panning outside bounds
            >
              <TileLayer
                url={
                  darkMode
                    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                }
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                noWrap={true}
              />

              {earthquakes.map((eq) => {
                const [lon, lat, depth] = eq.geometry.coordinates;
                const { mag, place, time, url } = eq.properties;
                return (
                  <Marker
                    key={eq.id}
                    position={[lat, lon]}
                    icon={customIcon(mag)}
                  >
                    <Popup>
                      <Typography variant="subtitle1">
                        M {mag} – {place}
                      </Typography>
                      <Typography variant="body2">
                        Depth: {depth.toFixed(1)} km
                      </Typography>
                      <Typography variant="body2">
                        {new Date(time).toLocaleString()}
                      </Typography>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        More Info
                      </a>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default App;
