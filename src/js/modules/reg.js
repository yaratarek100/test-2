export function inputValidation(inputVale ,inputId){

let regexPatterns = {
    Name: /^[a-zA-Z\s]{4,}$/,
    Email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    Phone: /^\d{5,12}$/,
    Age: /^\d{1,3}$/,
    Password: /^[a-zA-Z0-9]{6,30}$/,
    Repassword: /^[a-zA-Z0-9]{6,30}$/
  };

  if(!regexPatterns[`${inputId}`].test(inputVale) ){
    $(`#${inputId}.alert`).css("display","block")
    console.log("false");
}else{
    $(`#${inputId}.alert`).css("display","none")
    console.log("true");
  }

if($(".contact-form input").val()!="" && $(".contact-form .alert").css("display")=="none" )
{$(".contact-form button").prop('disabled', false);}



}