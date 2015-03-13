function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', fn);
        return;
    }

    document.attachEvent('onreadystatechange', function () {
        if (document.readyState != 'loading') {
            fn();
        }
    });
}

function addEventListener(el, eventName, handler) {
    if (!el) {
        return;
    }

    if (el.addEventListener) {
        el.addEventListener(eventName, handler);
        return;
    }

    el.attachEvent('on' + eventName, function () {
        handler.call(el);
    });
}

function getData(url, fn) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status >= 200 && this.status < 400) {
                var data = JSON.parse(this.responseText.replace(/&quot;/g,'"'));
                fn(data);
            }
        }
    };

    request.send();
    request = null;
}

function changeConvertValue(input, value) {
    input.placeholder = event.target.value;
}

ready(function () {
    var inputUnit = document.querySelector('.inputUnit');
    var outputUnit = document.querySelector('.outputUnit');

    addEventListener(inputUnit, 'change', function (event) {
        changeConvertValue(document.querySelector('.inputConvertValue'), event.target.value);
    });

    addEventListener(outputUnit, 'change', function (event) {
        changeConvertValue(document.querySelector('.outputConvertValue'), event.target.value);
    });

    var supplierList = document.querySelector('.supplierList');

    var commonProductList = {};

    addEventListener(supplierList, 'change', function (event) {
        getData(('/getProductList?supplierID=' + event.target.value), function (productList) {
            var productListContainer = document.querySelector('.productList');

            productListContainer.innerHTML = '';

            var option = document.createElement('option');
            option.value = 0;
            option.innerHTML = 'Select product';
            productListContainer.appendChild(option);

            productList.forEach(function (product) {
                var option = document.createElement('option');
                option.value = product._id;
                option.innerHTML = product.name;
                productListContainer.appendChild(option);
                commonProductList[product._id] = product;
            });
        });
    });

    var productList = document.querySelector('.productList');

    addEventListener(productList, 'change', function (event) {
        var inputQuantity = document.querySelector('.inputQuantity');
        var inputUnit = '';

        var product = commonProductList[event.target.value];

        if (product) {
            inputUnit = product.inputUnit;
        }

        inputQuantity.setAttribute('placeholder', inputUnit);
    });
});