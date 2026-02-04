import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCamperStore } from "@/app/store/useCamperStore";
import Image from "next/image";
import styles from './CamperDetailsPage.module.css';

export default  function CamperDetailsPage() {
    const {id} = useParams();
    const {currentCamper, fetchCamperById, clearCurrentCamper, error, isLoading} = useCamperStore();

    const [activeTab, setActiveTab] = useState<'features' | 'reviews'>('features');
   
    useEffect(() => {
        if (typeof id === 'string') {
            fetchCamperById(id);
        }
        return () => clearCurrentCamper();
    }, [id, fetchCamperById, clearCurrentCamper]);

    if (isLoading) {
        return <div>Loading...</div>;
    }   
    if (error) {
        return <div className="errorMessage">Error: {error}</div>;
        
    }
    if (!currentCamper) return null;

    return (
        <main className={styles.container}>
      {/* Секція 1: Заголовок та основна інфо */}
      <section className={styles.header}>
        <h1 className={styles.title}>{currentCamper.name}</h1>
        <div className={styles.meta}>
          <span className={styles.rating}>⭐ {currentCamper.rating} ({currentCamper.reviews.length} Reviews)</span>
          <span className={styles.location}>📍 {currentCamper.location}</span>
        </div>
        <p className={styles.price}>€{currentCamper.price.toFixed(2)}</p>
      </section>

      {/* Секція 2: Галерея (згідно з ТЗ) */}
      <section className={styles.gallery}>
        {currentCamper.gallery.map((item, index) => (
          <div key={index} className={styles.imageWrapper}>
            <Image src={item.thumb} 
        alt={`${currentCamper.name} ${index + 1}`} 
        fill // 2. Заповнює весь батьківський div
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 290px"
        className={styles.camperImage}
        priority={index === 0}
        />
          </div>
        ))}
      </section>

      {/* Секція 3: Опис кемпера */}
      <p className={styles.description}>{currentCamper.description}</p>

      {/* Секція 4: Навігація табами */}
      <div className={styles.tabsNav}>
        <button
          type="button"
          className={`${styles.tabLink} ${activeTab === 'features' ? styles.active : ''}`}
          onClick={() => setActiveTab('features')}
        >
          Features
        </button>
        <button
          type="button"
          className={`${styles.tabLink} ${activeTab === 'reviews' ? styles.active : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews
        </button>
      </div>

      <hr className={styles.divider} />

      {/* Секція 5: Контент вкладок + Форма */}
      <div className={styles.detailsLayout}>
        <div className={styles.infoColumn}>
          {activeTab === 'features' ? (
            <div className={styles.featuresContent}>
               {/* <Features camper={currentCamper} /> */}
               <p>Тут будуть характеристики...</p>
            </div>
          ) : (
            <div className={styles.reviewsContent}>
               {/* <Reviews reviews={currentCamper.reviews} /> */}
               <p>Тут будуть відгуки...</p>
            </div>
          )}
        </div>
        
        <aside className={styles.sidebar}>
           {/* <BookingForm /> */}
           <div style={{ padding: '24px', border: '1px solid #ccc', borderRadius: '10px' }}>
             <h3>Book your campervan now</h3>
             <p>Stay connected with every adventure.</p>
             {/* Тимчасова заглушка для форми */}
           </div>
        </aside>
      </div>
    </main>
  );
}