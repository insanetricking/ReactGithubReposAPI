import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRepos } from "../actions/repos";
import { setCurrentPage } from "../../reducers/reposReducer";
import { createPages } from "../../utils/pagesCreator";
import { useNavigate } from "react-router-dom";

import "./main.less";
import Repo from "./repo/repo";

const Main = () => {
	const navigate = useNavigate();
	const [searchValue, setSearchValue] = useState("");
	const dispatch = useDispatch();
	const repos = useSelector((state) => state.repos.items);
	const isFetching = useSelector((state) => state.repos.isFetching);
	const isFetchError = useSelector((state) => state.repos.isFetchError);
	const currentPage = useSelector((state) => state.repos.currentPage);
	const totalCount = useSelector((state) => state.repos.totalCount);
	const perPage = useSelector((state) => state.repos.perPage);
	const pagesCount = Math.ceil(totalCount / perPage);

	const pages = [];
	createPages(pages, pagesCount, currentPage);

	useEffect(() => {
		dispatch(getRepos(searchValue, currentPage, perPage));
	}, [currentPage]);

	function searchHandler() {
		dispatch(setCurrentPage(1));
		dispatch(getRepos(searchValue, currentPage, perPage));
	}

	// if (isFetchError === true) {
	// 	return navigate("/error");
	// }

	return (
		<div>
			{isFetchError && (
				<div className="alert alert-danger" role="alert">
					Произошла ошибка! Попробуйте обновить страницу!
				</div>
			)}
			<div className="search">
				<input
					value={searchValue}
					onChange={(e) => {
						setSearchValue(e.target.value);
					}}
					type="text"
					className="search-input"
				/>
				<button onClick={() => searchHandler()} className="search-btn">
					Search
				</button>
			</div>
			{isFetching === false ? (
				repos.map((repo) => <Repo repo={repo} key={repo.name} />)
			) : (
				<div className="fetching"></div>
			)}

			<div className="pages">
				{pages.map((page, index) => (
					<span
						key={index}
						className={currentPage == page ? "current-page" : "page"}
						onClick={() => dispatch(setCurrentPage(page))}
					>
						{page}
					</span>
				))}
			</div>
		</div>
	);
};

export default Main;
