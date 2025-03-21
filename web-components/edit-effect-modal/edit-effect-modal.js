const spaceModule = require("assistos").loadModule("space", {});
const documentModule = require("assistos").loadModule("document", {});
export class EditEffectModal{
    constructor(element, invalidate) {
        this.element = element;
        this.invalidate = invalidate;
        this.audioMenuPresenter = document.querySelector("audio-creator").webSkelPresenter;
        let id = this.element.getAttribute("data-id");
        this.effect = this.audioMenuPresenter.commands.effects.find(effect => effect.id === id);
        this.videoDuration = parseFloat(this.element.getAttribute("data-duration"));
        this.invalidate();
    }
    async beforeRender() {
        this.audioSrc = await spaceModule.getAudioURL(this.effect.id);
        this.effectName = this.effect.name;
        this.effectStart = this.effect.start;
        this.effectEnd = this.effect.end;
        this.effectVolume = this.effect.volume;
        this.effectPlayAt = this.effect.playAt;
        this.effectDuration = this.effect.duration;
        if(this.effect.fadeIn){
            this.effectFadeIn = "checked";
        }
        if (this.effect.fadeOut) {
            this.effectFadeOut = "checked";
        }
    }
    afterRender() {
        let endInput = this.element.querySelector("input[name='end']");
        let playAtInput = this.element.querySelector("input[name='playAt']");
        let startInput = this.element.querySelector("input[name='start']");
        this.form = this.element.querySelector(".effect-parameters");
        endInput.addEventListener("change", ()=>{
            let end = parseFloat(endInput.value);
            let playAt = parseFloat(playAtInput.value);
            let start = parseFloat(startInput.value);
            if(end - start > this.videoDuration - playAt){
                this.showInputWarning("Effect duration exceeds video duration. It will be cut off.");
            } else {
                this.removeWarning();
            }
        });
        playAtInput.addEventListener("change", ()=>{
            let end = parseFloat(endInput.value);
            let playAt = parseFloat(playAtInput.value);
            let start = parseFloat(startInput.value);
            if(end - start > this.videoDuration - playAt){
                this.showInputWarning("Effect duration exceeds video duration. It will be cut off.");
            } else {
                this.removeWarning();
            }
        });
    }
    removeWarning(){
        if(!this.form.hasWarnings){
            return;
        }
        this.form.hasWarnings = false;
        this.form.querySelector(".paragraph-warning")?.remove();
    }
    showInputWarning(message){
        if(this.form.hasWarnings){
            return;
        }
        this.form.hasWarnings = true;
        let warning = `
                <div class="paragraph-warning">
                    <img loading="lazy" src="./wallet/assets/icons/warning.svg" class="video-warning-icon" alt="warn">
                    <div class="warning-text">${message}</div>
                </div>`;
        this.form.insertAdjacentHTML("beforeend", warning);
    }
    checkName(element, formData){
        let string = formData.data.name.trim();
        return !/\s/.test(string);
    }
    async saveEffect(button){
        const conditions = {
            "checkName": {fn: this.checkName, errorMessage: "Name cannot contain spaces"}
        }
        let formData = await assistOS.UI.extractFormInformation(this.element.querySelector("form"), conditions);
        if (!formData.isValid) {
            return;
        }
        let end = parseFloat(formData.data.end);
        let start = parseFloat(formData.data.start);
        let playAt = parseFloat(formData.data.playAt);
        if(end - start > this.videoDuration - playAt){
            this.effect.end = this.effect.start + parseFloat((this.videoDuration - playAt).toFixed(1));
        } else {
            this.effect.end = end;
        }
        this.effect.name = formData.data.name.trim();
        this.effect.start = parseFloat(formData.data.start);
        this.effect.volume = parseFloat(formData.data.volume);
        this.effect.playAt = playAt;
        let effectFadeIn = this.element.querySelector("input[name='fadeIn']");
        let effectFadeOut = this.element.querySelector("input[name='fadeOut']");
        this.effect.fadeIn = effectFadeIn.checked;
        this.effect.fadeOut = effectFadeOut.checked;
        await this.audioMenuPresenter.commandsEditor.invalidateCompiledVideos();
        await documentModule.updateParagraphCommands(assistOS.space.id, this.audioMenuPresenter._document.id, this.audioMenuPresenter.paragraphId, this.audioMenuPresenter.commands);
        assistOS.UI.closeModal(this.element, true);
    }
    closeModal(button){
        assistOS.UI.closeModal(this.element, false);
    }
}