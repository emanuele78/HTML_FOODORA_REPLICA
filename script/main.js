$(function () {
    // chiusura banner header
    $(".header_apply__close").click(function () {
        $(".header_apply").addClass("header_apply--hidden");
        $(".hero_main").removeClass("hero_main--double_padding");
        $(".hero_main__background").removeClass("hero_main__background--double_margin");
        $(".header_main .header_main--top_margin").removeClass("header_main--top_margin");
        $(".header_main_mobile .header_main_mobile--top_margin").removeClass("header_main_mobile--top_margin");
        $(".hero_main").addClass("hero_main--single_padding");
        $(".hero_main__background").addClass("hero_main__background--single_margin");
        $(".header_main").addClass("header_main--no_margin");
        $(".header_main_mobile").addClass("header_main_mobile--no_margin");
    });
    //animazione input box nel main hero
    $(".input_wrapper__text").focus(function () {
        startForwardAnimation();
    });
    $(".input_wrapper__text").focusout(function () {
        if ($(".input_wrapper__text").val().length === 0) {
            startRevertAnimation();
        }
    });
    attachLabelHanlder();
    // animazione input box email
    $(".newsletter__wrapper__form__email_container__value").focus(function () {
        if ($(".newsletter__wrapper__form__email_container__value").val().length == 0) {
            $(".newsletter__wrapper__form__email_container__label").css("animation-name", "input_box_form_anim");
            $(".newsletter__wrapper__form__email_container").css("border", "1px solid #333333");
        }
    });
    $(".newsletter__wrapper__form__email_container__value").focusout(function () {
        if ($(".newsletter__wrapper__form__email_container__value").val().length > 0) {
            //validare email
            if (!isEmail($(".newsletter__wrapper__form__email_container__value").val())) {
                //email non valida
                $(".newsletter__wrapper__form__email_container").css("border", "1px solid #FA7751");
                $(".newsletter__wrapper__form__email_container__label").css("animation-name", "none");
                $(".newsletter__wrapper__form__email_container__label").addClass("newsletter__wrapper__form__email_container__label--wrong");
                $(".newsletter__wrapper__form__email_container__label__error_arrow").show();
                $(".newsletter__wrapper__form__email_container__label__error_description").show();
            } else {
                //email valida, rimuovo eventuali errori segnalati in precedenza
                removeEmailError();
                $(".newsletter__wrapper__form__email_container").css("border", "1px solid #333333");
                $(".newsletter__wrapper__form__email_container__label").css("animation-name", "none");
                $(".newsletter__wrapper__form__email_container__label").addClass("newsletter__wrapper__form__email_container__label--right");
            }
        } else {
            removeEmailError();
            $(".newsletter__wrapper__form__email_container__label").css("animation-name", "input_box_form_anim_revert");
            $(".newsletter__wrapper__form__email_container").css("border", "1px solid #dcdcdc");
        }
    });
    //funzioni per la chiusura del banner nell'header
    $(document).scroll(function () {
        if ($(document).scrollTop() > 0) {
            $(".header_main").addClass("header_main--opaque");
            $(".header_main_mobile").addClass("header_main--opaque");
            $(".header_main__right__item").addClass("header_main__right__item--full_border");
            $(".header_main__right__item").removeClass("header_main__right__item--half_border");
            $(".header_main_mobile__left").addClass("header_main_mobile__left--background");
            $(".header_main_mobile__right").addClass("header_main_mobile__right--background");

        } else {
            $(".header_main").removeClass("header_main--opaque");
            $(".header_main_mobile").removeClass("header_main--opaque");
            $(".header_main__right__item").removeClass("header_main__right__item--full_border");
            $(".header_main__right__item").addClass("header_main__right__item--half_border");
            $(".header_main_mobile__left").removeClass("header_main_mobile__left--background");
            $(".header_main_mobile__right").removeClass("header_main_mobile__right--background");
        }
    });
    //lista città
    var cities = ["Oslo", "Elverum", "Bergen", "Stavanger & Sandnes", "Trondheim", "Drammen", "Haugesund", "Lillestrøm", "Ski", "Drøbak", "Moss", "Askim", "Fredrikstad", "Sarpsborg", "Halden", "Tønsberg", "Sandefjord", "Larvik", "Skien", "Arendal", "Grimstad", "Kristiansand", "Jessheim", "Kongsvinger", "Hamar", "Gjøvik", "Lillehammer", "Asker & Bærum"];
    var targetElement = $(".newsletter__wrapper__form__city_container__list");
    for (var cont = 0; cont < cities.length; cont++) {
        var clonedElement = $(".template > .newsletter__wrapper__form__city_container__list__item").clone();
        clonedElement.text(cities[cont]);
        targetElement.append(clonedElement);
    }
    // listener click dropdown
    $(".newsletter__wrapper__form__city_container").click(function () {
        $(".newsletter__wrapper__form__city_container__list").toggle();
    });
    //listener selezione città
    $(".newsletter__wrapper__form__city_container__list .newsletter__wrapper__form__city_container__list__item").click(function () {
        $(".newsletter__wrapper__form__city_container__label").css("animation-name", "input_box_form_anim");
        $(".newsletter__wrapper__form__city_container").css("border", "1px solid #333333");
        $(".newsletter__wrapper__form__city_container__value").text($(this).text());
    });
});

function removeEmailError() {
    $(".newsletter__wrapper__form__email_container__label").removeClass("newsletter__wrapper__form__email_container__label--wrong");
    $(".newsletter__wrapper__form__email_container__label__error_arrow").hide();
    $(".newsletter__wrapper__form__email_container__label__error_description").hide();
}

function startForwardAnimation() {
    $(".input_wrapper__label").off();
    $(".input_wrapper__label").css("animation-name", "input_box_anim");
    $(".input_wrapper").css("border", "1px solid #333333");
}

function startRevertAnimation() {
    $(".input_wrapper__label").css("animation-name", "input_box_anim_revert");
    $(".input_wrapper").css("border", "1px solid #dcdcdc");
    attachLabelHanlder();
}

function attachLabelHanlder() {
    $(".input_wrapper__label").click(function () {
        $(".input_wrapper__text").trigger("focus");
    });
}

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}