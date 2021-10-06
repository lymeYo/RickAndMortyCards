let fs = require('fs');

// import f from '../../imgs/gallery-images'

// fs.readFileSync('./imgs/gallery-images')
let imagesToJson = [];
const path = './imgs/gallery-images';
const imagesRows = fs.readdirSync(path);
imagesRows.forEach(rowPath => {
   let curRow = fs.readdirSync(path + '/' + rowPath);
   imagesToJson.push(curRow);
})
console.log(imagesToJson);

fs.writeFileSync('./dist/galleryJsonImages.json', JSON.stringify(imagesToJson), 'utf-8');
fs.writeFileSync('./js/galleryJsonImages.json', JSON.stringify(imagesToJson), 'utf-8');


//node ./js/node_scripts/renderGalleryImages.js