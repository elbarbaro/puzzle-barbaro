// Obtener elementos principales del HTML
var containerCell = document.getElementById("container-cell");
var containerPiece = document.getElementById("container-piece");
var dialogElement = document.getElementById("dialog");
var selectedPiece = null;

document.onkeypress = keypress;

// Crear casillas en el contenedor de celdas
createBoard();
// Crear piezas en el contenedor de las piezas
createPieces();

function createCell(width, height, position){

	var cellElement = document.createElement("div");
	cellElement.style.width = width;
	cellElement.style.height = height;
	cellElement.style.border = "1px solid black";
	cellElement.style.backgroundColor = "#124242";
	cellElement.dataset.position = position;
	cellElement.onclick = clickCell;

	return cellElement;
}

function createPiece(width, height, piece){

	var cellElement = document.createElement("div");
	var pieceElement = document.createElement("img");

	// Configurando la celda para la pieza dentro del contenedor de piezas
	cellElement.style.width = width;
	cellElement.style.height = height;

	// Configurando la pieza dentro del contenedor pieza
	pieceElement.width = width;
	pieceElement.height = height;
	pieceElement.style.border = "1px solid black";
	pieceElement.src = piece.image;
	pieceElement.dataset.position = piece.position;
	pieceElement.onclick = clickPiece;

	// Mandar la pieza a la celda - Agregar elementos al documento
	cellElement.appendChild(pieceElement);

	return cellElement;
}

function createBoard(){
	var width = containerCell.offsetWidth;
	var height = containerCell.offsetHeight;

	width /= 4;
	height /= 4;

	for(var i = 0; i < 16; i++){
		let cellElement = createCell(width, height, i);
		addCell(cellElement);
	}
}

function createPieces(){
 	var width = containerPiece.offsetWidth;
	var height = containerPiece.offsetHeight;
	 width /= 4;
	 height /= 4;
	 var pieces = generatePieceData();
	 for(let i = 0; i < 16; i++){
	 	let pieceElement = createPiece(width, height, pieces[i]);
	 	addPiece(pieceElement);	
	 }
}

function addCell(element){
	containerCell.appendChild(element);
}

function addPiece(element){
	containerPiece.appendChild(element);
}

function generatePieceData(){
	// Generamos una lista de piezas
	var pieces = [];
	for(let i = 0; i < 16; i++){
		let piece = {
			image: "img/" + (i+1)+".jpg",
			position: i 
		};
		pieces.push(piece);
	}
	return pieces;
}

function clickPiece(e){
	var piece = e.target;
	selectedPiece = piece;
}

function clickCell(e){
	if(selectedPiece){
		let cell = e.target;
		cell.appendChild(selectedPiece);
	} else {
		console.log("Selecciona una pieza");
	} 
}

function keypress(ke){
	console.log(ke);
	if(ke.keyCode == 101 || ke.keyCode == 69){
		let result = evaluateBoard();
		showDialog(result);
	}
}

function showDialog(result){
	var imgElement = dialogElement.children[0];
	var textContent = dialogElement.children[1];
	if(result){
		//imgElement.src = "img/imagenganastes.jpg";
		textContent.innerText = "Ganastes";
	} else {
		//imgElement.src = "img/imagenperdistes.jpg";
		textContent.innerText = "Perdistes";
		returnPieces();
	}
	dialogElement.style.display = "block";
}

function evaluateBoard(){
	var cells = containerCell.children;
	for(cell of cells){
		let piece = cell.children[0];
		if(piece.dataset.position != cell.dataset.position){
			return false;
		}
	}
	return true;
}

function returnPieces(){
	let cells = containerCell.children;
	let cellPieces = containerPiece.children;

	for(cell of cells){
		let position = piece.dataset.position;
		let piece = cell.children[0];
		cellPieces[position].appendChild(piece);
	}
}

















