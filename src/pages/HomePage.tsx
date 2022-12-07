import React, { useEffect, useState } from 'react';
import RepoCard from '../components/RepoCard';
import useDebounce from '../hooks/useDebounce';
import {
  useLazyGetUserReposQuery,
  useSearchUsersQuery,
} from '../store/github/github.api';

const HomePage = () => {
  const [search, setSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const debounced = useDebounce(search, 300);
  const {
    isLoading,
    isError,
    data: users,
  } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true,
  });

  const [fetchRepos, { isLoading: areReposLoading, data: repos }] =
    useLazyGetUserReposQuery();

  const clickHandler = (userName: string) => {
    fetchRepos(userName);
    setShowDropdown(false);
  };

  useEffect(() => {
    setShowDropdown(debounced.length > 3 && !!users?.length);
  }, [debounced, users]);

  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      {isError && (
        <p className="text-center text-red-600">something went wrong...</p>
      )}

      <div className="relative w-[560px]">
        <input
          className="border py-2 px-4 w-full h-42px mb-2"
          type="text"
          placeholder="Search for github username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {showDropdown && (
          <ul className="absolute top-[42px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white list-none">
            {isLoading ? (
              <p className="text-center">Loading...</p>
            ) : (
              <div>
                {users?.map((user) => (
                  <li
                    onClick={() => clickHandler(user.login)}
                    className="py-2 px-4 hover:bg-gray-500 transition-colors cursor-pointer"
                    key={user.id}
                  >
                    {user.login}
                  </li>
                ))}
              </div>
            )}
          </ul>
        )}

        <div className="container">
          {areReposLoading ? (
            <p className="text-center"> Repos are loading... </p>
          ) : (
            <div>
              {repos?.map((repo) => (
                <RepoCard repo={repo} key={repo.id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
