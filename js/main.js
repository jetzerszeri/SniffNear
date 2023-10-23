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

const menubtn = document.querySelector('.menubtn');

if (menubtn) {
    const sidebar = document.querySelector('.sidebar');
    const sidebarNav = document.querySelector('.sidebar nav');
    menubtn.addEventListener('click', function () {
        sidebar.classList.add('show');
        sidebar.style.transform = 'translateX(0)';
        sidebarNav.classList.add('show');
    });
    
    function closeSidebar() {
        sidebarNav.classList.remove('show');
        sidebar.classList.remove('show');
        setTimeout(function () {
            sidebar.style.transform = 'translateX(-100%)';
        }, 1000);
    }
    
    const btnCloseSidebar = document.querySelector('.closebtn');
    btnCloseSidebar.addEventListener('click', closeSidebar);
    sidebar.addEventListener('click', closeSidebar);
    
    sidebarNav.addEventListener('click', function(event) {
        event.stopPropagation();
    });

}