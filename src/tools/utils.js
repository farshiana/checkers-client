export const updateObject = (oldObject, updatedProperties) => (
	{
		...oldObject,
		...updatedProperties,
	}
);

export const reversePieces = (size, pieces) => (
	pieces.map(piece => ({
		...piece,
		...{
			x: size - piece.x - 1,
			y: size - piece.y - 1,
		},
	}))
);

export const reverseMoves = (size, moves) => (
	moves.map(move => ({
		...move,
		...{
			start: {
				...move.start,
				...{
					x: size - move.start.x - 1,
					y: size - move.start.y - 1,
				},
			},
			end: {
				...move.end,
				...{
					x: size - move.end.x - 1,
					y: size - move.end.y - 1,
				},
			},
		},
	}))
);

export const samePosition = (position1, position2) => (
	position1.x === position2.x && position1.y === position2.y
);
