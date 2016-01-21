(function (module) {
   
    var setupDom = function (element) {
        var input = element.querySelector("input, textarea, select, otf-rating");
        var type = input.getAttribute("type");
        var name = input.getAttribute("name");
        if (type !== "checkbox" && type !== "radio") {
            input.classList.add("form-control");
        }

        var label = element.querySelector("label");
        label.classList.add("control-label");
        element.classList.add("form-group");
        return name;
    };

    var addMessages = function (form, element, name, $compile, scope) {
        var messages = "<div class='help-block' ng-messages='" +
                        form.$name + "." + name + ".$error" +
                        "' ng-messages-include='views/messages.html'><div>";
        element.append($compile(messages)(scope));
    };

    var watche  rFor = function (form, name) {
        return function () {
            if (name && form[name]) {
                return form[name].$invalid;
            }
        };
    };

    var updaterFor = function (element) {
        return function (hasError) {
            if (hasError) {
                element.removeClass("has-success").addClass("has-error");
            }
            else {
                element.removeClass("has-error").addClass("has-success");
            }
        }         
    };

    var link = function ($compile) {
        return function (scope, element, attributes, form) {
            var name = setupDom(element[0]);
            addMessages(form, element, name, $compile, scope);
            scope.$watch(watcherFor(form, name), updaterFor(element));
        };
    };

    var forminput = function ($compile) {

        return {
            restrict: "A",
            require: "^form",
            link: link($compile)
        };

    };

    module.directive("forminput", forminput);

}(angular.module("forms")));
