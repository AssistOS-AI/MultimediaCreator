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
        this.paragraphPresenter = paragraphItem.webSkelPresenter;
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
        this.toggleAttachmentsPreviewIcon();
    }
    removeHighlight(){
        let pluginContainer = this.element.closest(".plugin-circle");
        pluginContainer.classList.remove("highlight-attachment");
        this.toggleAttachmentsPreviewIcon();
    }
    toggleAttachmentsPreviewIcon(){
        let iconsContainer = this.paragraphPresenter.element.querySelector(".preview-icons");
        let attachmentType = this.pluginMap[this.plugin];
        let attachmentIcon = iconsContainer.querySelector(`.preview-icon.has-${attachmentType}-icon`);
        if(attachmentIcon){
            attachmentIcon.remove();
        } else {
            let iconHTML = `<img src="${this.iconURL}" alt="${attachmentType}" class="preview-icon has-${attachmentType}-icon">`;
            iconsContainer.insertAdjacentHTML("afterbegin", iconHTML);
        }
    }
}