$(document).ready(function () {
    $('.chat-area').children().addClass('inner');
    $('.chat-area').children().css('display', 'none');
    $('.chat-area').children().first().css('display', 'block');
    $('.content-left .user').first().addClass('active');
    $('.inner').scrollTop(99999);
    
    
    $('.user').click(function () {
        $('.user').removeClass('active');
        $(this).addClass('active');
        $('#username').html($(this).find('h5').html());
        $('.chat-area').children().css('display', 'none');
        $('.' + $(this).find('h5').html()).css('display', 'block');
    });

    /* function getdata() {
        $.ajax({
            method: 'GET',
            url: '/AddMessage',
            datatype: 'json',
            success: function (data) {
                var object = $.parseJSON(data);
                $.each(object, function (index, val) {
                    if (val.fields.chatroom_id=1) {
                        //$('.medical').append('')
                    } else {
                        $('.children').append('')
                    }

                });
            }
        });
    }; */
    //setInterval(getdata, 1000);
    //getdata();

    // send message to backend
    function ajaxfunc() {
      $.ajax({
          method: 'POST',
          url: '/AddMessage',
          datatype:'json',
          data:{
              'message': $('textarea').val(),
              'botname': $('#username').html(),
              'username': $('.user-name').html(),
          },
          beforeSend: function(xhr){
            xhr.setRequestHeader('x-CSRFToken',csrf_token)
          },
          success: function(data) {
            var msg = (data.message).replace(/\>/g, '&gt;').replace(/\</g, '&lt;');
              $('.chat-area .' + $('#username').html()).append('<div class="me"><i class="fa fa-caret-left"></i><span>' + data.username + ' : ' + '</span>' + msg + '</div>');
              $('.inner').scrollTop(99999);
          }
      });
    };


    //send message to backend when click enter
    $('textarea').keydown(function (event) {
        var msg = $('textarea').val();
        var keyCode = (event.keyCode ? event.keyCode : event.which);
        if (keyCode == 13 && msg != '') {
            if (keyCode.preventDefault)
                keyCode.preventDefault();
            ajaxfunc();
            $('textarea').val('');
            return false;
            
        }
        if (keyCode == 13 && msg == '') {
            if (keyCode.preventDefault)
                keyCode.preventDefault();
            return false;
        }
    });

    //send message to backend when btn is clicked
    $('.send').click(function (e) {
        e.preventDefault();
        var msg = $('textarea').val()
        if (msg != '') {
            ajaxfunc();
            $('textarea').val('');
        }
    });

    
    
    $('html').niceScroll({
        cursorcolor: '#067e7e',
        cursorborder: 'none',
        cursorborderradius: '2px',
        scrollspeed: '200'
    });
    $('.inner').niceScroll({
        cursorcolor: '#067e7e',
        cursorborder: 'none',
        cursorborderradius: '2px',
        scrollspeed: '100'
    });
    $('.content-left').niceScroll({
        cursorcolor: '#067e7e',
        cursorborder: 'none',
        cursorborderradius: '2px',
        scrollspeed: '200'

    });
    $('textarea').niceScroll({
        cursorcolor: '#067e7e',
        cursorborder: 'none',
        cursorborderradius: '2px',
        scrollspeed: '200',
    });
    
});
