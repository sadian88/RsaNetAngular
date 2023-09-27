import { Component } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as forge from 'node-forge';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    userName: string = "";
    userPass: string = "";
    btnClicked: boolean = false;
    loginSuccess: boolean;

  publicKey: string = `-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHz/vAiIp9fjXs7DzjfiYEBtHeGG
6oPvjhZb25blW1wEUr/a1oCyMChlBxWdcv701S3OICUpq8ukfyscziIpRRcvsm+W
v4nNUXS7j/2/KT+TU1SY9NSHqQpMdrqfH3BonG+4Q8UNQS5pLkkffPfRGb3cY6fW
Aw6FY2p2dr8WMpt/AgMBAAE=
-----END PUBLIC KEY-----`;
    constructor(private _httpClient: HttpClient) { }

    login() {
        var rsa = forge.pki.publicKeyFromPem(this.publicKey);
        var encryptedPassword = window.btoa(rsa.encrypt(this.userPass));
        var payload = { "UserName": this.userName, "Password": encryptedPassword };

        this._httpClient.post<boolean>(`http://localhost:5000/api/login`, payload).subscribe(res => {
            this.btnClicked = true;
            this.loginSuccess = res;
        }, err => {
            console.error(err);
        });
    }

    logout() {
        this.loginSuccess = false;
        this.btnClicked = false;
    }

}
