export default function Rating({ rating = 0 }) {
  return <progress value={rating} max="5" />;
}
