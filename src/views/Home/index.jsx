import { useState, useEffect } from "react";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import WelcomeCard from "../../components/WelcomeCard";
import HomeGrid from "../../grids/HomeGrid";

export default function App() {
  const [showGrid, setShowGrid] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasLoaded(true);
    }, 1500);

    const showTimer = setTimeout(() => {
      setShowGrid(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(showTimer);
    };
  }, []);

  return (
    <LayoutGroup>
      <AnimatePresence mode="wait">
        {!showGrid ? (
          <WelcomeCard
            key="cover"
            hasLoaded={hasLoaded}
            onEnter={() => setShowGrid(true)}
          />
        ) : (
          <HomeGrid key="grid" />
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}
