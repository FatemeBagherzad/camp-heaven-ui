import CampReview from '../CampReview/CampReview';

const CampReviewAll = ({ campReview }) => {
  return (
    <section className="">
      {campReview.map((review) => {
        return <CampReview review={review} key={review.id} />;
      })}
    </section>
  );
};
export default CampReviewAll;
