import React, { useEffect, useState } from "react";

export default function FloatingBubbles() {
  const [bubbles, setBubbles] = useState([]);
  const [sparkles, setSparkles] = useState([]);

  const icons = [
    "/australian-cultural-diary/icons/koala.png",
    "/australian-cultural-diary/icons/kangaroo.png",
    "/australian-cultural-diary/icons/flag.png",
    "/australian-cultural-diary/icons/flag2.png",
    "/australian-cultural-diary/icons/boom.png",
    "/australian-cultural-diary/icons/turtle.png",
    "/australian-cultural-diary/icons/rugby.png",
    "/australian-cultural-diary/icons/coral.png",
    "/australian-cultural-diary/icons/surf.png"
  ];


  // create bubbles
  useEffect(() => {
    const interval = setInterval(() => {
      const id = Math.random();

      setBubbles((prev) => [
        ...prev,
        {
          id,
          left: Math.random() * 100,
          size: 40 + Math.random() * 40,
          duration: 7 + Math.random() * 6,
          icon: icons[Math.floor(Math.random() * icons.length)],
        },
      ]);

      setTimeout(() => {
        setBubbles((prev) => prev.filter((b) => b.id !== id));
      }, 14000);
    }, 900);

    return () => clearInterval(interval);
  }, []);

  // pop & sparkle
  const popBubble = (e, bubbleId) => {
    // remove the bubble immediately
    setBubbles((prev) => prev.filter((b) => b.id !== bubbleId));

    const rect = e.target.getBoundingClientRect();
    const clickX = rect.left + rect.width / 2;
    const clickY = rect.top + rect.height / 2;

    const id = Math.random();
    const sparkleCount = 12;

    setSparkles((prev) => [
      ...prev,
      {
        id,
        x: clickX,
        y: clickY,
        particles: Array.from({ length: sparkleCount }).map(() => ({
          angle: Math.random() * Math.PI * 2,
          distance: 20 + Math.random() * 30,
          size: 3 + Math.random() * 4,
        })),
      },
    ]);

    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== id));
    }, 600);
  };

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
        {bubbles.map((b) => (
          <img
            key={b.id}
            src={b.icon}
            className="absolute pointer-events-auto cursor-pointer"
            onClick={(e) => popBubble(e, b.id)}
            style={{
              left: `${b.left}%`,
              bottom: `-120px`,
              width: 40,
              height: "auto",
              animation: `floatUp ${b.duration}s linear forwards`,
            }}
          />
        ))}
      </div>

      <div className="pointer-events-none fixed inset-0 z-[70]">
        {sparkles.map((s) =>
          s.particles.map((p, index) => {
            const x = s.x + Math.cos(p.angle) * p.distance;
            const y = s.y + Math.sin(p.angle) * p.distance;

            return (
              <div
                key={`${s.id}-${index}`}
                className="absolute"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  background: "gold",
                  borderRadius: "50%",
                  opacity: 0,
                  animation: "sparkle 0.6s ease-out",
                }}
              ></div>
            );
          })
        )}
      </div>

      <style>{`
        @keyframes floatUp {
          from { transform: translateY(0); opacity: 0.5; }
          to   { transform: translateY(-120vh); opacity: 0; }
        }

        @keyframes sparkle {
          0% { transform: scale(0.4); opacity: 1; }
          70% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(0.2); opacity: 0; }
        }
      `}</style>
    </>
  );
}
