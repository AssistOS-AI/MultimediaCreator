import {RoutingService} from "./services/RoutingService.js";

export class Manager {
    constructor() {
        this.appName = "VideoCreator";
        this.services = new Map();
        this.services.set('RoutingService', new RoutingService());
    }
    async navigateToLocation(location) {
        this.services.get('RoutingService').navigateToLocation(location, this.appName);
    }
}
