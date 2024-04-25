/*global $, jQuery, alert*/
(function ($) {
    "use strict";

    function contactForm() {
        $('#contactform').submit(function () {
            var action = 'https://formspree.io/f/xnqelawk';
            // var action = '';
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
            var chapterPage = 'index.html';
            var selectedChapter =  $('#chapter').val();
            
            switch(selectedChapter){
                case 'Chapter I: Introduction':
                    chapterPage = 'index.html';
                    break;
                case 'Chapter II: Injection Molding Process Parameters':
                    chapterPage = 'chapter_2.html';
                    break;
                case 'Chapter III: Process Graphs':
                    chapterPage = 'chapter_3.html';
                    break;
                case 'Chapter IV: Plastic Morphology':
                    chapterPage = 'chapter_4.html';
                    break;
                case 'Chapter V: Auxiliary Equipment':
                    chapterPage = 'chapter_5.html';
                    break;
                case 'Chapter VI: Molding from the Desk':
                    chapterPage = 'chapter_6.html';
                    break;
                case 'Chapter VII: Machine Rheology':
                    chapterPage = 'chapter_7.html';
                    break;
                case 'Chapter VIII: Determining Injection Speed':
                    chapterPage = 'chapter_8.html';
                    break;
                case 'Chapter IX: Verifying Fill Balance':
                    chapterPage = 'chapter_9.html';
                    break;
                case 'Chapter X: Determining Hold Stage Parameters':
                    chapterPage = 'chapter_10.html';
                    break;
                case 'Chapter XI: Determining Cooling Stage Parameters':
                    chapterPage = 'chapter_11.html';
                    break;
                default:
                    chapterPage = 'index.html';
            }
            $('#name').val("");
            $('#email').val("");
            $('#chapter').val("");
            $('#message').val("");
            $('#contactform .loader div').fadeOut('slow', function() {
                $(this).remove();
            });
            Swal.fire({
            title: "Thank you!",
            text: "You message was sent! We will contact you soon.",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Go back to chapter"
            }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = chapterPage;
            }
            });
            $('#contactform .sent-alert').fadeOut('slow', function() {
                $(this).remove();
            });
            $('#submit').removeAttr('disabled');
    }

    $(document).ready(function () {
        contactForm();
    });

}(jQuery));