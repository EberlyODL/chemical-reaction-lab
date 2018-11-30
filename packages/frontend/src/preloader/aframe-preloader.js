/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

/**
* Visual preloader system for A-Frame.
*
* When applied to the <scene> will automatically display a preloader modal that reflects the current loading progress
* of resources in <a-assets> that have been flagged for preloading and will auto-close the modal when it reaches 100%.
* Alternately, the modal can be manually closed
*
* Emits a 'preloading-complete' event when done.
*/
AFRAME.registerSystem('preloader', {
  schema: {
    debug: { type: 'boolean', default: false } //whether or not to enable logging to console
  },

  /**
   * Set if component needs multiple instancing.
   */
  multiple: false,

  loadedAssetCount: 0, //total number of assets loaded
  totalAssetCount: 0, //total number of assets to load
  slowLoadTimeAssetUpdate: 1000, //length of time to slow down asset load progress if slowLoad is set to 'true'
  slowLoadTimePreloadFinish: 4000, //length of time to slow down preload finish if slowLoad is set to 'true'

  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init: function () {
    // document.querySelector('a-assets').addEventListener('loaded', function () {
    //   if (this.data.debug) {
    //     console.info('All assets loaded');
    //   }
    //   this.triggerProgressComplete();
    // }.bind(this));

    var assetItems = document.querySelectorAll('a-assets a-asset-item,a-assets img,a-assets audio,a-assets video');

    this.totalAssetCount = assetItems.length;

    this.watchPreloadProgress(assetItems);
  },

  /**
   * Called when component is attached and when component data changes.
   * Generally modifies the entity based on the data.
   */
  update: function (oldData) { },

  /**
   *
   * @param assetItems A NodeList with a list of <a-asset-item> elements that you wish to watch
   */
  watchPreloadProgress: function (assetItems) {
    for (var a = 0; a < assetItems.length; a++) {

      var eventName;

      switch (assetItems[a].nodeName.toLowerCase()) {
        case 'a-asset-item':
          eventName = 'loaded';
          break;
        case 'img':
          eventName = 'load';
          break;
        case 'audio':
        case 'video':
          eventName = 'loadeddata';
          break;
      }

      assetItems[a].addEventListener(eventName, function (e) {
        this.loadedAssetCount++;
        if (this.data.debug) {
          console.info('Loaded ' + this.loadedAssetCount + '/' + this.totalAssetCount + ' asset items');
        }
        this.onAssetLoaded();
      }.bind(this));
    }
  },

  onAssetLoaded: function () {
    if (this.loadedAssetCount === this.totalAssetCount) {
      this.triggerProgressComplete();
    } else {
      var percentage = Math.floor(this.loadedAssetCount / this.totalAssetCount * 100);
      if (this.data.slowLoad) {
        setTimeout(function () {
          this.progress(percentage);
        }.bind(this), this.slowLoadTimeAssetUpdate)
      } else {
        this.progress(percentage);
      }
    }
  },

  triggerProgressComplete: function () {
    if (this.data.debug) {
      console.log('Complete')
    }
  },

  progress: function (percentage) {
    if (this.data.debug) {
      console.log('draw progress percentage', percentage);
    }
  }

});