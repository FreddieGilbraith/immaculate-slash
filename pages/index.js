import React from "react";

function usePersistedState(key, initialValue) {
	const [state, setState] = React.useState(
		process.browser ? localStorage[key] : "",
	);

	React.useEffect(() => {
		setState(localStorage[key]);
	}, []);

	React.useEffect(() => {
		localStorage[key] = state;
	}, [state]);

	return [state, setState];
}

function Section({ name, id, update, value }) {
	return (
		<details style={{ padding: 8 }}>
			<summary>{name}</summary>
			<textarea
				onChange={update.bind(null, id)}
				value={value}
				style={{
					width: "90vw",
					height: "40vw",
				}}
			/>
		</details>
	);
}

function Home() {
	const [ship, setShip] = usePersistedState("ship", "");
	const [section1, setSection1] = usePersistedState("1", "");
	const [section2, setSection2] = usePersistedState("2", "");
	const [section3, setSection3] = usePersistedState("3", "");

	const [output, setOutput] = React.useState("");

	function update(section, e) {
		({
			ship: setShip,
			1: setSection1,
			2: setSection2,
			3: setSection3,
		}[section](e.target.value));
	}

	return (
		<div style={{ padding: 8 }}>
			<h1>Immaculate Slash</h1>
			ship:{" "}
			<input
				type="text"
				onChange={update.bind(null, "ship")}
				value={ship}
			/>
			<Section name="Section 1" id="1" update={update} value={section1} />
			<Section name="Section 2" id="2" update={update} value={section2} />
			<Section name="Section 3" id="3" update={update} value={section3} />
			<br />
			<hr />
			<output
				style={{
					borderColor: "black",
					borderStyle: "soild",
					margin: 8,
					padding: 8,
					whiteSpace: "pre",
				}}
			>
				{output}
			</output>
			<hr />
			<br />
			<br />
			<button
				style={{ fontSize: "2em" }}
				onClick={() => {
					if (confirm("Are you sure you're done?")) {
						setOutput(
							[ship, section1, section2, section3].join("\n"),
						);
					}
				}}
			>
				done
			</button>
			<button
				style={{ fontSize: "2em" }}
				onClick={() => {
					if (confirm("Are you sure you want to reset")) {
						setShip("");
						setSection1("");
						setSection2("");
						setSection3("");
						setOutput("");
					}
				}}
			>
				reset
			</button>
		</div>
	);
}

export default function WrappedHome() {
	if (process.browser) {
		return <Home />;
	} else {
		return null;
	}
}
