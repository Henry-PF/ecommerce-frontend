import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Rating } from 'react-simple-star-rating';
import style from './style.module.css';
import { useParams } from 'react-router-dom';
import { getAllProductReviews, createProductReview } from '../../../redux/actions.js';

const ProductReviewsAndForm = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const productReviews = useSelector((state) => state.productReviews);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const userId = localStorage.getItem('id');

  useEffect(() => {
    if (productId) {
      dispatch(getAllProductReviews(productId));
    }
  }, [dispatch, productId]);

  const handleRatingChange = (newRating) => {
    console.log('New Rating:', newRating); // Agrega este log para verificar el nuevo valor de rating
    setRating(newRating);
  };
  const handleChangeContent = (e) => {
    console.log('Content:', e.target.value); // Agrega este log para verificar el contenido
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (productId && content.trim() !== '') {
      try {
        dispatch(createProductReview({ productId, userId, puntuacion: rating, contenido: content }));
        console.log('Review creada exitosamente');
      } catch (error) {
        console.error('Error al crear la revisión del producto:', error);
      }
    } else {
      console.error('El contenido de la revisión no puede estar vacío');
    }
    setRating(0);
    setContent('');
  };
  return (
    <div className='container'>
      <h2 className='text-center'>Product Reviews</h2>
      <div>
        <h3>Leave a Review</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Rating:</label>
            <Rating onClick={handleRatingChange} ratingValue={rating} />
          </div>
          <div>
            <label>Content:</label>
            <textarea
              value={content}
              onChange={handleChangeContent}
              required
            />
          </div>
          <button type="submit">Submit Review</button>
        </form>
      </div>

      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {productReviews.data?.map(review => (
          <SwiperSlide className={style.card} key={review.id}>
            <h4>{review.usuario?.persona?.nombre} {review.usuario?.persona?.apellido}</h4>
            <div
              style={{
                direction: 'ltr',
                fontFamily: 'sans-serif',
                touchAction: 'none'
              }}
            >
              <Rating
                initialValue={review.puntuacion}
                onClick={function noRefCheck() { }}
                readonly
                allowFraction
              />
            </div>
            {review.contenido}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductReviewsAndForm;
