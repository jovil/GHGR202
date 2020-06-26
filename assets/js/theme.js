;(function () {
  var menuTrigger = document.getElementById('navbar-trigger'),
    menuPanel = document.getElementById('navbar-panel'),
    menuList = menuPanel.firstElementChild,
    menuSkyLight = document.getElementById('navbar-skylight')

  function initMenu () {
    menuTrigger.addEventListener('click', function () {
      menuPanel.classList.add('is-visible')
      menuList.classList.add('is-visible')
    })

    menuSkyLight.addEventListener('click', function () {
      menuList.classList.remove('is-visible')

      setTimeout(function () {
        menuPanel.classList.remove('is-visible')
      }, 500)
    })
  }

  document.addEventListener('DOMContentLoaded', function () {
    initMenu()
  })
})()
