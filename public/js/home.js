const dbBaseUrl = 'https://raw.githubusercontent.com/hash-define-organization/website-update/main/database';
const notificationsUrl = '/notifications.json';
const eventsUrl = '/gallery/gallery.json';
class NotificationManager {

    messages = null;
    displayElement = null;
    messagePlaceholder = null;
    linkPlaceholder = null;
    totalCountElement = null;
    currentCountElement = null;
    
    cielCount = null;
    currentCount = null;
    totalCount = null;

    constructor() {
        this.displayElement = document.querySelector('.notification__wrapper');
        this.messagePlaceholder = document.querySelector('.notification-message');
        this.linkPlaceholder = document.querySelector('.notification-link__content');
        this.totalCountElement = document.querySelector('.total-count');
        this.currentCountElement = document.querySelector('.current-count');

        // Event Listeners
        this.dismissBtn = document.querySelector('#dismissBtn');
        this.expandBtn = document.querySelector('#expandBtn');
        this.showNextBtn = document.querySelector('#showNextBtn');
     
        this.startWithDelay(1000);
    }

    startWithDelay(time) {
        setTimeout(() => {
            this.initNotificationHandler();
        }, time);
    }

    toggleElementVisibility() {
        this.displayElement.style.display = this.displayElement.style.display === "none" ? "" : "none";
    }

    showNotification(count) {
        this.currentCountElement.innerText = count;

        let message = Object.values(this.messages)[count-1];

        this.messagePlaceholder.innerHTML = message.content;
    }

    async fetchNotifications() {
        try {
            return await (await fetch(`${dbBaseUrl}${notificationsUrl}`)).json();
        } catch (error) {
            console.log("Failed to check for Notifications");
        }
    }

    async initNotificationHandler() {
        try {
            this.messages = await this.fetchNotifications();
            
            if(!this.messages) return; 

            this.toggleElementVisibility();
            this.currentCount = this.cielCount = 1;
            this.totalCount = Object.keys(this.messages).length;
            this.totalCountElement.innerHTML = `&nbsp;/&nbsp; ${this.totalCount}`;
            
            this.showNotification(this.cielCount);

            this.dismissBtn.addEventListener('click', () => {
                this.toggleElementVisibility();

                this.displayElement.classList.add('notification__wrapper--close');
            });

            this.expandBtn.addEventListener('click', () => {
                console.log("Showing Message!");
            });

            this.showNextBtn.addEventListener('click', () => {
                this.cielCount++;

                if(this.cielCount > this.totalCount ) this.cielCount -= this.totalCount;

                this.showNotification(this.cielCount);
            });

        } catch (error) {
            console.log(error);
        }
    }
}

const notificationHandler = new NotificationManager();

// gallery

const galleryWraper = document.querySelector('.gallery__wrapper');
const galleryItems = document.querySelectorAll('.gallery__item');
let pos = { top: 0, left: 0, x: 0, y: 0 };

const mouseMoveHandler = function (e) {
    // How far the mouse has been moved
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;

    // Scroll the element
    galleryWraper.scrollTop = pos.top - dy;
    galleryWraper.scrollLeft = pos.left - dx;
};

const mouseUpHandler = function () {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);

    galleryWraper.style.cursor = 'grab';
    galleryWraper.style.removeProperty('user-select');
};

const mouseDownHandler = (e) => {

    //change cursor to grab and remove selecting
    galleryWraper.style.cursor = "grabbing";
    galleryWraper.style.userSelect = "none";

    pos = {
        //curr scroll pos of the wrapper
        left: galleryWraper.scrollLeft,
        top: galleryWraper.scrollTop,

        //curr pos of the mouse 
        x: e.clientX,
        y: e.clientY
    }

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
};

galleryWraper.addEventListener('mousedown', mouseDownHandler);

//update gallery
const galleryColumn = document.querySelector('.gallery__flex');
(async function() {

    

})();
//update gallery

//moving text gallery-content
const eventNameWrapper = document.querySelector('.event-name');
const eventName = document.querySelector('.event-name h2');

const speakerNameWrapper = document.querySelector('.speaker-name');
const speakerName = document.querySelector('.speaker-name p');

window.addEventListener('load', () => {

    const eventNameWrapperWidth = eventNameWrapper.offsetWidth;
    const eventNameWidth = eventName.offsetWidth;
    const eventNameMoveWidth = eventNameWrapperWidth - eventNameWidth;

    const speakerNameWrapperWidth = speakerNameWrapper.offsetWidth;
    const speakerNameWidth = speakerName.offsetWidth;
    const speakerNameMoveWidth = speakerNameWrapperWidth - speakerNameWidth;
     
    console.log("h2:" , eventNameWidth);
    console.log("h2 wrapper:", eventNameWrapperWidth);
    console.log("h2 move:", eventNameMoveWidth);

    console.log("p:", speakerNameWidth);
    console.log("p wrapper:", speakerNameWrapperWidth);
    console.log("p move:", speakerNameMoveWidth);

    eventName.style.setProperty('--move-width', `${eventNameMoveWidth}px`);
    eventName.style.setProperty('--move-duration', `${-(eventNameMoveWidth * 9) / 199}s`);

    speakerName.style.setProperty('--move-width', `${speakerNameMoveWidth}px`);
    speakerName.style.setProperty('--move-duration', `${-(speakerNameMoveWidth * 9) / 199}s`);
});

// for(let index = 0; index >= moveWidth; index--) {

//     eventName.style.transform = `translateX(${index}px)`;
// }
//moving text gallery-content


// gallery

function emailHandler() {

    function validateEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    }

    const submitBtn = document.querySelector('.subscribe__form--submit');
    
    submitBtn.addEventListener('click', () => {
        const emailInput = document.querySelector('.subscribe__form--email').value;
        const messageBox = document.querySelector('.alert-message');

        let submitMessage = messageBox.children[0];

        submitMessage.parentElement.style.display = "block";

        if(validateEmail(emailInput))
        {
            submitMessage.innerHTML = "🎉 Thanks for subscribing!";
        }
        else
        {
            submitMessage.innerHTML = "🙅‍♀️ Please enter a valid email address";
        }

        submitMessage.parentElement.addEventListener('animationend', () => {

            submitMessage.parentElement.style.display = "none";
            submitMessage.innerHTML = "";

        })

        // setTimeout(() => {
        //     submitMessage.style.animation = "fadeOut 0.5s ease-in-out !important";
        //     submitMessage.parentElement.style.display = "none";
        // }
        // , 2000);
    }); 
}

function init() {
    console.log("Home page loaded");
};

// emailHandler();