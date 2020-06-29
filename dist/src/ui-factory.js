import { AdMessageLabel } from 'bitmovin-player-ui/dist/js/framework/components/admessagelabel';
import { Container } from 'bitmovin-player-ui/dist/js/framework/components/container';
import { CastToggleButton } from 'bitmovin-player-ui/dist/js/framework/components/casttogglebutton';
import { ControlBar } from 'bitmovin-player-ui/dist/js/framework/components/controlbar';
import { FullscreenToggleButton } from 'bitmovin-player-ui/dist/js/framework/components/fullscreentogglebutton';
import { PlaybackTimeLabel, PlaybackTimeLabelMode } from 'bitmovin-player-ui/dist/js/framework/components/playbacktimelabel';
import { PlaybackToggleButton } from 'bitmovin-player-ui/dist/js/framework/components/playbacktogglebutton';
import { PlaybackToggleOverlay } from 'bitmovin-player-ui/dist/js/framework/components/playbacktoggleoverlay';
import { SeekBar } from 'bitmovin-player-ui/dist/js/framework/components/seekbar';
import { Spacer } from 'bitmovin-player-ui/dist/js/framework/components/spacer';
import { TitleBar } from 'bitmovin-player-ui/dist/js/framework/components/titlebar';
import { UIContainer } from 'bitmovin-player-ui/dist/js/framework/components/uicontainer';
import { UIManager } from 'bitmovin-player-ui/dist/js/framework/uimanager';
import { VolumeControlButton } from 'bitmovin-player-ui/dist/js/framework/components/volumecontrolbutton';
import { VolumeToggleButton } from 'bitmovin-player-ui/dist/js/framework/components/volumetogglebutton';
import { VRToggleButton } from 'bitmovin-player-ui/dist/js/framework/components/vrtogglebutton';
var UIFactory = /** @class */ (function () {
    function UIFactory() {
    }
    UIFactory.buildUI = function (player, config) {
        if (config === void 0) { config = {}; }
        var conditionList = [
            {
                ui: UIFactory.getAdUI(),
                condition: function (context) {
                    return context.isAd;
                }
            },
            {
                ui: UIFactory.getContentUI(true, true),
                condition: function (context) {
                    return context.isMobile && !isFinite(player.getDuration());
                }
            },
            {
                ui: UIFactory.getContentUI(false, true),
                condition: function (context) {
                    return context.isMobile;
                }
            },
            {
                ui: UIFactory.getContentUI(true, false),
                condition: function () { return !isFinite(player.getDuration()); }
            },
            {
                ui: UIFactory.getContentUI(false, false),
                condition: function () { return isFinite(player.getDuration()); }
            }
        ];
        return new UIManager(player, conditionList, config);
    };
    UIFactory.getAdUI = function () {
        return new UIContainer({
            hideDelay: -1,
            components: [
                new ControlBar({
                    components: [
                        new Container({
                            components: [
                                new PlaybackToggleButton(),
                                new AdMessageLabel({
                                    text: 'Werbung endet in {remainingTime} Sekunden',
                                    cssClasses: ['ad-message-label']
                                }),
                                new Spacer(),
                                new VolumeControlButton(),
                                new FullscreenToggleButton()
                            ],
                            cssClasses: ['controlbar-top']
                        })
                    ]
                })
            ]
        });
    };
    UIFactory.getContentUI = function (isLive, isMobile) {
        return new UIContainer({
            components: [
                new PlaybackToggleOverlay(),
                UIFactory.getTitleBar(),
                UIFactory.getControlBar(isLive, isMobile)
            ]
        });
    };
    UIFactory.getTitleBar = function () {
        return new TitleBar({
            components: [new Spacer(), new CastToggleButton(), new VRToggleButton()]
        });
    };
    UIFactory.getControlBar = function (isLive, isMobile) {
        return new ControlBar({
            components: [
                new Container({
                    components: [
                        new PlaybackToggleButton(),
                        new PlaybackTimeLabel({ timeLabelMode: PlaybackTimeLabelMode.CurrentTime })
                    ].concat((isLive
                        ? [new Spacer()]
                        : [new SeekBar(), new PlaybackTimeLabel({ timeLabelMode: PlaybackTimeLabelMode.TotalTime })]), (isMobile ? [new VolumeToggleButton()] : [new VolumeControlButton()]), [
                        new FullscreenToggleButton()
                    ]),
                    cssClasses: ['controlbar-top']
                })
            ]
        });
    };
    return UIFactory;
}());
export { UIFactory };
//# sourceMappingURL=ui-factory.js.map