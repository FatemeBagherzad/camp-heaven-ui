import CampReview from '../CampReview/CampReview';

const CampReviewAll = ({
  campReview,
  handleDeleteReview,
  handleEditReview,
}) => {
  return (
    <section className="">
      {campReview.map((review) => {
        return (
          <CampReview
            review={review}
            key={review.id}
            handleDeleteReview={handleDeleteReview}
            handleEditReview={handleEditReview}
          />
        );
      })}
    </section>
  );
};
export default CampReviewAll;
