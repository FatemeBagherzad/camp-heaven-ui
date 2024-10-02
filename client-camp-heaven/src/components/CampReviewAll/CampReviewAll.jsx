import CampReview from '../CampReview/CampReview';

const CampReviewAll = ({ campReview }) => {
  return (
    <section className="">
      {campReview.map((review) => {
        return <CampReview review={review} key={review._id} />;
      })}
    </section>
  );
};
export default CampReviewAll;
