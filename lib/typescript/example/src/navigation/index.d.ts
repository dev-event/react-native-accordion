import React from 'react';
export declare enum tabs {
    home = "home",
    discovery = "discovery",
    chart = "chart",
    account = "account"
}
export declare type BottomTabParamList = {
    [tabs.home]: undefined;
    [tabs.discovery]: undefined;
    [tabs.chart]: undefined;
    [tabs.account]: undefined;
};
declare const BottomBarNavigator: () => React.ReactElement;
export { BottomBarNavigator };
