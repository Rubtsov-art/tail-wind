import { useState } from 'react';
import { IRepo } from '../models/models';
import { useActions } from '../store/reduxHooks/useActions';
import { useAppSelector } from '../store/reduxHooks/useAppSelectot';

const RepoCard = ({ repo }: { repo: IRepo }) => {
  const { addFavorite, removeFavorite } = useActions();
  const favorites = useAppSelector((state) => state.github.favorites);

  const [iseFav, setIsFav] = useState(favorites.includes(repo.html_url));

  const addToFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addFavorite(repo.html_url);
    setIsFav(true);
  };

  const removeToFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    removeFavorite(repo.html_url);
    setIsFav(false);
  };

  return (
    <div className="border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
      <a href={repo.html_url} target="_blank" rel="noreferrer">
        <h2 className="text-lg font-bold">{repo.full_name}</h2>
        <p className="text-sm">
          Fork: {<span className="font-bold">{repo.forks}</span>}
          Watchers: {<span className="font-bold">{repo.watchers}</span>}
        </p>
        <p className="text-sm font-thin">{repo.description}</p>

        {!iseFav ? (
          <button
            className="py-2 px-4 bg-yellow-400 rounded hover:shadow-md transition-all"
            onClick={addToFavorite}
          >
            Add
          </button>
        ) : (
          <button
            className="py-2 px-4 bg-red-400 rounded hover:shadow-md transition-all"
            onClick={removeToFavorite}
          >
            Remove
          </button>
        )}
      </a>
    </div>
  );
};

export default RepoCard;
