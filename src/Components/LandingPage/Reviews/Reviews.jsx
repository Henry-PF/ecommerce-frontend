import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel, Card } from 'react-bootstrap';
import styles from './style.module.css'

const Reviews = () => {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.reviews)

    const itemsPerPage = window.innerWidth <= 768 ? 1 : 3; // Mostrar 1 card en pantalla pequeña, 3 en pantalla grande
    const totalItems = reviews.length;
    const totalGroups = Math.ceil(totalItems / itemsPerPage);

    const [activeGroup, setActiveGroup] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            const newItemsPerPage = window.innerWidth <= 768 ? 1 : 3;
            if (newItemsPerPage !== itemsPerPage) {
                setActiveGroup(0);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [itemsPerPage]);

    const handleSelect = (selectedIndex, e) => {
        e.preventDefault();
        setActiveGroup(selectedIndex);
    };

    const renderTestimonialsGroup = (groupIndex) => {
        const startIndex = groupIndex * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return reviews.slice(startIndex, endIndex).map((testimony, idx) => (
            <Card key={startIndex + idx} className={styles.card}>
                <div className={styles.image}>
                    <img src={testimony.image} alt={testimony.image} />
                </div>
                <h3 style={{ fontSize: '12px', height: '80px' }}>{testimony.testimony}</h3>
                <h2 style={{ height: '30px', fontSize: '20px', fontWeight: 'bolder' }}>{testimony.name}</h2>
            </Card>
        ));
    };

    return (
        <div className={styles.testimonialsContainer}>
            <h2 style={{ color: 'black', fontWeight: 'bolder' }}>TESTIMONIOS</h2>
            <br />
            <Carousel
                activeIndex={activeGroup}
                onSelect={handleSelect}
                interval={null}
                wrap={true}
                variant='dark'
                className={styles.carousel}
                indicators={false}
            >
                {Array.from({ length: totalGroups }).map((_, groupIndex) => (
                    <Carousel.Item key={groupIndex}>
                        <div className={styles.carouselRow}>
                            {renderTestimonialsGroup(groupIndex)}
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    )
}

export default Reviews