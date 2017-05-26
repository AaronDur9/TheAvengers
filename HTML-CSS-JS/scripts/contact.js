'use strict';

(function() {
    function initForm() {

        var name = sessionStorage.getItem('name');
        var email = sessionStorage.getItem('email');
        var gender = sessionStorage.getItem('gender');
        if (name) {
            $('#name').val(sessionStorage.getItem('name'));
        }

        if (email) {
            $('#email').val(sessionStorage.getItem('email'));
        }

        if (gender) {
            $('input[value="' + gender + '"]').attr('checked', 'checked');
        }

    }

    function validateForm() {

        var validity = [];

        $('input, textarea').each(function(index, elem) {
            console.log(elem.name, elem.checkValidity());
            validity.push(elem.checkValidity());
        });

        //Si todos son true, sino devuelve false
        //Un array de elementos y lo quieres transformar a un único elemento según la condición de que total sea true && el siguiente elemento también lo sea
        //Sino es false
        return validity.reduce(function(total, value) {
            return total && value;
        }, true);
    }

    initForm();
    validateForm();

    var button = document.querySelector('#contact button').addEventListener('click', function(event) {
        event.preventDefault();
        var result = validateForm();

        //console.log('result', result);

        if (!result)
            return;

        window.service = window.service || {};
        window.service.contact = window.service.contact || {};
        window.service.contact.send = function() {
            return Promise.resolve();
        };

        sessionStorage.setItem('name', $('input[name="name"]').val());
        sessionStorage.setItem('email', $('input[name="email"]').val());
        sessionStorage.setItem('gender', $('input[name="gender"]').val());


        var user = {
            name: $('input[name="name"]').val(),
            birthdate: $('input[name="birthdate"]').val(),
            email: $('input[name="email"]').val()
        };

        save(user);

        var data = JSON.parse(JSON.stringify(user));

        delete data.birthdate;
        //data.message = message: $('input[]');

        //Ejemplo de envio de formulario a servidor
        window.service.contact.send({
            name: $('input[name="name"]').val(),
            email: $('input[name="email"]').val(),
            message: $('input[name="message"]').val()
        }).then(function() {
            alert('sended!');
        }).catch(function() {
            alert('something happerned!');
        });
    });
})();
