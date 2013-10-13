require('grunt');
grunt.registerMultiTask('requirejs', 'im looking for files', function () {

    var curTask = this,
        opts = curTask.options();


    console.log('this.files: '.yellow, this.include);

});
