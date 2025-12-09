import useFetch from "../../../hooks/useFetch";
import CategoryItem from "../CategoryItem/CategoryItem";
import ListWrapper from "../ListWrapper/ListWrapper";
import Loader from "../../Loader/Loader";
import { image } from "../../../utils/helpers/image";
import { ids, serverPaths } from "../../../utils/constants/global";

const initialValues = [];

export default function Categories() {
  const { values, loading } = useFetch(initialValues, serverPaths.CATEGORIES);

  const categories = values.filter((x) => x.id !== ids.DEFAULT_CATEGORY_ID);

  if (loading) {
    return <Loader />;
  }

  return (
    <section id="categories">
      <ListWrapper title="Категории">
        {categories.map((x) => (
          <CategoryItem
            key={x.id}
            id={x.id}
            name={x.name}
            image={image.getImageUrl(x.image)}
            description={x.description}
          />
        ))}
      </ListWrapper>
    </section>
  );
}
