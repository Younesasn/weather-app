# Welcome to Weather App ⛅️

Dans le cadre d'un test de compétences, j'ai repris le projet de [@madzadev](<https://github.com/madzadev/weather-app>) pour modifier le comportement de l'application.

Le but pour moi était de modifier l'API présente [(Open Weather)](<https://openweathermap.org/>) pour [Open Meteo](<https://open-meteo.com/en/docs>), retirer la barre de recherche pour indiquer la ville depuis un fichier de configuration, et faire actualiser toutes les heures les données de celle-ci pour rester à jour.

Voici un aperçu de l'ancien projet crée par [@madzadev](<https://github.com/madzadev/weather-app>) : 

![Alt img](https://images.ctfassets.net/zlsyc9paq6sa/3uBrJ07WSM40FpolgjInHY/7d886cb4187b52194bf9b63c183a1d3a/1627637330_x.gif)

## Installation 📦

> [!WARNING]
> Utilisez la version 16.20 de Node avec [`NVM`](<https://github.com/nvm-sh/nvm>) pour faire fonctionner le projet

Installez le projet :
```bash
npm install
```

Créez un fichier `.env.local` à la racine du projet et indiquer la ville :
```ini
CITY_NAME=Paris
```

Enfin, lancez le projet :
```bash
npm run dev
```

## Contributions

Any feature requests and pull requests are welcome!

## License

The project is under [MIT license](https://choosealicense.com/licenses/mit/).
