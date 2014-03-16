require.config({

    paths: {
        bowerComponents : 'dist/package/bower-components',
        compiledTemplates : 'dist/package/compiled-templates',
        combinedScripts : 'dist/package/combined-scripts'
    },

    shim: {
        bowerComponents : {
            exports : 'Ember'
        },
        compiledTemplates : {
            deps : ['bowerComponents']
        },
        combinedScripts : {
            deps : ['bowerComponents'],
            exports : 'T2D_GuidedSetup'
        }
    }
});

require(['bowerComponents', 'compiledTemplates', 'combinedScripts']);
