"use client";
import { createContext, useState, ReactNode, useMemo, useEffect } from "react";

export type coordsProps = {
  lat: number;
  long: number;
} | null;
type CoordsContextType = {
  coords: coordsProps;
  getLocations: () => void;
};

export const userCoords = createContext<CoordsContextType | null>(null);

export const CoordsProvider = ({ children }: { children: ReactNode }) => {
  const [coords, setCoords] = useState<coordsProps>(null);

  const getLocations = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((position) => {
      setCoords({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });
    });
  };

  useEffect(() => {
    getLocations();
  }, []);

  const value = useMemo(() => ({ coords, getLocations }), [coords]);
  return <userCoords.Provider value={value}>{children}</userCoords.Provider>;
};
