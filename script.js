jQuery(document).ready(function($){

    /*--------------------------------------------------------------
    Tabs switch
    --------------------------------------------------------------*/

    //Tabs system
    $('#tabs > li').click(function(e) {
		e.preventDefault();

		var id = $(this).attr('id');

		$('#tabs li, #content-tabs .tab').removeClass('active');//Remove all tab class
		$('#tabs #tabs__mailbox__menu').removeClass('active');//Remove all tab class
		$('#tabs #'+id+', #content-'+id+'').addClass('active');//Add current tab class 
	});

    //Messagerie tab display
    $('#tabs #tabs__mailbox').click(function(e) {
		e.preventDefault();

		$('#tabs #tabs__mailbox__menu').addClass('active');//Add current tab class 
	});

    //Mail active
    $('#content-tabs__mailbox__list .mail').click(function(e) {
		e.preventDefault();

        $('#content-tabs__mailbox__content').addClass('active');
		$('#content-tabs__mailbox__list .mail').removeClass('active');//Add current mail class
		$(this).addClass('active');//Add current mail class
	});

    //New message
    $('#tabs__mailbox__menu a').click(function(e) {
        e.preventDefault();

		$('#content-tabs__mailbox__list, #content-tabs__mailbox__content').css('display', 'none');//Remove all tab class
		$('#content-tabs__mailbox__new-message').addClass('active');
	});

    //Close new message
    $('#content-tabs__mailbox__new-message .cross').click(function(e) {
        e.preventDefault();

		$('#content-tabs__mailbox__list, #content-tabs__mailbox__content').css('display', 'unset');
		$('#content-tabs__mailbox__new-message').removeClass('active');
	});

    //Holiday button
    $('#content-tabs__planning__bottom__button a').click(function(e) {
        e.preventDefault();

		$('#content-tabs__planning__popup').addClass('active');
	});

    //Cancel holiday
    $('#content-tabs__planning__popup__inner__buttons a').click(function(e) {
        e.preventDefault();

		$('#content-tabs__planning__popup').removeClass('active');
	});

    //Calendar event info
    $('.days li:nth-child(20), .days li:nth-child(25)').on({
        mouseenter: function () {
            $(this).addClass('event');
        },
        mouseleave: function () {
            $(this).removeClass('event');
        }
    });
	/*--------------------------------------------------------------
    Home blog slider
    --------------------------------------------------------------*/

	if ($('#content-tabs__home__actuality__blog').length > 0) {
        $('#content-tabs__home__actuality__blog').slick({
            infinite: true,
            autoplay: true,
            dots: true,
			arrow: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplaySpeed: 5000,
        });

    }

});


const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span");

// getting new date, current year and month
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

// storing full name of all months in array
const months = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;
}
renderCalendar();

prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar(); // calling renderCalendar function
    });
});