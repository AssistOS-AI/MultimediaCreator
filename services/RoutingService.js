export class RoutingService {
    constructor() {}
    async navigateToLocation(locationArray = [], appName) {
        const DIAGRAM_GENERATOR = "diagram-generator";

       if (locationArray.length === 0 || locationArray[0] === DIAGRAM_GENERATOR) {
            const pageUrl = `${assistOS.space.id}/${appName}/${DIAGRAM_GENERATOR}`;
            await assistOS.UI.changeToDynamicPage(DIAGRAM_GENERATOR, pageUrl);
            return;
        }
         if(locationArray[locationArray.length-1]!== DIAGRAM_GENERATOR){
         console.error(`Invalid URL: URL must end with ${DIAGRAM_GENERATOR}`);
            return;
        }
        const webComponentName = locationArray[locationArray.length - 1];
        const pageUrl = `${assistOS.space.id}/${appName}/${locationArray.join("/")}`;
        await assistOS.UI.changeToDynamicPage(webComponentName, pageUrl);
    }
}
