'use strict';

import arrayContains from 'terriajs/lib/Core/arrayContains';
import Branding from 'terriajs/lib/ReactViews/Branding.jsx';
import FeatureInfoPanel from 'terriajs/lib/ReactViews/FeatureInfo/FeatureInfoPanel.jsx';
import knockout from 'terriajs-cesium/Source/ThirdParty/knockout';
import MapNavigation from 'terriajs/lib/ReactViews/MapNavigation.jsx';
import MobileHeader from 'terriajs/lib/ReactViews/Mobile/MobileHeader.jsx';
import ModalWindow from 'terriajs/lib/ReactViews/ModalWindow.jsx';
import Notification from 'terriajs/lib/ReactViews/Notification/Notification.jsx';
import MapInteractionWindow from 'terriajs/lib/ReactViews/Notification/MapInteractionWindow.jsx';
import ObserveModelMixin from 'terriajs/lib/ReactViews/ObserveModelMixin';
import React from 'react';
import SidePanel from 'terriajs/lib/ReactViews/SidePanel.jsx';
import ProgressBar from 'terriajs/lib/ReactViews/ProgressBar.jsx';
import BottomDock from 'terriajs/lib/ReactViews/BottomDock/BottomDock.jsx';

var UserInterface = React.createClass({
    propTypes: {
        terria: React.PropTypes.object,
        allBaseMaps: React.PropTypes.array,
        terriaViewer: React.PropTypes.object,
        viewState: React.PropTypes.object,
    },

    mixins: [ObserveModelMixin],

    getInitialState() {
        return {
            // True if the feature info panel is visible.
            featureInfoPanelIsVisible: false,

            // True if the feature info panel is collapsed.
            featureInfoPanelIsCollapsed: false
        };
    },

    componentWillMount() {
        knockout.getObservable(this.props.terria, 'pickedFeatures').subscribe(() => {
            this.setState({
                featureInfoPanelIsVisible: true,
                featureInfoPanelIsCollapsed: false
            });
        }, this);

        const that = this;
        // TO DO(chloe): change window into a container
        window.addEventListener('dragover', e => {
            if (!e.dataTransfer.types || !arrayContains(e.dataTransfer.types, 'Files')) {
                return;
            }
            e.preventDefault();
            e.stopPropagation();
            e.dataTransfer.dropEffect = 'copy';
            that.acceptDragDropFile();
        });
    },

    /**
     * Closes the current notification.
     */
    closeNotification() {
        this.props.viewState.notifications.splice(0, 1);
    },

    /**
     * Show feature info panel.
     */
    closeFeatureInfoPanel(){
        this.setState({
            featureInfoPanelIsVisible: false
        });
    },

    /**
     * Opens the explorer panel to show the welcome page.
     * @return {[type]} [description]
     */
    showWelcome() {
        this.props.viewState.openWelcome();
    },

    /**
     * Changes the open/collapse state of the feature info panel.
     */
    changeFeatureInfoPanelIsCollapsed() {
        this.setState({
            featureInfoPanelIsCollapsed: !this.state.featureInfoPanelIsCollapsed
        });
    },

    acceptDragDropFile(){
        this.props.viewState.openUserData();
        this.props.viewState.isDraggingDroppingFile = true;
    },

    render(){
        const terria = this.props.terria;
        const allBaseMaps = this.props.allBaseMaps;
        const terriaViewer = this.props.terriaViewer;

        return (
            <div>
                <div className='header'>

                <MobileHeader terria={terria}
                              viewState={this.props.viewState}
                />
                <div className='workbench'>
                    <Branding onClick={this.showWelcome}
                              terria={terria}
                    />
                    <SidePanel terria={terria}
                               viewState={this.props.viewState}
                    />
                </div>
                </div>
                <main>
                    <ModalWindow terria={terria}
                                 viewState={this.props.viewState}
                    />
                </main>
                <div id="map-nav">
                    <MapNavigation terria={terria}
                                   allBaseMaps={allBaseMaps}
                                   terriaViewer={terriaViewer}
                    />
                </div>
                <div id='notification'>
                    <Notification notification={this.props.viewState.getNextNotification()}
                                  onDismiss={this.closeNotification}
                    />
                    <MapInteractionWindow terria ={terria}/>
                </div>
                <ProgressBar terria={terria}/>
                <FeatureInfoPanel terria={terria}
                                  viewState={this.props.viewState}
                                  isVisible={this.state.featureInfoPanelIsVisible}
                                  onClose={this.closeFeatureInfoPanel}
                                  isCollapsed={this.state.featureInfoPanelIsCollapsed}
                                  onChangeFeatureInfoPanelIsCollapsed={this.changeFeatureInfoPanelIsCollapsed}
                />
                <BottomDock terria={terria} viewState={this.props.viewState}/>
            </div>);
    }
});


module.exports = UserInterface;
