"use client";

import { useState } from "react";
import Button from "../Button/Button";
import Icon from "../../constants/const";
import styles from "./Sidebar.module.css";
import { useCamperStore } from "../store/camperStore";
import { vehicleEquipment, vehicleType } from "@/constants/const";

export default function Sidebar() {
  const { filters, setFilters, getCampers, isLoading, resetFilters } = useCamperStore();

  // локальні стани (первинно ініціалізуємо зі значень store)
  const [activeEquip, setActiveEquip] = useState<string[]>(
    Object.entries(filters)
      .filter(([key, value]) => typeof value === "boolean" && value)
      .map(([key]) => key)
  );
  const [vehicleTypeLocal, setVehicleType] = useState<string | null>(filters.form);
  const [location, setLocation] = useState(filters.location || "");

  const toggleEquip = (name: string) => {
    setActiveEquip((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name],
    );
  };

  const selectVehicleType = (type: string) => {
    setVehicleType((prev) => (prev === type ? null : type));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    const newFilters = {
      location,
      form: vehicleTypeLocal,
      transmission: activeEquip.includes("Automatic") ? "automatic" : null,
      AC: activeEquip.includes("AC"),
      kitchen: activeEquip.includes("kitchen"),
      TV: activeEquip.includes("TV"),
      bathroom: activeEquip.includes("bathroom"),
    };

    setFilters(newFilters);
    await getCampers(true);
  };

  const handleReset = async () => {
    resetFilters();
    setActiveEquip([]);
    setVehicleType(null);
    setLocation("");
    await getCampers(true);
  };

  return (
    <section>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Location */}
        <div className={styles.location}>
          <p className={styles.locationText}>Location</p>
          <div className={styles.input}>
            <div><Icon name="map" size={20} /></div>
            <input
              className={styles.inputField}
              type="text"
              placeholder="City"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>

       
        <div className={styles.filters}>
          <p className={styles.filtersText}>Filters</p>

          {/* Vehicle Equipment */}
          <div className={styles.vehicleEquip}>
            <h2 className={styles.vehicleText}>Vehicle equipment</h2>
            <hr className={styles.line}/>
            <div className={styles.equipList}>
              {Object.entries(vehicleEquipment).map(([key, { label, icon }]) => (
                <button
                  key={key}
                  type="button"
                  className={`${styles.equipItem} ${activeEquip.includes(key) ? styles.active : ""}`}
                  onClick={() => toggleEquip(key)}
                >
                  <Icon name={icon} size={32} />
                  <p className={styles.equipText}>{label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Vehicle Type */}
          <div className={styles.vehicleType}>
            <h2 className={styles.vehicleText}>Vehicle type</h2>
            <hr className={styles.line}/>
            <div className={styles.typeList}>
              {Object.entries(vehicleType).map(([key, { label, icon }]) => (
                <button
                  key={key}
                  type="button"
                  className={`${styles.typeItem} ${vehicleTypeLocal === key ? styles.active : ""}`}
                  onClick={() => selectVehicleType(key)}
                >
                  <Icon name={icon} size={32} />
                  <p className={styles.equipText}>{label}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.btnWrap}>
          <Button disabled={isLoading}>
            {isLoading ? "Loading..." : "Search"}
          </Button>
          <Button type="button" onClick={handleReset} disabled={isLoading}>
            Reset
          </Button>
        </div>
      </form>
    </section>
  );
}
