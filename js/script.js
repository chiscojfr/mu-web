/*global $, jQuery, alert*/
(function ($) {
    "use strict";

    function contactForm() {
        $('#contactform').submit(function () {
            var action = 'https://formspree.io/f/xnqelawk';
            $("#message-info").slideUp(250, function () {
                $('#message-info').hide();
                $('#submit')
                    .after('<div class="loader"><div></div></div>')
                    .attr('disabled', 'disabled');
                $.post(action, {
                    name: $('#name').val(),
                    email: $('#email').val(),
                    chapter: $('#chapter').val(),
                    message: $('#message').val()
                },
                
                    function (data) {
                        document.getElementById('message-info').innerHTML = data;
                        $('#message-info').slideDown(250);
                        $('#contactform .loader div').fadeOut('slow', function() {
                            $(this).remove();
                        });
                        $('#submit').removeAttr('disabled');
                        if (data.match('success') !== null) {
                            $('#contactform').slideUp(850, 'easeInOutExpo');
                        }
                    });
                    setTimeout(function() {messageSentAlert();}, 2000);
                    
            });
            return false;
        });
    }

    function messageSentAlert(){
            $('#name').val("");
            $('#email').val("");
            $('#chapter').val("");
            $('#message').val("");
            $('#contactform .loader div').fadeOut('slow', function() {
                $(this).remove();
            });
            $('#submit').after('<p class="sent-alert" >SENT!</p>');
            Swal.fire(
                'Good job!',
                'You message was sent! We will contact you soon.',
                'success'
              )
            $('#contactform .sent-alert').fadeOut('slow', function() {
                $(this).remove();
            });
            $('#submit').removeAttr('disabled');
    }

    $(document).ready(function () {
        contactForm();
    });

}(jQuery));