window.onscroll = (event) => {
    const heroScrollProgress = Math.min(document.body.scrollTop, window.innerHeight);
    const heroScrollPercentage = heroScrollProgress / window.innerHeight;

    const backgroundPosX = heroScrollPercentage * 100;
    const backgroundPosY = (87 - 14) * heroScrollPercentage + 14;

    $('.hero-header').css('background-position', `${backgroundPosX}% ${backgroundPosY}%`);
}

function setImageSeparatorAngle() {
    const profileTopXVw = Number(getComputedStyle(window.document.body).getPropertyValue('--profile-top-x').replace(/\D/g, ''));
    const profileBottomXVw = Number(getComputedStyle(window.document.body).getPropertyValue('--profile-bottom-x').replace(/\D/g, ''));

    const profileTopX = (profileTopXVw / 100) * window.innerWidth;
    const profileBottomX = (profileBottomXVw / 100) * window.innerWidth;

    const triangleBase = profileTopX - profileBottomX;
    const triangleHeight = window.innerHeight;

    const angleRad = Math.PI / 2 - Math.atan(triangleHeight / triangleBase)
    const angle = angleRad * 180 / Math.PI;
    const hypot = Math.sqrt(triangleHeight * triangleHeight + triangleBase * triangleBase);

    const yOffset = hypot / 2 - (hypot / 2) * Math.cos(angleRad);

    $('.image-separator').css('transform', `rotate(${angle}deg) translateY(-${yOffset}px`);
    $('.image-separator').css('height', `${hypot * 1.13}px`);
    console.log('Angle: ', angle);
}

window.onresize = (event) => {
    setImageSeparatorAngle();
}

$(document).ready(() => {
    $('.hero-index-item-link').on('click', function(event) {
        const sectionToScrollTo = $(event.target).attr('x-link-for');
        $([document.documentElement, document.body]).animate({
            scrollTop: $(sectionToScrollTo).offset().top - 5
        }, 500);
    });

    setImageSeparatorAngle();
});