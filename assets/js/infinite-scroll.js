/* eslint-env browser */

/**
 * Infinite Scroll
 * Used on all pages where there is a list of posts (homepage, tag index, etc).
 *
 * When the page is scrolled to 300px from the bottom, the next page of posts
 * is fetched by following the the <link rel="next" href="..."> that is output
 * by {{ghost_head}}.
 *
 * The individual post items are extracted from the fetched pages by looking for
 * a wrapper element with the class "post-card". Any found elements are appended
 * to the element with the class "post-feed" in the currently viewed page.
 */

(function(window, document) {
	// next link element
	var nextElement = document.querySelector('link[rel=next]');
	if (!nextElement) {
		return;
	}

	// post feed element
  var feedElement = document.querySelector('.post-feed');

	if (!feedElement) {
		return;
	}

  var postElements;
  var gridLast;
  var colcNew;
  var div;
  var i;
  var increment = 1;
  var childrenNodeArr;
  var hasFeaturePost;
  var colcLast;

	var buffer = 300;

	var ticking = false;
	var loading = false;

	var lastScrollY = window.scrollY;
	var lastWindowHeight = window.innerHeight;
	var lastDocumentHeight = document.documentElement.scrollHeight;

	function onPageLoad() {
		if (this.status === 404) {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onResize);
			return;
		}

		// append contents
    postElements = this.response.querySelectorAll('.post-card');

    // check if list contains feature post
    childrenNodeArr = Array.from(postElements);
    hasFeaturePost = childrenNodeArr.find(
      e =>
        e.classList.contains("featured")
    )

    if (hasFeaturePost) {
      // create new grid element
      div = document.createElement('div');
      div.className = "grid grid-gallery-" + increment;
      feedElement.appendChild(div)

      // create new grid columns
      var div = document.createElement('div');
      div.className = "grid-col grid-gallery-col-" + increment + " grid-col--1";
      gridLast = document.querySelector('.grid-gallery-' + increment);
      gridLast.appendChild(div)

      var div = document.createElement('div');
      div.className = "grid-col grid-gallery-col-" + increment + " grid-col--2";
      gridLast.appendChild(div)

      // initialize colcade
      colcNew = new Colcade('.grid-gallery-' + increment, {
        columns: '.grid-gallery-col-' + increment,
        items: '.grid-gallery-item-' + increment + ':not(.featured)'
      })
    } {
      // determines where postElements are going to be injected if there's no feature post
      if (colcNew) {
        // more than 1 instance running
        colcLast = colcNew
      } else {
        // only 1 instance running
        colcLast = colc
      }
    }

		postElements.forEach(function(item) {
			// document.importNode is important, without it the item's owner
			// document will be different which can break resizing of
			// `object-fit: cover` images in Safari
			// console.log('item', item);

			if (item.classList.contains('featured')) {
        // append feature post outside grid-col
				gridLast.appendChild(document.importNode(item, true));
			} else {
        // determines where postElements are going to be injected if there's no feature post
        if (colcNew) {
          // more than 1 instance running
          item.className = "post-card grid-item grid-gallery-item-" + increment + " post";
          colcNew.append(document.importNode(item, true));
        } else {
          // only 1 instance running
          colcLast.append(document.importNode(item, true));
        }
			}
    });

    // lays out all elements
    if (colcLast.element.classList.contains('grid-gallery-' + increment)) {
      colc.layout()
    }

    increment++;

		// set next link
		var resNextElement = this.response.querySelector('link[rel=next]');
		if (resNextElement) {
			nextElement.href = resNextElement.href;
		} else {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onResize);
		}

		// sync status
		lastDocumentHeight = document.documentElement.scrollHeight;
		ticking = false;
		loading = false;
	}

	function onUpdate() {
		// return if already loading
		if (loading) {
			return;
		}

		// return if not scroll to the bottom
		if (lastScrollY + lastWindowHeight <= lastDocumentHeight - buffer) {
			ticking = false;
			return;
		}

		loading = true;

		var xhr = new window.XMLHttpRequest();
		xhr.responseType = 'document';

		xhr.addEventListener('load', onPageLoad);

		xhr.open('GET', nextElement.href);
		xhr.send(null);
	}

	function requestTick() {
		ticking || window.requestAnimationFrame(onUpdate);
		ticking = true;
	}

	function onScroll() {
		lastScrollY = window.scrollY;
		requestTick();
	}

	function onResize() {
		lastWindowHeight = window.innerHeight;
		lastDocumentHeight = document.documentElement.scrollHeight;
		requestTick();
	}

	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', onResize);

	requestTick();
})(window, document);
