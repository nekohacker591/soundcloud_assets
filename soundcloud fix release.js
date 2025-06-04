// ==UserScript==
// @name         SoundCloud UI Enhancements V5 (Custom Font + No Rounded Corners + Old Header + De-Bolded + Player Icon Fix + Logo Fix)
// @namespace    http://tampermonkey.net/
// @version      2.7
// @description  Cosmetic changes: old style header, square profile pic, reduced spacing, custom font (de-bolded), NO rounded corners. Player: black icons, smaller skips, no button circles.
// @author       Your AI Buddy & You
// @match        https://soundcloud.com/*
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    const styles = `
        /* Define and apply the custom font */
        @font-face {
            font-family: 'HardlinkedOldFont';
            src: url('https://github.com/nekohacker591/soundcloud_assets/raw/refs/heads/main/oldfont.otf') format('opentype');
            font-weight: normal;
            font-style: normal;
        }

        /* Force the new font and a more 'normal' weight globally */
        body, body *, input, button, textarea, select,
        .sc-font, .sc-type-light, .sc-type-regular, .sc-type-semibold, .sc-type-bold,
        .sc-text, .sc-link, .sc-ministats, .sc-truncate,
        .playbackSoundBadge__titleContextContainer > a,
        .soundTitle__title, .soundTitle__username, .playableTile__heading,
        .sidebarHeader__actualTitle, .mixedSelectionModule__titleText,
        .uploadTarget__title, .modal__titleText, .dialog__content,
        .headerMenu__link, .announcement p, .banner p, .confirmEmailBanner__text,
        .quotaMeter__percentage, .quotaMeter__lightLine, .quotaMeter__upsellText,
        .userBadge__username, .userBadge__stats, .trackList__item .trackItem__title,
        .commentItem__body, .commentItem__username,
        .sc-button-label,
        .l-main h1, .l-main h2, .l-main h3, .l-main h4, .l-main h5, .l-main h6, .l-main p, .l-main span, .l-main a,
        .l-sidebar-right h1, .l-sidebar-right h2, .l-sidebar-right h3, .l-sidebar-right h4, .l-sidebar-right h5, .l-sidebar-right h6, .l-sidebar-right p, .l-sidebar-right span, .l-sidebar-right a
         {
            font-family: 'HardlinkedOldFont', sans-serif !important;
            font-weight: 400 !important;
        }
        .sc-font-light, .sc-type-light { font-family: 'HardlinkedOldFont', sans-serif !important; font-weight: 400 !important; }
        .sc-font-regular, .sc-type-regular { font-family: 'HardlinkedOldFont', sans-serif !important; font-weight: 400 !important; }
        .sc-font-semibold, .sc-type-semibold { font-family: 'HardlinkedOldFont', sans-serif !important; font-weight: 400 !important; }
        .sc-font-bold, .sc-type-bold { font-family: 'HardlinkedOldFont', sans-serif !important; font-weight: 400 !important; }


        /* ---- Exact Old Header Style Restoration ---- */
        header.header.fixed {
            background-color: #333333 !important;
            color: #f0f0f0 !important;
            height: 46px !important;
            padding: 0 !important;
            border-bottom: 1px solid #1a1a1a !important;
            box-sizing: border-box !important;
        }
        header.header .header__inner.l-container {
            max-width: none !important; width: 100% !important; margin: 0 auto !important;
            padding: 0 0 0 0 !important; /* Left edge aligned logo block */
            height: 100% !important; align-items: center !important; display: flex !important;
            justify-content: space-between !important;
        }
        .header__left {
            display: flex !important; align-items: stretch !important; height: 100% !important;
        }
        .header__logo {
            display: flex !important; align-items: stretch !important; margin-right: 0 !important;
        }
        .header__logo .header__logoLink-wordmark {
            display: flex !important; align-items: center !important; justify-content: center !important;
            background-color: #ff5500 !important;
            padding: 0 10px !important;
            height: 100% !important;
            box-sizing: border-box !important;
            min-width: 110px;
        }
        .header__logo .header__logoLink-wordmark div { /* Container for the SVG */
            display: flex !important; align-items: center !important; justify-content: center !important;
            width: auto !important; /* Let SVG take its natural width based on height */
            height: 19px !important; /* Control the height of the SVG */
        }
        .header__logo .header__logoLink-wordmark div svg { /* The SVG itself */
            display: block !important;
            width: auto !important; /* Maintain aspect ratio */
            height: 100% !important; /* Fill the height of its container div */
            fill: #ffffff !important; /* Ensure paths are white */
        }
        .header__logo .header__logoLink-iconOnly { display: none !important; }

        .header__navWrapper { height: 100% !important; margin-left: 0px !important; }
        .header__navMenu {
            height: 100% !important; display: flex !important; align-items: stretch !important;
        }
        .header__navMenu > li {
            border-right: 1px solid #262626 !important;
            display: flex !important; align-items: stretch !important;
        }
        .header__navMenu > li:first-child { border-left: 1px solid #262626 !important; }
        .header__navMenu > li > a.header__navMenuItem {
            color: #ffffff !important; padding: 0 15px !important; font-weight: 400 !important;
            display: flex !important; align-items: center !important; text-decoration: none !important;
            border-bottom: 2px solid transparent !important; height: 100% !important; box-sizing: border-box !important;
        }
        header.header .header__navMenuItem.selected {
            color: #ff5500 !important; border-bottom-color: #ff5500 !important; font-weight: 400 !important;
        }
        header.header .header__navMenuItem:not(.selected):hover {
             color: #ffffff !important; border-bottom-color: #777777 !important;
        }

        .header__middle {
            flex: 1 1 auto !important; display: flex !important; align-items: center !important;
            padding: 0 15px !important; margin-left: 10px;
            min-width: 200px; max-width: 580px;
        }
        .header__search { width: 100% !important; }
        .headerSearch__input {
            background-color: #f0f0f0 !important; color: #555555 !important; font-weight: 400 !important;
            border: 1px solid #404040 !important; height: 30px !important;
            line-height: normal !important; padding: 6px 35px 6px 10px !important;
            box-sizing: border-box !important;
        }
        .headerSearch__input::placeholder { color: #888888 !important; font-weight: 400 !important; }
        .headerSearch__submit {
            height: 30px !important; width: 30px !important; top: 0 !important;
            transform: none !important; right: 0px !important; padding: 0 !important;
            display: flex; align-items: center; justify-content: center;
        }
        .headerSearch__submit svg { fill: #333333 !important; width: 16px !important; height: 16px !important; }

        .header__right {
            display: flex !important; align-items: center !important; height: 100% !important;
            margin-left: auto; padding-right: 10px;
        }
        .header__right > *,
        .header__userNav > .header__userNavItem,
        .header__userNav > a.header__userNavButton,
        .header__moreButton
         {
            margin-left: 5px !important;
            height: 100% !important;
            display: flex !important; align-items: center !important;
            padding-top: 0 !important; padding-bottom: 0 !important;
            box-sizing: border-box !important;
        }
        .header__right > *:first-child { margin-left: 0 !important; }

        .header__creatorUpsell, .signupButton {
            background-color: #ff5500 !important; color: #ffffff !important; border: none !important;
            padding: 0 10px !important; font-weight: 400 !important;
            text-transform: none !important;
        }
        .header__creatorUpsell span, .signupButton span,
        .header__creatorUpsell .sc-button-label, .signupButton .sc-button-label {
            color: #ffffff !important; line-height: 30px !important; font-weight: 400 !important;
        }
        .loginButton {
            background-color: #444444 !important; border: 1px solid #2d2d2d !important; color: #ffffff !important;
            padding: 0 10px !important; line-height: 28px !important; font-weight: 400 !important;
            text-transform: none !important;
        }
        .loginButton:hover { background-color: #555555 !important; }

        .uploadButton, .header__forArtistsButton, .header__soundInput .uploadButton {
            color: #ffffff !important; padding: 0 6px !important; font-weight: 400 !important;
            text-decoration: none !important; background-color: transparent !important; border: none !important;
            line-height: 30px !important;
        }
        .uploadButton .uploadButton__title, .header__forArtistsButton { color: #ffffff !important; font-weight: 400 !important; }
        .uploadButton:hover .uploadButton__title, .header__forArtistsButton:hover { color: #dddddd !important; }

        .header__userNav { display: flex; align-items: center; height: 100%; }
        .header__userNav > a.header__userNavButton,
        .header__userNav > .header__userNavItem
        {
             padding: 0 6px !important;
             border-left: 1px solid #262626 !important;
        }
        header.header .header__right .header__userNavActivitiesButton svg, header.header .header__right .header__userNavActivitiesButton svg path,
        header.header .header__right .header__userNavMessagesButton svg, header.header .header__right .header__userNavMessagesButton svg path,
        header.header .header__right .header__userNavUsernameButtonIcon svg, header.header .header__right .header__userNavUsernameButtonIcon svg path {
            fill: #f0f0f0 !important;
            width: 20px !important; height: 20px !important;
        }
        .header__userNavAvatar {
            margin-top: 0 !important; width: 26px !important; height: 26px !important;
            margin-right: 2px !important;
        }
        .header__userNavAvatar > span.image__full { width: 26px !important; height: 26px !important; }
        .header__userNavUsernameButtonIcon { margin-left: 0 !important; }
        .header__userNavUsernameButton .header__userNavUsername { color: #f0f0f0 !important; font-weight: 400 !important;}

        .header__moreButton {
            padding: 0 8px !important;
            border-left: 1px solid #262626 !important;
        }
        header.header .header__right .header__moreButtonIcon svg, header.header .header__right .header__moreButtonIcon svg path {
            fill: #f0f0f0 !important;
            width: 20px !important; height: 20px !important;
        }
        /* ---- End Exact Old Header Style Restoration ---- */

        /* 6. Tone Down Excessive Boldness SITE-WIDE */
        .sc-text-h1, .sc-text-h2, .sc-text-h3, .sc-text-h4, .sc-text-h5, .sc-text-h6,
        h1, h2, h3, h4, h5, h6,
        .sc-ministats, .sc-ministats span,
        .userStats span, .userStats a,
        .sidebarModule__title, .sidebarHeader__actualTitle,
        .mixedSelectionModule__titleText, .mixedSelectionModule__subtitleText,
        .playableTile__heading, .playableTile__usernameHeading,
        .soundTitle__title, .soundTitle__username,
        .commentItem__username, .commentItem__body,
        .sc-button .sc-button-label, button,
        .uploadButton__title, .header__link, .header__forArtistsButton,
        .quotaMeter__percentage, .quotaMeter__lightLine, .quotaMeter__upsellText,
        .insightsSidebarModule__title, .insightsSidebarModule__plays, .insightsSidebarModule__timeframe,
        .webiEmbeddedModuleContainer p, .webiEmbeddedModuleContainer span,
        .artistShortcutTile__username span,
        .userBadgeListItem__heading, .userBadgeListItem__subtitle,
        .systemPlaylistTile .playableTile__usernameHeading,
        .releaseDateCompact,
        .soundBadge .soundTitle__secondary a
        { font-weight: 400 !important; }
        .playableTile__heading a, .playableTile__usernameHeading a,
        .soundTitle__title a, .soundTitle__username a { font-weight: 400 !important; }

        /* 2. Make the profile picture icon square (already covered by no-rounded-corners) */
        /* 3. Reduce spacing for tiles/sections */
        body[class*="discover"] .mixedSelectionGallery .sc-mb-6x,
        body[class*="stream"] .soundList__item { margin-bottom: 12px !important; }
        body[class*="discover"] .mixedSelectionModule__title.sc-pt-3x { padding-top: 8px !important; }

        /* 4. General Play/Pause Button Background Removal (Non-Player Bar) */
        .sc-button-play:not(.playControls__control) svg,
        .playButton:not(.playControls__control) svg { fill: #000000 !important; }
        .sc-button-play.sc-button:not(.playControls__control),
        .playButton.sc-button:not(.playControls__control) {
            background-color: transparent !important; border: none !important; box-shadow: none !important;
        }
        .sc-button-play.sc-button:not(.playControls__control)::before,
        .sc-button-play.sc-button:not(.playControls__control)::after,
        .playButton.sc-button:not(.playControls__control)::before,
        .playButton.sc-button:not(.playControls__control)::after { display: none !important; }
        .playableTile__playButton > .sc-button-play,
        .audibleTile__playButton > .sc-button-play { background: none !important; }

        /* ---- CSS FOR MAIN PLAYER CONTROL BAR ---- */
        .playControls__elements .playControl.playControls__play,
        .playControls__elements .skipControl.playControls__prev,
        .playControls__elements .skipControl.playControls__next {
            background-color: transparent !important; border: none !important; box-shadow: none !important;
        }
        .playControls__elements .playControl.playControls__play::before,
        .playControls__elements .playControl.playControls__play::after,
        .playControls__elements .skipControl.playControls__prev::before,
        .playControls__elements .skipControl.playControls__prev::after,
        .playControls__elements .skipControl.playControls__next::before,
        .playControls__elements .skipControl.playControls__next::after { display: none !important; }
        .playControls__elements .skipControl.playControls__prev svg,
        .playControls__elements .skipControl.playControls__next svg { width: 20px !important; height: 20px !important; }

        /* 5. Remove Corporate Rounded Corners */
        .uploadTarget__frame, .modal__modal, .dialog, .headerMenu, .announcement, .banner,
        .confirmEmailBanner__inner, .scheduleBanner, .trackMonetizationBanner, .gritter-item-wrapper,
        .gritter-image, .queue, .volume.expanded .volume__sliderWrapper, .soundBadge,
        .playableTile__imageOverlay, .quotaMeterWrapper, .moreActions, .tooltip,
        .tierIndicator__largeGoPlus, .tierIndicator__listGoPlus, .tierIndicator__smallGoPlus,
        button, .sc-button, input, textarea, select,
        .image, .image__full, .image__rounded, .image__rounded > span.image__full, .sc-artwork,
        .playableTile .image, .playableTile__artwork .image, .audibleTile .image, .audibleTile__artwork .image,
        .userBadgeListItem__artwork .image, .tileGallery__sliderButton, .playControlsPanel,
        .soundList__item, .compactTrackListItem, .searchList__item, .commentItem,
        .header__userNavActivitiesButton, .header__userNavMessagesButton, .header__userNavUsernameButton,
        .sc-tag, .sc-tabs__item, .l-sidebar-right .sidebarModule,
        .playControls__castControl #castbutton,
        [class*="rounded"] { border-radius: 0px !important; }
        .dialog.roundedBottom, .queue__dragCover, .queue__scrollable,
        .headerMenu__list:first-child li:first-child .headerMenu__link,
        .headerMenu__list:last-child li:last-child .headerMenu__link { border-radius: 0px !important; }
    `;

    if (typeof GM_addStyle !== "undefined") {
        GM_addStyle(styles);
    } else {
        const styleNode = document.createElement('style');
        styleNode.id = 'soundcloud-ui-enhancements-styles';
        styleNode.type = 'text/css';
        styleNode.appendChild(document.createTextNode(styles));
        (document.head || document.documentElement).appendChild(styleNode);
    }

    // --- JavaScript for Direct SVG Path Modification ---
    function modifyPlayerSVGs() {
        const playerPlayPauseButton = document.querySelector('.playControls__elements .playControl.playControls__play');
        if (playerPlayPauseButton) {
            const svg = playerPlayPauseButton.querySelector('svg');
            if (svg) { svg.querySelectorAll('path').forEach(path => { path.setAttribute('fill', '#000000'); }); }
        }
        const playerPrevButton = document.querySelector('.playControls__elements .skipControl.playControls__prev');
        if (playerPrevButton) {
            const svg = playerPrevButton.querySelector('svg');
            if (svg) { svg.querySelectorAll('path').forEach(path => { path.setAttribute('fill', '#000000'); }); }
        }
        const playerNextButton = document.querySelector('.playControls__elements .skipControl.playControls__next');
        if (playerNextButton) {
            const svg = playerNextButton.querySelector('svg');
            if (svg) { svg.querySelectorAll('path').forEach(path => { path.setAttribute('fill', '#000000'); }); }
        }
    }

    function replaceLogoSVG() {
        const logoLinkDiv = document.querySelector('.header__logo .header__logoLink-wordmark div');
        if (logoLinkDiv) {
            if (logoLinkDiv.querySelector('svg[data-custom-logo="true"]')) {
                return; // Already replaced
            }
            // THIS IS THE CORRECTED SVG STRING FROM YOUR LINK
            const newSVGString = '<svg viewBox="0 0 418 50" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-custom-logo="true" style="width: 100%; height: 100%; display: block;"><path transform="translate(-297.000000, -813.000000)" fill="#FFFFFF" d="M440.485378,852.854445 C436.24284,853.038988 432.196902,851.056479 429.743025,847.590692 L433.70576,843.866677 C435.3998,846.011815 438.003382,847.23625 440.736033,847.172934 C443.994546,847.172934 445.510412,846.229994 445.510412,844.03378 C445.510412,842.171772 444.567472,841.336256 439.387271,840.094917 C434.20707,838.853579 430.793389,837.158674 430.793389,831.453292 C430.793389,826.189539 435.185817,822.966833 440.604737,822.966833 C444.456211,822.902673 448.132747,824.572232 450.618997,827.514429 L446.656263,831.572651 C445.117499,829.705819 442.8329,828.613754 440.413762,828.588664 C437.465583,828.588664 436.486836,829.913555 436.486836,831.202637 C436.486836,833.016901 437.68043,833.589826 442.025115,834.675997 C446.3698,835.762169 451.203858,837.325778 451.203858,843.616022 C451.275474,849.130429 447.981153,852.854445 440.485378,852.854445 Z M468.415494,852.854445 C461.253926,852.854445 456.32438,847.30423 456.32438,837.946447 C456.32438,828.588664 461.313606,822.966833 468.499046,822.966833 C475.684486,822.966833 480.554352,828.505113 480.554352,837.862895 C480.554352,847.220678 475.565126,852.854445 468.415494,852.854445 Z M468.415494,828.71996 C464.572119,828.71996 462.017826,831.990409 462.017826,837.862895 C462.017826,843.735381 464.691479,847.101318 468.534854,847.101318 C472.378229,847.101318 474.932521,843.830869 474.932521,837.946447 C474.932521,832.062025 472.234997,828.71996 468.379686,828.71996 L468.415494,828.71996 Z M498.494081,852.854445 C491.857694,852.854445 487.381714,848.080066 487.381714,839.724903 L487.381714,823.420399 L492.884186,823.420399 L492.884186,839.605544 C492.884186,844.236691 494.996848,847.172934 498.494081,847.172934 C501.991313,847.172934 504.15172,844.320243 504.15172,839.689095 L504.15172,823.420399 L509.654191,823.420399 L509.654191,839.605544 C509.654191,848.00845 505.488546,852.854445 498.494081,852.854445 Z M535.507453,852.388943 L525.409642,836.573813 C524.741229,835.499578 523.834097,834.043392 523.487954,833.303364 C523.487954,834.377599 523.55957,838.018063 523.55957,839.629416 L523.55957,852.388943 L518.14065,852.388943 L518.14065,823.420399 L523.404402,823.420399 L533.144135,838.73422 C533.812548,839.808455 534.71968,841.252704 535.065823,842.004669 C535.065823,840.930434 534.994207,837.28997 534.994207,835.666681 L534.994207,823.420399 L540.413127,823.420399 L540.413127,852.388943 L535.507453,852.388943 Z M557.290556,852.388943 L549.090561,852.388943 L549.090561,823.420399 L557.684443,823.420399 C565.538296,823.420399 571.351102,827.311518 571.351102,837.910639 C571.351102,848.092002 564.356637,852.388943 557.290556,852.388943 Z M557.493467,829.030295 L554.581096,829.030295 L554.581096,846.767112 L557.290556,846.767112 C563.067555,846.767112 565.645719,843.186328 565.645719,837.910639 C565.693463,831.990409 563.306274,829.04223 557.493467,829.04223 L557.493467,829.030295 Z M595.21106,831.859114 C594.356083,829.865915 592.352274,828.614129 590.186027,828.71996 C586.056189,828.71996 583.704807,832.527527 583.704807,837.910639 C583.704807,843.293751 586.091997,847.101318 590.221834,847.101318 C592.704511,847.101318 594.148761,845.979339 595.604947,843.413111 L600.236094,846.313546 C598.575555,850.429125 594.500291,853.050304 590.066667,852.854445 C582.905099,852.854445 578.047168,847.053575 578.047168,837.910639 C578.047168,829.089974 583.072202,822.966833 590.269578,822.966833 C594.637269,822.765709 598.66007,825.331319 600.319646,829.376437 L595.21106,831.859114 Z M608.209307,852.388943 L608.209307,823.420399 L613.699842,823.420399 L613.699842,846.68356 L627.485861,846.68356 L627.485861,852.388943 L608.209307,852.388943 Z M642.441603,852.854445 C635.280035,852.854445 630.350489,847.30423 630.350489,837.946447 C630.350489,828.588664 635.339715,822.966833 642.525155,822.966833 C649.710595,822.966833 654.580461,828.505113 654.580461,837.862895 C654.580461,847.220678 649.591235,852.854445 642.441603,852.854445 Z M642.441603,828.71996 C638.598228,828.71996 636.043935,831.990409 636.043935,837.862895 C636.043935,843.735381 638.705652,847.101318 642.560963,847.101318 C646.416273,847.101318 648.95863,843.830869 648.95863,837.946447 C648.95863,832.062025 646.24917,828.71996 642.405795,828.71996 L642.441603,828.71996 Z M672.52019,852.854445 C665.883803,852.854445 661.407823,848.080066 661.407823,839.724903 L661.407823,823.420399 L666.910295,823.420399 L666.910295,839.605544 C666.910295,844.236691 669.022957,847.172934 672.52019,847.172934 C676.017422,847.172934 678.177829,844.320243 678.177829,839.689095 L678.177829,823.420399 L683.716108,823.420399 L683.716108,839.605544 C683.716108,848.00845 679.514655,852.854445 672.52019,852.854445 Z M700.689025,852.567982 L692.489029,852.567982 L692.489029,823.575567 L701.082911,823.575567 C708.936764,823.575567 714.749571,827.478621 714.749571,838.065806 C714.749571,848.259105 707.755106,852.567982 700.689025,852.567982 Z M700.891936,829.209334 L698.039245,829.209334 L698.039245,846.934215 L700.748705,846.934215 C706.525703,846.934215 709.103868,843.353431 709.103868,838.077742 C709.091932,832.097833 706.704742,829.209334 700.891936,829.209334 L700.891936,829.209334 Z M408.473168,848.06813 C408.234449,856.423293 400.989329,862.809025 392.68191,862.809025 L354.68979,862.809025 C352.947564,862.795888 351.544012,861.376326 351.550636,859.634063 L351.550636,818.753444 C351.478093,817.302558 352.316136,815.959785 353.651363,815.387507 C353.651363,815.387507 357.136659,813 364.489203,813 C369.005431,812.984108 373.440942,814.197169 377.320346,816.509486 C383.43089,820.085391 387.760933,826.060851 389.256293,832.981093 C390.567141,832.601247 391.925892,832.412308 393.290643,832.420103 C397.398224,832.4215 401.330245,834.085869 404.190564,837.033885 C407.050882,839.981902 408.595782,843.962379 408.473168,848.06813 Z M346.800129,821.355481 C347.94598,835.213115 348.781496,847.853283 346.800129,861.687046 C346.800129,862.366026 346.249707,862.916448 345.570726,862.916448 C344.891746,862.916448 344.341324,862.366026 344.341324,861.687046 C342.503188,847.984579 343.314832,835.093756 344.341324,821.355481 C344.341324,820.6765 344.891746,820.126078 345.570726,820.126078 C346.249707,820.126078 346.800129,820.6765 346.800129,821.355481 Z M339.137251,826.129859 C340.462141,838.495501 340.856027,849.321405 339.113379,861.73479 C339.025903,862.373132 338.480541,862.848857 337.836233,862.848857 C337.191924,862.848857 336.646562,862.373132 336.559086,861.73479 C335.019349,849.500444 335.365492,838.388077 336.559086,826.129859 C336.559086,825.417919 337.136228,824.840777 337.848169,824.840777 C338.560109,824.840777 339.137251,825.417919 339.137251,826.129859 Z M331.414693,824.936265 C332.667968,837.61224 333.228957,848.987198 331.414693,861.698982 C331.414693,862.381258 330.861599,862.934352 330.179323,862.934352 C329.497046,862.934352 328.943952,862.381258 328.943952,861.698982 C327.177432,849.190109 327.750357,837.469009 328.943952,824.936265 C328.943952,824.253988 329.497046,823.700894 330.179323,823.700894 C330.861599,823.700894 331.414693,824.253988 331.414693,824.936265 Z M323.763751,828.517049 C325.273656,839.546976 325.261607,850.732013 323.727943,861.758662 C323.664766,862.406805 323.119917,862.901129 322.468701,862.901129 C321.817485,862.901129 321.272635,862.406805 321.209458,861.758662 C319.789122,850.72364 319.789122,839.552071 321.209458,828.517049 C321.209458,827.8117 321.781256,827.239902 322.486605,827.239902 C323.191953,827.239902 323.763751,827.8117 323.763751,828.517049 L323.763751,828.517049 Z M316.005385,836.740916 C317.962881,845.41835 317.067685,853.021548 315.87409,861.806405 C315.87409,862.465609 315.339699,863 314.680495,863 C314.021291,863 313.486901,862.465609 313.486901,861.806405 C312.508153,853.16478 311.636829,845.29899 313.486901,836.740916 C313.550078,836.092772 314.094927,835.598449 314.746143,835.598449 C315.397359,835.598449 315.942208,836.092772 316.005385,836.740916 Z M308.318635,835.475706 C310.120964,844.296371 309.524166,851.792146 308.270892,860.648618 C308.151532,861.949637 305.883702,861.961573 305.764343,860.648618 C304.630428,851.911505 304.15299,844.177011 305.716599,835.475706 C305.804969,834.824815 306.360755,834.339388 307.017617,834.339388 C307.674479,834.339388 308.230266,834.824815 308.318635,835.475706 Z M300.572206,839.712967 C302.434214,845.609325 301.765801,850.371768 300.452846,856.327806 C300.452846,856.98701 299.918456,857.5214 299.259252,857.5214 C298.600047,857.5214 298.065657,856.98701 298.065657,856.327806 C296.943678,850.45532 296.418496,845.573517 297.958233,839.712967 C298.02268,839.039356 298.588532,838.525056 299.26522,838.525056 C299.941907,838.525056 300.50776,839.039356 300.572206,839.712967 Z"></path></svg>';
            logoLinkDiv.innerHTML = newSVGString;
        }
    }

    function initSVGModification() {
        modifyPlayerSVGs();
        replaceLogoSVG();

        const controlsObserverTarget = document.querySelector('.playControls__elements');
        const headerObserverTarget = document.querySelector('header.header .header__logo');

        if (controlsObserverTarget) {
            const playerObserver = new MutationObserver((mutationsList, obs) => {
                let svgModified = false;
                for (const mutation of mutationsList) {
                    if (mutation.target.matches('.playControl svg, .skipControl svg, .playControl, .skipControl') || mutation.target.closest('.playControl, .skipControl')) { svgModified = true; break; }
                    if (mutation.addedNodes.length > 0) { mutation.addedNodes.forEach(node => { if (node.nodeType === 1 && (node.matches('svg') || node.querySelector('svg'))) { svgModified = true; } }); }
                    if (svgModified) break;
                }
                if(svgModified || mutationsList.some(m => m.type === 'attributes' && m.target.matches('button.playControl'))) {
                    modifyPlayerSVGs();
                }
            });
            playerObserver.observe(controlsObserverTarget, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'd'] });
        } else {
            setTimeout(initSVGModification, 1000);
        }

        if (headerObserverTarget) {
            const logoObserver = new MutationObserver((mutationsList, obs) => {
                for (const mutation of mutationsList) {
                    if (mutation.target.closest('.header__logoLink-wordmark div') || mutation.target.matches('.header__logoLink-wordmark div')) {
                        const logoDiv = document.querySelector('.header__logo .header__logoLink-wordmark div');
                        if (logoDiv && !logoDiv.querySelector('svg[data-custom-logo="true"]')) {
                             replaceLogoSVG();
                        }
                        break;
                    }
                }
            });
            logoObserver.observe(headerObserverTarget, { childList: true, subtree: true });
        } else {
            setTimeout(initSVGModification, 1000);
        }
    }

    if (document.readyState === 'interactive' || document.readyState === 'complete') {
        initSVGModification();
    } else {
        document.addEventListener('DOMContentLoaded', initSVGModification);
    }

})();