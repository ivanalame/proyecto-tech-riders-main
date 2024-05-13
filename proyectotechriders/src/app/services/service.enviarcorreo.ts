import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class Serviceenviarcorreo {
  constructor(private _http: HttpClient) {}

enviarCorreoContrasena(email: string, asunto: string, mensaje: string): Observable<any> {
    let url = "https://prod-68.westeurope.logic.azure.com/workflows/6f3ac4f7e8374048a7d2aec97ed52258/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=Nl_dU9kPxGGItdXAeHBm8jt_8U0gnY54XuVMJX-FIqY";
    let json = JSON.stringify({
      email: email,
      asunto: asunto,
      mensaje: mensaje
    });
    let header = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this._http.post(url, json, {headers: header});
  }

  cambiarpassword(password: string, codigo:string, email:string): Observable<any> {
    let url = environment.urlApiLocal;
    let request = 'api/usuarios/UpdatePassword/'+password + "/"+codigo +"/"+ email; 
    return this._http.put(url + request,null);
  }
  
  getTokenPass(email: string): Observable<any>{
    let url = environment.urlApiLocal;
    let request ="api/Usuarios/RecuperarTokenPass/"+email;
    return this._http.get(url + request);
  }
}


