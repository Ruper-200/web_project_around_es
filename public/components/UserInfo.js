export default class UserInfo {
    constructor({ nameSelector, jobSelector, avatarSelector }) {
        const nameElement = document.querySelector(nameSelector);
        const jobElement = document.querySelector(jobSelector);
        const avatarElement = document.querySelector(avatarSelector);
        if (!nameElement || !jobElement || !avatarElement) {
            throw new Error("No se encontraron los elementos de informacion del usuario");
        }
        this.nameElement = nameElement;
        this.jobElement = jobElement;
        this.avatarElement = avatarElement;
    }
    getUserInfo() {
        var _a, _b;
        return {
            name: (_a = this.nameElement.textContent) !== null && _a !== void 0 ? _a : "",
            job: (_b = this.jobElement.textContent) !== null && _b !== void 0 ? _b : "",
            avatar: this.avatarElement.src,
        };
    }
    setUserInfo({ name, job, avatar }) {
        this.nameElement.textContent = name;
        this.jobElement.textContent = job;
        this.avatarElement.src = avatar;
    }
}
