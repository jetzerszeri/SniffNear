//bottom navbar
const bottomNavListItems = document.querySelectorAll('.bottomNavBar ul li');
bottomNavListItems.forEach(function (item) {
    item.addEventListener('click', function () {
        bottomNavListItems.forEach(function (item) {
            item.classList.remove('active');
        });
        this.classList.add('active');
    });
});

