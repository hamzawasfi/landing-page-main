/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

document.addEventListener('DOMContentLoaded', () => {



    /**
     * Define Global Variables
     * 
    */
    const navList = document.querySelector('#navbar__list');
    const header = document.querySelector('.page__header');
    const headerHovered = document.querySelector('.page__header:hover') ? true : false;


    //height of header
    let headerHeight = 0;

    //add all section ids to a variable
    const sectionIds = [];
    for (item of document.querySelectorAll('section')) {
        sectionIds.push(item.id);
    }

    //add all section locations to a variable
    const sectionLocations = {}
    for (id of sectionIds) {
        sectionLocations[id] = (() => {
            let box = document.querySelector('#' + id).getBoundingClientRect();
            return {
                top: box.top + window.pageYOffset,
                right: box.right + window.pageXOffset,
                bottom: box.bottom + window.pageYOffset,
                left: box.left + window.pageXOffset
            };
        })();
    }
    /**
     * End Global Variables
     * Start Helper Functions
     * 
    */



    /**
     * End Helper Functions
     * Begin Main Functions
     * 
    */

    function main() {

        // build the nav
        let documentFragment = document.createDocumentFragment(); //creates a fragment to add ne <li>
        for (id of sectionIds) {
            const element = document.createElement('li');
            element.innerHTML = document.querySelector('#' + id).querySelector('h2').innerHTML;
            element.className = 'menu__link';
            element.id = 'nav' + id;
            documentFragment.appendChild(element);
        }
        navList.appendChild(documentFragment);
        headerHeight = document.querySelector('.page__header').offsetHeight;        
    }
    main();
    /**
     * End Main Functions
     * Begin Events
     * 
    */

    // Build menu
    let scrollTimeOut = 0;
    let hovered = false;
    document.addEventListener('scroll', () => {
        clearTimeout(scrollTimeOut);
        header.style.visibility = 'visible';
        if (document.body.scrollTop <= headerHeight + 20) {
            header.style.position = 'relative';
        } else {
            header.style.position = 'fixed';
        }
    });

    document.addEventListener('scrollend', () => {
        if (document.body.scrollTop >= headerHeight && !hovered) {
            scrollTimeOut = setTimeout(() => {
                header.style.visibility = 'hidden';
            }, 3000);
        }

        for (id of sectionIds){
            if (document.body.scrollTop > sectionLocations[id].top - sectionLocations[id].top * 0.25 && document.body.scrollTop < sectionLocations[id].top + sectionLocations[id].top *0.25){
                for (s of sectionIds) {
                    document.querySelector('#' + s).classList.remove('your-active-class');
                }
                document.querySelector('#' + id).classList.add('your-active-class');
            }
        }
    });


    // Scroll to section on link click
    navList.addEventListener('click', (event) => {
        const sectionId = '#' + event.target.id.split('nav').join('');
        scrollTo(sectionLocations[sectionId.split('#').join('')]);

        // Set sections as active
        for (id of sectionIds) {
            document.querySelector('#' + id).classList.remove('your-active-class');
        }
        document.querySelector(sectionId).classList.add('your-active-class');
    });
});
