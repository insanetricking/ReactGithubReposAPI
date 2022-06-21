import React from "react";
import { useNavigate } from "react-router-dom";

const Error = (props) => {
	const navigate = useNavigate();

	return (
		<div style={{ textAlign: "center" }}>
			<button onClick={() => navigate("/")}>GO TO MAIN PAGE</button>
			ERROR
		</div>
	);
};

export default Error;
