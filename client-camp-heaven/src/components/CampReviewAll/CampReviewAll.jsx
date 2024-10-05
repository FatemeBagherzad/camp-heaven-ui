import CampReview from '../CampReview/CampReview';

const CampReviewAll = ({ campReview, setCampReview }) => {
  return (
    <section className="">
      {campReview.map((review) => {
        return (
          <CampReview
            review={review}
            key={review.id}
            setCampReview={setCampReview}
          />
        );
      })}
    </section>
  );
};
export default CampReviewAll;
