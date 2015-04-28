var path = require('path');
function WebpackenvironmentMergerPlugin(resourceRegExp, environment) {
    this.resourceRegExp = resourceRegExp;
    this.environment = environment
}

module.exports = WebpackenvironmentMergerPlugin;

WebpackenvironmentMergerPlugin.prototype.apply = function (compiler) {
    var resourceRegExp = this.resourceRegExp;
    var environment = this.environment;
    compiler.plugin("normal-module-factory", function (nmf) {

        nmf.plugin("after-resolve", function (result, callback) {
            if (!result) return callback();

            if (resourceRegExp.test(result.resource)) {
                console.warn(result.resource);
                result.resource = path.resolve(path.dirname(result.resource), environment);
            }

            return callback(null, result);
        });
    });
};
