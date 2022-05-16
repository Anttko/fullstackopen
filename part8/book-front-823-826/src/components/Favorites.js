import { useQuery } from "@apollo/client";
import { FAVORITE, USER_FAV_GENRE } from "../queries";

const FavoriteBooks = ({ userFavoriteBooks }) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {userFavoriteBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Favorites = (props) => {
  const favorite = useQuery(FAVORITE);
  const favGenre = useQuery(USER_FAV_GENRE);

  if (favorite.loading || favGenre.loading) {
    return <div>loading</div>;
  }


  if (!props.show) {
    return null;
  }
  const userFavorite = favorite.data.me.favoriteGenre;
  return (
    <div>
      <h2>recommendations</h2>
      books in your favorite genre <strong>{userFavorite}</strong>
      <FavoriteBooks userFavoriteBooks={favGenre.data.meFavoriteBooks} />
    </div>
  );
};

export default Favorites;
