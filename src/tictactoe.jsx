/* eslint-disable no-unused-vars */
import { useState } from 'react';

const generateBoard = (size) => {
	const newBoard = [];
	for (let i = 0; i < size; i++) {
		newBoard.push([...Array(size)]);
	}
	return newBoard;
};

const checkWin = (board, r, c) => {
	const rCheck = new Set(board[r]);
	const col = [];
	const diagOne = [];
	const diagTwo = [];
	for (let i = 0; i < board.length; i++) {
		col.push(board[i][c]);
		if (r === c) {
			diagOne.push(board[i][i]);
		}
		if (board.length - r - 1 === c)
			diagTwo.push(board[i][board.length - i - 1]);
	}
	const cCheck = new Set(col);
	const d1Check = new Set(diagOne);
	const d2Check = new Set(diagTwo);
	if (
		rCheck.size === 1 ||
		cCheck.size === 1 ||
		d1Check.size === 1 ||
		d2Check.size === 1
	) {
		return true;
	}
};

function Tictactoe() {
	const [currentScreen, setCurrentScreen] = useState(1);
	const [size, setSize] = useState('');
	const [invalidSize, setInvalid] = useState(0);
	const [gameOver, gameSet] = useState(0);

	const [board, setBoard] = useState(generateBoard(3));
	const [draw, incDraw] = useState(0);

	const [currPlayer, setPlayer] = useState('x');

	const handleClick = (row, col) => {
		if (!board[row][col]) {
			board[row][col] = currPlayer;
			console.log(draw);
			setBoard([...board]);
			if (checkWin(board, row, col)) {
				console.log(`${currPlayer} wins!`);
				incDraw(0);
				gameSet(1);
				setCurrentScreen(1);
				return;
			}
			if (draw === board.length * board.length - 1) {
				incDraw(0);
				gameSet(2);
				setCurrentScreen(1);
				return;
			}
			incDraw(draw + 1);
			setPlayer(currPlayer === 'x' ? 'o' : 'x');
		}
	};

	const handleChange = (event) => {
		setSize(event.target.value);
	};

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			console.log('Enter key pressed!', size);
			const toSet = +size;
			if (toSet > 2 && toSet < 7) {
				gameSet(0);
				setBoard(generateBoard(+size));
				setPlayer('x');
				setInvalid(0);
				setCurrentScreen(2);
			} else {
				setInvalid(1);
			}
		}
	};

	return (
		<div
			style={{
				position: 'relative',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
			className="no-caret"
		>
			{' '}
			{currentScreen === 1 && (
				<div
					style={{
						display: 'grid',
						position: 'relative',
						placeItems: 'center',
					}}
				>
					<p>Input Game Board Size (3-6)</p>
					<input
						className="focus-input"
						type="text"
						value={size}
						onChange={handleChange}
						onKeyDown={handleKeyDown}
					></input>
				</div>
			)}
			{invalidSize === 1 && (
				<p
					style={{
						color: 'rgb(255,100,100)',
						position: 'absolute',
						top: '150px',
					}}
				>
					Invalid Size
				</p>
			)}
			{gameOver === 1 && (
				<p
					style={{
						color: 'rgb(255,100,100)',
						position: 'absolute',
						top: '-50px',
					}}
				>
					{currPlayer.toUpperCase()} wins!
				</p>
			)}
			{gameOver === 2 && (
				<p
					style={{
						color: 'rgb(255,100,100)',
						position: 'absolute',
						top: '-50px',
					}}
				>
					Draw!
				</p>
			)}
			{currentScreen === 2 && (
				<div>
					{board.map((row, r) => {
						return (
							<div
								key={r}
								style={{
									display: 'flex',
									fontSize: '60px',
									marginTop: '-1px',
								}}
							>
								{row.map((cell, c) => {
									return (
										<div
											key={c}
											onClick={() => handleClick(r, c)}
											style={{
												border: 'solid white 1px',
												height: '100px',
												width: '100px',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												marginLeft: '-1px',
												position: 'relative',
											}}
										>
											<span
												className="inner"
												style={{
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center',
													top: '0px',
												}}
											>
												{cell}
											</span>
										</div>
									);
								})}
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}

export default Tictactoe;
