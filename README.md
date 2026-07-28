# RickCRUD
A **RickCRUD** egy a *Rick and Morty API* segítségével készült full-stack (Angular + .NET) CRUD alkalmazás. 

A projekt az alábbi főbb komponensekből áll:
* **Frontend:** Angular
* **Backend:** A backend Entity Framework Core InMemory adatbázist használ, így külön adatbázis-szerver telepítésére nincs szükség az elindításához.
* **Autentikáció:** Keycloak Identity and Access Management

## Függőségek:
### Keycloak:
Ez a image futtatásával jön létre a megfelelő container:
```bash
docker run -p 127.0.0.1:8080:8080 -e KC_BOOTSTRAP_ADMIN_USERNAME=admin -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:26.7.0 start-dev
```
Ezután létre kell hozzni  egy demo-realms nevű reamlet.
Egy kliens beállítása a következő paraméterekkel:
* client: angular-app
* root url: http://localhost:4200
* valid redirect urls : http://localhost:4200/*
* web origins: http://localhost:4200
* admin url: http://localhost:4200

Ezután létre hozunk egy usert tetszőleges felhasználó névvel és jelszóval.
### Angular
A projekt letöltése után a frontend mappába lépve  
```bash 
npm install 
```
lefutattása és utána pedig 
``` bash
ng serve
```
az indításhoz.
Az alkalmazást a http://localhost:4200 címen éred el.
### .net
A backend mappába lévő .slnx / .sln fájlt megnyitjuk (Visual Studio-ban) vagy dotnet run-nal indítjuk.