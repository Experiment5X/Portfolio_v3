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

    $('.image-separator').css('transform', `rotate(${angle}deg) translateY(-${yOffset}px)`);
    $('.image-separator').css('height', `${hypot * 1.13}px`);
}

function setProfileImageProperties() {
    const translateX = (window.innerHeight / window.innerWidth - 0.55) * window.innerWidth / 2;
    if (translateX > 0) {
        const clipPath = `polygon(calc(var(--profile-top-x) - (100vw - 100%) - ${translateX}px) 0,
                                calc(100% - ${translateX}px) 0,
                                calc(100% - ${translateX}px) 100%,
                                calc(var(--profile-bottom-x) - (100vw - 100%) - ${translateX}px) 100%
                        )`
        console.log('Translation: ' + translateX);
        console.log('Height / width: ' + (window.innerHeight / window.innerWidth));

        $('.profile-pic').css('transform', `translateX(${translateX}px)`);
        $('.profile-pic').css('clip-path', clipPath);
        $('.profile-pic').css('-webkit-clip-path', clipPath);
        $('.profile-pic').css('shape-outside', clipPath);
    }
}

window.onresize = (event) => {
    setImageSeparatorAngle();
    setProfileImageProperties();
}

$(document).ready(() => {
    $('.hero-index-item-link').on('click', function(event) {
        const sectionToScrollTo = $(event.target).attr('x-link-for');
        $([document.documentElement, document.body]).animate({
            scrollTop: $(sectionToScrollTo).offset().top - 5
        }, 500);
    });

    setImageSeparatorAngle();
    setProfileImageProperties();
});