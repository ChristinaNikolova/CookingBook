import useFetch from "../../../hooks/useFetch";
import { getTranslations } from "../../../utils/i18n";
import CategoryItem from "../CategoryItem/CategoryItem";
import ListWrapper from "../ListWrapper/ListWrapper";
import Loader from "../../Loader/Loader";
import { image } from "../../../utils/helpers/image";
import { ids, serverPaths } from "../../../utils/constants/global";

export default function Categories() {
  const { values: result, loading } = useFetch([], serverPaths.CATEGORIES);
  const t = getTranslations();

  const categories = result.filter((x) => x.id !== ids.DEFAULT_CATEGORY_ID);

  if (loading) {
    return <Loader />;
  }

  return (
    <section id="categories">
      <ListWrapper title={t.categories}>
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
