'use strict';

/*global require*/
var UserInterface = require('./UserInterface.jsx');
var React = require('react');
var ReactDOM = require('react-dom');


var configuration = {
    terriaBaseUrl: 'build/TerriaJS',
    cesiumBaseUrl: undefined, // use default
    bingMapsKey: undefined, // use Cesium key
    proxyBaseUrl: '/proxy/',
    conversionServiceBaseUrl: 'convert',
    regionMappingDefinitionsUrl: 'data/regionMapping.json'
};

// Check browser compatibility early on.
// A very old browser (e.g. Internet Explorer 8) will fail on requiring-in many of the modules below.
// 'ui' is the name of the DOM element that should contain the error popup if the browser is not compatible
var checkBrowserCompatibility = require('terriajs/lib/ViewModels/checkBrowserCompatibility');

// checkBrowserCompatibility('ui');

var knockout = require('terriajs-cesium/Source/ThirdParty/knockout');
var defined = require('terriajs-cesium/Source/Core/defined');
var fs = require('fs');

var isCommonMobilePlatform = require('terriajs/lib/Core/isCommonMobilePlatform');
var TerriaViewer = require('terriajs/lib/ViewModels/TerriaViewer');
var registerKnockoutBindings = require('terriajs/lib/Core/registerKnockoutBindings');
var corsProxy = require('terriajs/lib/Core/corsProxy');
var GoogleAnalytics = require('terriajs/lib/Core/GoogleAnalytics');

var AddDataPanelViewModel = require('terriajs/lib/ViewModels/AddDataPanelViewModel');
var AnimationViewModel = require('terriajs/lib/ViewModels/AnimationViewModel');
var BingMapsSearchProviderViewModel = require('terriajs/lib/ViewModels/BingMapsSearchProviderViewModel');
var BrandBarViewModel = require('terriajs/lib/ViewModels/BrandBarViewModel');
var CatalogItemNameSearchProviderViewModel = require('terriajs/lib/ViewModels/CatalogItemNameSearchProviderViewModel');
var createAustraliaBaseMapOptions = require('terriajs/lib/ViewModels/createAustraliaBaseMapOptions');
var createGlobalBaseMapOptions = require('terriajs/lib/ViewModels/createGlobalBaseMapOptions');
var createToolsMenuItem = require('terriajs/lib/ViewModels/createToolsMenuItem');
var DataCatalogTabViewModel = require('terriajs/lib/ViewModels/DataCatalogTabViewModel');
var DistanceLegendViewModel = require('terriajs/lib/ViewModels/DistanceLegendViewModel');
var DragDropViewModel = require('terriajs/lib/ViewModels/DragDropViewModel');
var ExplorerPanelViewModel = require('terriajs/lib/ViewModels/ExplorerPanelViewModel');
var FeatureInfoPanelViewModel = require('terriajs/lib/ViewModels/FeatureInfoPanelViewModel');
var GazetteerSearchProviderViewModel = require('terriajs/lib/ViewModels/GazetteerSearchProviderViewModel');
var GoogleUrlShortener = require('terriajs/lib/Models/GoogleUrlShortener');
var LocationBarViewModel = require('terriajs/lib/ViewModels/LocationBarViewModel');
var MenuBarItemViewModel = require('terriajs/lib/ViewModels/MenuBarItemViewModel');
var MenuBarViewModel = require('terriajs/lib/ViewModels/MenuBarViewModel');
var MutuallyExclusivePanels = require('terriajs/lib/ViewModels/MutuallyExclusivePanels');
var NavigationViewModel = require('terriajs/lib/ViewModels/NavigationViewModel');
var NowViewingAttentionGrabberViewModel = require('terriajs/lib/ViewModels/NowViewingAttentionGrabberViewModel');
var NowViewingTabViewModel = require('terriajs/lib/ViewModels/NowViewingTabViewModel');
var PopupMessageViewModel = require('terriajs/lib/ViewModels/PopupMessageViewModel');
var PopupMessageConfirmationViewModel = require('terriajs/lib/ViewModels/PopupMessageConfirmationViewModel');
var SearchTabViewModel = require('terriajs/lib/ViewModels/SearchTabViewModel');
var SettingsPanelViewModel = require('terriajs/lib/ViewModels/SettingsPanelViewModel');
var SharePopupViewModel = require('terriajs/lib/ViewModels/SharePopupViewModel');
var MapProgressBarViewModel = require('terriajs/lib/ViewModels/MapProgressBarViewModel');
var updateApplicationOnHashChange = require('terriajs/lib/ViewModels/updateApplicationOnHashChange');
var ViewerMode = require('terriajs/lib/Models/ViewerMode');
var updateApplicationOnMessageFromParentWindow = require('terriajs/lib/ViewModels/updateApplicationOnMessageFromParentWindow');

// Not used until custom Terrarium maps are below
//var BaseMapViewModel = require('terriajs/lib/ViewModels/BaseMapViewModel');
var Terria = require('terriajs/lib/Models/Terria');
var OgrCatalogItem = require('terriajs/lib/Models/OgrCatalogItem');
var registerCatalogMembers = require('terriajs/lib/Models/registerCatalogMembers');
var registerCustomComponentTypes = require('terriajs/lib/Models/registerCustomComponentTypes');
var raiseErrorToUser = require('terriajs/lib/Models/raiseErrorToUser');
var selectBaseMap = require('terriajs/lib/ViewModels/selectBaseMap');
var GoogleUrlShortener = require('terriajs/lib/Models/GoogleUrlShortener');
var isCommonMobilePlatform = require('terriajs/lib/Core/isCommonMobilePlatform');
var ViewerMode = require('terriajs/lib/Models/ViewerMode');
var GoogleAnalytics = require('terriajs/lib/Core/GoogleAnalytics');
var corsProxy = require('terriajs/lib/Core/corsProxy');
var OgrCatalogItem = require('terriajs/lib/Models/OgrCatalogItem');


// Configure the base URL for the proxy service used to work around CORS restrictions.
corsProxy.baseProxyUrl = configuration.proxyBaseUrl;

// Tell the OGR catalog item where to find its conversion service.  If you're not using OgrCatalogItem you can remove this.
OgrCatalogItem.conversionServiceBaseUrl = configuration.conversionServiceBaseUrl;

// Configure the base URL for the proxy service used to work around CORS restrictions.
corsProxy.baseProxyUrl = configuration.proxyBaseUrl;

// Tell the OGR catalog item where to find its conversion service.  If you're not using OgrCatalogItem you can remove this.
OgrCatalogItem.conversionServiceBaseUrl = configuration.conversionServiceBaseUrl;

// Register custom Knockout.js bindings.  If you're not using the TerriaJS user interface, you can remove this.
registerKnockoutBindings();


// Register all types of catalog members in the core TerriaJS.  If you only want to register a subset of them
// (i.e. to reduce the size of your application if you don't actually use them all), feel free to copy a subset of
// the code in the registerCatalogMembers function here instead.
registerCatalogMembers();



// Construct the TerriaJS application, arrange to show errors to the user, and start it up.

var terria = new Terria({
    appName: 'Terrarium',
    supportEmail: 'terrarium@lists.nicta.com.au',
    baseUrl: configuration.terriaBaseUrl,
    cesiumBaseUrl: configuration.cesiumBaseUrl,
    regionMappingDefinitionsUrl: configuration.regionMappingDefinitionsUrl,
    analytics: new GoogleAnalytics()
});

// Register custom components in the core TerriaJS.  If you only want to register a subset of them, or to add your own,
// insert your custom version of the code in the registerCustomComponentTypes function here instead.
registerCustomComponentTypes(terria);


// We'll put the entire user interface into a DOM element called 'ui'.
var ui = document.getElementById('ui');

// This is temporary
var welcome = '<h3>Welcome to Terrarium</h3><div class="intro"><p>Terrarium is a showcase of data from multiple'
            + ' <a href="https://terria.io/">Terria</a> maps, as well as experimental and cutting edge features. It has been'
            + ' developed by <a href="http://www.csiro.au/en/Research/D61">Data61</a>.</p></div><h4>Getting Started</h4>'
            + '<p>Choose a dataset from the Data Catalog. There are plenty to choose from!</p><div'
            + 'class="row"><div class="col col-6 getting-started--alpha"><figure><img src="./images/solar.png"></img><fig'
            + 'caption>Solar</figcaption></figure></div><div class="col col-6 getting-started--beta"><figure><img src='
            + '"./images/wind.png"></img><figcaption>Wind</figcaption></figure></div></div>';

console.log(welcome);

terria.welcome = function welcomeText() { return {__html: welcome}; };

terria.start({
    // If you don't want the user to be able to control catalog loading via the URL, remove the applicationUrl property below
    // as well as the call to "updateApplicationOnHashChange" further down.
    applicationUrl: window.location,
    configUrl: 'config.json',
    defaultTo2D: isCommonMobilePlatform(),
    urlShortener: new GoogleUrlShortener({
        terria: terria
    })
}).otherwise(function(e) {
    raiseErrorToUser(terria, e);
}).always(function() {
    try {
        configuration.bingMapsKey = terria.configParameters.bingMapsKey ? terria.configParameters.bingMapsKey : configuration.bingMapsKey;

        // Automatically update Terria (load new catalogs, etc.) when the hash part of the URL changes.
        updateApplicationOnHashChange(terria, window);
        updateApplicationOnMessageFromParentWindow(terria, window);

        // Create the map/globe.
        var terriaViewer = TerriaViewer.create(terria, {
            developerAttribution: {
                text: 'NICTA',
                link: 'http://www.nicta.com.au'
            }
        });

        //temp
        var createAustraliaBaseMapOptions = require('terriajs/lib/ViewModels/createAustraliaBaseMapOptions');
        var createGlobalBaseMapOptions = require('terriajs/lib/ViewModels/createGlobalBaseMapOptions');
        var selectBaseMap = require('terriajs/lib/ViewModels/selectBaseMap');
        // Create the various base map options.
        var australiaBaseMaps = createAustraliaBaseMapOptions(terria);
        var globalBaseMaps = createGlobalBaseMapOptions(terria, configuration.bingMapsKey);

        var allBaseMaps = australiaBaseMaps.concat(globalBaseMaps);
        selectBaseMap(terria, allBaseMaps, 'Positron (Light)', true);


        // Automatically update Terria (load new catalogs, etc.) when the hash part of the URL changes.
        // updateApplicationOnHashChange(terria, window);
        ReactDOM.render(<UserInterface terria={terria} allBaseMaps={allBaseMaps}
                                       terriaViewer={terriaViewer}/>, document.getElementById('ui'));
    } catch (e) {
        console.error(e);
        console.error(e.stack);
    }
});
