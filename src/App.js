import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';

function App() {
	const [ number_of_copies, set_number_of_copies ] = useState(2);
	const [ beginning_1, set_beginning_1 ] = useState('');
	const [ middle_1, set_middle_1 ] = useState('');
	const [ ending_1, set_ending_1 ] = useState('');
	const [ beginning_2, set_beginning_2 ] = useState('');
	const [ middle_2, set_middle_2 ] = useState('');
	const [ ending_2, set_ending_2 ] = useState('');

	const [ final_gcode, set_final_gcode ] = useState('');

	const showFile_1 = async (e) => {
		e.preventDefault();
		const reader = new FileReader();
		let text = [];

		reader.onload = async (e) => {
			text = e.target.result;
			const gcode = text.split('\n');
			// console.log(e.target.result);
			let beginning_1_array = [];
			let beginning_1_boolean = true;
			let middle_start = 0;
			let middle_finished = 0;
			for (let i = 0; i <= 100; i++) {
				// console.log(gcode[i]);
				if (gcode[i] === 'M83 ; use relative distances for extrusion') {
					beginning_1_boolean = false;
					beginning_1_array = [ ...beginning_1_array, gcode[i] ];
					middle_start = i + 1;
					console.log({ middle_start });
				} else if (beginning_1_boolean) {
					beginning_1_array = [ ...beginning_1_array, gcode[i] ];
					// return;
				}
			}

			let ending_1_array = [];
			let ending_1_boolean = true;

			for (let i = gcode.length - 1; i >= gcode.length - 300; i--) {
				if (gcode[i] === '; G4 ; wait') {
					ending_1_array = [ ...ending_1_array, ';G4 ; wait' ];
					ending_1_boolean = false;
					middle_finished = i;
					console.log({ middle_finished });
				} else if (ending_1_boolean) {
					ending_1_array = [ ...ending_1_array, gcode[i] ];
					// return;
				}
			}
			const middle_1_array = gcode.slice(middle_start, middle_finished);
			console.log({ beginning_1_array, middle_1_array, ending_1_array: ending_1_array.reverse() });
			set_beginning_1(beginning_1_array);
			set_middle_1(middle_1_array);
			set_ending_1(ending_1_array.reverse());

			// create_new_gcode(beginning_1, middle_1, ending_1_array.reverse());
		};

		reader.readAsText(e.target.files[0]);
	};
	const showFile_2 = async (e) => {
		e.preventDefault();
		const reader = new FileReader();
		let text = [];

		reader.onload = async (e) => {
			text = e.target.result;
			const gcode = text.split('\n');
			// console.log(e.target.result);
			let beginning_2_array = [];
			let beginning_2_boolean = true;
			let middle_start = 0;
			let middle_finished = 0;
			for (let i = 0; i <= 100; i++) {
				// console.log(gcode[i]);
				if (gcode[i] === 'M83 ; use relative distances for extrusion') {
					beginning_2_boolean = false;
					beginning_2_array = [ ...beginning_2_array, gcode[i] ];
					middle_start = i + 1;
					console.log({ middle_start });
				} else if (beginning_2_boolean) {
					beginning_2_array = [ ...beginning_2_array, gcode[i] ];
					// return;
				}
			}

			let ending_2_array = [];
			let ending_2_boolean = true;

			for (let i = gcode.length - 1; i >= gcode.length - 300; i--) {
				if (gcode[i] === '; G4 ; wait') {
					ending_2_array = [ ...ending_2_array, ';G4 ; wait' ];
					ending_2_boolean = false;
					middle_finished = i;
					console.log({ middle_finished });
				} else if (ending_2_boolean) {
					ending_2_array = [ ...ending_2_array, gcode[i] ];
					// return;
				}
			}
			const middle_2_array = gcode.slice(middle_start, middle_finished);
			console.log({ beginning_2_array, middle_2_array, ending_2_array: ending_2_array.reverse() });
			set_beginning_2(beginning_2_array);
			set_middle_2(middle_2_array);
			set_ending_2(ending_2_array.reverse());

			// create_new_gcode(beginning_2, middle_2, ending_2.reverse());
		};

		reader.readAsText(e.target.files[0]);
	};

	const create_new_gcode = () => {
		let gcode_array = [ beginning_1 ];
		console.log(number_of_copies);
		if (number_of_copies === 2) {
			gcode_array = [ ...gcode_array, middle_1, middle_2, ending_2 ];
		} else if (number_of_copies > 2) {
			gcode_array = [ ...gcode_array, middle_1, middle_2 ];
			for (let i = 2; i < number_of_copies; i++) {
				if (i % 2 === 0) {
					console.log('odd');
					gcode_array = [ ...gcode_array, middle_1 ];
				} else if (i % 2 === 1) {
					console.log('even');
					gcode_array = [ ...gcode_array, middle_2 ];
				}
			}
			gcode_array = [ ...gcode_array, ending_2 ];
		}

		console.log({ gcode_array });
		let gcode = gcode_array.join('\n');
		console.log({ gcode });
		// let gcode = gcode_inner_array.join('\n');
		// console.log({ gcode });
		set_final_gcode(gcode);
	};

	// function readmultifiles(e) {
	// 	const files = e.currentTarget.files;
	// 	const num_files = Object.keys(files).length;
	// 	console.log({ num_files });
	// 	Object.keys(files).forEach((i) => {
	// 		const file = files[i];
	// 		const reader = new FileReader();
	// 		reader.onload = (e) => {
	// 			//server call for uploading or reading the files one-by-one
	// 			//by using 'reader.result' or 'file'
	// 			console.log({ file: e.target.result });
	// 		};
	// 		reader.readAsBinaryString(file);
	// 	});
	// }

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<input type="file" multiple onChange={(e) => showFile_1(e)} />
				<input type="file" multiple onChange={(e) => showFile_2(e)} />
				<input
					type="number"
					defaultValue={number_of_copies}
					onChange={(e) => set_number_of_copies(e.target.value)}
				/>
				<button onClick={() => create_new_gcode()}>Make Continuous Gcode</button>
			</header>
		</div>
	);
}

export default App;
