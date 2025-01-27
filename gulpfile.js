import path from 'path' // Import for "crop" function
import fs from 'fs' // Import for "crop" function
import { glob } from 'glob' // Remember to "npm i --save-dev glob"
import {src, dest, watch, series, parallel} from 'gulp' // Imports from gulp dependence / paralell explanation
import * as dartSass from 'sass' // Imports  from sass dependence
import gulpSass from 'gulp-sass' // Imports from gulp-sass dependence

// export function hola( done ){     // test function 
//     console.log('Hola desde Gulpfile.js'); // Basic function

//     done(); // "done()" is used for finish the gulp stream
// }

const sass = gulpSass(dartSass); // variable for sass and gulp-sass connection

import terser from 'gulp-terser' // Import "terser" for minify js files, remember "npm i --save-dev gulp-terser" 
import sharp from 'sharp' // Import "sharp" for resizing images. Remember "npm i --save-dev sharp"

export function js(done) {

    src('src/js/script.js')
        .pipe(terser()) // Adding js minify
        .pipe(dest('dist/js'))

    done();
}

export function css(done) { // function for sass stream
    src('src/scss/app.scss', {sourcemaps: true}) // "src" means the main file where is sass
        .pipe( sass({
            outputStyle: 'compressed' // This own function is for minify the css files. No needed additional importations
        }).on('error', sass.logError) ) // "pipe" is for nesting methods in other functions / this pipe brings sass like source action
        .pipe( dest('dist/css', {sourcemaps: true}) ); // depending the order, "pipe" will execute first some methods / this pipe defines the destiny of css source

    done(); // finish the stream
}

export async function crop(done) { 
    const inputFolder = 'src/img/gallery/full'
    const outputFolder = 'src/img/gallery/thumb';
    const width = 250; // Size is custom
    const height = 180; // Size is custom
    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder, { recursive: true })
    }
    const images = fs.readdirSync(inputFolder).filter(file => {
        return /\.(jpg)$/i.test(path.extname(file));
    });
    try {
        images.forEach(file => {
            const inputFile = path.join(inputFolder, file)
            const outputFile = path.join(outputFolder, file)
            sharp(inputFile) 
                .resize(width, height, {
                    position: 'centre' // Orientation is custom
                })
                .toFile(outputFile)
        });

        done()
    } catch (error) {
        console.log(error)
    }
}


export async function imagenes(done) {
    const srcDir = './src/img';
    const buildDir = './dist/img';
    const images =  await glob('./src/img/**/*{jpg,png}')

    images.forEach(file => {
        const relativePath = path.relative(srcDir, path.dirname(file));
        const outputSubDir = path.join(buildDir, relativePath);
        procesarImagenes(file, outputSubDir);
    });
    done();
}

function procesarImagenes(file, outputSubDir) {
    if (!fs.existsSync(outputSubDir)) {
        fs.mkdirSync(outputSubDir, { recursive: true })
    }
    const baseName = path.basename(file, path.extname(file))
    const extName = path.extname(file)
    const outputFile = path.join(outputSubDir, `${baseName}${extName}`)
    const outputFileWebp = path.join(outputSubDir, `${baseName}.webp`)
    const outputFileAvif = path.join(outputSubDir, `${baseName}.avif`)

    const options = { quality: 80 }
    sharp(file).jpeg(options).toFile(outputFile)
    sharp(file).webp(options).toFile(outputFileWebp)
    sharp(file).avif().toFile(outputFileAvif)
}

export function dev() { // function for having the previous function always on
    watch('src/scss/**/*.scss', css); // the "*" takes all the folders and files relationed with .scss termination for apply the previous function
    watch('src/js/**/*.js', js);
    watch('src/img/**/*.{png,jpg}', js);
}

export default series(crop, js, css, imagenes, dev)