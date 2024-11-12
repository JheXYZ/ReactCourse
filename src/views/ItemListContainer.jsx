import { useParams } from "react-router-dom";
import CategoryContainer from "./CategoryContainer";
import HomeContainer from "../components/Home";

export default function ItemListContainer() {
  const { id } = useParams();

  if (id) return <CategoryContainer id={id} />;
  else return <HomeContainer />;
}
