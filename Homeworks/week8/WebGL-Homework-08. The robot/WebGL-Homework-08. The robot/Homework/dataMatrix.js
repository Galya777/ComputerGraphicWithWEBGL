// Матрица с данни за летящата птица
// Тази данни определят формата и размерите на различните части

var birdData = {
	// Тяло
	body: {
		radius: 1.0,
		color: [0.25, 0.25, 0.3]
	},
	
	// Глава
	head: {
		radius: 0.5,
		offset: [0, 0.8, 0.6],
		color: [0.3, 0.3, 0.35]
	},
	
	// Крила
	wing: {
		numSegments: 8,
		segmentLength: 0.6,
		segmentWidth: 0.4,
		attachPoint: [0.8, 0, 0],
		color: [0.3, 0.3, 0.35]
	},
	
	// Опашка
	tail: {
		numSegments: 5,
		length: 0.4,
		width: 0.8,
		color: [0.2, 0.2, 0.25]
	},
	
	// Очи
	eyes: {
		radius: 0.1,
		color: [0.1, 0.1, 0.1]
	},
	
	// Клюн
	beak: {
		radius: 0.2,
		length: 0.5,
		color: [0.8, 0.6, 0.1]
	},
	
	// Анимация
	animation: {
		wingSpeed: 0.08,
		wingAmplitude: 0.6,
		bodyRockSpeed: 0.04,
		bodyRockAmplitude: 0.15,
		headTurnSpeed: 0.04,
		headTurnAmplitude: 0.3
	}
};
