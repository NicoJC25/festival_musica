import {src, dest, watch, series, parallel} from 'gulp' // Imports from gulp dependence / paralell explanation
import * as dartSass from 'sass' // Imports  from sass dependence
import gulpSass from 'gulp-sass' // Imports from gulp-sass dependence

// export function hola( done ){     // test function 
//     console.log('Hola desde Gulpfile.js'); // Basic function

//     done(); // "done()" is used for finish the gulp stream
// }

const sass = gulpSass(dartSass); // variable for sass and gulp-sass connection

import terser from 'gulp-terser' // Import "terser" for minify js files, remember "npm i --save-dev gulp-terser" 

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

export function dev() { // function for having the previous function always on
    watch('src/scss/**/*.scss', css); // the "*" takes all the folders and files relationed with .scss termination for apply the previous function
    watch('src/js/**/*.js', js);
}

export default series(js, css, dev)