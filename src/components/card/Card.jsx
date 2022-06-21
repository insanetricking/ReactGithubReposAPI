import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getCurrentRepo, getContributors } from "../actions/repos";
import "./card.less";

const Card = (props) => {
	const navigate = useNavigate();

	const { username, reponame } = useParams();
	const [repo, setRepo] = useState({ owner: {} });
	const [сontributors, setContributors] = useState([]);

	useEffect(() => {
		getCurrentRepo(username, reponame, setRepo);
		getContributors(username, reponame, setContributors);
	}, []);

	return (
		<div>
			<button onClick={() => navigate(-1)} className="back-btn">
				Back
			</button>
			<div className="card">
				<img src={repo.owner.avatar_url} alt="" />
				<div className="name">{repo.name}</div>
				<div className="stars">{repo.stargazers_count}</div>
			</div>
			{сontributors.map((c, index) => (
				<div key={index}>
					{index + 1}. {c.login}
				</div>
			))}
		</div>
	);
};

export default Card;
