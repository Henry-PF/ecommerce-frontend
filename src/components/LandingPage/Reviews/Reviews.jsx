import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel, Card } from 'react-bootstrap';
import styles from './style.module.css'
import { dataTestimonials } from './dataTestimonials.js'
import PropTypes from 'prop-types';


const StarRating = ({ rating, onRatingChange }) => {
    const score = ["⭐", "⭐", "⭐", "⭐", "⭐"];

    const handleStarClick = (selectedRating) => {
        onRatingChange(selectedRating);
    };

    return (
        <div>
            {score.map((star, index) => (
                <span
                    key={index}
                    onClick={() => handleStarClick(index + 1)}
                    style={{ cursor: 'pointer', color: index < rating ? 'gold' : 'gray' }}
                >
                    {star}
                </span>
            ))}
        </div>
    );
};

StarRating.propTypes = {
    rating: PropTypes.number.isRequired, 
    onRatingChange: PropTypes.func.isRequired,
};


const Review = ({ onSubmit, onReport }) => {
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);

    const [showReportForm, setShowReportForm] = useState(false);
    const [reportReason, setReportReason] = useState('');
    const [additionalDetails, setAdditionalDetails] = useState('');

    const handleTextChange = (selectedRating) => {
        setReviewText(selectedRating);
    };

    const handleRatingChange = (event) => {
        setRating(parseInt(event.target.value));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({ text: reviewText, rating });
        setReviewText('');
        setRating(0);
    };

    const handleReport = () => {
        setShowReportForm(true);
    };
    
    const handleSubmitReport = () => {
        const reportData = {
          reason: reportReason,
          details: additionalDetails,
    };
    
    onReport(reportData);
    
    setShowReportForm(false);
    setReportReason('');
    setAdditionalDetails('');
    };

    return (
        <div>
            <h3>Comparte tu experiencia</h3>
            <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="reviewText">Comentario:</label>
                <textarea
                    id="reviewText"
                    value={reviewText}
                    onChange={(e) => handleTextChange(e.target.value)}
                    placeholder="Escribe tu opinión..."/>
                </div>
        <div>
            <label>Puntuación:</label>
            <StarRating rating={rating} onRatingChange={handleRatingChange} />
                </div>
                <button type="submit">Enviar Review</button>
                <button onClick={handleReport}>Reportar</button>
        {showReportForm && (
        <div>
            <label>Motivo del reporte:</label>
            <select value={reportReason} onChange={(e) => setReportReason(e.target.value)}>
              {/* Opciones para el motivo del reporte */}
            </select>
            <label>Detalles adicionales:</label>
            <textarea
              value={additionalDetails}
              onChange={(e) => setAdditionalDetails(e.target.value)}
            />
            <button onClick={handleSubmitReport}>Enviar Reporte</button>
        </div>
        )}
            </form>
        </div>
    );
};

Review.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onReport: PropTypes.func.isRequired,
};

const Reviews = () => {
    const dispatch = useDispatch();
    // const reviews = useSelector(state => state.reviews)
    const reviews = dataTestimonials;
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

    // Enviar revision al back
    const handleReviewSubmit = (reviewData) => {
        console.log('Nueva revisión:', reviewData);
    };

    // Enviar reporte al back
    const handleReportSubmit = (reportData) => {
        console.log('Nuevo reporte:', reportData);
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
            <Review onSubmit={handleReviewSubmit} onReport={handleReportSubmit}/>
        </div>
    )
}

export default Reviews