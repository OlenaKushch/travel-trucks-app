import Image from "next/image";
import styles from "./CamperCard.module.css";
import { Camper } from "../../types/camper";
import { useFavoritesStore} from '../../store/favoritesStore';

interface CamperCardProps {
  camper: Camper;
}

const CamperCard = ({ camper }: CamperCardProps) => {

  const isFavorite = useFavoritesStore((state) => state.isFavorite(camper.id));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}>
        <Image
          src={camper.gallery[0]?.original}
          alt={camper.name}
          fill
          className={styles.camperImage}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
  <h2 className={styles.name}>{camper.name}</h2>
  <div className={styles.priceBox}>
    <span className={styles.price}>€{camper.price.toFixed(2)}</span>
    <button 
      className={styles.favoriteBtn} 
      onClick={() => toggleFavorite(camper.id)}
      type="button"
      aria-label="Toggle favorite"
    >
      <svg 
        width="24" 
        height="24" 
        className={isFavorite ? styles.iconHeartActive : styles.iconHeart}
      >
        <use href={isFavorite ? "/sprite.svg#icon-heart-active" : "/sprite.svg#icon-heart-def"} />
      </svg>
    </button>
  </div>
</div>

        <div className={styles.meta}>
          <span className={styles.rating}>
            <svg width="16" height="16" className={styles.iconStar}>
              <use href="/sprite.svg#icon-default-star" />
            </svg>
            {camper.rating} ({camper.reviews.length} Reviews)
          </span>
          <span className={styles.location}>
            <svg width="16" height="16">
              <use href="/sprite.svg#icon-map" />
            </svg>
            {camper.location}
          </span>
        </div>

        <p className={styles.description}>{camper.description}</p>

        <div className={styles.tags}>
          <div className={styles.tag}>
            <svg width="20" height="20">
              <use href="/sprite.svg#icon-bi_grid" />
            </svg>
            <span>{camper.transmission}</span>
          </div>

          <div className={styles.tag}>
            <svg width="20" height="20">
              <use href="/sprite.svg#icon-bi_grid-1x2" />
            </svg>
            <span>{camper.engine}</span>
          </div>

          {camper.kitchen && (
            <div className={styles.tag}>
              <svg width="20" height="20">
                <use href="/sprite.svg#icon-cup-hot" />
              </svg>
              <span>Kitchen</span>
            </div>
          )}

          {camper.AC && (
            <div className={styles.tag}>
              <svg width="20" height="20">
                <use href="/sprite.svg#icon-wind" />
              </svg>
              <span>AC</span>
            </div>
          )}
        </div>

        <button className={styles.showMoreBtn}>Show more</button>
      </div>
    </div>
  );
};

export default CamperCard;
