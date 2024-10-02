import { Star } from "lucide-react";

type ratingProps = {
  ratings: number;
};

const Ratings = ({ ratings }: ratingProps) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      color={i <= ratings ? "#ffc107" : "#e4e5e9"}
      className="w-4 h-4"
    />
  ));
};

export default Ratings;
