import { useQuery, useApolloClient } from "@apollo/client";
import { GENRE_SEARCH, FAVORITE } from "../queries";

const Favorites = (props) => {
  const favorite = useQuery(FAVORITE);

  if (favorite.loading) {
    return <div>loading</div>;
  }
  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>recommendations</h2>
      books in your favorite genre <strong>{favorite.data.me.favoriteGenre}</strong>
    </div>
  );
};

export default Favorites;
