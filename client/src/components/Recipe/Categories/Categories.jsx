import CategoryItem from "../CategoryItem/CategoryItem";
import ListWrapper from "../ListWrapper/ListWrapper";

export default function Categories() {
  return (
    <section id="categories">
      <ListWrapper title="Категории">
        <CategoryItem
          id="1"
          title="Торти"
          img="https://stylesweet.com/wp-content/uploads/2022/06/DripBestButterCake_Featured.jpg"
          desc=" Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
        <CategoryItem
          id="1"
          title="Торти"
          img="https://stylesweet.com/wp-content/uploads/2022/06/DripBestButterCake_Featured.jpg"
          desc=" Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
        <CategoryItem
          id="1"
          title="Торти"
          img="https://stylesweet.com/wp-content/uploads/2022/06/DripBestButterCake_Featured.jpg"
          desc=" Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
        <CategoryItem
          id="1"
          title="Торти"
          img="https://stylesweet.com/wp-content/uploads/2022/06/DripBestButterCake_Featured.jpg"
          desc=" Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
      </ListWrapper>
    </section>
  );
}
