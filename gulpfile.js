import {src, dest, watch} from 'gulp'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'

// export function hola( done ){
//     console.log('Hola desde Gulpfile.js');

//     done();
// }

const sass = gulpSass(dartSass);

export function css(done) {
    src('src/scss/app.scss')
        .pipe( sass().on('error', sass.logError) )
        .pipe( dest('dist/css') );

    done();
}

export function dev() {
    watch('src/scss/app.scss', css);
}