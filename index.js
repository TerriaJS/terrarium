'use strict';

/*global require*/
var UserInterface = require('./UserInterface.jsx');
var React = require('react');
var ReactDOM = require('react-dom');
<<<<<<< HEAD
=======
// require('babel-polyfill');
>>>>>>> newui

var terriaOptions = {
    baseUrl: 'build/TerriaJS',
    appName: 'Terria Map',
    supportEmail: 'terrarium@lists.nicta.com.au'
};
var configuration = {
    bingMapsKey: undefined // use Cesium key
};

// Check browser compatibility early on.
// A very old browser (e.g. Internet Explorer 8) will fail on requiring-in many of the modules below.
// 'ui' is the name of the DOM element that should contain the error popup if the browser is not compatible
var checkBrowserCompatibility = require('terriajs/lib/ViewModels/checkBrowserCompatibility');

// checkBrowserCompatibility('ui');

<<<<<<< HEAD
=======

>>>>>>> newui
var isCommonMobilePlatform = require('terriajs/lib/Core/isCommonMobilePlatform');
var TerriaViewer = require('terriajs/lib/ViewModels/TerriaViewer');
var registerKnockoutBindings = require('terriajs/lib/Core/registerKnockoutBindings');
var corsProxy = require('terriajs/lib/Core/corsProxy');
var GoogleAnalytics = require('terriajs/lib/Core/GoogleAnalytics');

var GoogleUrlShortener = require('terriajs/lib/Models/GoogleUrlShortener');
var updateApplicationOnHashChange = require('terriajs/lib/ViewModels/updateApplicationOnHashChange');
var ViewerMode = require('terriajs/lib/Models/ViewerMode');
var updateApplicationOnMessageFromParentWindow = require('terriajs/lib/ViewModels/updateApplicationOnMessageFromParentWindow');
var ViewState = require('terriajs/lib/ReactViewModels/ViewState').default;

// Not used until custom Terria Map maps are below
//var BaseMapViewModel = require('terriajs/lib/ViewModels/BaseMapViewModel');
var Terria = require('terriajs/lib/Models/Terria');
var OgrCatalogItem = require('terriajs/lib/Models/OgrCatalogItem');
var registerCatalogMembers = require('terriajs/lib/Models/registerCatalogMembers');
var registerCustomComponentTypes = require('terriajs/lib/Models/registerCustomComponentTypes');

var raiseErrorToUser = require('terriajs/lib/Models/raiseErrorToUser');
var selectBaseMap = require('terriajs/lib/ViewModels/selectBaseMap');
var GoogleUrlShortener = require('terriajs/lib/Models/GoogleUrlShortener');
var isCommonMobilePlatform = require('terriajs/lib/Core/isCommonMobilePlatform');
var GoogleAnalytics = require('terriajs/lib/Core/GoogleAnalytics');

var OgrCatalogItem = require('terriajs/lib/Models/OgrCatalogItem');

// Tell the OGR catalog item where to find its conversion service.  If you're not using OgrCatalogItem you can remove this.
OgrCatalogItem.conversionServiceBaseUrl = configuration.conversionServiceBaseUrl;

// Register custom Knockout.js bindings.  If you're not using the TerriaJS user interface, you can remove this.
registerKnockoutBindings();


// Register all types of catalog members in the core TerriaJS.  If you only want to register a subset of them
// (i.e. to reduce the size of your application if you don't actually use them all), feel free to copy a subset of
// the code in the registerCatalogMembers function here instead.
registerCatalogMembers();
registerAnalytics();

terriaOptions.analytics = new GoogleAnalytics();

// Construct the TerriaJS application, arrange to show errors to the user, and start it up.
var terria = new Terria(terriaOptions);

// Register custom components in the core TerriaJS.  If you only want to register a subset of them, or to add your own,
// insert your custom version of the code in the registerCustomComponentTypes function here instead.
registerCustomComponentTypes(terria);

terria.welcome = '<h3>Terria<sup>TM</sup> is a spatial data platform that provides spatial predictive analytics</h3><div class="body-copy"><p>This interactive map uses TerriaJS<sup>TM</sup>, an open source software library developed by Data61 for building rich, web-based geospatial data explorers.  It uses Cesium<sup>TM</sup> open source 3D globe viewing software.  TerriaJS<sup>TM</sup> is used for the official Australian Government NationalMap and many other sites rich in the use of spatial data.</p><p>This map also uses Terria<sup>TM</sup> Inference Engine, a cloud-based platform for making probabilistic predictions using data in a web-based mapping environment. Terria<sup>TM</sup> Inference Engine uses state of the art machine learning algorithms developed by Data61 and designed specifically for large-scale spatial inference.</p></div>';

const viewState = new ViewState();

terria.error.addEventListener(e => {
    viewState.notifications.push({
        title: e.title,
        message: e.message
    });
});

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
                text: 'Data61',
                link: 'http://www.csiro.au/en/Research/D61'
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
                                       terriaViewer={terriaViewer}
                                       viewState={viewState} />, document.getElementById('ui'));
    } catch (e) {
        console.error(e);
        console.error(e.stack);
    }
});
