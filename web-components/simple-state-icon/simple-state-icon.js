import pluginUtils from "../../../../../../../wallet/core/plugins/pluginUtils.js";
export class SimpleStateIcon{
    constructor(element, invalidate) {
        this.element = element;
        this.invalidate = invalidate;
        let context = pluginUtils.getContext(this.element);
        this.plugin = context.plugin;
        this.type = context.type;
        this.iconURL = `/applications/files/${assistOS.space.id}/MultimediaCreator/${context.icon}`;
        let paragraphItem = this.element.closest("paragraph-item");
        this.paragraph = paragraphItem.webSkelPresenter.paragraph;
        this.invalidate();
    }
    pluginMap = {
        "image-creator": "image",
        "audio-creator": "audio",
        "video-creator": "video",
    }
    beforeRender(){}
    afterRender(){
        if(this.pluginMap[this.plugin] && this.paragraph.commands[this.pluginMap[this.plugin]]){
            this.highlightIcon();
        }
    }

    highlightIcon(){
        let pluginContainer = this.element.closest(".plugin-circle");
        pluginContainer.classList.add("highlight-attachment");
    }
    removeHighlight(){
        let pluginContainer = this.element.closest(".plugin-circle");
        pluginContainer.classList.remove("highlight-attachment");
    }
}