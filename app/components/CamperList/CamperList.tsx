import { getCampers } from "@/app/services/api";
import { useQuery } from "@tanstack/react-query"
import CamperCard from "../CamperCard/CamperCard";
import styles from './CamperList.module.css';
import { Camper } from '../../types/camper';

const CamperList = () => {
    const {data, isLoading, error} = useQuery<Camper[]>({
        queryKey: ['campers'],
        queryFn: getCampers,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading campers</div>;

    if (!data || data.length === 0) {
        return <div className={styles.status}>No campers found matching your criteria.</div>;
    }
    
    return (
    <ul className={styles.list}>
      
      {data?.map((camper) => (
        <li key={camper.id} className={styles.listItem}>
          <CamperCard camper={camper} />
        </li>
      ))}
    </ul>
  );
};
export default CamperList;