export default class UserInfo {
    constructor({ nameSelector, jobSelector }) {
        const nameElement = document.querySelector(nameSelector);
        const jobElement = document.querySelector(jobSelector);
        if (!nameElement || !jobElement) {
            throw new Error("No se encontraron los elementos de informacion del usuario");
        }
        this.nameElement = nameElement;
        this.jobElement = jobElement;
    }
    getUserInfo() {
        var _a, _b;
        return {
            name: (_a = this.nameElement.textContent) !== null && _a !== void 0 ? _a : "",
            job: (_b = this.jobElement.textContent) !== null && _b !== void 0 ? _b : "",
        };
    }
    setUserInfo({ name, job }) {
        this.nameElement.textContent = name;
        this.jobElement.textContent = job;
    }
}
