/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
        System.config({
            paths: {
                // paths serve as alias
                'npm:': 'node_modules/'
            },
            // map tells the System loader where to look for things
            map: {
                // our app is within the app folder
                app: 'App',

                // These mean that we can just to import from '@angular/forms' instead of 'node_modules/@angular/forms/bundles/forms.umd.js'

                // angular bundles
                '@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',
                '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
                '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
                '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
                '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
                '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
                '@angular/animations/browser': 'npm:@angular/animations/bundles/animations-browser.umd.js',
                '@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',
                '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
                '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
                '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',
                '@angular/common/http': 'npm:@angular/common/bundles/common-http.umd.js',

                // other libraries
                'ng-semantic': 'npm:ng-semantic',
                'ng2-toastr': 'npm:ng2-toastr',
                'ng2-file-upload': 'npm:ng2-file-upload',
                'moment': 'npm:moment',
                'rxjs': 'npm:rxjs',
                'json-formatter-js': 'npm:json-formatter-js',
                'ngx-pipes': 'npm:ngx-pipes',
                'd3-array': 'npm:d3-array/build/d3-array.min.js',
                'd3-brush': 'npm:d3-brush/build/d3-brush.min.js',
                'd3-format': 'npm:d3-format/build/d3-format.min.js',
                'd3-hierarchy': 'npm:d3-hierarchy/build/d3-hierarchy.min.js',
                'd3-collection': 'npm:d3-collection/build/d3-collection.min.js',
                'd3-color': 'npm:d3-color/build/d3-color.min.js',
                'd3-dispatch': 'npm:d3-dispatch/build/d3-dispatch.min.js',
                'd3-drag': 'npm:d3-drag/build/d3-drag.min.js',
                'd3-ease': 'npm:d3-ease/build/d3-ease.min.js',
                'd3-force': 'npm:d3-force/build/d3-force.min.js',
                'd3-interpolate': 'npm:d3-interpolate/build/d3-interpolate.min.js',
                'd3-quadtree': 'npm:d3-quadtree/build/d3-quadtree.min.js',
                'd3-path': 'npm:d3-path/build/d3-path.min.js',
                'd3-selection': 'npm:d3-selection/build/d3-selection.min.js',
                'd3-scale': 'npm:d3-scale/build/d3-scale.min.js',
                'd3-shape': 'npm:d3-shape/build/d3-shape.min.js',
                'd3-time': 'npm:d3-time/build/d3-time.min.js',
                'd3-timer': 'npm:d3-timer/build/d3-timer.min.js',
                'd3-time-format': 'npm:d3-time-format/build/d3-time-format.min.js',
                'd3-transition': 'npm:d3-transition/build/d3-transition.min.js',
                'd3-zoom': 'npm:d3-zoom/build/d3-zoom.min.js',
                'tslib': 'npm:tslib/tslib.js',
                '@swimlane/ngx-charts': 'npm:@swimlane/ngx-charts/release',

            },
            // packages tells the System loader how to load when no filename and/or no extension
            packages: {
                app: {
                    main: './main.js',
                    defaultExtension: 'js'
                },
                rxjs: {
                    defaultExtension: 'js'
                },
                'ng2-toastr': {
                    defaultExtension: 'js'
                },
                'ng2-file-upload': {
                    main: './ng2-file-upload.js',
                    defaultExtension: 'js'
                },
                'ngx-pipes': {
                    main: 'src/app/index.js',
                    defaultExtension: 'js'

                },
                'json-formatter-js': {
                    defaultExtension: 'js'
                },
                'moment': {
                     defaultExtension: 'js'
                },
                'ng-semantic': {
                    main: 'ng-semantic.js',
                    defaultExtension: 'js'
                },
                '@swimlane/ngx-charts': {
                    main: 'index.js',
                    defaultExtension: 'js'
                }
        }
    });
})(this);