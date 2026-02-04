'use client';

import { useForm, useWatch } from 'react-hook-form';
import { useCamperStore } from '@/app/store/useCamperStore';
import { Filters as FilterTypes } from '../../types/camper';
import { useEffect } from 'react';

export const Filters = () => {
  const { filters, setFilters, fetchCampers, resetFilters } = useCamperStore();

 const { register, handleSubmit, setValue, control, reset } = useForm<FilterTypes>({
    defaultValues: filters,
  });

  const formValues = useWatch({control});

  useEffect (() => {
    reset (filters);
  }, [filters, reset]);

  const onSubmit = (data: FilterTypes) => {
    // 1. Оновлюємо глобальний стор
    setFilters(data);
    // 2. Викликаємо пошук (isNewSearch = true)
    fetchCampers(true);
  };

  // Функція для перемикання значень, які не є стандартними інпутами
  const toggleCheckbox = (name: keyof FilterTypes) => {
    // const currentValue = formValues[name];
    // if (typeof currentValue === 'boolean') {
      setValue(name, !formValues[name] as boolean);
    
  };

  const setVehicleType = (type: FilterTypes['form']) => {
    // Якщо тип уже такий самий — знімаємо його (null), якщо ні — ставимо новий
    setValue('form', formValues.form === type ? null : type);
  };

  const resetAllFilters = () => {
    resetFilters();
    fetchCampers(true);
  };

  return (
    <aside className="sidebar">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Location */}
        <div className="filter-group">
          <label className="label-gray">Location</label>
          <input
            {...register('location')}
            type="text"
            placeholder="City, Country"
            className="location-input"
          />
        </div>

        <p className="filters-title">Filters</p>

        {/* Vehicle Equipment */}
        <div className="filter-section">
          <h3 className="section-title">Vehicle equipment</h3>
          <hr />
          <div className="filter-grid">
            <button
              type="button"
              className={`filter-btn ${formValues.AC ? 'active' : ''}`}
              onClick={() => toggleCheckbox('AC')}
            >
              AC
            </button>

            <button
              type="button"
              className={`filter-btn ${formValues.kitchen ? 'active' : ''}`}
              onClick={() => toggleCheckbox('kitchen')}
            >
              Kitchen
            </button>

            <button
              type="button"
              className={`filter-btn ${formValues.TV ? 'active' : ''}`}
              onClick={() => toggleCheckbox('TV')}
            >
              TV
            </button>

            <button
              type="button"
              className={`filter-btn ${formValues.bathroom ? 'active' : ''}`}
              onClick={() => toggleCheckbox('bathroom')}
            >
              Bathroom
            </button>
          </div>
        </div>

        {/* Vehicle Type */}
        <div className="filter-section">
          <h3 className="section-title">Vehicle type</h3>
          <hr />
          <div className="filter-grid">
            <button
              type="button"
              className={`filter-btn ${formValues.form === 'panelTruck' ? 'active' : ''}`}
              onClick={() => setVehicleType('panelTruck')}
            >
              Van
            </button>

            <button
              type="button"
              className={`filter-btn ${formValues.form === 'fullyIntegrated' ? 'active' : ''}`}
              onClick={() => setVehicleType('fullyIntegrated')}
            >
              Fully Integrated
            </button>

            <button
              type="button"
              className={`filter-btn ${formValues.form === 'alcove' ? 'active' : ''}`}
              onClick={() => setVehicleType('alcove')}
            >
              Alcove
            </button>
          </div>
        </div>

        <div className="filters-actions">
          <button type="submit" className="search-submit-btn">
            Search
          </button>

          <button
            type="button"
            className="reset-btn"
            onClick={resetAllFilters}
          >
            Reset
          </button>
        </div>
      </form>
    </aside>
  );
};