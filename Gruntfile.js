/* global module */
module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    'angular-toolbox': {
      files: {
        src: {
          less: []
        }
      }
    }
    /* project specific configuration here */
  });

  /* load angular-toolbox collection
     see Included 3rd party tasks */
  grunt.loadNpmTasks('grunt-angular-toolbox');

  /* custom tasks and hooks */
  grunt.registerTask('default', ['test']);
};
