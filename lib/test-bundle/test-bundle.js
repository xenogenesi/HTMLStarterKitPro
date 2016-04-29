console.log("defining modules...");

define('mymodule1', ['jquery'], function($) {
    console.log('within mymodule1', $.fn.jquery);
    return {
        test: 'module1'
    };
});

define('mymodule2', ['jquery'], function($) {
    console.log('within mymodule2', $.fn.jquery);
    return {
        test: 'module2'
    };
});
