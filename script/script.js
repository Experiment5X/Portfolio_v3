window.onscroll = (event) => {
    const heroScrollProgress = Math.min(document.body.scrollTop, window.innerHeight);
    const heroScrollPercentage = heroScrollProgress / window.innerHeight;

    const backgroundPosX = heroScrollPercentage * 100;
    const backgroundPosY = (87 - 14) * heroScrollPercentage + 14;

    $('.hero-header').css('background-position', `${backgroundPosX}% ${backgroundPosY}%`);
}

$(document).ready(() => {
    $('.hero-index-item-link').on('click', function(event) {
        const sectionToScrollTo = $(event.target).attr('x-link-for');
        $([document.documentElement, document.body]).animate({
            scrollTop: $(sectionToScrollTo).offset().top
        }, 1500);
    });
});