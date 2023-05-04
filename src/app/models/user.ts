export class User {
    public firstname: string;
    public lastname: string;
    public email: string;
    public avatarUrl: string;
    public creationDate: string;
    public preferredLang: string;
    public connected = false;
    public logoutUrl: string;

    public constructor( data: any = {}) {
        this.firstname = data.firstname || '';
        this.lastname = data.lastname || '';
        this.email = data.email || '';
        this.avatarUrl = data.avatarUrl || '';
        this.creationDate = data.creation_date || Date.now();
        this.preferredLang = data.preferredLang || null;
        this.connected = data.connected || false;
        this.logoutUrl = data.logoutUrl || ''
    }

    public getName() {
        return this.firstname + ' ' + this.lastname;
    }

    public getPreferredLang(){
        return this.preferredLang;
    }

    public setPreferredLang(lang){
        this.preferredLang = lang;
    }
}
