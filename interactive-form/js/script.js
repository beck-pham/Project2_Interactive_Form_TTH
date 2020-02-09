//create global variables
let costContainer = "<span></span>";
$('.activities').append(costContainer);
let totalActivityCost = 0;

//When the page first loads, the first text field should be in focus by default.
$('#name').focus();

//hide other input field initially
$('#other-title').hide()
//The "Other" job input is shown only when "Other" option is selected from the drop down menu.
$('#title').change(function() {
    if($('#title option:selected').text() === 'Other') {
        $('#other-title').show();
    } else {
        $('#other-title').hide();
    }
});

/*********************
    T-SHIRT SECTION
**********************/


//create a new element for the color options to select a t shirt
const themeSelect = '<option selected="selected" id="themeSelect">Please select a T-shirt theme</option>';
//hide the select theme option
$('option[value="Select Theme"]').attr("hidden", "hidden");
//when the design option is set to Select Theme, display the new themeSelect option and assign it an attribute of disabled until the value is changed in the event listener
if ( $('#design option:selected').text() === 'Select Theme') {
     $('#color').prepend(themeSelect).attr('disabled', 'disabled');
}

//hides color options
$('#colors-js-puns').hide();

//change listener to watch for changes to the theme and reveal the color options list
$('#design').on('change', function(e) {
    if ( $(e.target).val() !== "") { //if the selection is not empty show the color options
        $('#colors-js-puns').show();
    }

    $('#themeSelect').remove(); //removes the "please select..." option
    $('#color').removeAttr('disabled'); //removes the disbaled color field

    if ($(this).val() === 'js puns') {
        $('#color option[value="cornflowerblue"]').show().attr('selected', 'selected');
        $('#color option[value="darkslategrey"]').show();
        $('#color option[value="gold"]').show();
        $('option[value="tomato"]').hide();
        $('option[value="steelblue"]').hide();
        $('option[value="dimgrey"]').hide();

    } else if ($(this).val() === 'heart js') {
        $('#color option[value="tomato"]').show().attr('selected', 'selected');
        $('#color option[value="steelblue"]').show();
        $('#color option[value="dimgrey"]').show();
        $('option[value="cornflowerblue"]').hide();
        $('option[value="darkslategrey"]').hide();
        $('option[value="gold"]').hide();

    } else {
        $('#color').prepend(themeSelect).attr('disabled', 'disabled');
    }

});


/*********************
   ACTIVITY SECTION
**********************/

$('.activities').on('change', function(e) {
    //create new DOM element
    //get cost of activities when new DOM element is clicked
    //convert new cost to number dollar amount
    const click = $(e.target);
    let costPerActivity = click.attr('data-cost');
    let removeDollarSign = costPerActivity.slice(1);
    let newCost = parseInt(removeDollarSign);

    //if the checkbox is check, add the current cost to the total cost
        //else subtract the cost
    if($(click).is(':checked')) {
        totalActivityCost += newCost;
    } else {
        totalActivityCost -= newCost;
    }
    //update to display Total cost for all activities
    $('.activities span').text('Total: $' + totalActivityCost);
    //Disabling conflicting activities
    let schedulePerActivity = click.attr('data-day-and-time');
    $('.activities input').each(function (index, input) {
        const checkBox = $(this);
        
        if (schedulePerActivity === checkBox.attr('data-day-and-time') && click.attr('name') !== checkBox.attr('name')) {
            if ($(click).is(':checked')) {
                $(this).prop('disabled', true);
            } else {
                $(this).prop('disabled', false);
            }
        }
    });
})

/**********************
    PAYMENT SECTION
***********************/
$('option[value="select method"]').hide();
//select credit card as the default option when the page first loads
$('option[value="Credit Card"]').attr("selected", "selected");
//change event listener to get the value of the payment select element and if equal to selected, show and hide other payment method
const creditCard = $('.credit-card');
const payPal = $('.paypal');
const bitCoin = $('.bitcoin');
$('#payment').on('change', function(e) {
    if ($(e.target).val() === 'Credit Card') {
        creditCard.show();
        payPal.hide();
        bitCoin.hide();
    } else if ($(e.target).val() === 'PayPal') {
        payPal.show();
        creditCard.hide();
        bitCoin.hide();
    } else if ($(e.target).val() === 'Bitcoin') {
        bitCoin.show();
        payPal.hide();
        creditCard.hide();
    }
});

/***********************************************
    FORM VALIDATION AND VALIDATION MESSAGES 
***********************************************/

//Name validation
const nameValidation = () => {
    const userName = $('#name');
    const validName = /^[a-zA-Z\s]+$/; 


    if(!(validName.test($("#name").val()))) {
        userName.css('border-color', 'red');
        $('[for="name"] span').remove(); //
        $('[for="name"]').append('<span> Please enter a valid name.</span>').css('color', 'red');
        return false;
    } else {
        userName.css('border-color', '#6F9DDC');
        $('[for="name"] span').remove(); 
        $('[for="name"]').css('color', '#000');
        return true;
        }    
}

// Email validation
const emailValidation = () => {
    //const userEmail = $("#mail");
    const validEmail = /^[^@]+@[^@.]+\.[a-z]+$/i;

    if(!(validEmail.test($("#mail").val()))) {
        $('#mail').css('border-color', 'red');
        $('[for="mail"] span').remove();
        $('[for="mail"]').append('<span> Please enter a valid email.</span>').css('color', 'red');
        return false;
    } else {
        $('#mail').css('border-color', '#6F9DDC');
        $('[for="mail"] span').remove();
        $('[for="mail"]').css('color', '#000');
        return true;
        }    
}

//Activities validation
const activitiesValidation = () => {
    if($('input[type="checkbox"]').is(':checked')) {
        $('.activities legend span').remove();
        $('.activities legend').css('color', '#000');
        return true;
    } else {
        $('.activities legend span').remove();
        $('.activities legend').append('<span>: Please select an activity.</span>').css('color', 'red');
    return false;
    }
}
//Credit card validation
const creditCardValidation = () => {
    const validCreditCard = /^[0-9]{13,16}$/;
    
    if (validCreditCard.test($('#cc-num').val())) { //if the test value is true else = throw error
        $('#cc-num').css('border-color', '#6F9DDC');
        $('[for="cc-num"] span').remove();
        $('[for="cc-num"]').css('color', '#000');
        return true;
    } else {
        $('#cc-num').css('border-color', 'red');
        $('[for="cc-num"] span').remove();
        $('[for="cc-num"]').append('<span> Credit card number must be between 13 - 16 digits.</span>').css('color', 'red');
        return false;
        }
    }

//Zip code validation
const zipCodeValidation = () => {
    const zipCode = $('#zip');
    const validZipCode = /^[0-9]{5}$/;

    if(!(validZipCode.test(zipCode.val()))) {
        zipCode.css('border-color', 'red');
        $('[for="zip"] span').remove();
        $('[for="zip"]').append('<span> Please enter a valid zip code.</span>').css('color', 'red');
        return false;
    } else {
        zipCode.css('border-color', '#6F9DDC');
        $('[for="zip"] span').remove();
        $('[for="zip"]').css('color', '#000');
        return true;
    }
}

//CVV validation
const cvvValidation = () => {
    const cvv = $('#cvv');
    const validCVV = /^[0-9]{3}$/;

    if (!(validCVV.test(cvv.val()))) {
        cvv.css('border-color', 'red');
        $('[for="cvv"] span').remove();
        $('[for="cvv"]').append('<span> Please enter a valid CVV.</span>').css('color', 'red');
        return false;
    } else {
        cvv.css('border-color', '#6F9DDC');
        $('[for="cvv"] span').remove();
        $('[for="cvv"]').css('color', '#000');
        return true;
    }
}

//Add Event listeners for all validation to show errors
$('#name').on('focusout', function () {
    nameValidation();
});

//EVENT LISTENER TO SHOW EMAIL ERROR
$('#mail').on('focusout', function () {
    emailValidation();
})

//EVENT LISTENER TO SHOW activities ERROR
$('.activities').on('click', function () {
    activitiesValidation();
});


//EVENT LISTENER TO SHOW CREDIT CARD ERROR
$('#cc-num').on('focusout', function() {
    creditCardValidation();
});

//EVENT LISTENER TO SHOW ZIP ERROR
$('#zip').on('focusout', function () {
    zipCodeValidation();
});

//EVENT LISTENER TO SHOW CVV ERROR
$('#cvv').on('focusout', function () {
    cvvValidation();
});


/**********************
    MASTER VALIDATION FOR FORM USING SUBMIT HANDLE EVENT
***********************/
const masterValidation = () => {
    $('form').on('submit', function(event) {
        if(nameValidation() === false) {
            event.preventDefault();
        }
        if (emailValidation() === false) {
            event.preventDefault();
        }
        if (activitiesValidation() === false) {
            event.preventDefault();
        }
        //if credit card payment is selected, then validate cc number, zip code, and cvv
        if ($('option[value="Credit Card"]').is(':selected')) {
            if (creditCardValidation() === false) {
                event.preventDefault();
            }
            if (zipCodeValidation()=== false) {
                event.preventDefault();
            }
            if (cvvValidation() === false) {
                event.preventDefault();
            }
        }
    })
};

masterValidation();