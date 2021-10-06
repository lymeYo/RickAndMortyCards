const fs = require('fs');
const ncp = require('ncp').ncp;
const remove = require('remove');

let sourceDir = './imgs/gallery-images';
let destDir = './dist/gallery-images';

//удаление директории, чтобы перезаписать ее с новыми файлами (перерендеринг)

if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

// remove(destDir, (e) => {}) //удаление папки для практики, но нужды в этом нету, так как новая папка перекрывает текущую
// fse.copy(sourceDir, destDir, (e) => console.log(e));

ncp(sourceDir, destDir, (e) => console.log(e))