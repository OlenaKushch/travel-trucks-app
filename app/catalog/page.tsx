import { useEffect, useRef } from "react";
import { useCamperStore } from "../store/camperStore";
import { Filters } from "../components/Filters/Filters";

import styles from './CatalogPage.module.css';
import CamperCard from "../components/CamperCard/CamperCard";

const CatalogPage = () => {
    const {
        campers,
        isLoading,
        error,
        fetchCampers,
        isMoreAvailable,
    } = useCamperStore();

    const initialised = useRef(false);

    useEffect(() => {
        if( !initialised.current) {
            fetchCampers();
            initialised.current = true;
        }
    }, [fetchCampers]);

    return (
        <main className={styles.container}>
            <Filters />
            <section className={styles.catalog}>
                {error && <p className={styles.errorMessage}>{error}</p>}

                <div className={styles.campersList}>
                    {campers.map(camper => (
                        <CamperCard key={camper.id} camper={camper} />
                    ))}
                </div>
                {isLoading && <p className={styles.loadingMessage}>Loading...</p>}
                

                {isMoreAvailable && !isLoading && campers.length > 0 && (
                    <button
                        className={styles.loadMoreButton}
                        onClick={() => fetchCampers(true)}
                    >
                        Load More
                    </button>
                )}
            </section>
            </main>
    );
};

export default CatalogPage;