import pluginUtils from "../../../../../../wallet/core/plugins/pluginUtils.js";
const spaceModule = require("assistos").loadModule("space", {});
export class ImageCreator{
    constructor(element, invalidate) {
        this.element = element;
        this.invalidate = invalidate;
        let documentPage = document.querySelector("document-view-page");
        if(!documentPage){
            return showApplicationError("Application not done yet", "use this as plugin in paragraph");
        }
        let documentPresenter = documentPage.webSkelPresenter;
        let context = pluginUtils.getContext(this.element);
        this.paragraphId = context.paragraphId;
        this.paragraphPresenter = documentPresenter.element.querySelector(`paragraph-item[data-paragraph-id="${this.paragraphId}"]`).webSkelPresenter;
        this.commandsEditor = this.paragraphPresenter.commandsEditor;
        this.element.classList.add("maintain-focus");
        this.invalidate();
    }
    async beforeRender(){
        if(this.paragraphPresenter.paragraph.commands.image){
            this.imageSrc = await spaceModule.getImageURL(this.paragraphPresenter.paragraph.commands.image.id);
        }
    }
    async afterRender(){
        let deleteImgButton = this.element.querySelector(".delete-image");
        let paragraphImage = this.element.querySelector(".paragraph-image");
        if(this.paragraphPresenter.paragraph.commands.image){
            deleteImgButton.classList.remove("hidden");
            paragraphImage.classList.remove("hidden");
        }
    }
    async insertImage(){
        await this.commandsEditor.insertAttachmentCommand("image");
        this.invalidate();
    }
    async deleteImage() {
        await this.commandsEditor.deleteCommand("image");
        this.invalidate();
    }
}