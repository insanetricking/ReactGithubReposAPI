import axios from "axios";
import { setRepos, setIsFetching, setFetchError } from "../../reducers/reposReducer";

const _defaultSearchQuery = "stars:%3E1";

export const getRepos = (searchQuery = _defaultSearchQuery, currentPage, perPage) => {
	if (searchQuery.trim() == "") {
		searchQuery = _defaultSearchQuery;
	}

	return async (dispatch) => {
		try {
			dispatch(setIsFetching(true));
			const response = await axios.get(
				`https://api.github.com/search/repositories?q=${searchQuery}&sort=stars&per_page=${perPage}&page=${currentPage}`
			);
			dispatch(setRepos(response.data));
		} catch (e) {
			dispatch(setFetchError(true));
			dispatch(setIsFetching(false));
			setTimeout(() => {
				dispatch(setFetchError(false));
			}, 2000);
		}
	};
};

export const getCurrentRepo = async (username, reponame, setRepo) => {
	const response = await axios.get(
		`https://api.github.com/repos/${username}/${reponame}`
	);

	setRepo(response.data);
};

export const getContributors = async (username, reponame, setContributors) => {
	const response = await axios.get(
		`https://api.github.com/repos/${username}/${reponame}/contributors?page=1&per_page=10`
	);

	setContributors(response.data);
};
