import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IMAGES } from '../utils/images'

const DIVE_SITES = [
  { id: 1, name: 'Great Barrier Reef', lon: 145.8, lat: -16.5, height: 1500000, desc: 'The world\'s largest coral reef system.', depth: '5m - 30m', life: 'Manta Rays, Reef Sharks', img: IMAGES.scubaFeat1 },
  { id: 2, name: 'Blue Hole, Belize', lon: -87.53, lat: 17.31, height: 1000000, desc: 'A giant marine sinkhole off the coast of Belize.', depth: '5m - 40m', life: 'Caribbean Reef Sharks', img: IMAGES.snorkelingFeat1 },
  { id: 3, name: 'Palau, Micronesia', lon: 134.48, lat: 7.35, height: 1500000, desc: 'Famous for Blue Corner and jellyfish lake.', depth: '10m - 30m', life: 'Eagle Rays, Snappers', img: IMAGES.surfingFeat1 },
  { id: 4, name: 'Maldives', lon: 73.22, lat: 3.2, height: 2000000, desc: 'Stunning atolls and crystal clear warm waters.', depth: '10m - 30m', life: 'Whale Sharks, Turtles', img: IMAGES.scubaFeat2 },
]

export default function InteractiveDiveMap({ onSiteSelect }) {
  const containerRef = useRef(null)
  const viewerRef = useRef(null)
  const [selectedSite, setSelectedSite] = useState(null)

  useEffect(() => {
    // Check if Cesium has loaded
    if (!window.Cesium) {
      console.error("CesiumJS is not available globally.")
      return
    }

    // Set Base URL so Cesium knows where to load Web Workers and Assets from the CDN
    window.CESIUM_BASE_URL = 'https://cesium.com/downloads/cesiumjs/releases/1.132/Build/Cesium/'

    // Set Cesium Ion Access Token
    window.Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IkVxY1lQVGlOMVp4M3NtdWMiLCJqdGkiOiI2MDI2Yjg2NS0zZTA5LTQ4ODQtOGM0Mi0yYjgxOTQ1MzA4NDciLCJpZCI6NDY4NjA1LCJpc3MiOiJodHRwczovL2FwaS5jZXNpdW0uY29tIiwiYXVkIjoidW5kZWZpbmVkX2RlZmF1bHQiLCJpYXQiOjE3ODY5MDc0MzF9.EatbbDckxW4VVoTQ4aXQQ3mlBCvxIp1-XpM0YaLxNUM'

    // Initialize Cesium Viewer (defaults to premium Bing Maps satellite imagery)
    const viewer = new window.Cesium.Viewer(containerRef.current, {
      animation: false,
      timeline: false,
      baseLayerPicker: false,
      geocoder: false,
      homeButton: false,
      sceneModePicker: false,
      navigationHelpButton: false,
      infoBox: false,
      selectionIndicator: false,
      fullscreenButton: false,
    })

    viewerRef.current = viewer

    // Add 3D World Terrain
    viewer.scene.setTerrain(
      new window.Cesium.Terrain(
        window.Cesium.CesiumTerrainProvider.fromIonAssetId(1)
      )
    )

    // Configure globe aesthetics
    viewer.scene.globe.enableLighting = true
    viewer.scene.globe.depthTestAgainstTerrain = true
    
    // Zoom out initially
    viewer.camera.flyTo({
      destination: window.Cesium.Cartesian3.fromDegrees(100.0, 0.0, 25000000),
      duration: 0
    })

    // Add Dive Site Pins
    DIVE_SITES.forEach(site => {
      viewer.entities.add({
        id: `site-${site.id}`,
        position: window.Cesium.Cartesian3.fromDegrees(site.lon, site.lat),
        point: {
          pixelSize: 14,
          color: window.Cesium.Color.fromCssColorString('#2dd4bf'), // Tailwind accent color
          outlineColor: window.Cesium.Color.WHITE,
          outlineWidth: 2,
          disableDepthTestDistance: Number.POSITIVE_INFINITY // Always visible
        },
        label: {
          text: site.name,
          font: 'bold 16pt Inter, sans-serif',
          style: window.Cesium.LabelStyle.FILL_AND_OUTLINE,
          fillColor: window.Cesium.Color.WHITE,
          outlineColor: window.Cesium.Color.fromCssColorString('#021426'), // Navy
          outlineWidth: 4,
          verticalOrigin: window.Cesium.VerticalOrigin.BOTTOM,
          pixelOffset: new window.Cesium.Cartesian2(0, -20),
          disableDepthTestDistance: Number.POSITIVE_INFINITY
        }
      })
    })

    // Handle Clicks on Entities
    const handler = new window.Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
    handler.setInputAction((click) => {
      const pickedObject = viewer.scene.pick(click.position)
      if (window.Cesium.defined(pickedObject) && pickedObject.id) {
        const idStr = pickedObject.id.id
        if (idStr && idStr.startsWith('site-')) {
          const siteId = parseInt(idStr.split('-')[1])
          const site = DIVE_SITES.find(s => s.id === siteId)
          if (site) {
            setSelectedSite(site)
            onSiteSelect?.(site)
            // Fly to the specific location
            viewer.camera.flyTo({
              destination: window.Cesium.Cartesian3.fromDegrees(site.lon, site.lat, site.height),
              duration: 2.5
            })
          }
        }
      } else {
        setSelectedSite(null)
        onSiteSelect?.(null)
      }
    }, window.Cesium.ScreenSpaceEventType.LEFT_CLICK)

    return () => {
      handler.destroy()
      viewer.destroy()
    }
  }, [])

  return (
    <div id="dive-map-container" className="relative w-full h-[500px] sm:h-[600px] rounded-[40px] overflow-hidden bg-[#021426] shadow-float border border-white/5 pointer-events-auto">
      {/* Cleanup Cesium UI */}
      <style>{`
        .cesium-viewer-bottom,
        .cesium-viewer-toolbar,
        .cesium-viewer-animationContainer,
        .cesium-viewer-timelineContainer,
        .cesium-viewer-fullscreenContainer {
          display: none !important;
        }
        .cesium-widget canvas {
          outline: none !important;
          border-radius: 40px;
        }
      `}</style>

      {/* Cesium Container */}
      <div ref={containerRef} className="w-full h-full" />

      {/* Glassmorphism Side-Panel UI */}
      <AnimatePresence>
        {selectedSite && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="absolute top-4 bottom-4 left-4 z-10 w-[90%] sm:w-[350px] p-6 rounded-3xl glass-premium border border-white/20 shadow-2xl flex flex-col pointer-events-auto"
          >
            <button
              onClick={() => setSelectedSite(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/30 transition"
            >
              ✕
            </button>

            <span className="text-xs font-bold uppercase tracking-widest text-accent mb-1 block">
              Dive Site
            </span>
            <h3 className="font-heading text-2xl font-bold text-white mb-2">{selectedSite.name}</h3>
            
            <p className="text-sm text-white/70 mb-4">{selectedSite.desc}</p>
            
            <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 mt-auto shrink-0">
              <img src={selectedSite.img} alt={selectedSite.name} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-3 text-sm shrink-0">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/60">Depth Range</span>
                <strong className="text-white">{selectedSite.depth}</strong>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/60">Marine Life</span>
                <strong className="text-white text-right max-w-[60%]">{selectedSite.life}</strong>
              </div>
            </div>
            
            <button onClick={() => {
               setSelectedSite(null)
               onSiteSelect?.(null)
               if(viewerRef.current) {
                 viewerRef.current.camera.flyTo({
                   destination: window.Cesium.Cartesian3.fromDegrees(100.0, 0.0, 25000000),
                   duration: 2.0
                 })
               }
            }} className="w-full mt-6 rounded-full bg-accent py-3 text-sm font-bold text-navy transition hover:bg-white shrink-0">
              Back to Overview
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Instruction Overlay */}
      <div className="absolute top-6 right-6 pointer-events-none z-10">
        <span className="inline-flex items-center gap-2 rounded-full bg-black/60 backdrop-blur-md px-4 py-2 text-xs font-bold text-white border border-white/10 shadow-lg">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 18a8 8 0 118-8 8 8 0 01-8 8z" />
            <path d="M12 6v6l4 2" />
          </svg>
          Drag globe to explore
        </span>
      </div>
    </div>
  )
}
