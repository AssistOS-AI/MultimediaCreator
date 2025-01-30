export class RoutingService {
    constructor() {}
    async navigateToLocation(locationArray = [], appName) {
        const VIDEO_CREATOR = "video-creator";

       if (locationArray.length === 0 || locationArray[0] === VIDEO_CREATOR) {
            const pageUrl = `${assistOS.space.id}/${appName}/${VIDEO_CREATOR}`;
            await assistOS.UI.changeToDynamicPage(VIDEO_CREATOR, pageUrl);
            return;
        }
         if(locationArray[locationArray.length-1]!== VIDEO_CREATOR){
         console.error(`Invalid URL: URL must end with ${VIDEO_CREATOR}`);
            return;
        }
        const webComponentName = locationArray[locationArray.length - 1];
        const pageUrl = `${assistOS.space.id}/${appName}/${locationArray.join("/")}`;
        await assistOS.UI.changeToDynamicPage(webComponentName, pageUrl);
    }
}
