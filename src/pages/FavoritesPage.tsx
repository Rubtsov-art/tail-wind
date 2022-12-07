import React from 'react';
import { useAppSelector } from '../store/reduxHooks/useAppSelectot';

const FavoritesPage = () => {
  const favorites = useAppSelector((state) => state.github.favorites);

  if (favorites.length === 0) return <p className="text-center">No items</p>;

  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      <ul className="list-none">
        {favorites.map((f) => {
          return (
            <li key={f}>
              <a href={f}>{f}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FavoritesPage;
