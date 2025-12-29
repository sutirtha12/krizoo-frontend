import { useEffect, useRef } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";
import { dispatchStats } from "../data/dispatchStats";

export default function DispatchGlobe() {
  const globeRef = useRef();

  useEffect(() => {
    const controls = globeRef.current.controls();

    // 🔒 LOCK ALL INTERACTION
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = false;

    // 🎥 CINEMATIC ROTATION
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.25;
  }, []);

  return (
    <section className="relative py-40 bg-black overflow-hidden">
      <h2 className="text-center mb-20 font-brand font-black text-4xl tracking-widest">
        DELIVERY FOOTPRINT
      </h2>

      <div className="relative h-130 flex justify-center">

        <Globe
          ref={globeRef}
          backgroundColor="rgba(0,0,0,0)"

          /* ❌ REMOVE SOLID EARTH */
          globeMaterial={new THREE.MeshBasicMaterial({
            color: "rgba(0,0,0,0)"
          })}

          /* 🌐 DOTTED SPHERE */
          pointsData={Array.from({ length: 1800 }).map(() => ({
            lat: (Math.random() - 0.5) * 180,
            lng: (Math.random() - 0.5) * 360
          }))}
          pointLat="lat"
          pointLng="lng"
          pointRadius={0.12}
          pointColor={() => "rgba(120,200,255,0.45)"}
          pointsMerge={true}

          /* 🕸 NETWORK ARCS */
          arcsData={dispatchStats}
          arcStartLat={d => d.lat}
          arcStartLng={d => d.lng}
          arcEndLat={() => 20}
          arcEndLng={() => 78}
          arcColor={() => ["rgba(120,200,255,0.9)"]}
          arcDashLength={0.35}
          arcDashGap={0.6}
          arcDashAnimateTime={4000}
          arcStroke={0.6}

          atmosphereColor="rgba(120,200,255,0.6)"
          atmosphereAltitude={0.12}
        />

        {/* 📊 OUTSIDE PERCENTAGE LABELS */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 space-y-4">
          {dispatchStats.map((d, i) => (
            <div
              key={i}
              className="flex items-center gap-3 text-sm tracking-widest text-white/80"
            >
              <span className="w-10 h-px bg-cyan-400/70" />
              <span>{d.percent}%</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-center mt-16 text-sm tracking-widest opacity-60">
        Order distribution across India & neighbouring regions
      </p>
    </section>
  );
}