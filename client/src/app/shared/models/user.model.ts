export class User {
    constructor(
        public idUser: number,
        public firstnameUser: string,
        public lastnameUser: string,
        public emailUser: string,
        public passwordUser?: string,
        public nicknameUser? : string,
        public idColoc? : number
    ){}
}